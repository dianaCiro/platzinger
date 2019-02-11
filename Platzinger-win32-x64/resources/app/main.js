const {app, BrowserWindow} = require('electron')
const path = require('path')//variable que provee node, la cual va a indicar varios atributos 
                        //del path, o de la ruta en la que estamos ahora mismo en el sistema operativo 
const url = require('url')

let win;// variable que va a guardar nuestro window

function createWindow () {
    win = new BrowserWindow({width: 800, height: 600})
  
    // cargar ventana
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/platzinger/index.html'),//por eso se usa path.join ya que el path trae la información desde la ruta del proyecto
      protocol: 'file:',//que tipo de path estamos pasando(file)           //dist: carpeta que genera angular para producción
      slashes: true // vamos a usar slashes
    }))
  
    // Open the DevTools optionally:
    // win.webContents.openDevTools()
  
    win.on('closed', () => {//se usa para liberar memoria
      win = null//cuando esté cerrada, liberar memoria
    })
  }
  

  /*EVENTOS */
  app.on('ready', createWindow)//cuando estemos listos , vamos a llamar a createWindow
  
  
  //process.platform: trae el valor del sistema operativo en el que estemos ahorita, en el caso de windows ej: win32
  app.on('window-all-closed', () => { //window-all-closed:función para guardar recursos
    if (process.platform !== 'darwin') {//caso especifico de mac, en mac la plataforma se llama darwin
      app.quit()//la app se cierra
    }
  })
  //en mac hay una particularidad, que aunque se cierren todas las ventanas, la aplicación sigue corriendo
  //en el caso de windows o linux, si cierra las ventanas, la aplicación se cierra automáticamente


  app.on('activate', () => { // Si está activo y la ventana no tiene nada, entonces se va a crear
    if (win === null) {
      createWindow()
    }
  })