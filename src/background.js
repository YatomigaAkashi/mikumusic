'use strict'

import fs from 'fs'
import path from 'path'
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
    createProtocol,
    /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1100,
        height: 670,
        minWidth: 1021,
        minHeight: 670,
        frame: false,
        icon: `${__static}/app.ico`,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        }
    })
    
    win.webContents.on('did-finish-load', function() {
        win.webContents.send('load-lyric-reply', parseLyrics('I:/electron/mikumusic/public/爱言叶III'))
        loadLocalMusic()
    })
    
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
    
    win.on('closed', () => {
        win = null
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        // Devtools extensions are broken in Electron 6.0.0 and greater
        // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
        // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
        // If you are not using Windows 10 dark mode, you may uncomment these lines
        // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
        // try {
        //   await installVueDevtools()
        // } catch (e) {
        //   console.error('Vue Devtools failed to install:', e.toString())
        // }
        
    }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

// 窗口操作
ipcMain.on('winmin', () => win.minimize())
ipcMain.on('winmax', () => win.maximize())
ipcMain.on('unwinmax', () => win.unmaximize())
ipcMain.on('winclose', () => win.close())

// 加载歌词
ipcMain.on('load-lyric', (event, args) => {
    fs.readFile(args, 'utf-8', (err, data) => {
        if(err) {
            console.log('读取文件失败')
            return
        }
        event.sender.send('load-lyric-reply', data)
    })
})


// 解析歌词
function parseLyrics(path) {
    return fs.readFileSync(path, 'utf-8')
}

// 获取本地歌曲列表
function loadLocalMusic() {
    let localMusicPath = path.join(__dirname, '../public')
    fs.readFile(path.join(localMusicPath, 'localMusic.json'), 'utf-8', (err, data) => {
        data = JSON.parse(data)
        data.forEach(val => {
            val.music = path.join(localMusicPath, 'CloudMusic', val.music)
            val.lyric = path.join(localMusicPath, 'lyric', val.lyric)
        })
        loadMusicMedia(data)
        win.webContents.send('load-local-music', data)
    })
}

import mp3 from 'node-id3'

// 解析媒体资源标签
function loadMusicMedia(arr) {
    arr.forEach(val => {
        let tags = mp3.read(val.music).raw
        val.name = tags.TIT2
        val.album = tags.TALB
        val.author = tags.TPE1
        val.img = {
            type: tags.APIC.mime,
            base64: Buffer.from(tags.APIC.imageBuffer, 'utf8').toString('base64')
        }
    })
}

