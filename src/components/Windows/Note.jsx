import "./note.scss";
// import Markdown from 'react-markdown'
import { useEffect, useState } from "react";
import Macwindow from "./Macwindow";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierDuneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Note = ({ windowName, setWindowsState }) => {
  const [markdown, setmarkdown] = useState(null);
  useEffect(() => {
    fetch("/note.txt")
      .then((res) => res.text())
      .then((text) => setmarkdown(text));
  }, []);

  return (
    <Macwindow windowName={windowName} setWindowsState={setWindowsState}>
      <div className="note-window">
        {markdown ? (
          <SyntaxHighlighter language="typescript" style={atelierDuneDark} wrapLongLines={true} >
            {markdown}
          </SyntaxHighlighter>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Macwindow>
  );
};

export default Note;
