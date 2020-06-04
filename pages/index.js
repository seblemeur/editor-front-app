const { createFFmpeg } = require("@ffmpeg/ffmpeg");
var path = require("path");

export default class extends React.Component {
  constructor(props) {
    super(props);
    const ffmpeg = createFFmpeg({ log: true });
    this.state = {
      ffmpeg: ffmpeg,
    };
  }
  componentDidMount() {
    console.log("window.innerHeight", window.innerHeight);
    const blob = new Blob();
    console.log(window.URL.createObjectURL(blob));
  }

  createFF = () => {
    (async () => {
      const inPutName = "test.webm";
      const outPutName = "output.mp4";
      await this.state.ffmpeg.load();
      await this.state.ffmpeg.write(inPutName, "./" + inPutName);
      await this.state.ffmpeg.transcode(inPutName, outPutName);
      console.log("finish ?");
      const file = this.state.ffmpeg.read(outPutName);
      console.log(file);
      const blob = new Blob([file], { type: "video/mp4" });
      console.log(blob);
      const url = window.URL.createObjectURL(blob);
      console.log(url);
      let tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", outPutName);
      tempLink.click();
    })();
  };

  download = () => {};

  render() {
    return (
      <div className="container">
        <p>Hello editor</p>
        <button onClick={this.createFF}>Transcode video</button>
        <button onClick={this.download}>Download </button>
      </div>
    );
  }
}
