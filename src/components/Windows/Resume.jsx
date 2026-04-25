import "./resume.scss"
import Macwindow from "./Macwindow"


const Resume = ({windowName , setWindowsState}) => {
  return (
    <Macwindow windowName={windowName}  setWindowsState={setWindowsState}>

       
     <div className="resume-window">
        <iframe src="/resume.pdf" frameborder="0"></iframe>
     </div>

      
    </Macwindow>
  )
}

export default Resume
