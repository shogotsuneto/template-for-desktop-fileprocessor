let baseUrl
// let anchors = []

document.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();

  for (const f of e.dataTransfer.files) {
    console.log('File(s) you dropped here: ', f.path)
    ipcRenderer.send('file', {name: f.name, path: f.path})
    const anchor = document.createElement("a")
    let searchParams = new URLSearchParams()
    searchParams.append('path', encodeURIComponent(f.path))
    searchParams.append('filename', encodeURIComponent(f.name))

    anchor.href = `${baseUrl}/?${searchParams.toString()}`
    console.log(`${baseUrl}/?${searchParams.toString()}`)
    anchor.download = `${f.name}.txt`
    anchor.click()
  }
});

document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

window.addEventListener('load', () => {
  ipcRenderer.send('rendererLoad')
})

ipcRenderer.on('port', (event, port) => {
  baseUrl = `http://127.0.0.1:${port}`
})