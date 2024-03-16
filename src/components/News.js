import React, { Component } from 'react'
import NewsItem from './NewsItem'
import {InfinitySpin} from 'react-loader-spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        pageSize : 8,
        category: 'general',
        country: 'in'
    }

    static propTypes = {
        pageSize : PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }
        
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            isLoading : true,
            page : 1,
            totalResults :0
        }
        document.title = `${this.props.category} - News`
    }
    async componentDidMount(){
        this.setState({
            isLoading:true
        })
        console.log('Hit');
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=1d0e1e71dfd0483181a3ec2c99eb6ec8&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles : parsedData.articles,
            totalResults : parsedData.totalResults,
            isLoading:false
        });
    }

    btnNextHandler = async ()=>{
        this.setState({page: this.state.page+1}, async ()=> {
            if(Math.ceil(this.state.totalResults/ this.props.pageSize) >= this.state.page){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=1d0e1e71dfd0483181a3ec2c99eb6ec8&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({articles : parsedData.articles});
            }
            else{

            }
        })    
    }
    btnPrevHandler = async ()=>{
        this.setState({page: this.state.page-1}, async ()=> {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=1d0e1e71dfd0483181a3ec2c99eb6ec8&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({articles : parsedData.articles});
        });        
    }

    fetchMoreData = async()=>{
        this.setState({page: this.state.page+1}, async ()=> {
            if(Math.ceil(this.state.totalResults/ this.props.pageSize) >= this.state.page){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=1d0e1e71dfd0483181a3ec2c99eb6ec8&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({articles : this.state.articles.concat(parsedData.articles)});
            }
        })

    }
    
  render() {
    return (
        <>
        <h2>Top Headlines</h2>
        <div className='spinner d-flex justify-content-center'>{this.state.isLoading &&<InfinitySpin color="grey"/>}</div>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<div className='d-flex justify-content-center'><InfinitySpin color="grey"/></div>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          >
        <div className="Container">
        <div className="row">
            {this.state.articles.map((element)=>{
                return <div  key={element.url} className="col md-3">
                <NewsItem title={element.title} imageUrl={element.urlToImage} description={element.description} url={element.url} author={element.author} publishedAt={element.publishedAt}/>
            </div>  
            })}
                     
        </div>
        </div>
        </InfiniteScroll>
        </>
    )
  }
}

export default News
