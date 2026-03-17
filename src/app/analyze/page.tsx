"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Globe, ArrowLeft, Loader2 } from "lucide-react";

const steps = [
  { label: "Сканирование сайта...", progress: 30 },
  { label: "Извлечение данных...", progress: 60 },
  { label: "AI анализ...", progress: 90 },
  { label: "Готово!", progress: 100 },
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
    <div className="relative min-h-screen overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">На главную</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            CA
          </div>
          <span className="font-semibold text-lg">CompetitorAI</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Анализ конкурента
          </h1>
          <p className="text-muted-foreground">
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
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="wildberries.ru"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                    className="pl-10 h-12 bg-card border-border text-lg"
                  />
                </div>
                <ShimmerButton
                  className="h-12 px-8"
                  shimmerSize="0.05em"
                  onClick={handleAnalyze}
                >
                  <span className="font-semibold">Анализировать</span>
                </ShimmerButton>
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
                  {["wildberries.ru", "ozon.ru", "tinkoff.ru", "yandex.ru"].map((example) => (
                    <button
                      key={example}
                      onClick={() => setUrl(example)}
                      className="px-3 py-1.5 rounded-full text-sm border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-colors"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-card border border-border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="font-medium text-lg">
                    {steps[currentStep].label}
                  </span>
                </div>

                <Progress value={steps[currentStep].progress} className="h-2 mb-4" />

                <p className="text-sm text-muted-foreground">
                  Анализируем {url}...
                </p>
              </div>

              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Skeleton className="h-32 rounded-xl" />
                  <Skeleton className="h-32 rounded-xl" />
                  <Skeleton className="h-32 rounded-xl" />
                  <Skeleton className="h-32 rounded-xl" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
