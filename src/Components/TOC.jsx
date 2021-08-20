import React, {Component} from 'react';

class TOC extends Component{
	/*상위 컴포넌트(여기서는 App) 바뀌엇을때 그 전부 하위 컴포넌트 불러오지 않기 위해(효율성 때문),
	concat을 썻을때만 newProps 값 바뀌는거 알수있다, push 쓰면 원본도 바뀌므로 모름*/
	shouldComponentUpdate(newProps, newState) {
		console.log('===>TOC render shouldComponentUpdate',newProps.data, this.props.data);
	
	if(this.props.data === newProps.data){
		return false;
	}
	return true;
}
	render() {
	console.log('===>TOC render');
	var lists =[];
	var data = this.props.data;
	var i =0;
	while(i< data.length){
	lists.push(
	<li key={data[i].id}>
		<a 
		href={"/contents/"+data[i].id}
		data-id ={data[i].id}// e.target.dataset.id 에 여기 넣은값이 들어가서추출가능
		onClick = {function(id, e) {
			e.preventDefault();
			this.props.onChangePage(id); 
		}.bind(this, data[i].id)}
		>{data[i].title}</a>
	</li>);
		i=i+1;
	}
	  return(
		<nav>
		  <ul>
			{lists}
		  </ul>
			</nav>
	  );
	}
  }

  export default TOC;