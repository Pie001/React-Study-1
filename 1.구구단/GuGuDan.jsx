const React = require('react');
const ReactDom = require('react-dom');
const { useState, useRef } = React; 
// 이 선언으로 react.useState -> useState 로 사용 가능. 중복선언 생략가능.

const GuGuDan = () => {
    // 변경이 발생하는 값의 선언
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null); // ref
    
    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (parseInt(value) == first * second) {
            setResult('정답 : ' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            // inputRef
            inputRef.current.focus();
        } else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    };

    // 리액트 안에서는 기존의 class -> className, for -> htmlFor 로 기입해야지 해당 속성대로 적용된다.
    // 지금 높은 버전의 경우는 그냥 class, for 써도 되는 경우도 있다가 말다가 한다는듯. 그러므로 구분하도록 하는게 안전함.
    return (
        <React.Fragment>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} onChange={onChangeInput} value={value}/>
                <button>입력!</button>
            </form>
            <div id="result">{result}</div>
        </React.Fragment>
    );
}

// 다른곳에서 쓰이려면 반드시 아래와 같이 선언해야함.
module.exports = GuGuDan;