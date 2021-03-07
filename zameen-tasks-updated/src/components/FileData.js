import { Component } from "react";

export default class FileData extends Component {
  constructor(props) {
    super();
    this.state = {
      fileText: "",
      toggle: false,
    };
  }
  componentDidMount() {
    const { raw_url } = this.props.fileData;
    fetch(raw_url)
      .then((res) => res.text())
      .then((data) => this.setState({ fileText: data }));
  }
  render() {
    const { fileName } = this.props;
    return (
      <>
        <button className=''
          onClick={() => {
            this.setState({ toggle: !this.state.toggle });
          }}
        >
          {fileName}
        </button>
        {this.state.toggle && <pre>{this.state.fileText}</pre>}
      </>
    );
  }
}
