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
			<div className="">
				{this.props.book.cover ? <img src={this.props.book.cover.medium} alt=""/> : ""}
				<img src={this.props.book.isbn} alt=""/>
				<h2>{this.props.book.title}</h2>
				{this.props.book.authors ? <h3>{this.props.book.authors[0].name}</h3> : ""}
				<h3>{this.props.book.publish_date}</h3>
			</div>
		)
	}
}

export default BookComponent
