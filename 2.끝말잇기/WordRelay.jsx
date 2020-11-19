const React = require('react');
const { useState, useRef } = React; 
// 이와같이 const { xxx } = React; 이런건 구조분해 문법이라 불림.
// exports 되는게 객체나 배열이면 구조 분해할 수 있음.

const WordRelay = () => {
  const [word, setWord] = useState('마이티');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  // Class 메소드들은 hooks 로 기입할 경우 더이상 클래스가 아니기때문에 따로 변수로 선언해 주어야 함.
  // hooks에서는 ref 에서는 항상 current 를 붙여줘야 함. (예) inputRef.current.focus(); )
  const onSubmitForm = (e) => {
    e.preventDefault();
    if(word[word.length -1] === value[0]){
      setResult('딩동댕');
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.currentTarget.value);
  };

  // hooks는 render 없이 바로 리턴
  // hooks 를 쓰게 되면 더이상 this 를 사용하지 않음(예) this.state.value)
  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} value={value} onChange={onChangeInput} />
        <button>입력!!!!</button>
      </form>
      <div>{result}</div>
    </>);
}
module.exports = WordRelay;


/*

// Class 로 기입한 경우

const React = require('react');
const { Component } = require('react');

class WordRelay extends Component {
  state = {
    word: '마이티',
    value: '',
    result: '',
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    if(this.state.word[this.state.word.length -1] === this.state.value[0]){
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: '',
      });
      this.input.focus();
    } else {
      this.setState({
        result: '땡',
        value: '',
      });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.currentTarget.value });

  };

  input;

  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
          <button>입력!!!!</button>
        </form>
        <div>{this.state.result}</div>
      </>);
  }

}
module.exports = WordRelay;
 */