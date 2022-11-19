const getBookmarksRecursively = (treeNode: any, treeObject: any) => {
  for (let i = 0; i < treeNode.length; i++) {
    let name;

    if (treeNode[i].title) {
      name = treeNode[i].title;
    } else {
      name = '.untitled (index #' + treeNode[i].index + ')';
    }

    if (treeNode[i].children) {
      treeObject[name] = {};

      getBookmarksRecursively(treeNode[i].children, treeObject[name]);
    } else {
      treeObject[name] = treeNode[i].url;
    }
  }

  return treeObject;
};

export default function getAllBookmarks() {
  chrome.bookmarks.getTree(function (treeNodeRoot) {
    const treeObject = {};

    getBookmarksRecursively(treeNodeRoot[0].children, treeObject);

    console.log(treeObject);

    return 'check console';
  });
}
