"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Globe,
  ArrowRight,
  Search,
  BarChart3,
  Zap,
  Shield,
  Code2,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { BlurFadeIn } from "@/components/ui/blur-fade-in";

const placeholderDomains = [
  "wildberries.ru",
  "ozon.ru",
  "tbank.ru",
  "yandex.ru",
];

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
    <span className="text-zinc-500 pointer-events-none select-none">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

const features = [
  {
    Icon: Search,
    name: "Глубокий парсинг",
    description:
      "Сканируем главную, цены, блог, о компании — собираем полную картину за секунды",
    href: "#",
    cta: "Подробнее",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent" />
    ),
  },
  {
    Icon: BarChart3,
    name: "AI-аналитика",
    description:
      "GPT-4 анализирует продукт, позиционирование, сильные и слабые стороны конкурента",
    href: "#",
    cta: "Подробнее",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent" />
    ),
  },
  {
    Icon: Code2,
    name: "Стек технологий",
    description:
      "Определяем фреймворки, CMS, CDN, аналитику — всё, на чём построен сайт",
    href: "#",
    cta: "Подробнее",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent" />
    ),
  },
  {
    Icon: TrendingUp,
    name: "SEO-аудит",
    description:
      "Мета-теги, скорость загрузки, мобильная версия — находим точки роста",
    href: "#",
    cta: "Подробнее",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
    ),
  },
];

const companies = [
  "Wildberries",
  "Ozon",
  "Яндекс",
  "Тинькофф",
  "СберМаркет",
  "Авито",
  "Lamoda",
  "DNS",
  "М.Видео",
  "Skillbox",
];

