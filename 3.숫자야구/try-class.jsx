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