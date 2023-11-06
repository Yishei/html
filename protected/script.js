const chunks = [];
let mediaRecorder;

window.onload = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => {
      document.getElementById("video").srcObject = stream;
      document.getElementById("btn").onclick = () => {
        document.getElementById("recording-indicator").style.display = "block";
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.start(1000);

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };
      };
      
    });
};

document.getElementById("stopbtn").onclick = () => {
    document.getElementById('recording-indicator').style.display = 'none';
  mediaRecorder.stop();
  const blob = new Blob(chunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "test.webm";
  a.click();
};


