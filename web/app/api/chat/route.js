import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Load system prompt and coaching docs from the parent project folder
const root = path.join(process.cwd(), "..");
const systemPrompt = fs.readFileSync(path.join(root, "prompts", "system_prompt.md"), "utf-8");
const docsDir = path.join(root, "coaching_docs");
const docs = fs.readdirSync(docsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => fs.readFileSync(path.join(docsDir, f), "utf-8"))
  .join("\n\n---\n\n");

const fullSystemPrompt = systemPrompt + "\n\n" + docs;

export async function POST(request) {
  const { messages } = await request.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: fullSystemPrompt },
      ...messages,
    ],
  });

  const reply = response.choices[0].message.content;
  return Response.json({ reply });
}
