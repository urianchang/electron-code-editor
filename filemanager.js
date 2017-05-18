const {ipcRenderer, remote} = require('electron')
const fs = require('fs')

class FileManager {
  constructor({editor}) {
    this.editor = editor
    //: When we receive a 'open-file' message, open the file
    document.querySelector('#open').onclick = () => this.openFile()
    //: When we receive a "save-file" message, save the file
    document.querySelector('#save').onclick = () => this.saveFile()
  }

  //: Open file function
  openFile() {
    //: Open file explorer window
    var url = remote.dialog.showOpenDialog();
    //: Check if file selected has ".js"
    if (url[0].slice(-2) != "js") {
        alert("Please select a JavaScript file!");
    } else {
        fs.readFile(url[0], 'utf-8', (err, data) => {
          this.editor.setModel(monaco.editor.createModel(data, 'javascript'))
        })
    };
  }

  //: Save file function
  saveFile() {
    remote.dialog.showSaveDialog(filename => {
      let data = ''
      let model = this.editor.getModel()
      model._lines.forEach(line => data += line.text + model._EOL)
      fs.writeFile(filename, data, 'utf-8')
    })
  }
}

module.exports = FileManager
