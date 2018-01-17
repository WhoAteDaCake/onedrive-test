export function getFiles(options) {
  return new Promise((res, rej) => {
    const url = `${window.location.origin}/onedrive`;
    // Had a bug where request was sent twice
    let resolved = false;
    const middlewareWindow = window.open(
      url,
      "Popup",
      "location,status,scrollbars,resizable,width=1, height=1"
    );

    function sendOnedriveOptions() {
      middlewareWindow.postMessage(
        JSON.stringify(options),
        window.location.origin
      );
    }

    function handleMessages(event) {
      const data = JSON.parse(event.data);
      window.removeEventListener("message", handleMessages);
      middlewareWindow.removeEventListener("load", sendOnedriveOptions);
      middlewareWindow.close();
      if (!resolved) {
        resolved = true;
        res(data);
      }
    }
    middlewareWindow.addEventListener("load", sendOnedriveOptions);
    window.addEventListener("message", handleMessages);
  });
}
