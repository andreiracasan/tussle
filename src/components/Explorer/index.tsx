// React
import { useState, useEffect } from 'react';

// Styling
import './explorer.scss';

export default function Explorer(props :any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragCoords, setDragCoords] = useState({ x: 0, y: 0 });
  const [explorerPos, setExplorerPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const explorer = document.querySelector('.explorer');
  const topbar = document.querySelector('.explorer__top-bar');

  useEffect(() => {
    //changes state of dragging from false to true
    const _handleMousedown = (ev: any) => {
      if (ev.target === topbar) {
        if (ev.target.parentNode.classList.contains("cascade")) {
          ev.target.parentNode.classList.remove("cascade");
          setDragCoords({ x: ev.offsetX-75, y: ev.offsetY-75 });
        } else {
          //offset on terminal div
          setDragCoords({ x: ev.offsetX, y: ev.offsetY });
        }
        setDragging(true);
      }
    };

    //changes state of dragging from true to false
    const _handleMouseup = () => {
      setDragging(false);
    };

    //add event listeners for events
    if (dragging) window.addEventListener('mouseup', _handleMouseup);
    else window.addEventListener('mousedown', _handleMousedown);

    //useEffect return
    return () => {
      if (dragging) window.removeEventListener('mousedown', _handleMousedown);
      else window.removeEventListener('mouseup', _handleMouseup);
    };
  }, [dragging, explorer, topbar]);

  //mouse position tracker
  useEffect(() => {
    const _handleMousemove = (e: MouseEvent) => {
      //set mouse position to state
      setMousePos({ x: e.clientX, y: e.clientY });
      if (dragging) {
        //this is the value inherited by the terminal
        setExplorerPos({
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

  return (
    <div
      className="explorer cascade"
      style={{
        left: explorerPos.x ? explorerPos.x : ' ',
        top: explorerPos.y ? explorerPos.y : ' ',
      }}
    >
      <div className="explorer__top-bar">Bookmarks  </div>
      <div className="explorer__view">
        <div className="nav">
          <ul>
          <li><span className="underscore">F</span>ile</li>
          <li><span className="underscore">E</span>dit</li>
          <li><span className="underscore">V</span>iew
            <ul>
              <li>Chrome Bookmarks Manager</li>
            </ul>
          </li>
          <li>Help
            <ul>
              <li>Tussle Help</li>
            </ul>
          </li>
          </ul>
        </div>
        <div className="explorer__view__viewer">
          <div className="explorer__view__viewer__icon explorer__view__viewer__icon--folder">
            <span>Bookmarks Bar</span>
          </div>
          <div className="explorer__view__viewer__icon explorer__view__viewer__icon--folder">
            <span>Other Bookmarks</span>
          </div>
          { props.bookmarks.children[2].children.map((bookmark: any) => {
            const getFavicon = () => {
              const getRoot = () => bookmark.url.split("/", 3).join("/").length
              return bookmark.url.slice(0, getRoot())
            }
            return (
              <div className="explorer__view__viewer__icon"
                style={{backgroundImage: `url("${getFavicon()}/favicon.ico")`}}>
                <span>{bookmark.title}</span>
              </div>
            )
          }) }
        </div>
      </div>
    </div>
  );
}
