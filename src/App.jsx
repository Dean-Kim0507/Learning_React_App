import React, { Component } from 'react';
import TOC from "./Components/TOC"
import ReadContent from "./Components/ReadContent"
import Subject from "./Components/Subject"
import Control from "./Components/Control"
import UpdateContent from "./Components/UpdateContent"
import CreateContent from './Components/CreateContent';


class App extends Component {
  constructor(props) {//if you want to initialize some component, put the code in the constructor
    super(props);
    this.max_content_id = 3;
    //컨스트럭터 안에서는 state를 그냥 넣어서 바꿀수 있다
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      welcome: { title: 'Welcome', desc: 'Hello, React!!' },
      subject: { title: 'WEB', sub: "World wide Web" },
      contents: [//대괄호는 많은 props 넣어줄떄
        //이 state는 자식TOC에 props를 이용 전달해준다
        { id: 1, title: 'HTML', desc: 'Html is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    }
  }

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} ></ReadContent>
    }
    //read
    else if (this.state.mode === 'read') {
      var _content = this.getReadContent();

      _article = <ReadContent title={_content.title} desc={_content.desc} ></ReadContent>
    }

    // Create
    else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={
        function (_title, _desc) {
          //add content to this.state.cotnents
          this.max_content_id = this.max_content_id + 1;
          //방법1)push를 쓰는 방법은 Original data인 state.contents를 바꾼다
          // this.state.contents.push(
          // {id:this.max_content_id, title:_title, desc:_desc});
          //방법2)퍼포먼스 측면에서 concat이 더 효율적
          // var _contents = this.state.contents.concat (
          //   {id:this.max_content_id, title:_title, desc:_desc}
          // );
          //방법3)새로운 Array를 Array.from(복사하고싶은배열)/Object.assign({추가하고싶은내용},복사하고싶은객체) api 이용해서 만들어줘서 넣는 방법도 있음
          var _contents = Array.from(this.state.contents);
          _contents.push({ id: this.max_content_id, title: _title, desc: _desc });
          this.setState({
            contents: _contents,
            mode: 'read',
            selected_content_id: this.max_content_id
          });
          console.log(_title, _desc)
        }.bind(this)
      }></CreateContent>
    }

    // Update
    else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function (_id, _title, _desc) {
          console.log(_id);
          //add content to this.state.cotnents
          //immutable(불변) 성능이고 성능을 컨트롤 할때 좋음
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[i] = { id: _id, title: _title, desc: _desc };
              break;
            }
            i = i + 1;
          }
          this.setState({
            contents: _contents,
            mode: 'read'
          });
        }.bind(this)
      }></UpdateContent>
    }
    return _article;
  }

  render() {

    return (
      <div className="App">
        <Subject title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}
        ></Subject>
        {/* <header>
      <h1><a href="/" onClick={function(e){
        console.log(e);
        e.preventDefault();
        // this.state.mode = 'welcome';
        //위와같이 걍 값을 넣는게 아니라 이미 컴포넌트 생성후에는 setState 메소드를 써서 집어넣어야함
        this.setState({
          mode:'welcome'
        })
        //onClick안에 this값은 자기자신이 아닌 아무값도 셋팅되지 않는다(원리는모름), 그래서 bind 함수를 써야한다
      }.bind(this)}>{this.state.subject.title}</a></h1>
      {this.state.subject.sub}
	  </header> */}

        <TOC onChangePage={
          function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)//문자를 숫자로 변경해주는 함수 Number
            });
          }.bind(this)
        } data={this.state.contents}></TOC>
        <Control onChangeMode={function (_mode) {
          if (_mode === 'delete') {
            if (window.confirm('really?')) {
              var _content = Array.from(this.state.contents);
              var i = 0;
              while (i < this.state.contents.length) {
                if (_content[i].id === this.state.selected_content_id) {
                  _content.splice(i, 1);
                  break;
                }
                i = i + 1
              }
              this.setState({
                mode: 'welcome',
                contents: _content,
                selected_content_id: 1
              });
              alert('deleted!');
            }
          }
          else {
            this.setState({
              mode: _mode
            });

          }
        }.bind(this)}></Control>

        {this.getContent()}
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
