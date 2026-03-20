import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const systemPrompt = fs.readFileSync(path.join(root, "prompts", "system_prompt.md"), "utf-8");

const docsDir = path.join(root, "coaching_docs");
const docs = fs.readdirSync(docsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => fs.readFileSync(path.join(docsDir, f), "utf-8"))
  .join("\n\n---\n\n");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const messages = [
  { role: "system", content: systemPrompt + "\n\n" + docs },
];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("AI Nutrition Coach — type 'exit' to end the session\n");

const opening = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages,
});

const openingMessage = opening.choices[0].message.content;
messages.push({ role: "assistant", content: openingMessage });
console.log(`Coach: ${openingMessage}\n`);

function ask() {
  rl.question("You: ", async (input) => {
    const userInput = input.trim();

    if (userInput.toLowerCase() === "exit") {
      console.log("\nSession ended.");
      rl.close();
      return;
    }

    if (!userInput) {
      ask();
      return;
    }

    messages.push({ role: "user", content: userInput });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
    });

    const reply = response.choices[0].message.content;
    messages.push({ role: "assistant", content: reply });

    console.log(`\nCoach: ${reply}\n`);
    ask();
  });
}

ask();
