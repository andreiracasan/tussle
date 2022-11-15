// React
import { useState, useEffect } from 'react';

// Styling
import './terminal.scss';

export default function Terminal() {
  const [terminalDisplay, setTerminalDisplay] = useState([
    '<i>a</i>',
    'b',
    'c',
  ]);
  const [input, setInput] = useState('');
  //initial position of the terminal
  const [mousePos, setMousePos] = useState({x:undefined, y:undefined})
  const [dragCoords, setDragCoords] = useState({x:0,y:0});
  const [terminalPos, setTerminalPos] = useState({x:0,y:0})

  //tracking for mouse and whether currently dragging
  const [dragging, setDragging] = useState(false);

  const topbar = document.querySelector(".terminal__top-bar");

  useEffect(() => {
    //changes state of dragging from false to true
    const _handleMousedown = (ev:any) => {
      if (ev.target===topbar) {
        //offset on terminal div
        setDragCoords({x: ev.offsetX, y:ev.offsetY})
        setDragging(true);
      }
    }

    //changes state of dragging from true to false
    const _handleMouseup = () => {
      setDragging(false);
    }

    //add event listeners for events
    if (dragging)
    window.addEventListener("mouseup", _handleMouseup);
    else window.addEventListener("mousedown", _handleMousedown);

    //useEffect return
    return () => {
        if (dragging)
        window.removeEventListener("mousedown", _handleMousedown);
        else window.removeEventListener("mouseup", _handleMouseup);
    }

  })

  //mouse position tracker
  useEffect(() => {
    const _handleMousemove = (ev: any) => {
      //set mouse position to state
      setMousePos({ x: ev.clientX, y: ev.clientY });
      if (dragging) {
        //this is the value inherited by the terminal
        setTerminalPos({
          x: mousePos.x! - dragCoords.x,
          y: mousePos.y! - dragCoords.y
        })
      }
    }

    window.addEventListener("mousemove", _handleMousemove);

    //useEffect return
    return () => {
      window.removeEventListener("mousemove", _handleMousemove);
    }

  }, [mousePos, dragging])

  const getQuote = async () => {
    const _fetch = await fetch('https://api.quotable.io/random');
    const data = await _fetch.json();

    setTerminalDisplay((previousState) => [
      ...previousState,
      data.content.toLowerCase(),
    ]);
    setInput('');

    return;
  };

  function _handleKeyDown(e: any) {
    if (e.key === 'Enter') {
      if (input === 'clear') {
        setTerminalDisplay([]);
        setInput('');

        return;
      }

      if (input === 'get quote') {
        getQuote();
      }

      setTerminalDisplay((previousState) => [...previousState, input]);
      setInput('');
    }
  }

  return (
    <div className="terminal"
      style = {{left:terminalPos.x? terminalPos.x: " ",top:terminalPos.y? terminalPos.y: " "}}>
      <div className="terminal__top-bar">root@tussle</div>
      <div className="terminal__view">
        {terminalDisplay.map((item) => (
          <p>
            <span>root@tussle:~$ </span>{' '}
            <div dangerouslySetInnerHTML={{ __html: item }} />
          </p>
        ))}
        <div className="terminal__bottom">
          <span>root@tussle:~$ </span>
          <input
            className="terminal__input"
            type="text"
            onKeyDown={_handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>
      </div>
    </div>
  );
}
