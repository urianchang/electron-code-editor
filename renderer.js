const { ipcRenderer } = require('electron');
const loader = require('monaco-loader');
const fs = require('fs');
const FileManager = require('./filemanager');

window.onload = () => {
    //: Load Monaco code editor
      loader().then((monaco) => {
        let editor = monaco.editor.create(document.getElementById('container'),
              {
                //: Apply settings
                language: 'javascript',
                theme: 'vs-dark',
                cursorBlinking: "smooth",
                cursorStyle: "line"
              }
      );

      //: Get the FileManager object
      let fileManager = new FileManager({editor});

      //: ipcRenderer provides methods to send synchronous and async messages from web page to main process
      //: Communication between web page and Node
      ipcRenderer.on('navigate', (e, url) => {
          url = url.slice(8);
          console.log(`Trying to read file from ${url}`);
          fs.readFile(url, 'utf8', (error, result) => {
              if(!error) {
                  console.log(result);
                  editor.setModel(monaco.editor.createModel(result, 'javascript'));
              }
          });
      });
  });
}
