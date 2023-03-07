import React, { useState, useEffect } from "react";

export default function App(): JSX.Element {

  const getELements = () => {
      let outCam = document.querySelector("#camera");
      let btCamera = document.querySelector("#btCamera");

      return {
        outCam: outCam,
        btCamera: btCamera
      }
  }

  let saveData = {
    cameraTrack: [{}, false]
  }

  async function enableAudio() {
    await navigator.mediaDevices.getUserMedia({"audio": true});
  }

  function stopCam(){
    let tx = saveData.cameraTrack[0];

    tx.stop();

    saveData.cameraTrack[1] = false;
  }

    function enableCamera() {
      navigator.mediaDevices.getUserMedia({"video": true})
      .then(e => {
        let track = e.getVideoTracks()[0];

        saveData.cameraTrack[0] = track;
        saveData.cameraTrack[1] = true;

        (getELements().outCam as HTMLVideoElement).srcObject = e;
      })
    }


  async function enableVideo() {
    const outScreen = document.querySelector("#screen");
    let videoC = await navigator.mediaDevices.getDisplayMedia();
    (outScreen as HTMLVideoElement).srcObject = videoC;
  }

  function btCam(){
    let tm = saveData.cameraTrack[1];

    tm == false ? enableCamera() : stopCam();
    
  }

  return(
    <>
      <video id="camera" autoPlay playsInline></video>
      <video id="screen" autoPlay playsInline></video>
      <br/>
      <div>
        <button onClick={() => enableAudio()}>🎙️</button>
        <button id="btCamera" data-tm="enable" onClick={() => btCam()}>📷</button>
        <button onClick={() => enableVideo()}>🖥️</button>
      </div>
      <br/>
    </>
  )
}