import { Console } from "console";
import React, { useState, useEffect } from "react";

export default function App(): JSX.Element {

  let camAct = false;

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



  async function enableVideo() {
    const outScreen = document.querySelector("#screen");
    let videoC = await navigator.mediaDevices.getDisplayMedia();
    (outScreen as HTMLVideoElement).srcObject = videoC;
  }

  let time = 0;
  function btCam(t: any){
    let tmp = new Date().getTime();
    if(tmp > time){
      time = tmp + 2000;
      navigator.mediaDevices.getUserMedia({"video": true})
      .then(e => {
        let track = e.getVideoTracks()[0];
          (getELements().outCam as HTMLVideoElement).srcObject = e;
          t.target.onclick = () => {
            track.stop();
          }
      })
    }
  }

  return(
    <>
      <video id="camera" autoPlay playsInline></video>
      <video id="screen" autoPlay playsInline></video>
      <br/>
      <div>
        <button onClick={() => enableAudio()}>🎙️</button>
        <button id="btCamera" data-tm="enable" onClick={e => btCam(e)}>📷</button>
        <button onClick={() => enableVideo()}>🖥️</button>
      </div>
      <br/>
    </>
  )
}