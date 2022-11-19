// React
import { useState, useEffect, useRef } from 'react';

// Styling
import './terminal.scss';

export default function Terminal() {
  const [terminalDisplay, setTerminalDisplay] = useState([
    '<i>a</i>',
    'b',
    'c',
  ]);

  const terminalInput = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragCoords, setDragCoords] = useState({ x: 0, y: 0 });
  const [terminalPos, setTerminalPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const terminal = document.querySelector('.terminal');
  const topbar = document.querySelector('.terminal__top-bar');

  //set focus on the input when clicking terminal
  const focusInput = () => {
    terminalInput.current?.focus();
  };

  useEffect(() => {
    //changes state of dragging from false to true
    const _handleMousedown = (ev: any) => {
      if (ev.target === topbar) {
        //offset on terminal div
        setDragCoords({ x: ev.offsetX, y: ev.offsetY });
        setDragging(true);
      }
    };

    //changes state of dragging from true to false
    const _handleMouseup = () => {
      setDragging(false);
    };

    //checks to see if terminal was clicked
    const _handleClick = (ev: any) => {
      if (ev.target === terminal && ev.target !== topbar) {
        focusInput();
      }
    };

    window.addEventListener('click', _handleClick);
    //add event listeners for events
    if (dragging) window.addEventListener('mouseup', _handleMouseup);
    else window.addEventListener('mousedown', _handleMousedown);

    //useEffect return
    return () => {
      window.removeEventListener('click', _handleClick);
      if (dragging) window.removeEventListener('mousedown', _handleMousedown);
      else window.removeEventListener('mouseup', _handleMouseup);
    };
  }, [dragging, terminal, topbar]);

  //mouse position tracker
  useEffect(() => {
    const _handleMousemove = (e: MouseEvent) => {
      //set mouse position to state
      setMousePos({ x: e.clientX, y: e.clientY });
      if (dragging) {
        //this is the value inherited by the terminal
        setTerminalPos({
          x: mousePos.x! - dragCoords.x,
          y: mousePos.y! - dragCoords.y,
        });
      }
    };

    window.addEventListener('mousemove', _handleMousemove);

    //useEffect return
    return () => {
      window.removeEventListener('mousemove', _handleMousemove);
    };
  }, [mousePos, dragging, dragCoords.x, dragCoords.y]);

  const getQuote = async () => {
    const _fetch = await fetch('https://api.quotable.io/random');
    const data = await _fetch.json();

    setTerminalDisplay((previousState) => [
      ...previousState,
      data.content.toLowerCase(),
    ]);
  };

  const fetchWeather = () =>
    setTerminalDisplay((previousState) => [...previousState, 'weather called']);

  const handleReturn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    focusInput();

    const view = document.querySelector('.terminal__view');
    if (view) view.scrollTop = view.scrollHeight;

    if (!input) return;
    setTerminalDisplay((previousState) => [...previousState, input]);

    switch (input) {
      case 'clear':
        setTerminalDisplay([]);
        break;
      case 'get quote':
        getQuote();
        break;
      case 'fetch weather':
        fetchWeather();
        break;
      default:
        setTerminalDisplay((previousState) => [
          ...previousState,
          'command not recognised',
        ]);
    }

    setInput('');
  };

  return (
    <div
      className="terminal"
      style={{
        left: terminalPos.x ? terminalPos.x : ' ',
        top: terminalPos.y ? terminalPos.y : ' ',
      }}
    >
      <div className="terminal__top-bar">root@tussle</div>
      <div className="terminal__view">
        {terminalDisplay.map((item) => (
          <div key={Math.random()}>
            <span>root@tussle:~$ </span>{' '}
            <div dangerouslySetInnerHTML={{ __html: item }} />
          </div>
        ))}
        <div className="terminal__view--bottom">
          <span>root@tussle:~$ </span>
          <input
            ref={terminalInput}
            autoFocus
            id="terminal__input"
            className="terminal__view--bottom__input"
            type="text"
            onKeyDown={handleReturn}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>
      </div>
    </div>
  );
}
