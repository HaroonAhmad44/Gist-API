import "./App.css";
import React from "react";
import Gist from "./components/Gist";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      gists: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    fetch(
      `https://api.github.com/users/${this.state.username}/gists?per_page=100&page=1`,
      {
        headers: {
          Authorization: "token 56ee11d48afe99a480374ddba92798717501c513",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          gists: data,
        });
      });
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      username: value,
    });
  }

  render() {
    const { gists, username } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} className="form">
          <center>
            <h1>***GIST API DATA***</h1>
          </center>
          <input
            type="text"
            placeholder="ENTER USERNAME HERE"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <br />

          <button action="submit">Search</button>
        </form>
        <span>
          {gists.map((gist) => {
            return <Gist gist={gist} key={gist.id} />;
          })}
        </span>
      </div>
    );
  }
}
