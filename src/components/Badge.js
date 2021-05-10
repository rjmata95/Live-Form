import React from "react";
import codeimg from "../images/ilya-pavlov-OqtafYT5kTw-unsplash.jpg";

class Badge extends React.Component {
  render() {
    return (
      <div>
        <div>
          <img src={codeimg} alt="code aside name"></img>
          <h1> Raynulfo Mata</h1>
        </div>
      </div>
    );
  }
}

export default Badge;
