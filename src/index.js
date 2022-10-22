const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
const bob = document.getElementById("bob");
const text = document.getElementById("text");

let recorder, stream;

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });
  recorder = new MediaRecorder(stream);

  var button = document.createElement("button");
  button.innerHTML = "Do Something";

  var body = document.getElementsByTagName("body")[0];
  body.appendChild(button);

  const chunks = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = (e) => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
  };

  recorder.start();
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("disabled");

  startRecording();
});

bob.addEventListener("click", () => {
  alert(
    "Retaking video will result in loss of work. If you want to keep your work, It is recommended to save your work/download your video!"
  );

  window.location.reload();
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  window.location.reload();
});

stop.addEventListener("click", () => {
  document.open();
  document.write("<p>Reload Page To Go Back</p>");
  document.write("<p>-----------------------</p>");
  document.write("<p>.</p>");
  document.write(
    "<p>ABOUT: This screen recorder is a simple application that allows you to record your movements with high quality. Feel free to use this screen recorder for Youtube, Personal use, or any other use. Have fun with this, and I hope you enjoy!</p>"
  );
  document.write(
    "<p>HOW TO USE: To start recording your screen, simply click the Start Recording button. It should ask you which screen you want to share/record. Select the one you want, and click share. This app does NOT record sound! To stop recording, click stop sharing at the bottom of your screen.</p>"
  );
  document.close();
});
