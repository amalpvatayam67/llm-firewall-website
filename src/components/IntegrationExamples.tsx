"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server } from "lucide-react";

type LangTab = "python" | "node";

export function IntegrationExamples() {
  const [lang, setLang] = useState<LangTab>("python");

  return (
    <section className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Integrate the firewall into your stack
            </h2>
            <p className="text-sm text-foreground/70">
              Your app talks to the firewall gateway; the firewall talks to LLM
              providers and tools.
            </p>
          </div>
        </div>
        <div className="inline-flex rounded-full bg-black/40 border border-white/10 p-1 text-xs self-start">
          <button
            type="button"
            onClick={() => setLang("python")}
            className={`px-3 py-1.5 rounded-full ${
              lang === "python"
                ? "bg-primary text-background"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Python (FastAPI)
          </button>
          <button
            type="button"
            onClick={() => setLang("node")}
            className={`px-3 py-1.5 rounded-full ${
              lang === "node"
                ? "bg-primary text-background"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Node.js (Express)
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6"
      >
        <div className="rounded-xl bg-black/60 border border-white/10 p-4 font-mono text-xs text-foreground/80 overflow-x-auto">
          {lang === "python" ? <PythonExample /> : <NodeExample />}
        </div>
        <div className="rounded-xl glass border border-white/10 p-4 text-xs text-foreground/70 space-y-3">
          <div className="flex items-center gap-2 text-foreground/80">
            <Server className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm">Architecture</span>
          </div>
          <p>
            Your application sends all chat and tool requests to the firewall at
            <code className="px-1 py-0.5 bg-black/40 rounded border border-white/10 ml-1 mr-1">
              http://firewall:8000
            </code>
            . The firewall applies multi-layer detection, then forwards safe
            traffic to configured providers and tools.
          </p>
          <div className="text-[11px] space-y-1">
            <p>
              <span className="text-primary">App</span> →
              <span className="text-foreground/80"> LLM Firewall</span> →
              <span className="text-cyan-300"> Provider / Tool</span>
            </p>
            <p className="text-foreground/60">
              Every request is logged, scored, and optionally exported to alerts
              and SIEM while keeping latency low.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function PythonExample() {
  return (
    <pre>
{`from fastapi import FastAPI
import httpx

app = FastAPI()

FIREWALL_URL = "http://localhost:8000/v1/chat/completions"
API_KEY = "<your-firewall-api-key>"


@app.post("/chat")
async def chat(messages: list[dict]):
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(
            FIREWALL_URL,
            headers={"X-API-Key": API_KEY},
            json={
                "messages": messages,
                "provider": "openai",
                "model": "gpt-4"
            },
        )
    return resp.json()`}
    </pre>
  );
}

function NodeExample() {
  return (
    <pre>
{`import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const FIREWALL_URL = "http://localhost:8000/v1/chat/completions";
const API_KEY = "<your-firewall-api-key>";

app.post("/chat", async (req, res) => {
  const response = await fetch(FIREWALL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": API_KEY,
    },
    body: JSON.stringify({
      ...req.body,
      provider: "openai",
      model: "gpt-4",
    }),
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3001, () => {
  console.log("App listening on :3001");
});`}
    </pre>
  );
}
