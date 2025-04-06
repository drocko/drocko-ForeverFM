"use client"; // Mark as client-side component in Next.js

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export default function AudioPlayer() {
  const [transcript, setTranscript] = useState(""); // Current transcript
  const [position, setPosition] = useState({ elapsed: 0, duration: 0 }); // Playback position
  const audioRef = useRef(null); // Reference to the audio element
  const mediaSourceRef = useRef(null); // Reference to MediaSource
  const sourceBufferRef = useRef(null); // Reference to SourceBuffer
  const socketRef = useRef(null); // Reference to WebSocket

  useEffect(() => {
    // Initialize MediaSource for streaming audio
    mediaSourceRef.current = new MediaSource();
    audioRef.current.src = URL.createObjectURL(mediaSourceRef.current);

    mediaSourceRef.current.addEventListener("sourceopen", () => {
      // Set up SourceBuffer for MP3 (adjust MIME type based on your audio format)
      sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer("audio/mpeg");
    });

    // Connect to the WebSocket server
    socketRef.current = io("http://localhost:5000"); // Use http:// for Socket.IO

    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    // Handle new file notification
    socketRef.current.on("new_file", (data) => {
      console.log("New audio file:", data.file);
    });

    // Handle audio data
    socketRef.current.on("audio", (data) => {
      if (sourceBufferRef.current && !sourceBufferRef.current.updating) {
        // Append audio binary data to the SourceBuffer
        sourceBufferRef.current.appendBuffer(new Uint8Array(data));
      }
    });

    // Handle transcript updates
    socketRef.current.on("transcript", (data) => {
      setTranscript(data.data);
    });

    // Handle position updates
    socketRef.current.on("position", (data) => {
      setPosition({ elapsed: data.elapsed_time, duration: data.duration });
      // Optional: Sync audio playback if drifted too far
      if (audioRef.current && Math.abs(audioRef.current.currentTime - data.elapsed_time) > 1) {
        audioRef.current.currentTime = data.elapsed_time;
      }
    });

    // Cleanup on unmount
    return () => {
      socketRef.current.disconnect();
      if (mediaSourceRef.current.readyState === "open") {
        mediaSourceRef.current.endOfStream();
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>ForeverFM Player</h1>
      <audio ref={audioRef} controls autoPlay />
      <div>
        <h3>Transcript</h3>
        <p>{transcript || "Waiting for transcript..."}</p>
      </div>
      <div>
        <h3>Playback Position</h3>
        <progress
          value={position.elapsed}
          max={position.duration}
          style={{ width: "100%" }}
        />
        <p>
          {Math.round(position.elapsed)}s / {Math.round(position.duration)}s
        </p>
      </div>
    </div>
  );
}