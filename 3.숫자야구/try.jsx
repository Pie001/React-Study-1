// Hooks
import React from 'react';

// const Try = (props) => { // 자식컴포넌트의 디폴트 상태. 내부에서 사용할땐 props.tryInfo 로 접근한다.
const Try = ({ tryInfo }) => { // props를 구조분해 한 상태. 내부에선 tryInfo 로 바로 접근한다.
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
         </li>
    )
};

export default Try; // 이렇게 선언해야 다른 파일에서 불러올 수 있음.

/*
// Class 문법

import React, {Component} from 'react';

class Try extends Component {
    render() {
        const { tryInfo } = this.props;
        return(
         <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
         </li>
        )
    }

}

export default Try; // 이렇게 선언해야 다른 파일에서 불러올 수 있음.

*/