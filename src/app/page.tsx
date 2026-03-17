"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Brain, ArrowRight, Loader2 } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Полный парсинг",
    description: "Сканируем сайт конкурента и извлекаем все данные: продукт, цены, технологии, контент",
  },
  {
    icon: Brain,
    title: "AI аналитика",
    description: "GPT-4o анализирует данные и формирует структурированный бизнес-отчёт",
  },
  {
    icon: FileText,
    title: "SWOT и план действий",
    description: "Сильные и слабые стороны конкурента, возможности и конкретные рекомендации",
  },
];

const logos = ["Wildberries", "Ozon", "Т-Банк", "Яндекс", "Авито", "Сбер", "VK", "Lamoda"];

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const steps = ["Сканирование", "Извлечение", "Анализ", "Готово"];

  async function handleSubmit() {
    if (!url.trim()) return;
    setIsSubmitting(true);
    setStep(0);

    const stepInterval = setInterval(() => {
      setStep((prev) => (prev < 2 ? prev + 1 : prev));
    }, 1200);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      clearInterval(stepInterval);
      setStep(3);
      setTimeout(() => router.push(`/report/${data.id}`), 500);
    } catch {
      clearInterval(stepInterval);
      setIsSubmitting(false);
      setStep(0);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="font-semibold text-lg text-gray-900">CompetitorAI</span>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
          Войти
        </a>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 max-w-3xl mx-auto" style={{ minHeight: "60vh" }}>
        <p className="text-lg font-medium text-gray-500 mb-8">
          Конкурентная разведка с AI
        </p>

        {/* Input */}
        <div className="w-full max-w-[600px] mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Введите URL конкурента... например, wildberries.ru"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isSubmitting && handleSubmit()}
              disabled={isSubmitting}
              className="w-full h-14 pl-5 pr-40 text-lg rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-60 transition-shadow"
            />
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !url.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Анализировать
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Progress bar */}
          {isSubmitting && (
            <div className="mt-3">
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-center gap-3 mt-2">
                {steps.map((s, i) => (
                  <span
                    key={s}
                    className={`text-xs transition-opacity ${
                      i <= step ? "text-gray-900" : "text-gray-300"
                    }`}
                  >
                    {s}
                    {i < steps.length - 1 && <span className="ml-3 text-gray-300">·</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick links */}
        {!isSubmitting && (
          <div className="flex items-center gap-1 text-sm text-gray-400">
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
      </section>

      {/* Logos strip */}
      <section className="py-10 bg-gray-50">
        <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-widest mb-5">
          Анализируют с нами
        </p>
        <div className="flex justify-center items-center gap-8 flex-wrap px-6 max-w-4xl mx-auto">
          {logos.map((name) => (
            <span key={name} className="text-sm font-medium text-gray-300">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-12">
          Что вы получите
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <feature.icon className="w-6 h-6 text-blue-600 mb-4" />
              <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-400">
        CompetitorAI · 2026
      </footer>
    </div>
  );
}
