"use client";

import { supabase } from "@/services/supabaseClient";
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";

const MediaRecorderComponent = forwardRef(({ interviewId, userEmail, recordSystemAudio = true }, ref) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // --- Start recording ---
  const startRecording = async () => {
    if (recording) return;

    try {
      // Camera + Microphone
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, frameRate: 15 },
        audio: true,
      });

      let finalStream = cameraStream;

      // System audio + screen (optional)
      if (recordSystemAudio && navigator.mediaDevices.getDisplayMedia) {
        try {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true, // system audio if available
          });

          // Merge camera + screen streams
          const tracks = [
            ...cameraStream.getVideoTracks(),
            ...cameraStream.getAudioTracks(),
            ...screenStream.getVideoTracks(),
            ...screenStream.getAudioTracks(),
          ];
          finalStream = new MediaStream(tracks);
        } catch (err) {
          console.warn("System audio/screen recording not available:", err);
        }
      }

      streamRef.current = finalStream;

      if (videoRef.current) videoRef.current.srcObject = finalStream;

      const mediaRecorder = new MediaRecorder(finalStream, {
        mimeType: "video/webm;codecs=vp8",
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 500000,
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunksRef.current.push(e.data);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
      console.log("Recording started!");
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  // --- Stop recording ---
  const stopRecording = async () => {
    if (!recording || !mediaRecorderRef.current) return;

    return new Promise((resolve) => {
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        recordedChunksRef.current = [];

        // Upload to Supabase
        const fileName = `${interviewId}/${Date.now()}.webm`;
        const { error } = await supabase.storage
          .from("interviewRecordings")
          .upload(fileName, blob);

        if (error) {
          console.error("Supabase upload failed:", error);
        } else {
          const { data } = supabase.storage
            .from("interviewRecordings")
            .getPublicUrl(fileName);

          await supabase.from("interview-recordings").insert([
            {
              interview_id: interviewId,
              Name: userEmail,
              Email: userEmail,
              media: data.publicUrl,
              created_at: new Date(),
            },
          ]);
          console.log("Recording saved to Supabase successfully!");
        }

        // Stop all tracks
        streamRef.current.getTracks().forEach((track) => track.stop());
        setRecording(false);
        resolve();
      };

      mediaRecorderRef.current.stop();
    });
  };

  // --- Expose methods to parent ---
  useImperativeHandle(ref, () => ({
    startRecording,
    stopRecording,
  }));

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-60 bg-black rounded"
      />
      <div className="flex gap-2 mt-2">
        <button onClick={startRecording} className="btn-primary">Start Recording</button>
        <button onClick={stopRecording} className="btn-danger">Stop Recording</button>
      </div>
    </div>
  );
});

export default MediaRecorderComponent;
