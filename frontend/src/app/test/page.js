"use client"; // Mark as client-side component in Next.js

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

export default function AudioPlayer() {
  const [transcript, setTranscript] = useState(""); // Current transcript
  const [position, setPosition] = useState({ elapsed: 0, duration: 0 }); // Playback position
  const audioContextRef = useRef(null); // Reference to AudioContext
  const socketRef = useRef(null); // Reference to WebSocket
  const audioSourceRef = useRef(null); // Reference to AudioBufferSourceNode
  const startTimeRef = useRef(null); // Reference to track start time for position updates

  useEffect(() => {
    // Initialize AudioContext for Web Audio API
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

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
      const audioBinaryData = new Uint8Array(data.data);
      if (audioContextRef.current) {
        // Decode the audio data and play it
        audioContextRef.current.decodeAudioData(audioBinaryData.buffer, (buffer) => {
          if (audioSourceRef.current) {
            // Stop previous audio if it's still playing
            audioSourceRef.current.stop();
          }

          // Create a new AudioBufferSourceNode for the new audio
          audioSourceRef.current = audioContextRef.current.createBufferSource();
          audioSourceRef.current.buffer = buffer;
          audioSourceRef.current.connect(audioContextRef.current.destination);
          audioSourceRef.current.start();

          // Track the start time to calculate playback position
          startTimeRef.current = audioContextRef.current.currentTime;
        });
      }
    });

    // Handle transcript updates
    socketRef.current.on("transcript", (data) => {
      setTranscript(data.data);
    });

    // Handle position updates
    socketRef.current.on("position", (data) => {
      setPosition({ elapsed: data.elapsed_time, duration: data.duration });
      // Sync audio playback if drifted too far
      if (audioContextRef.current && audioSourceRef.current && startTimeRef.current) {
        const elapsed = audioContextRef.current.currentTime - startTimeRef.current;
        if (Math.abs(elapsed - data.elapsed_time) > 1) {
          // Adjust the playback time to sync it
          audioSourceRef.current.stop();
          audioSourceRef.current.start(startTimeRef.current + data.elapsed_time);
        }
      }
    });

    // Cleanup on unmount
    return () => {
      socketRef.current.disconnect();
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>ForeverFM Player</h1>
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
