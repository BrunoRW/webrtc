import React, { useState, useEffect } from "react";

export default function App(): JSX.Element {

  const getELements = () => {
    let outCam = document.querySelector("#camera");
    let stopCam = document.querySelector("#stop");

    return {
      outCam: outCam,
      stopCam: stopCam
    };
  }

  async function enableAudio() {
    await navigator.mediaDevices.getUserMedia({"audio": true});
  }


  async function enableCamera() {
    await navigator.mediaDevices.getUserMedia({"video": true})
    .then(e => {
      let track = e.getVideoTracks()[0];

      (getELements().outCam as HTMLVideoElement).srcObject = e;

      (getELements().stopCam as HTMLElement).onclick = () => {
        track.stop()
      }
    })
  }


  async function enableVideo() {
    const outScreen = document.querySelector("#screen");
    let videoC = await navigator.mediaDevices.getDisplayMedia();
    (outScreen as HTMLVideoElement).srcObject = videoC;
  }

  return(
    <>
      <video id="camera" autoPlay playsInline></video>
      <video id="screen" autoPlay playsInline></video>
      <br/>
      <div>
        <button onClick={() => enableAudio()}>🎙️</button>
        <button onClick={() => enableCamera()}>📷</button>
        <button id="stop">-📷-</button>
        <button onClick={() => enableVideo()}>🖥️</button>
      </div>
      <br/>
    </>
  )
}