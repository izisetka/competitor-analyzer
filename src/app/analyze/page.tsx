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
    <div className="relative min-h-screen overflow-hidden mesh-gradient">
      {/* Mesh blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-purple-400/[0.03] blur-3xl animate-[mesh-move-2_25s_ease-in-out_infinite]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-400/[0.03] blur-3xl animate-[mesh-move_20s_ease-in-out_infinite]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">На главную</span>
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
            CA
          </div>
          <span className="font-bold text-xl tracking-tight">CompetitorAI</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Анализ</span> конкурента
          </h1>
          <p className="text-muted-foreground text-lg">
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
              <div className="bg-white rounded-2xl p-3 shadow-lg shadow-slate-200/50 border border-slate-100">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="wildberries.ru"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                      className="pl-12 h-14 bg-white/50 border-0 text-lg rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500/30"
                    />
                  </div>
                  <ShimmerButton
                    className="h-14 px-8 rounded-xl"
                    shimmerSize="0.05em"
                    onClick={handleAnalyze}
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
                  className="text-red-500 text-sm mt-3 text-center"
                >
                  {error}
                </motion.p>
              )}

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground mb-3">Попробуйте:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["wildberries.ru", "ozon.ru", "tbank.ru", "yandex.ru"].map((example) => (
                    <button
                      key={example}
                      onClick={() => setUrl(example)}
                      className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground glass hover:text-foreground hover:shadow-md transition-all duration-200"
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
              {/* Radar / Scanning animation */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-200/50" />
                  <div className="absolute inset-3 rounded-full border border-indigo-200/30" />
                  <div className="absolute inset-6 rounded-full border border-indigo-200/20" />
                  {/* Radar sweep */}
                  <div className="absolute inset-0 radar-sweep">
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left bg-gradient-to-r from-indigo-500 to-transparent rounded-full" />
                  </div>
                  {/* Center dot */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-lg shadow-indigo-500/50" />
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping" style={{ animationDuration: "2s" }} />
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground mb-2">
                Анализируем <span className="font-semibold text-foreground">{url}</span>
              </p>

              {/* Steps */}
              <div className="glass-strong rounded-2xl p-6 space-y-1">
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
                        isActive ? "bg-indigo-50/80" : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isDone
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                            : isActive
                            ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25 animate-pulse"
                            : "bg-gray-100 text-gray-400"
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
                            isPending ? "text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.sublabel}</p>
                      </div>

                      {isActive && (
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      )}

                      {isDone && (
                        <span className="text-xs font-medium text-emerald-600">Готово</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="glass-strong rounded-full p-1">
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
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
