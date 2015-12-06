import webpack       from 'webpack'
import config        from '../../config'

const debug = require('debug')('kit:webpack:development_hot')
debug('Create configuration.')

const webpackConfig = require('./development')

webpackConfig.entry.app.push(
    `webpack-hot-middleware/client?path=/__webpack_hmr`,
    `webpack/hot/dev-server`
)

webpackConfig.plugins.push(
    new webpack.HotMoudleReplacePlugin(),
    new webpack.NoErrorsPlugin()
)

webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
    if (/js(?!on)/.test(loader.test)) {
        loader.query.env.development.extra['react-transform'].transforms.push({
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
        })
    }

    return loader
})

export default webpackConfig
