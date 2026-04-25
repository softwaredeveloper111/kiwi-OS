import "./App.scss";
import Dock from "./components/Dock";
import Nav from "./components/Nav";
import "remixicon/fonts/remixicon.css";
import Github from "./components/Windows/Github";
import Note from "./components/Windows/Note";
import Resume from "./components/Windows/Resume";
import Spotify from "./components/Windows/Spotify";
import Cli from "./components/Windows/Cli";
import { useState } from "react";

const App = () => {
  const [windowsState, setWindowsState] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false,
  });

  return (
    <main>
      <Nav />
      <Dock windowsState={windowsState} setWindowsState={setWindowsState} />

      {windowsState.github && (
        <Github
          windowName="github"
          setWindowsState={setWindowsState}
        />
      )}
      {windowsState.note && (
        <Note
          windowName="note"
          setWindowsState={setWindowsState}
        />
      )}
      {windowsState.resume && (
        <Resume
          windowName="resume"
          setWindowsState={setWindowsState}
        />
      )}

      {windowsState.spotify && (
        <Spotify
          windowName="spotify"
          setWindowsState={setWindowsState}
        />
      )}
      {windowsState.cli && (
        <Cli
          windowName="cli"
          setWindowsState={setWindowsState}
        />
      )}
    </main>
  );
};

export default App;
