import "./resume.scss"
import Macwindow from "./Macwindow"


const Resume = () => {
  return (
    <Macwindow>

       
     <div className="resume-window">
        <iframe src="/resume.pdf" frameborder="0"></iframe>
     </div>

      
    </Macwindow>
  )
}

export default Resume
