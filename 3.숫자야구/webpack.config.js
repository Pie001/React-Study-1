const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

/*
핫리로딩에 필요한 패키지
1. @pmmmwh/react-refresh-webpack-plugin
2. react-refresh/babel

리로딩과 핫리로딩의 차이점
- 리로딩 : 새로고침(=브라우저 새로고침)
- 핫리로딩 : 기존데이터 유지하면서 화면을 바꿔줌

*/

process.env.NODE_ENV = 'development';

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스: production // development
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    // preset 에 상세 옵션 줄때 아래와 같이 설정 가능
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR'], // 한국에서 점유율 5% 이상 브라우저에 대응
                        },
                        debug: true,
                    }], '@babel/preset-react'], // plugin 들의 모음이 preset 임.
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    // 'react-refresh/babel'
                    ]
            },
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        // new RefreshWebpackPlugin(),
    ], // 추가적으로 붙이고 싶은 것들이 있으면 여기

    output: {
        // path 와 publicPath 의 차이
        // path는 실제경로. publicPath 는 가상의 경로(상대경로)
        path: path.join(__dirname, 'dist'), // path.join 은 현재폴더 경로 + dist 를 반환함
        filename: 'app.js',
        publicPath: '/dist/', // publicPath 는 node의 express.static 과 비슷
    }, // 출력
    
    devServer: {
        publicPath: '/dist/',
        hot: true // 핫리로딩 - 변경점 감지
    },
};