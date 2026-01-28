import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";
export async function POST(req){

    const {conversation} = await req.json();
    const FINAL_PROMPT=FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation));

    try {
            const openai = new OpenAI({
                baseURL: "https://openrouter.ai/api/v1",
                apiKey: process.env.OPENROUTER_API_KEY,
            });
    
            const completion = await openai.chat.completions.create({
                model: "meta-llama/llama-3.2-3b-instruct:free",
                messages: [
                    {
                        role: "user",
                        content: FINAL_PROMPT
                    }
                ],
                response_format: { type: "json_object" }
            });
            console.log(completion.choices[0].message)
            return NextResponse.json({ content: completion.choices[0].message.content });
        } catch (error) {
            console.error("Error:", error);
            const status = error.status || 500;
            return NextResponse.json({ error: error.message }, { status });
        }
}