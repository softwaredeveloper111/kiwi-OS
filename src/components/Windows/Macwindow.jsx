import {Rnd} from "react-rnd"
import "./window.scss"


const Macwindow = ({children,height="50vh",width="40vw",windowName , setWindowsState}) => {



  return (
    <Rnd
    default={{
       width:width,
      height:height,
      x:300,
      y:50
    }}
    >
      
      <div className="window">
        <div className="nav">
          <div className="dots">
            <div style={{cursor:"pointer"}} onClick={()=>setWindowsState(state=>({...state,[windowName]:false}))} className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <div className="title">
            <p>souravgiri-zsh</p>
          </div>
        </div>
        <div className="main-content">
          {children}
        </div>
      </div>

    </Rnd>
  )
}

export default Macwindow
