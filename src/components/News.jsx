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
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      hasMore: true,
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

  async fetchNews() {
    const { category, pageSize, setProgress, apiKey } = this.props;
    const { page, articles } = this.state;

    setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      setProgress(40);

      const data = await response.json();
      setProgress(70);

      const newArticles = data.articles;

      // Create a Set of existing article URLs
      const existingUrls = new Set(articles.map(article => article.url));

      // Filter out duplicates
      const uniqueArticles = [
        ...articles,
        ...newArticles.filter(article => !existingUrls.has(article.url))
      ];

      this.setState(prevState => ({
        articles: uniqueArticles,
        totalResults: data.totalResults,
        loading: false,
        hasMore: uniqueArticles.length < data.totalResults,
      }));

      setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  }

  fetchMoreData = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchNews(); // Fetch news after page is updated
      }
    );
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
              {this.state.articles.map((element) => {
                if (element.title === "[Removed]") {
                  return null;
                }
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) + "..." : ""}
                      content={element.description ? element.description.slice(0, 100) + "..." : ""}
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
