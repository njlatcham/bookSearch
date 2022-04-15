import React from 'react';

class BookComponent extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount = () => {
		console.log(this.props.book)
	}

	render() {
		return (
			<div>
				<img src={this.props.book.isbn} alt=""/>
				<h2>{this.props.book.title}</h2>
				<h3>{this.props.book.author_name}</h3>
				<h3>{this.props.book.publish_date}</h3>
			</div>
		)
	}
}

export default BookComponent
