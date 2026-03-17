"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Globe, ArrowRight } from "lucide-react";

const placeholderDomains = ["wildberries.ru", "ozon.ru", "tbank.ru", "yandex.ru"];

function AnimatedPlaceholder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = placeholderDomains[currentIndex];
    const timeout = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === current) {
      const timer = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timer);
    }
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % placeholderDomains.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? current.substring(0, displayText.length - 1)
          : current.substring(0, displayText.length + 1)
      );
    }, timeout);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <span className="text-muted-foreground/50 pointer-events-none select-none">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (!url.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      router.push(`/report/${data.id}`);
    } catch {
      router.push("/analyze");
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-white font-bold text-xs">
            CA
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">CompetitorAI</span>
        </div>
        <a href="/analyze" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Анализ →
        </a>
      </nav>

      {/* Hero — generous whitespace */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-20 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.15]">
          Вставьте ссылку —<br />узнайте всё о конкуренте
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg mb-10">
          Парсим сайт, анализируем продукт, цены и технологии.
        </p>

        {/* URL Input — primary accent */}
        <div className="w-full max-w-xl">
          <div className="relative bg-white rounded-xl p-2.5 shadow-md border border-slate-200">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                {!url && (
                  <div className="absolute left-11 top-1/2 -translate-y-1/2 text-base z-[1]">
                    <AnimatedPlaceholder />
                  </div>
                )}
                <Input
                  type="text"
                  placeholder=""
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="pl-11 h-12 bg-transparent border-0 text-base rounded-lg focus-visible:ring-2 focus-visible:ring-slate-300 relative z-[2]"
                />
              </div>
              <button
                className="h-12 px-8 rounded-lg bg-foreground hover:bg-foreground/90 text-white font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Анализ...
                  </>
                ) : (
                  <>
                    Анализировать
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {placeholderDomains.map((example) => (
              <button
                key={example}
                onClick={() => setUrl(example)}
                className="px-3 py-1 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-slate-100 transition-all"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — asymmetric layout, no cards, emoji */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold tracking-tight mb-8">
          Как это работает
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Step 01 — large, takes full left column */}
          <div className="md:row-span-2 flex flex-col justify-center">
            <span className="text-5xl mb-4">🔍</span>
            <span className="font-mono text-xs text-muted-foreground mb-1">01</span>
            <h3 className="text-xl font-semibold mb-2">Вставьте URL</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Скопируйте ссылку на сайт конкурента и вставьте в поле выше. Подойдёт любая страница — мы найдём остальное сами.
            </p>
          </div>

          {/* Step 02 — top right */}
          <div>
            <span className="text-3xl mb-3 block">🤖</span>
            <span className="font-mono text-xs text-muted-foreground mb-1 block">02</span>
            <h3 className="text-lg font-semibold mb-1">Мы сканируем</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Парсим главную, цены, о компании и блог
            </p>
          </div>

          {/* Step 03 — bottom right */}
          <div>
            <span className="text-3xl mb-3 block">📊</span>
            <span className="font-mono text-xs text-muted-foreground mb-1 block">03</span>
            <h3 className="text-lg font-semibold mb-1">Читаете отчёт</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Продукт, цены, SEO, стек и слабые места
            </p>
          </div>
        </div>
      </section>

      {/* Report screenshot — full-width, edge-to-edge, dramatic */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-2 text-left">Пример отчёта</h2>
          <p className="text-muted-foreground text-sm mb-8">Так выглядит результат анализа wildberries.ru</p>

          {/* Browser chrome mockup */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
                <div className="w-3 h-3 rounded-full bg-slate-300" />
              </div>
              <div className="flex-1 mx-2">
                <div className="bg-white rounded-md px-3 py-1 text-xs text-muted-foreground border border-slate-200 max-w-sm">
                  competitorai.ru/report/wildberries-ru
                </div>
              </div>
            </div>

            {/* Report content mockup */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold">wildberries.ru</h3>
                  <p className="text-sm text-muted-foreground mt-1">Маркетплейс · E-commerce · Россия</p>
                </div>
                <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-muted-foreground">анализ от 17.03.2026</span>
              </div>

              <hr className="border-slate-100" />

              {/* Scores row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Технологии", value: "23", sub: "React, Node.js, Go" },
                  { label: "Страницы", value: "148", sub: "проиндексировано" },
                  { label: "SEO-оценка", value: "72/100", sub: "12 без описания" },
                  { label: "Скорость", value: "1.8s", sub: "LCP мобильный" },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-2xl font-bold tracking-tight">{m.value}</p>
                    <p className="text-xs font-medium mt-0.5">{m.label}</p>
                    <p className="text-xs text-muted-foreground">{m.sub}</p>
                  </div>
                ))}
              </div>

              {/* Findings */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Ключевые находки</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-amber-500 shrink-0">▲</span>
                    <span>Нет публичной страницы с ценами API — возможно, скрытый enterprise-тариф</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-500 shrink-0">●</span>
                    <span>Используют Cloudflare CDN, средний ответ сервера 240ms</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-500 shrink-0">◆</span>
                    <span>Блог обновляется 3 раза в неделю, фокус на SEO-контент</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-amber-500 shrink-0">▲</span>
                    <span>Мобильная версия: CLS 0.18 — нестабильная вёрстка при загрузке</span>
                  </div>
                </div>
              </div>

              {/* Tech stack snippet */}
              <div>
                <h4 className="text-sm font-semibold mb-3">Стек технологий</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["React", "Node.js", "Go", "PostgreSQL", "Redis", "Cloudflare", "Kubernetes", "Kafka", "Elasticsearch"].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 rounded text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer — one line */}
      <footer className="py-6 px-6">
        <p className="text-center text-sm text-muted-foreground">
          CompetitorAI · <a href="https://t.me/competitorai" className="hover:text-foreground transition-colors">Telegram</a> · <a href="mailto:hello@competitorai.ru" className="hover:text-foreground transition-colors">Обратная связь</a>
        </p>
      </footer>
    </div>
  );
}
