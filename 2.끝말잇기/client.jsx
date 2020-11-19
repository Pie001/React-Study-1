const React = require('react'); // require는 node의 모듈 시스템
const ReactDom = require('react-dom');

const WordRelay = require('./WordRelay');

ReactDom.render(<div><WordRelay/></div>, document.querySelector('#root'));