import "./App.css";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      forkName: [],
      rawFile: [],
      dataFlag: true,
      gists: false,
    };
    this.forkResponse = this.forkResponse.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderGists = () => {
    const { gists, rawFile, forkName } = this.state;
    let count = 0;
    const gistsData = gists.map((gist) => {
      const fileData = Object.values(gist.files);
      const fileNames = Object.keys(gist.files);
      this.getForks(gist.forks_url, this.forkResponse);
      return (
        <div>
          <h3>GIST: {gist.description}</h3>
          <ol>
            <li>{forkName[count]?.frk1 ?? "N/A"}</li>
            <li>{forkName[count]?.frk2 ?? "N/A"}</li>
            <li>{forkName[count]?.frk3 ?? "N/A"}</li>
          </ol>
          {fileNames.map((file, idx) => {
            {
              this.getFileData(fileData[idx].raw_url, this.getResponse);
            }
            return (
              <div>
                <p>
                  <b>File Title: </b> {file}
                </p>
                <p>
                  {" "}
                  <b>Tag: </b>
                  {fileData[idx].language ?? "Type Not Specified"}
                </p>
                <p>
                  <b>File Data</b> {rawFile[count]}
                </p>
                <p id="mcount">{(count += 1)}</p>
              </div>
            );
          })}
        </div>
      );
    });
    return gistsData;
  };
  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ forkName: [] });
    const res = await fetch(
      `https://api.github.com/users/${this.state.username}/gists`
    );
    const resJson = await res.json();
    this.setState({ gists: resJson });
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      username: value,
      gists: false,
    });
  }

  getForks = (url, forkResponse) => {
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.length > 0) {
          forkResponse(resJson);
        }
      });
  };

  forkResponse(resp) {
    if (resp.length) {
      var tempDict = [{ frk1: "N/A", frk2: "N/A", frk3: "N/A" }];
      var t = resp.length >= 3 ? 3 : resp.length;
      console.log(t);
      for (var i = 0, j = 1; i < t; i++, j++) {
        tempDict[0]["frk" + j] = resp[resp.length - j].owner.login;
      }
      const joined = this.state.forkName.concat(tempDict);
      this.setState({ forkName: joined });
    } else {
      const joined = this.state.forkName.concat({ frk1: "No Forks" });
      this.setState({ forkName: joined });
    }
  }

  getFileData(url, getResponse) {
    fetch(url)
      .then((res) => res.text())
      .then((data) => {
        getResponse(data);
      });
  }

  getResponse = (resp) => {
    const joined = this.state.rawFile.concat(resp);
    this.setState({ rawFile: joined });
  };
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

          <button>Search</button>
        </form>
        {gists.length >= 0 && <p>{gists.length} Gists found!</p>}
        {gists.length > 0 && <p>{username} has following Gists:</p>}
        <div>{gists.length > 0 ? this.renderGists() : null}</div>
      </div>
    );
  }
}
