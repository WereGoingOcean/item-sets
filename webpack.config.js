const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env = {}) => ({
    mode: env.prod ? 'production' : 'development',
    devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
    entry: path.resolve(__dirname, './src/vue/vue-main.ts'),
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'vue-main.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json']
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
})
