import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,imageUrl, description, url,author,publishedAt} = this.props;
    return (
      <div>
        <div className="card my-3" style={{'width': '18rem'}}>
            <img src={imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small>By {author==null? "Unknown": author} published on {new Date(publishedAt).toUTCString()}</small></p>
                <a href={url} rel="noreferrer" target="_blank" className="btn btn-primary btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
