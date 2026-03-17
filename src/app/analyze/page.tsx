"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

const analyzeSteps = ["Сканирование", "Извлечение", "Анализ", "Готово"];

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
      setCurrentStep((prev) => (prev < 2 ? prev + 1 : prev));
    }, 1200);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      clearInterval(stepInterval);

      if (!res.ok) throw new Error("Ошибка анализа");

      const data = await res.json();
      setCurrentStep(3);
      setTimeout(() => router.push(`/report/${data.id}`), 500);
    } catch {
      clearInterval(stepInterval);
      setLoading(false);
      setCurrentStep(0);
      setError("Произошла ошибка. Попробуйте снова.");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link href="/" className="font-semibold text-lg text-gray-900">CompetitorAI</Link>
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          На главную
        </Link>
      </header>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center text-center px-6 pt-24" style={{ minHeight: "60vh" }}>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Анализ конкурента</h1>
        <p className="text-sm text-gray-500 mb-10">
          Введите URL сайта для получения полного отчёта
        </p>

        <div className="w-full max-w-[600px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Введите URL конкурента... например, wildberries.ru"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleAnalyze()}
              disabled={loading}
              className="w-full h-14 pl-5 pr-40 text-lg rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-60 transition-shadow"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !url.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Анализировать
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}

          {/* Progress */}
          {loading && (
            <div className="mt-4">
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${((currentStep + 1) / analyzeSteps.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-center gap-3 mt-2">
                {analyzeSteps.map((s, i) => (
                  <span
                    key={s}
                    className={`text-xs transition-opacity ${i <= currentStep ? "text-gray-900" : "text-gray-300"}`}
                  >
                    {s}
                    {i < analyzeSteps.length - 1 && <span className="ml-3 text-gray-300">·</span>}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Анализируем <span className="font-medium text-gray-900">{url}</span>
              </p>
            </div>
          )}

          {/* Quick examples */}
          {!loading && (
            <div className="flex items-center justify-center gap-1 mt-4 text-sm text-gray-400">
              <span>Попробуйте:</span>
              {["wildberries.ru", "ozon.ru", "tbank.ru", "yandex.ru"].map((example, i) => (
                <span key={example} className="flex items-center">
                  {i > 0 && <span className="mx-1">·</span>}
                  <button
                    onClick={() => setUrl(example)}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {example}
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
