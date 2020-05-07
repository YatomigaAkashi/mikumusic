const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    css: {
        loaderOptions: {
            stylus: {
                import: '~@/common/stylus/global.styl'
            }
        }
    },
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
        .set('common', resolve('src/common'))
        .set('components', resolve('src/components'))
        .set('views', resolve('src/views'))
        .set('base', resolve('src/base'))
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                win: {
                    icon: './public/app.ico'
                },
                productName: 'MikuMusic',
                asar: false,
            }
        }
    }
}