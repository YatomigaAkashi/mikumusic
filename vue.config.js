const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    devServer: {
        // can be overwritten by process.env.HOST
        host: '0.0.0.0',
        port: 8080
    },
    chainWebpack: config => {
        config.resolve.symlinks(true)
        config.resolve.alias
        .set('public', resolve('public'))
        .set('@', resolve('src'))
        .set('src', resolve('src'))
        .set('assets', resolve('src/assets'))
        .set('components', resolve('src/components'))
        .set('views', resolve('src/views'))
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                win: {
                    icon: './public/app.ico'
                },
                productName: 'MikuMusic'
            }
        }
    }
}