import React from "react";
import FileData from "./FileData";

class Gist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      forks: [],
      fileNames: Object.keys(props.gist.files),
      fileData: Object.values(props.gist.files),
    };
  }

  componentDidMount() {
    const { gist } = this.props;
    fetch(gist.forks_url, {
      headers: {
        Authorization: "token 56ee11d48afe99a480374ddba92798717501c513",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const reversed = data.reverse();
        const lastThree = reversed.slice(0, 3);
        if (lastThree.length>1){
        this.setState({
          forks: lastThree,
        });
      }
      else{
        this.setState({
          forks: [{owner:{login:'No Forks'}}]
        });
      }
      });
  }

  render() {
    const { gist } = this.props;
    const { description, files } = gist;
    const fileArray = Object.keys(files);

    const tagArray = fileArray.map((filename) => {
      let splitArr = filename.split(".");
      if (splitArr.length>1){
      return splitArr[splitArr.length - 1];
      }
      else{
        return ['File type not specified'];
      }

    });
    const uniqueTagArray = tagArray.filter((item, index) => {
      return tagArray.indexOf(item) === index;
    });
    const { forks, fileNames, fileData } = this.state;
    return (
      <div className="gistInfo">
        
          <b>GIST Name:{description ?? 'N / A'}</b>
        <div>
          <h4>FILES</h4>
          {fileNames.map((fileName, index) => {
            return (
              <div key={index}>
                <FileData fileName={fileName} fileData={fileData[index]} />
              </div>
            );
          })}
        </div>
        <p>
          <b>Tags: </b>
          {uniqueTagArray.map((tag) => {
            return `${tag} `;
          })}
        </p>
        <p>
          <b>Recent Forks: </b>
          {forks.map((fork) => {
            return `${fork.owner.login} `;
          })}
        </p>
      </div>
    );
  }
}
export default Gist;
