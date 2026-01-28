"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import MediaRecorderComponent from "@/app/components/interview/mediaRecorder";


const StartInterview = () => {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState(null);

  const { interview_id } = useParams();
  const router = useRouter();

  // --- Vapi AI Setup ---
  const vapiRef = useRef(null);
  const callStartedRef = useRef(false);
  if (!vapiRef.current) vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI);
  const vapi = vapiRef.current;

  // --- Media Recorder Setup ---
  const recorderRef = useRef(null); // For controlling start/stop

  // --- Start AI Call + Recording once interviewInfo is ready ---
  useEffect(() => {
    if (interviewInfo && !callStartedRef.current) {
      callStartedRef.current = true;
      startCall();
      if (recorderRef.current) {
        recorderRef.current.startRecording(); // start recording automatically
      }
    }
  }, [interviewInfo]);

  // --- Vapi AI Call Function ---
  const startCall = async () => {
    if (!interviewInfo) return;

    const questions = interviewInfo.InterviewData?.questionList || [];
    const questionList = questions.map((q) => q.question).join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hey ${interviewInfo.userName}, welcome! Ready for your ${interviewInfo.InterviewData?.jobPosition} interview?`,
      transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
      voice: { provider: "11labs", voiceId: "21m00Tcm4TlvDq8ikWAM" },
      model: {
        provider: "openai",
        model: "gpt-4o",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting a job interview.

Interview rules:
- Ask ONE question at a time.
- Wait for candidate responses before continuing.
- Ask questions only from the list below:
${questionList}

Feedback: Short and encouraging.
Wrap-up: Summarize performance positively.
          `,
          },
        ],
      },
    };

    const assistantOverrides = {
      variableValues: {
        userName: interviewInfo.userName,
        jobPosition: interviewInfo.InterviewData?.jobPosition,
      },
      recordingEnabled: true,
    };

    try {
      await vapi.start(assistantOptions, assistantOverrides);
      toast("Interview call started...");
    } catch (err) {
      console.error("Vapi start failed:", JSON.stringify(err, null, 2));
      toast("Failed to start the interview. Please try again.");
    }
  };

  // --- Vapi Event Listeners ---
  useEffect(() => {
    const handleMessage = (msg) => {
      if (msg?.conversation) setConversation(JSON.stringify(msg.conversation));
    };

    const handleCallStart = () => toast("Call connected...");
    const handleSpeechStart = () => setActiveUser(false);
    const handleSpeechEnd = () => setActiveUser(true);
    const handleCallEnd = async (call) => {
      if (call?.conversation) setConversation(JSON.stringify(call.conversation));
      toast("Interview ended.");
      if (recorderRef.current) await recorderRef.current.stopRecording(); // stop recording
      GenerateFeedBack();
    };

    const handleError = (err) => {
      console.error("Vapi error:", err);
      const errorType = err?.error?.type || err?.type || "unknown";
      const errorMsg = err?.error?.msg || err?.msg || err?.message || "";

      if (errorType === "ejected" || errorMsg.toLowerCase().includes("pipeline")) {
        toast("Interview ended unexpectedly.");
        if (recorderRef.current) recorderRef.current.stopRecording();
        GenerateFeedBack();
      } else {
        toast("An error occurred during the interview.");
      }
    };

    vapi.on("message", handleMessage);
    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);
    vapi.on("error", handleError);

    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
      vapi.off("error", handleError);
    };
  }, []);

  // --- Generate Feedback after interview ---
  const GenerateFeedBack = async () => {
    if (!conversation) {
      router.push(`/interview/${interview_id}/completed`);
      return;
    }

    try {
      const result = await axios.post("/api/api-feedback", { conversation });
      const content = result.data.content.replace(/```json|```/g, "");
      const feedbackJson = JSON.parse(content);

      await supabase.from("interviewFeedback").insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id,
          feedback: feedbackJson,
          recommendation: false,
        },
      ]);

      router.push(`/interview/${interview_id}/completed`);
    } catch (err) {
      console.error("Failed to generate feedback:", err);
      router.push(`/interview/${interview_id}/completed`);
    }
  };

  return (
    <div className="px-20 lg:px-28 xl:px-56">
      <div className="flex justify-center items-center mt-5 gap-60">
        <h2 className="font-bold text-xl">AI Interview Session</h2>
        <h2 className="flex gap-2 items-center">
          <Timer />00:00:00
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        {/* AI Recruiter Card */}
        <div className="bg-white p-40 rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />}
            <Image src="/ai.png" alt="ai" width={100} height={100} className="w-[60px] h-[60px] rounded-full object-cover" />
          </div>
          <h2>AI Recruiter</h2>
        </div>

        {/* Candidate Card */}
        <div className="bg-white p-40 rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {activeUser && <div className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />}
            <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-6">{interviewInfo?.userName[0]}</h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      {/* --- Media Recorder --- */}
      <div className="mt-5">
        <MediaRecorderComponent
          ref={recorderRef}
          interviewId={interview_id}
          userEmail={interviewInfo?.userEmail}
          recordSystemAudio={true}
        />
      </div>

      <div className="flex justify-center items-center mt-5 gap-5">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full" />
        <AlertConfirmation stopInterview={async () => {
          try {
            await vapi.stop();
          } catch (error) {
            console.error("Error stopping call:", error);
          }
          if (recorderRef.current) {
            await recorderRef.current.stopRecording();
          }
          GenerateFeedBack();
        }}>
          <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full mx-10 cursor-pointer" />
        </AlertConfirmation>
      </div>
    </div>
  );
};

export default StartInterview;
