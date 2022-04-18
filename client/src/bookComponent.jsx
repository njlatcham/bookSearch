import React from 'react';

class BookComponent extends React.Component {

	render() {
		return (
			<div className="book_wrapper">
				{this.props.book ?
					<div className="book_container">
						{this.props.book.cover ? <div className="book_cover" ><img src={this.props.book.cover.medium} alt={this.props.book.cover.subtitle}/></div> : ""}
						<h2 className="book_title">{this.props.book.title}</h2>
						{this.props.book.authors ? <h3 className="book_author">{this.props.book.authors[0].name}</h3> : ""}
						<h3 className="book_publish-date">{this.props.book.publish_date}</h3>
					</div>
				: ""}
			</div>
		)
	}
}

export default BookComponent
