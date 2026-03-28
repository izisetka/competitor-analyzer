"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  Scan,
  Database,
  Brain,
  CheckCircle2,
} from "lucide-react";

const steps = [
  { label: "Сканирование сайта", sublabel: "Извлекаем HTML, мета-данные и контент", icon: Scan, progress: 25 },
  { label: "Извлечение данных", sublabel: "Парсим структуру, цены, технологии", icon: Database, progress: 50 },
  { label: "AI анализ", sublabel: "GPT-4o формирует отчёт", icon: Brain, progress: 80 },
  { label: "Готово!", sublabel: "Отчёт сформирован", icon: CheckCircle2, progress: 100 },
];

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleAnalyze() {
    if (!url.trim()) {
      setError("Введите URL сайта");
      return;
    }
    setError("");
    setLoading(true);
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 2) return prev + 1;
        return prev;
      });
    }, 1200);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        throw new Error("Ошибка анализа");
      }

      const data = await res.json();
      setCurrentStep(steps.length - 1);

      setTimeout(() => {
        router.push(`/report/${data.id}`);
      }, 800);
    } catch {
      clearInterval(stepInterval);
      setLoading(false);
      setError("Произошла ошибка. Попробуйте снова.");
    }
  }

  return (
    <div className="dark relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/[0.05] blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">На главную</span>
        </Link>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/25">
            CA
          </div>
          <span className="font-bold text-lg tracking-tight text-white">CompetitorAI</span>
        </Link>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Анализ</span>{" "}
            <span className="text-white">конкурента</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Введите URL сайта конкурента для получения полного отчёта
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!loading ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="rounded-2xl p-2.5 bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <Input
                      type="text"
                      placeholder="wildberries.ru"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                      className="pl-12 h-14 bg-zinc-800/50 border-zinc-700 text-lg text-white rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500/50 placeholder:text-zinc-600"
                    />
                  </div>
                  <ShimmerButton
                    onClick={handleAnalyze}
                    shimmerColor="rgba(255,255,255,0.15)"
                    background="linear-gradient(135deg, #6366f1, #8b5cf6)"
                    borderRadius="12px"
                    className="h-14 px-8 text-sm font-semibold"
                  >
                    <span className="font-semibold flex items-center gap-2">
                      Анализировать
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </ShimmerButton>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-3 text-center"
                >
                  {error}
                </motion.p>
              )}

              <div className="mt-8 text-center">
                <p className="text-sm text-zinc-500 mb-3">Попробуйте:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["wildberries.ru", "ozon.ru", "tbank.ru", "yandex.ru"].map((example) => (
                    <button
                      key={example}
                      onClick={() => setUrl(example)}
                      className="px-4 py-2 rounded-full text-sm font-medium text-zinc-500 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-all duration-200"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Radar animation */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
                  <div className="absolute inset-3 rounded-full border border-indigo-500/15" />
                  <div className="absolute inset-6 rounded-full border border-indigo-500/10" />
                  <div className="absolute inset-0 radar-sweep">
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left bg-gradient-to-r from-indigo-500 to-transparent rounded-full" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-lg shadow-indigo-500/50" />
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-500/10 animate-ping" style={{ animationDuration: "2s" }} />
                </div>
              </div>

              <p className="text-center text-sm text-zinc-400 mb-2">
                Анализируем <span className="font-semibold text-white">{url}</span>
              </p>

              {/* Steps */}
              <div className="rounded-2xl p-6 space-y-1 bg-zinc-900/80 border border-zinc-800">
                {steps.map((step, i) => {
                  const isActive = i === currentStep;
                  const isDone = i < currentStep;
                  const isPending = i > currentStep;
                  const StepIcon = step.icon;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.4 }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                        isActive ? "bg-indigo-500/10" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isDone
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                            : isActive
                            ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 animate-pulse"
                            : "bg-zinc-800 text-zinc-500"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <StepIcon className="w-5 h-5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-semibold text-sm transition-colors ${
                            isPending ? "text-zinc-500" : "text-white"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-zinc-500">{step.sublabel}</p>
                      </div>

                      {isActive && (
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      )}

                      {isDone && (
                        <span className="text-xs font-medium text-emerald-400">Готово</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="rounded-full p-1 bg-zinc-900 border border-zinc-800">
                <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${steps[currentStep].progress}%` }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
