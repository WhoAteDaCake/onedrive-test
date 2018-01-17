export function getFiles(options) {
  return new Promise((res, rej) => {
    // Had a bug where request was sent twice
    let resolved = false;
    let iFrame;

    function sendOnedriveOptions(receiver) {
      receiver.postMessage(JSON.stringify(options), window.location.origin);
    }

    function handleMessages(event) {
      const data = JSON.parse(event.data);
      window.removeEventListener("message", handleMessages);
      // TODO close iWindow
      iFrame.parentNode.removeChild(iFrame);
      if (!resolved) {
        resolved = true;
        res(data);
      }
    }
    window.addEventListener("message", handleMessages);

    iFrame = document.createElement("iframe");
    iFrame.src = "/onedrive.html";
    iFrame.style.display = "none";
    iFrame.onload = () => sendOnedriveOptions(iFrame.contentWindow);
    document.body.appendChild(iFrame);
  });
}
