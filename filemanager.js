const {ipcRenderer, remote} = require('electron')
const fs = require('fs')

class FileManager {
  constructor({editor}) {
    this.editor = editor

    // When we receive a 'open-file' message, open the file
    // ipcRenderer.on('open-file', (e, url) => this.openFile(url))
    document.querySelector('#open').onclick = () => this.openFile()
    document.querySelector('#save').onclick = () => this.saveFile()
  }

  // openFile(url) {
  //   // fs.readFile doesn't know what `file://` means
  //   url = (url.slice(0, 7) === 'file://') ? url.slice(7) : url
  //
  //   fs.readFile(url, 'utf-8', (err, data) => {
  //     this.editor.setModel(monaco.editor.createModel(data, 'javascript'))
  //   })
  // }

  openFile() {
    var url = remote.dialog.showOpenDialog();
    if (url[0].slice(-2) != "js") {
        alert("Please select a JavaScript file!");
    } else {
        fs.readFile(url[0], 'utf-8', (err, data) => {
          this.editor.setModel(monaco.editor.createModel(data, 'javascript'))
        })
    };
  }

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
