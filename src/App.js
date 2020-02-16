import React, { Component } from "react";
import "./App.css";
import { API_KEY, API_URL } from "./env";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: {
        key: API_KEY,
        base: API_URL
      },
      query: "israel",
      result: ""
    };
  }

  res = () => {
    fetch(
      `${this.state.api.base}weather?q=${this.state.query}&units=metric&APPID=${this.state.api.key}`
    )
      .then(res => res.json())
      .then(result => {
        this.setState({ result: result, query: "" });
      });
  };

  componentDidMount() {
    this.res();
  }

  search = e => {
    if (e.key === "Enter") {
      this.res();
    }
  };

  dateBuilder = d => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  render() {
    const weather = this.state.result;

    return (
      <div
        className={
          typeof weather.main != "undefined"
            ? weather.main.temp > 16
              ? "App warm"
              : "App"
            : "App"
        }
      >
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              onChange={e => this.setState({ query: e.target.value })}
              value={this.state.query}
              onKeyPress={this.search}
            />
          </div>

          {typeof weather.main != "undefined" ? (
            <div className="box-app">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{this.dateBuilder(new Date())}</div>
              <div className="weather">
                <div className="temp">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  />
                  <br />
                  <div>{Math.round(weather.main.temp)}&deg;c</div>
                </div>

                <div className="description">{weather.weather.main}</div>
              </div>
            </div>
          ) : (
            <div className="noResult">No Result</div>
          )}
        </main>
      </div>
    );
  }
}
export default App;
