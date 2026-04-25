import "./cli.scss";
import Terminal from "react-console-emulator";
import Macwindow from "./Macwindow";
import { useState, useRef, useEffect } from "react";



const Cli = ({ windowName, setWindowsState }) => {

  const [showMatrix, setShowMatrix] = useState(false);
  const canvasRef = useRef(null);


  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setShowMatrix(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey); // cleanup
  }, []);




  useEffect(() => {
    if (!showMatrix || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = "アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = drops[i] * fontSize < 30 ? "#fff" : "#00ff00";
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
          drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval); // cleanup
  }, [showMatrix]);




  return (
    <Macwindow windowName={windowName} setWindowsState={setWindowsState}>
      <div className="cli-window" style={{ position: "relative" }}>

        {showMatrix && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 10,
            }}
          >
            <canvas
              ref={canvasRef}
              style={{ width: "100%", height: "100%", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: "#00ff00",
                  fontFamily: "monospace",
                  fontSize: "16px",
                }}
              >
                Wake up, Sourav...
              </p>
              <p
                style={{
                  color: "#00ff00",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  opacity: 0.7,
                }}
              >
                The Matrix has you.
              </p>
              <button
                onClick={() => setShowMatrix(false)}
                style={{
                  marginTop: "12px",
                  background: "transparent",
                  border: "1px solid #00ff00",
                  color: "#00ff00",
                  fontFamily: "monospace",
                  padding: "6px 16px",
                  cursor: "pointer",
                }}
              >
                [Esc for exit ]
              </button>
            </div>
          </div>
        )}

        <Terminal
          commands={{

            echo: {
              description: "Echo a passed string.",
              usage: "echo <string>",
              fn: (...args) => args.join(" "),
            },


            about: {
              description: "About me",
              usage: "about",
              fn: () => `I'm a passionate Full Stack Developer with hands-on experience building scalable, production-ready web applications from the ground up. I work across the entire stack — from crafting responsive, performant UIs with React and Next.js to architecting robust backend services with Node.js, TypeScript, and MongoDB / PostgreSQL.

           What sets me apart is my early adoption of the AI/LLM ecosystem — I actively integrate large language models and AI-powered features into the products I build, staying ahead of the curve in an era where intelligent applications are the new standard.

           On the infrastructure side, I bring solid experience with Docker, AWS, and modern DevOps practices — ensuring the code I ship is not just functional, but reliable, containerized, and cloud-ready.

           I thrive in fast-moving environments, write clean and maintainable code, and genuinely enjoy solving complex problems end-to-end. I'm looking to contribute to a team that values ownership, innovation, and building things that matter.`,
            },


            projects: {
              description: "List my projects",
              usage: "projects",
              fn: () => `My Projects:
1. Kiwi OS - A macOS-inspired portfolio website built with React and Vite.
2. Moodify - A mood-based music discovery app that detects your current emotional state and curates personalized song recommendations in real time using AI-driven mood analysis.
3. Real-Time Code Editor - A collaborative coding environment with live multi-user code execution and integrated room-based chat, built for seamless pair programming sessions.
4. Calendar Marker - A smart event scheduling and task-tracking app with an intuitive visual timeline, priority tagging, and deadline reminders.`,
            },


            skills: {
              description: "List my skills",
              usage: "skills",
              fn: () => `Technical Skills:
- Frontend: JavaScript (ES6+) , React, Next.js ,TypeScript ,Tailwind CSS, Redux / Zustand ,Framer Motion
- Backend: Node.js, Express.js , Socket.io , JWT / Auth , 
- Databases: MongoDB, PostgreSQL
- Tools: Git, Docker, AWS, VS Code,Postman
- Other: REST APIs, Langchain , Three js , WebSockets , Jest, Cypress , OpenAI API, Prisma ORM `,
            },


            contact: {
              description: "Contact information",
              usage: "contact",
              fn: () => `Get in touch:
- Email: computerscienceengineer1@gmail.com
- LinkedIn: https://www.linkedin.com/in/sourav-giri-0a148820a/
- GitHub: https://github.com/softwaredeveloper111
- Portfolio: souravgiri.dev`,
            },


            exit: {
              description: "Close the CLI window",
              usage: "exit",
              fn: () => {
                setWindowsState((prev) => ({ ...prev, [windowName]: false }));
                return "Closing CLI...";
              },
            },


            sudo: {
              description:
                "Run command as superuser. Try: sudo hire-me | sudo rm -rf /",
              usage: "sudo <command>",
              fn: (...args) => {
                const subCommand = args.join(" ");

                if (subCommand === "hire-me") {
                  return `[sudo] password for interviewer: ****
✅ Permission granted.
📨 Offer letter incoming...
🎉 Welcome to the team, Sourav!`;
                }

                if (subCommand === "rm -rf /") {
                  return `Nice try. My portfolio stays. 😏`;
                }

                return `sudo: ${subCommand}: command not found`;
              },
            },


            neofetch: {
              description: "System information",
              fn: () => `
          ██████╗  
         ██╔════╝  souravgiri@portfolio
         ╚█████╗   ─────────────────────
          ╚═══██╗  OS: Sourav Giri v1.0
         ██████╔╝  Shell: zsh + passion
         ╚═════╝   Uptime: 3 yrs coding
                   Memory: ∞ curiosity
                   GPU: Creative Vision`,
            },


            git: {
              description:
                "Git commands. Try: git log --oneline, git status, git blame",
              usage: "git <command>",
              fn: (...args) => {
                const subCommand = args.join(" ");

                if (subCommand === "log --oneline") {
                  return `
f3a91c2 feat: launched Kiwi OS — macOS portfolio in React + Vite
e7b82d1 feat: built Moodify with OpenAI mood detection
c4d71a9 feat: shipped Real-Time Code Editor with Socket.io
a3f90b7 feat: integrated LangChain pipeline into production
92e1d3f feat: containerized app with Docker + deployed on AWS
7bc43e1 feat: Calendar Marker with smart scheduling
51f2c8a feat: mastered TypeScript across entire stack
1c73d90 init: wrote first React component, never looked back 🚀`;
                }

                if (subCommand === "status") {
                  return `On branch main
Your code is clean. Nothing to commit. 😎`;
                }

                if (subCommand === "blame") {
                  return `Every line? That's on me. I own my code. 💪`;
                }

                return `git: '${subCommand}' is not a git command.`;
              },
            },


            open: {
              description:
                "Open a file. Try: open resume.pdf , open github , open linkedin",
              usage: "open <file>",
              fn: (...args) => {
                const file = args.join(" ");

                if (file === "resume.pdf") {
                  window.open("/resume.pdf", "_blank");
                  return "📄 Opening resume.pdf...";
                }

                if (file === "github") {
                  window.open(
                    "https://github.com/softwaredeveloper111",
                    "_blank",
                  );
                  return "🐙 Opening GitHub...";
                }

                if (file === "linkedin") {
                  window.open(
                    "https://www.linkedin.com/in/sourav-giri-0a148820a/",
                    "_blank",
                  );
                  return "💼 Opening LinkedIn...";
                }

                return `open: ${file}: No such file or directory`;
              },
            },
            

            matrix: {
              description: "See how deep the rabbit hole goes",
              fn: () => {
                setTimeout(() => setShowMatrix(true), 500);
                return "Wake up, Sourav... 🐇";
              },
            },
          }}
          welcomeMessage={
            "Welcome to Sourav Giri's Portfolio CLI! Type 'help' to see available commands."
          }
          promptLabel={"souravgiri:~$"}
          promptLabelStyle={{ color: "#00f000" }}
        />
      </div>
    </Macwindow>
  );
};

export default Cli;
