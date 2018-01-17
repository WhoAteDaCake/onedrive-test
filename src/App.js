import React, { Component } from "react";
import { getFiles } from "./onedrive";

// const stateObj = { foo: "bar" };
// window.history.pushState(stateObj, "page 2", "/me");

async function uploadFiles(e) {
  e.preventDefault();
  var pickerOptions = {
    clientId: "fab5b8e6-5e8f-47cb-995e-cb3194893bbe",
    action: "query",
    multiSelect: true,
    openInNewWindow: false,
    advanced: {}
  };
  const [error, files] = await getFiles(pickerOptions);
  console.log(error, files);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <button onClick={uploadFiles}>me</button>
      </div>
    );
  }
}

export default App;
