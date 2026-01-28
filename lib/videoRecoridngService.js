// lib/videoRecordingManager.js

export class VideoRecordingManager {
  constructor() {
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.isRecording = false;
    this.startTime = null;
    this.maxDuration = 10 * 60 * 1000;
    this.totalSize = 0;
  }

  async startRecording(stream) {
    if (this.isRecording) return;

    this.recordedChunks = [];
    this.isRecording = true;
    this.startTime = Date.now();
    this.totalSize = 0;

    const mimeTypes = [
      "video/webm;codecs=vp8",
      "video/webm",
      "video/mp4",
    ];

    let mimeType = "video/webm";
    for (const type of mimeTypes) {
      if (MediaRecorder.isTypeSupported(type)) {
        mimeType = type;
        break;
      }
    }

    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 0,
    });

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        this.recordedChunks.push(e.data);
        this.totalSize += e.data.size;
      }
    };

    this.mediaRecorder.start(5000); // 5s chunks
  }

  async stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || !this.isRecording) {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        this.isRecording = false;

        if (!this.recordedChunks.length) {
          resolve(null);
          return;
        }

        const blob = new Blob(this.recordedChunks, {
          type: this.mediaRecorder.mimeType,
        });

        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  cleanup() {
    this.recordedChunks = [];
    this.totalSize = 0;
  }
}
