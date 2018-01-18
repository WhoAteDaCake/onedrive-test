function oneDriveChildHandler() {
  function getFiles(options) {
    return new Promise((res, rej) => {
      window.OneDrive.open(
        Object.assign(
          {
            success: files => res([undefined, files]),
            error: e => res([e, undefined]),
            cancel: () => res([])
          },
          options
        )
      );
    });
  }

  function handleMessages(event) {
    // To prevent other domains as well as onedrive library messages
    if (event.origin !== window.origin || !event.data.includes("clientId")) {
      return;
    }
    const data = JSON.parse(event.data);
    const req = getFiles(data);
    const parent = window.opener || window.parent;
    req.then(response =>
      parent.postMessage(JSON.stringify(response), window.origin)
    );
  }

  window.addEventListener("message", handleMessages);
}

oneDriveChildHandler();
