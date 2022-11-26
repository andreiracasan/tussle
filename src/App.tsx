// Components
/*global chrome*/
import { useState, useEffect } from "react";
import Terminal from './components/Terminal';
import Explorer from './components/Explorer';

export default function App() {

  const [explorer, showExplorer] = useState(false);
  const [focused, setFocused] = useState("");

  const _handleClick = (e: any) => {
    switch (e.target.id){
      case 'bookmark':
        if (focused==="bookmark") {
          showExplorer(true);
        }
        setFocused("bookmark");
        break;
      case 'desktop':
        setFocused("");
    }
  }

  const [bookmarks,setBookmarks] = useState<chrome.bookmarks.BookmarkTreeNode>();

  if (!bookmarks) {
    chrome.bookmarks.getTree((treeNodes) => {
      setBookmarks(treeNodes[0])
    })
  }

  return (
    <div className="app__container" id="desktop"
      onClick={_handleClick} >
      <div className="app__container__desktop" >
        <div  id="bookmark" className = {focused==="bookmark"?
          "app__container__desktop__icon app__container__desktop__icon--folder app__container__desktop__icon--focus"
          : "app__container__desktop__icon app__container__desktop__icon--folder"
        }>
          <span>Bookmarks</span>
        </div>
      </div>
      <Terminal />
      {explorer?
        <Explorer bookmarks={bookmarks} />
        : null
      }
    </div>
  );
}