function CompanyCard({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-3 backdrop-blur-sm">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs font-bold text-zinc-400">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <span className="text-sm font-medium text-zinc-300">{name}</span>
    </div>
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
    <div className="dark relative min-h-screen bg-zinc-950 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/[0.07] blur-[120px]" />
        <div className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-violet-500/[0.05] blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/25">
            CA
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            CompetitorAI
          </span>
        </div>
        <a
          href="/analyze"
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Анализ →
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-4xl mx-auto">
        <BlurFadeIn delay={0}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-sm">🔍</span>
            <AnimatedGradientText
              className="text-sm font-medium"
              colorFrom="#818cf8"
              colorTo="#c084fc"
            >
              AI-Powered Analysis
            </AnimatedGradientText>
          </div>
        </BlurFadeIn>

        <BlurFadeIn delay={0.1}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
              Узнай всё о конкуренте
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
              за 60 секунд
            </span>
          </h1>
        </BlurFadeIn>

        <BlurFadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed">
            Парсим сайт, анализируем продукт, цены и технологии.
            <br className="hidden md:block" />
            Полный отчёт — быстрее, чем заварить кофе.
          </p>
        </BlurFadeIn>

        {/* URL Input */}
        <BlurFadeIn delay={0.3} className="w-full max-w-xl">
          <div className="relative rounded-2xl p-2.5 bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 z-10" />
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
                  className="pl-11 h-12 bg-zinc-800/50 border-zinc-700 text-base text-white rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500/50 relative z-[2] placeholder:text-zinc-600"
                />
              </div>
              <ShimmerButton
                onClick={handleSubmit}
                disabled={isSubmitting}
                shimmerColor="rgba(255,255,255,0.15)"
                background="linear-gradient(135deg, #6366f1, #8b5cf6)"
                borderRadius="12px"
                className="h-12 px-8 text-sm font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Анализ...
                  </>
                ) : (
                  <>
                    Анализировать
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </ShimmerButton>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {placeholderDomains.map((example) => (
              <button
                key={example}
                onClick={() => setUrl(example)}
                className="px-3 py-1 rounded-full text-sm text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all border border-transparent hover:border-zinc-700"
              >
                {example}
              </button>
            ))}
          </div>
        </BlurFadeIn>
      </section>

      {/* Stats */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <BlurFadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                value: 500,
                suffix: "+",
                label: "компаний проанализировано",
                icon: BarChart3,
              },
              {
                value: 10,
                suffix: "+",
                label: "источников данных",
                icon: Shield,
              },
              {
                value: 2,
                suffix: "",
                label: "минуты на отчёт",
                icon: Zap,
              },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <stat.icon className="w-5 h-5 text-indigo-400 mb-1" />
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  <NumberTicker value={stat.value} className="text-white" />
                  <span className="text-indigo-400">{stat.suffix}</span>
                </div>
                <span className="text-sm text-zinc-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </BlurFadeIn>
      </section>

      {/* Features — BentoGrid */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <BlurFadeIn delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-center">
            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Что внутри отчёта
            </span>
          </h2>
          <p className="text-zinc-400 text-center mb-10 max-w-lg mx-auto">
            Каждый анализ — это глубокое исследование, а не поверхностный скан
          </p>
        </BlurFadeIn>

        <BlurFadeIn delay={0.2}>
          <BentoGrid className="auto-rows-[18rem] grid-cols-3">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </BlurFadeIn>
      </section>

      {/* Report screenshot */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <BlurFadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-center">
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Пример отчёта
              </span>
            </h2>
            <p className="text-zinc-400 text-center mb-10">
              Так выглядит результат анализа wildberries.ru
            </p>
          </BlurFadeIn>

          <BlurFadeIn delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-sm hover:border-zinc-700 transition-colors duration-300"
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="bg-zinc-800 rounded-md px-3 py-1 text-xs text-zinc-400 border border-zinc-700 max-w-sm">
                    competitorai.ru/report/wildberries-ru
                  </div>
                </div>
              </div>

              {/* Report content */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      wildberries.ru
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      Маркетплейс · E-commerce · Россия
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-zinc-800 px-2.5 py-1 rounded text-zinc-400 border border-zinc-700">
                    анализ от 17.03.2026
                  </span>
                </div>

                <hr className="border-zinc-800" />

                {/* Scores */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Технологии",
                      value: "23",
                      sub: "React, Node.js, Go",
                      color: "text-blue-400",
                      border: "border-l-[3px] border-blue-500",
                      bg: "bg-blue-500/10",
                    },
                    {
                      label: "Страницы",
                      value: "148",
                      sub: "проиндексировано",
                      color: "text-green-400",
                      border: "border-l-[3px] border-green-500",
                      bg: "bg-green-500/10",
                    },
                    {
                      label: "SEO-оценка",
                      value: "72/100",
                      sub: "12 без описания",
                      color: "text-purple-400",
                      border: "border-l-[3px] border-purple-500",
                      bg: "bg-purple-500/10",
                    },
                    {
                      label: "Скорость",
                      value: "1.8s",
                      sub: "LCP мобильный",
                      color: "text-amber-400",
                      border: "border-l-[3px] border-amber-500",
                      bg: "bg-amber-500/10",
                    },
                  ].map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                      className={`${m.bg} ${m.border} rounded-lg p-3`}
                    >
                      <p
                        className={`text-3xl font-bold tracking-tight ${m.color}`}
                      >
                        {m.value}
                      </p>
                      <p className="text-xs font-medium mt-0.5 text-zinc-300">
                        {m.label}
                      </p>
                      <p className="text-xs text-zinc-500">{m.sub}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Findings */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-zinc-200">
                    Ключевые находки
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      {
                        icon: "▲",
                        bg: "bg-orange-500",
                        text: "Нет публичной страницы с ценами API — возможно, скрытый enterprise-тариф",
                      },
                      {
                        icon: "●",
                        bg: "bg-green-500",
                        text: "Используют Cloudflare CDN, средний ответ сервера 240ms",
                      },
                      {
                        icon: "◆",
                        bg: "bg-blue-500",
                        text: "Блог обновляется 3 раза в неделю, фокус на SEO-контент",
                      },
                      {
                        icon: "▲",
                        bg: "bg-orange-500",
                        text: "Мобильная версия: CLS 0.18 — нестабильная вёрстка при загрузке",
                      },
                    ].map((f, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span
                          className={`shrink-0 w-6 h-6 rounded-full ${f.bg} text-white flex items-center justify-center text-xs font-bold`}
                        >
                          {f.icon}
                        </span>
                        <span className="font-medium pt-0.5 text-zinc-300">
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-zinc-200">
                    Стек технологий
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { name: "React", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                      { name: "Node.js", color: "text-green-400 bg-green-500/10 border-green-500/20" },
                      { name: "Go", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
                      { name: "PostgreSQL", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
                      { name: "Redis", color: "text-red-400 bg-red-500/10 border-red-500/20" },
                      { name: "Cloudflare", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
                      { name: "Kubernetes", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
                      { name: "Kafka", color: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20" },
                      { name: "Elasticsearch", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
                    ].map((t) => (
                      <span
                        key={t.name}
                        className={`px-2.5 py-0.5 rounded border text-xs font-medium ${t.color}`}
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </BlurFadeIn>

          <div className="text-center mt-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Попробуйте сами — вставьте URL конкурента ↑
            </a>
          </div>
        </div>
      </section>

      {/* Marquee — companies */}
      <section className="relative z-10 py-16 overflow-hidden">
        <BlurFadeIn delay={0.1}>
          <p className="text-center text-sm text-zinc-500 mb-6 uppercase tracking-widest">
            Уже анализируют
          </p>
          <Marquee pauseOnHover className="[--duration:30s]">
            {companies.map((name) => (
              <CompanyCard key={name} name={name} />
            ))}
          </Marquee>
          <Marquee pauseOnHover reverse className="mt-3 [--duration:30s]">
            {[...companies].reverse().map((name) => (
              <CompanyCard key={name} name={name} />
            ))}
          </Marquee>
        </BlurFadeIn>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20 px-6">
        <BlurFadeIn delay={0.1}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                Готовы узнать о конкурентах больше?
              </span>
            </h2>
            <p className="text-zinc-400 mb-8">
              Вставьте URL — получите полный отчёт через 2 минуты
            </p>
            <ShimmerButton
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              shimmerColor="rgba(255,255,255,0.15)"
              background="linear-gradient(135deg, #6366f1, #8b5cf6)"
              borderRadius="12px"
              className="h-12 px-10 text-sm font-semibold mx-auto"
            >
              Начать анализ
              <ArrowRight className="w-4 h-4 ml-2" />
            </ShimmerButton>
          </div>
        </BlurFadeIn>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-zinc-800/50">
        <p className="text-center text-sm text-zinc-500">
          CompetitorAI ·{" "}
          <a
            href="https://t.me/competitorai"
            className="hover:text-white transition-colors"
          >
            Telegram
          </a>{" "}
          ·{" "}
          <a
            href="mailto:hello@competitorai.ru"
            className="hover:text-white transition-colors"
          >
            Обратная связь
          </a>
        </p>
      </footer>
    </div>
  );
}
