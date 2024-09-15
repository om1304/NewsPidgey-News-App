import React, { Component } from "react";
import "./NewsItem.css"; // Import the CSS file

export class NewsItem extends Component {
  render() {
    let { title, content, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="card my-3 text-bg-dark glowing-border">
        <div style={{display:'block',position:"absolute",right: 50}}>
        {source ? <span className="position-absolute top-0 translate-middle badge rounded-pill bg-warning text-dark" 
        style={{zIndex: 1}}>{source}</span> : ''}
        </div>
        <img src={imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
          <small className="text-body-light fw-light">
            {author ? `by ${author}` : ""} on{" "}
            {date ? `${new Date(date).toLocaleString()}` : ""}
          </small>
          <br />
          <a href={newsUrl} className="btn btn-outline-warning mt-2">
            Read more
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
