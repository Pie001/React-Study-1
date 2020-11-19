const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'gugudan-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval', // hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?$/,
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
                plugins: [], // babel-loder의 추가요소
            },
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ], // 추가적으로 붙이고 싶은 것들이 있으면 여기
    output: {
        path: path.join(__dirname, 'dist'), // path.join 은 현재폴더 경로 + dist 를 반환함
        filename: 'app.js'
    } // 출력
};