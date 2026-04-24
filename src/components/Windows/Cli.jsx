import "./cli.scss"
import Terminal from 'react-console-emulator'
import Macwindow from "./Macwindow"


const Cli = () => {
  return (
    <Macwindow>

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
            fn: () => "Hi! I'm Sourav Giri, a passionate full-stack developer with expertise in React, Node.js, and modern web technologies. I love building interactive and user-friendly applications."
          },
          projects: {
            description: "List my projects",
            usage: "projects",
            fn: () => `My Projects:
1. Kiwi OS - A macOS-inspired portfolio website built with React and Vite
2. Task Manager - A productivity app with real-time collaboration
3. Weather Dashboard - A responsive weather app using OpenWeather API
4. E-commerce Platform - Full-stack online store with payment integration`
          },
          skills: {
            description: "List my skills",
            usage: "skills",
            fn: () => `Technical Skills:
- Frontend: React, Vue.js, HTML5, CSS3, JavaScript (ES6+)
- Backend: Node.js, Express.js, Python, Django
- Databases: MongoDB, PostgreSQL, MySQL
- Tools: Git, Docker, AWS, VS Code
- Other: REST APIs, GraphQL, Agile methodologies`
          },
          contact: {
            description: "Contact information",
            usage: "contact",
            fn: () => `Get in touch:
- Email: sourav.giri@example.com
- LinkedIn: linkedin.com/in/souravgiri
- GitHub: github.com/souravgiri
- Portfolio: souravgiri.dev`
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
