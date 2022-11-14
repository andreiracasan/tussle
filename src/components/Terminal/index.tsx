// React
import { useState } from 'react';

// Styling
import './terminal.scss';

export default function Terminal() {
  const [terminalDisplay, setTerminalDisplay] = useState([
    '<i>a</i>',
    'b',
    'c',
  ]);
  const [input, setInput] = useState('');

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
    <div className="terminal">
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
