"use client";
import { useEffect, useRef } from "react";
 
export default function Viewer() {
  const videoRef = useRef(null);
 
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.2.115:8081");
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
 
    pc.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };
 
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        ws.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
      }
    };
 
    ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "offer") {
        await pc.setRemoteDescription(new RTCSessionDescription(msg));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        ws.send(JSON.stringify(answer));
      } else if (msg.type === "candidate") {
        await pc.addIceCandidate(msg.candidate);
      }
    };
  }, []);
 
  return (
<div className="flex flex-col items-center p-4">
<h2 className="text-xl mb-2">Viewer</h2>
<video ref={videoRef} autoPlay playsInline controls className="border rounded w-2/3" />
</div>
  );
}