import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

function oneDriveChildHandler() {
  function getFiles(options) {
    return new Promise((res, rej) => {
      window.OneDrive.open(
        Object.assign(
          {
            success: files => res([undefined, files]),
            error: e => res([e, undefined])
          },
          options
        )
      );
    });
  }

  async function handleMessages(event) {
    // To prevent other domains as well as onedrive library messages
    if (event.origin !== window.origin || !event.data.includes("clientId")) {
      return;
    }
    const data = JSON.parse(event.data);
    const resp = await getFiles(data);
    window.opener.postMessage(JSON.stringify(resp), window.origin);
  }

  window.addEventListener("message", handleMessages);
}

if (window.location.pathname === "/onedrive") {
  oneDriveChildHandler();
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
