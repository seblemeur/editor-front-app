const { createFFmpeg } = require("@ffmpeg/ffmpeg");
var path = require("path");

export default class extends React.Component {
  constructor(props) {
    super(props);
    const ffmpeg = createFFmpeg({
      corePath: "./node_modules/@ffmpeg/core/ffmpeg-core.js",
      log: true,
    });
    this.state = {
      ffmpeg: ffmpeg,
    };
  }

  createFF = () => {
    (async () => {
      const inPutName = "test.webm";
      const outPutName = "output.mp4";
      await this.state.ffmpeg.load();
      await this.state.ffmpeg.write(inPutName, "./" + inPutName);
      await this.state.ffmpeg.transcode(inPutName, outPutName);

      const file = this.state.ffmpeg.read(outPutName);
      const blob = new Blob([file], { type: "video/mp4" });

      const url = window.URL.createObjectURL(blob);
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
