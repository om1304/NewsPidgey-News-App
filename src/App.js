import React, { Component } from "react";
import "./App.css"; // Make sure this is imported
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export class App extends Component {
  apiKey = process.env.REACT_APP_NEWSPIDGEY_API_KEY
  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <Router>
        <LoadingBar
          color="black"
          progress={this.state.progress}
          className="loading-bar-custom" // Apply the custom class
          height={6} // Optional: to control height directly
        />
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                key="Home"
                pageSize={12}
                category="general"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                key="Business"
                pageSize={12}
                category="business"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                key="Technology"
                pageSize={12}
                category="technology"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                key="Sports"
                pageSize={12}
                category="sports"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                key="Entertainment"
                pageSize={12}
                category="entertainment"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                key="Health"
                pageSize={12}
                category="health"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                key="Science"
                pageSize={12}
                category="science"
              />
            }
          />
          <Route
            exact
            path="/about"
            element={
              <News
                apiKey={this.apiKey}
                setProgress={this.setProgress}
                key="About"
                pageSize={12}
                category="about"
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;