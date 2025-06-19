import React ,{useEffect}from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
const [articles, setArticles] = React.useState([]);
const [loading, setLoading] = React.useState(true);
const [page, setPage] = React.useState(1);
const [totalResults, setTotalResults] = React.useState(0);
 //document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsTab`;


 

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//constructor(props) {
//    super(props);
//    //this.state = {
//    //    articles: [],
//    //    loading: true,
//    //    page: 1,
//    //    totalArticles:  0
//    //};
//   
//    this.updateNews = this.updateNews.bind(this);
//}

const updateNews = async () => {
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d644bcb18c9240c6b23093c1c47c7434&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true);
  let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json();
  props.setProgress(70);
  setArticles(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);
  props.setProgress(100);
}
useEffect(() => {
  updateNews();
  // eslint-disable-next-line
}, []);

useEffect(() => {
  if (page !== 1) {
    updateNews();
  }
  // eslint-disable-next-line
}, [page]);


//async componentDidMount() { 
//  
//  //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d644bcb18c9240c6b23093c1c47c7434&page=1&pageSize=${this.props.pageSize}`;
//  //this.setState({ loading: true });
const handlePrevClick = async () => {
  if (page > 1) {
    setPage(page - 1);
  }
}
const handleNextClick = async () => {
  setPage(page + 1);
};

const fetchMoreData = async () => {
  setPage(page + 1);
  
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d644bcb18c9240c6b23093c1c47c7434&page=${page}&pageSize=${props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  setArticles(articles.concat(parsedData.articles));
  setTotalResults(parsedData.totalResults);
};


    return (
      
    <div className="container my-3 inline-row">
      <h1 className='text-center'>NewsTab - Top Headlines!</h1>
      {loading && <Spinner />}
      {capitalizeFirstLetter(props.category) && (
        <h2 className='text-center'>Top {capitalizeFirstLetter(props.category)} Headlines</h2>
      )}
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}
        next={fetchMoreData}
        hasMore={articles ? articles.length < totalResults : false}
        loader={<Spinner />}
      >
        <div className="container">
          <div className='row'>
            {Array.isArray(articles) && articles.map((element, index) => {
              if (!element) return null;
              return (
                <div className="col-md-4" key={element.url ? element.url : index}>
                  <NewsItem
                    title={element.title ? element.title : "No Title"}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage ? element.urlToImage : "https://cdn.mos.cms.futurecdn.net/UTXkt3fY2fE5NzT5oB7Yx4.jpg"}
                    newsUrl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    date={element.publishedAt ? new Date(element.publishedAt).toGMTString() : "Unknown Date"}
                    source={element.source && element.source.name ? element.source.name : "Unknown Source"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};


News.defaultProps = {
  country: 'us',
  pageSize: 6,
  category: "general"
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};

export default News;
