import "./cli.scss"
import Terminal from 'react-console-emulator'
import Macwindow from "./Macwindow"


const Cli = ({windowName , setWindowsState}) => {
  return (
    <Macwindow windowName={windowName}  setWindowsState={setWindowsState}>

      <div className="cli-window">
        <Terminal 

        commands={{


          echo:{
            description:"Echo a passed string.",
            usage:"echo <string>",
            fn:(...args)=>args.join(" ")
          },



         
          about: {
            description: "About me",
            usage: "about",
            fn: () => `I'm a passionate Full Stack Developer with hands-on experience building scalable, production-ready web applications from the ground up. I work across the entire stack — from crafting responsive, performant UIs with React and Next.js to architecting robust backend services with Node.js, TypeScript, and MongoDB / PostgreSQL.

           What sets me apart is my early adoption of the AI/LLM ecosystem — I actively integrate large language models and AI-powered features into the products I build, staying ahead of the curve in an era where intelligent applications are the new standard.

           On the infrastructure side, I bring solid experience with Docker, AWS, and modern DevOps practices — ensuring the code I ship is not just functional, but reliable, containerized, and cloud-ready.

           I thrive in fast-moving environments, write clean and maintainable code, and genuinely enjoy solving complex problems end-to-end. I'm looking to contribute to a team that values ownership, innovation, and building things that matter.`
          },


          


          projects: {
            description: "List my projects",
            usage: "projects",
            fn: () => `My Projects:
1. Kiwi OS - A macOS-inspired portfolio website built with React and Vite.
2. Moodify - A mood-based music discovery app that detects your current emotional state and curates personalized song recommendations in real time using AI-driven mood analysis.
3. Real-Time Code Editor - A collaborative coding environment with live multi-user code execution and integrated room-based chat, built for seamless pair programming sessions.
4. Calendar Marker - A smart event scheduling and task-tracking app with an intuitive visual timeline, priority tagging, and deadline reminders.`
          },



          skills: {
            description: "List my skills",
            usage: "skills",
            fn: () => `Technical Skills:
- Frontend: JavaScript (ES6+) , React, Next.js ,TypeScript ,Tailwind CSS, Redux / Zustand ,Framer Motion
- Backend: Node.js, Express.js , Socket.io , JWT / Auth , 
- Databases: MongoDB, PostgreSQL
- Tools: Git, Docker, AWS, VS Code,Postman
- Other: REST APIs, Langchain , Three js , WebSockets , Jest, Cypress , OpenAI API, Prisma ORM `
          },




          contact: {
            description: "Contact information",
            usage: "contact",
            fn: () => `Get in touch:
- Email: computerscienceengineer1@gmail.com
- LinkedIn: https://www.linkedin.com/in/sourav-giri-0a148820a/
- GitHub: https://github.com/softwaredeveloper111
- Portfolio: souravgiri.dev`
          },




          exit: {
            description: "Close the CLI window",
            usage: "exit",
            fn: () => {
              setWindowsState(prev => ({...prev, [windowName]: false}))
              return "Closing CLI..."
            }
          }



        }}

        welcomeMessage={'Welcome to Sourav Giri\'s Portfolio CLI! Type \'help\' to see available commands.'}
        promptLabel={'souravgiri:~$'}
        promptLabelStyle={{color:'#00f000'}}
       
        
        />
      </div>
      
    </Macwindow>
  )
}

export default Cli
