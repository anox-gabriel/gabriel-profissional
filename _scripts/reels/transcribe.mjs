// node transcribe.mjs <audio.f32> <out.json> [model]
import fs from "node:fs";
import { pipeline, env } from "@huggingface/transformers";
env.cacheDir = new URL("./hfcache/", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const [inp, out, model = "onnx-community/whisper-small"] = process.argv.slice(2);
const buf = fs.readFileSync(inp);
const audio = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
const asr = await pipeline("automatic-speech-recognition", model, { dtype: { encoder_model: "fp32", decoder_model_merged: "q8" } });
const t0 = Date.now();
const res = await asr(audio, { language: "portuguese", task: "transcribe", return_timestamps: "word", chunk_length_s: 30, stride_length_s: 5 });
fs.writeFileSync(out, JSON.stringify(res, null, 1));
console.log("ok", ((Date.now() - t0) / 1000).toFixed(1) + "s", res.text.slice(0, 300));
