// Class 문법

// import React from 'react'; 와 const React = require('react'); 는 동일.
import React, { Component } from 'react'; // 이렇게 합쳐서 쓸 수 있다.
import Try from "./try";

// 1. class 외부의 function 은 class 문법에서 hooks로 바꾸어도 독립적으로 존재가능.
// 2. 예를 들어 랜덤한 숫자배열을 반환하는 getNumbers() 처럼 
// 다른 곳에서도 사용될 가능성이 있는 함수는 class 외부에 선언한다.
function getNumbers() { // 숫자 4개 겹치지 않고 랜덤하게 만들어주는 함수 
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value : '',
        answer: getNumbers(), // [1, 3, 5, 7]
        tries: [], // 시도한 횟수. push 쓰면 안됨.
    }

    onSubmitForm = (e) => {
        const { result, value, answer, tries } = this.state;
        e.preventDefault();
        if(value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result:'홈런!'}],
                }
            });
            alert('게임을 다시 시작합니다!');
            this.setState((prevState) => {
                return {
                    value: '',
                    answer: getNumbers(),
                    tries: [],
            }
            });
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
                });
                alert('게임을 다시 시작합니다!');
                this.setState((prevState) => {
                    return {
                        value: '',
                        answer: getNumbers(),
                        tries: [],
                }
                });
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if(answerArray[i] === answer[i]) {
                        strike += 1;                        
                    } else if (answer.includes(answerArray[i])){
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }],
                        value: '',    
                    }
                });
            }
        }
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        });
    };

    // 리액트 반복문 - map 이용
    render(){
        const { result, value, answer, tries } = this.state;
        return(
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도 : `} tryInfo={v} />
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball;

// ---------------------------------------------------------------

// <Try value={v} index={i}/> 에서 value 나 index에 값 정의하는것을
// HTML 에서는 attribute라고 하지만 React 에서는 props 라고 한다.


// // import NumberBaseball; 
// export default NumberBaseball;  는 module.exports = NumberBaseball; 로 호환가능. 100% 동일하진 않다는듯. 
// 가져올때는 import NumberBaseball; 이렇게 가져옴.
// 아래 예시와 같이 default 를 붙이지 않고 export 한 것은 default 를 붙인것과 import 시에 차이가 있음.
// export const hello = 'hello'; // import { hello }
// export const bye = 'hello' ; // import { hello, bye }
// default 를 붙인것은 한번만 선언 가능. default가 아닌것은 변수명만 겹치지 않는다면 여러번 선언 가능.



// ### ES2015 문법 (ES6) -- bable 이 지원해줘서 이 문법을 쓸수있게 해 줌.
// 예1) import React, { Component } from 'React';
// 예2) export default NumberBaseball; 

// ### 노드 모듈 문법(commonjs) -- node에서는 이녀석만 지원함.
// 예1) const React = require('react');
// 
// ※노드 모듈 시스템에서 아래 두 구문은 서로 같은 의미를 지닌다.
// module.exports = { hello: 'a' };
// exports.hello = 'a';

// webpack은 node가 돌리는애라서 commonjs문법으로만 기입해야함(선두에 const 붙이는 식)
// 하지만 client.jsx 같은 애들은 webpack에 들어있는 babel이 변환해 주기때문에 ES6문법을 사용해도 됨.