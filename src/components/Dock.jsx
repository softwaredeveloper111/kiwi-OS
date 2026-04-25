import "./dock.scss";

const Dock = ({ windowsState, setWindowsState }) => {
  function clickEventHandler(name) {
    setWindowsState({ ...windowsState, [name]: !windowsState[name] });
  }

  return (
    <footer className="dock">
      <div onClick={() => clickEventHandler("github")} className="icon github">
        {" "}
        <img src="/dock-icons/github.svg" alt="" />{" "}
      </div>



      <div onClick={() => clickEventHandler("note")} className="icon note">
        {" "}
        <img src="/dock-icons/note.svg" alt="" />{" "}
      </div>



      <div onClick={() => clickEventHandler("resume")} className="icon pdf">
        {" "}
        <img src="/dock-icons/pdf.svg" alt="" />{" "}
      </div>




      <div
        onClick={() =>
          window.open("https://calendar.google.com/calendar", "_blank")
        }
        className="icon calender"
      >
        {" "}
        <img src="/dock-icons/calender.svg" alt="" />{" "}
      </div>




      <div
        onClick={() => clickEventHandler("spotify")}
        className="icon spotify"
      >
        {" "}
        <img src="/dock-icons/spotify.svg" alt="" />{" "}
      </div>





      <div
        onClick={() =>
          window.open(
            "https://mail.google.com/mail/?view=cm&to=computerscienceengineer1@gmail.com&su=Subject Here&body=Hello Sir",
            "_blank",
          )
        }
        className="icon mail"
      >
        <img src="/dock-icons/mail.svg" alt="" />
      </div>





      <div
        onClick={() =>
          window.open("https://github.com/softwaredeveloper111", "_blank")
        }
        className="icon link"
      >
        {" "}
        <img src="/dock-icons/link.svg" alt="" />{" "}
      </div>






      <div onClick={() => clickEventHandler("cli")} className="icon cli">
        {" "}
        <img src="/dock-icons/cli.svg" alt="" />{" "}
      </div>
    </footer>
  );
};

export default Dock;
