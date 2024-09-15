import React, { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import TopScrollSpinner from "./TopScrollSpinner";

export class News extends Component {
  static defaultProps = {
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      hasMore: true, // Indicates if more articles are available
    };
    document.title = `NewsPidgey - ${
      this.props.category === "general"
        ? "Home"
        : this.props.category.charAt(0).toUpperCase() +
          this.props.category.substring(1)
    }`;
  }

  async componentDidMount() {
    this.fetchNews();
  }

  // Fetch news function
  async fetchNews() {
    const { category, pageSize, setProgress, apiKey} = this.props;
    const { page } = this.state;
    setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    this.setState({ loading: true });
    try {
      let data = await fetch(url);
      setProgress(40)
      let parsedData = await data.json();
      setProgress(70)
      const newTotalResults = parsedData.totalResults;

      this.setState({
        articles: [...this.state.articles, ...parsedData.articles],
        totalResults: newTotalResults,
        loading: false,
        hasMore:
          this.state.articles.length + parsedData.articles.length <
          newTotalResults,
      });
      setProgress(100)
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }

  // Fetch more data for infinite scroll
  fetchMoreData = async () => {
    if (this.state.articles.length < this.state.totalResults) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
        }),
        this.fetchNews
      );
    } else {
      this.setState({ hasMore: false });
    }
  };

  render() {
    return (
      <>
        <h2 className="text-center text-white mt-3">
          NewsPidgey -{" "}
          {`${
            this.props.category === "general"
              ? "Top Headlines"
              : "Top " +
                this.props.category.charAt(0).toUpperCase() +
                this.props.category.substring(1) +
                " Headlines"
          }`}
        </h2>

        {/* Infinite Scroll Component */}
        <InfiniteScroll
          dataLength={this.state.articles.length} // Length of articles already loaded
          next={this.fetchMoreData} // Fetch more data function
          hasMore={this.state.hasMore} // Continue fetching if more data is available
          loader={<TopScrollSpinner />} // Show Spinner while loading more data
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more articles to load!</b>
            </p>
          }
        >
          <div className="container">
            <div className="row mt-4">
              {this.state.articles.map((element, index) => {
                if (element.title === "[Removed]") {
                  return null;
                }
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={
                        element.title ? element.title.slice(0, 45) + "..." : ""
                      }
                      content={
                        element.description
                          ? element.description.slice(0, 100) + "..."
                          : ""
                      }
                      imageUrl={element.urlToImage ? element.urlToImage : ""}
                      newsUrl={element.url ? element.url : ""}
                      author={element.author ? element.author : ""}
                      date={element.publishedAt ? element.publishedAt : ""}
                      source={element.source.name ? element.source.name : ""}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
