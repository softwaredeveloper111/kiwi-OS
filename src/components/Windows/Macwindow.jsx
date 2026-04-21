import {Rnd} from "react-rnd"
import "./window.scss"


const Macwindow = ({children}) => {
  return (
    <Rnd
    default={{
       width:"40vw",
      height:"40vw",
      x:300,
      y:200
    }}
    >
      
      <div className="window">
        <div className="nav">
          <div className="dots">
            <div className="dot red"></div>
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
