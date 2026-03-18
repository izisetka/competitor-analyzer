"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Globe,
  ArrowRight,
  Link2,
  Eye,
  FileText,
  Briefcase,
  PenTool,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFadeIn } from "@/components/ui/blur-fade-in";
import { WordFadeIn } from "@/components/ui/word-fade-in";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ShineBorder } from "@/components/ui/shine-border";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Marquee } from "@/components/ui/marquee";

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
    <span className="text-slate-400 pointer-events-none select-none">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function UrlInput({
  url,
  setUrl,
  onSubmit,
  isSubmitting,
}: {
  url: string;
  setUrl: (v: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="w-full max-w-xl">
      <div className="relative rounded-2xl p-2.5 bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
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
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              className="pl-11 h-12 bg-slate-50 border-slate-200 text-base text-slate-900 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500/30 relative z-[2] placeholder:text-slate-400"
            />
          </div>
          <ShimmerButton
            onClick={onSubmit}
            disabled={isSubmitting}
            shimmerColor="rgba(255,255,255,0.2)"
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

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-400">
        {["Сайт", "Цены", "Соцсети", "Отзывы", "SEO", "Рекомендации"].map((item) => (
          <span key={item}>
            <span className="text-indigo-500">✓</span> {item}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {placeholderDomains.map((example) => (
          <button
            key={example}
            onClick={() => setUrl(example)}
            className="px-3 py-1 rounded-full text-sm text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-200"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}

const useCases = [
  {
    emoji: "🏪",
    title: "Владелец бизнеса",
    quote: "Хочу понять, почему у конкурента больше клиентов",
    description:
      "Узнайте, что конкурент делает лучше — от цен и ассортимента до сайта и соцсетей. Получите конкретные советы, что изменить.",
    icon: Briefcase,
  },
  {
    emoji: "📊",
    title: "Маркетолог",
    quote: "Нужно быстро разобрать 5 конкурентов для стратегии",
    description:
      "Вместо недели ручной работы — готовый анализ за пару минут. SEO, контент, соцсети, позиционирование — всё в одном отчёте.",
    icon: Users,
  },
  {
    emoji: "💻",
    title: "Фрилансер",
    quote: "Клиент просит сделать лучше, чем у конкурентов",
    description:
      "Покажите клиенту профессиональный разбор конкурентов. Обоснуйте свои решения цифрами и фактами.",
    icon: PenTool,
  },
];

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
    <div className="relative min-h-screen bg-white text-slate-900">
      {/* Subtle background gradient + dot pattern */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-100/50 blur-[120px]" />
        <div className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-violet-100/40 blur-[120px]" />
        <DotPattern className="opacity-30 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/25">
            CA
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            КонкурентАнализ
          </span>
        </div>
        <a
          href="/analyze"
          className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
        >
          Анализ →
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-4xl mx-auto">
        <BlurFadeIn delay={0}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5">
            <span className="text-sm">⚡</span>
            <span className="text-sm font-medium text-indigo-700">
              Результат за 2 минуты
            </span>
          </div>
        </BlurFadeIn>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
          <WordFadeIn
            words="Разбери конкурента"
            delay={0.08}
            className="text-slate-900"
          />
          <WordFadeIn
            words="по косточкам за 2 минуты"
            delay={0.08}
            className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mt-1"
          />
        </h1>

        <BlurFadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-slate-500 max-w-xl mb-10 leading-relaxed">
            Вставьте ссылку на сайт конкурента — мы изучим его цены, сайт, соцсети
            и расскажем, что он делает лучше вас
          </p>
        </BlurFadeIn>

        {/* URL Input */}
        <BlurFadeIn delay={0.3} className="w-full flex justify-center">
          <UrlInput
            url={url}
            setUrl={setUrl}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </BlurFadeIn>
      </section>

      {/* Mini stats */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-10">
        <BlurFadeIn delay={0.4}>
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {[
              { value: 2, suffix: " мин", label: "среднее время анализа" },
              { value: 50, suffix: "+ страниц", label: "изучаем на сайте" },
              { value: 7, suffix: " разделов", label: "в каждом отчёте" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900">
                  <NumberTicker value={stat.value} delay={0.3} />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-xs md:text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </BlurFadeIn>
      </section>

      {/* Gradient divider */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />
      </div>

      {/* Report preview */}
      <section className="relative z-10 py-12 bg-slate-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <WordFadeIn
              words="Пример отчёта"
              delay={0.08}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-slate-900"
            />
            <BlurFadeIn delay={0.2}>
              <p className="text-slate-500">
                Вот что вы получите после анализа — на примере wildberries.ru
              </p>
            </BlurFadeIn>
          </div>

          <BlurFadeIn delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <BorderBeam size={120} duration={8} colorFrom="#6366f1" colorTo="#8b5cf6" />
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-slate-400 border border-slate-200 max-w-sm">
                    konkurent-analiz.ru/report/wildberries-ru
                  </div>
                </div>
              </div>

              {/* Report content */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      wildberries.ru
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Маркетплейс · E-commerce · Россия
                    </p>
                  </div>
                  <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-500 border border-slate-200">
                    анализ от 17.03.2026
                  </span>
                </div>

                <hr className="border-slate-100" />

                {/* Scores */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Технологии",
                      value: "23",
                      sub: "React, Node.js, Go",
                      color: "text-blue-600",
                      border: "border-l-[3px] border-blue-500",
                      bg: "bg-blue-50",
                    },
                    {
                      label: "Страницы",
                      value: "148",
                      sub: "проиндексировано",
                      color: "text-green-600",
                      border: "border-l-[3px] border-green-500",
                      bg: "bg-green-50",
                    },
                    {
                      label: "SEO-оценка",
                      value: "72/100",
                      sub: "есть что улучшить",
                      color: "text-purple-600",
                      border: "border-l-[3px] border-purple-500",
                      bg: "bg-purple-50",
                    },
                    {
                      label: "Скорость",
                      value: "1.8s",
                      sub: "загрузка на телефоне",
                      color: "text-amber-600",
                      border: "border-l-[3px] border-amber-500",
                      bg: "bg-amber-50",
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
                      <p className="text-xs font-medium mt-0.5 text-slate-700">
                        {m.label}
                      </p>
                      <p className="text-xs text-slate-400">{m.sub}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Findings */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-slate-700">
                    Ключевые находки
                  </h4>
                  <div className="space-y-2 text-sm">
                    {[
                      {
                        icon: "▲",
                        bg: "bg-orange-500",
                        text: "Нет публичной страницы с ценами — возможно, скрытый корпоративный тариф",
                      },
                      {
                        icon: "●",
                        bg: "bg-green-500",
                        text: "Быстрый сайт: средний ответ сервера 240ms, используют CDN",
                      },
                      {
                        icon: "◆",
                        bg: "bg-blue-500",
                        text: "Блог обновляется 3 раза в неделю — активно привлекают трафик",
                      },
                      {
                        icon: "▲",
                        bg: "bg-orange-500",
                        text: "На телефоне сайт немного «прыгает» при загрузке — можно сделать лучше",
                      },
                    ].map((f, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span
                          className={`shrink-0 w-6 h-6 rounded-full ${f.bg} text-white flex items-center justify-center text-xs font-bold`}
                        >
                          {f.icon}
                        </span>
                        <span className="font-medium pt-0.5 text-slate-600">
                          {f.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-slate-700">
                    Технологии сайта
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      {
                        name: "React",
                        color:
                          "text-blue-700 bg-blue-50 border-blue-200",
                      },
                      {
                        name: "Node.js",
                        color:
                          "text-green-700 bg-green-50 border-green-200",
                      },
                      {
                        name: "Go",
                        color:
                          "text-cyan-700 bg-cyan-50 border-cyan-200",
                      },
                      {
                        name: "PostgreSQL",
                        color:
                          "text-indigo-700 bg-indigo-50 border-indigo-200",
                      },
                      {
                        name: "Redis",
                        color:
                          "text-red-700 bg-red-50 border-red-200",
                      },
                      {
                        name: "Cloudflare",
                        color:
                          "text-orange-700 bg-orange-50 border-orange-200",
                      },
                      {
                        name: "Kubernetes",
                        color:
                          "text-blue-700 bg-blue-50 border-blue-200",
                      },
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
              className="text-sm text-slate-400 hover:text-indigo-600 transition-colors"
            >
              Попробуйте сами — вставьте ссылку конкурента ↑
            </a>
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-300/50 to-transparent" />
      </div>

      {/* How it works — 3 steps */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <BlurFadeIn delay={0.1}>
            <AnimatedGradientText
              speed={1.5}
              colorFrom="#6366f1"
              colorTo="#8b5cf6"
              className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            >
              Как это работает
            </AnimatedGradientText>
          </BlurFadeIn>
          <BlurFadeIn delay={0.2}>
            <p className="text-slate-500 max-w-lg mx-auto">
              Три простых шага — и у вас полный разбор конкурента
            </p>
          </BlurFadeIn>
        </div>

        <BlurFadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
            {/* Connecting dashed lines between steps (desktop only) */}
            <div className="hidden md:block absolute top-12 left-[calc(33.333%-12px)] w-[calc(33.333%+24px)] z-0">
              <div className="border-t-2 border-dashed border-slate-200 w-full" />
            </div>
            <div className="hidden md:block absolute top-12 left-[calc(66.666%-12px)] w-[calc(33.333%+24px)] z-0">
              <div className="border-t-2 border-dashed border-slate-200 w-full" />
            </div>
            {[
              {
                step: "1",
                icon: Link2,
                title: "Вставьте ссылку",
                desc: "Скопируйте адрес сайта конкурента и вставьте в поле выше. Это всё, что нужно от вас.",
                color: "bg-indigo-50 text-indigo-600",
              },
              {
                step: "2",
                icon: Eye,
                title: "Мы всё изучим",
                desc: "Мы посмотрим их сайт, цены, отзывы, соцсети и технологии. Обычно это занимает пару минут.",
                color: "bg-violet-50 text-violet-600",
              },
              {
                step: "3",
                icon: FileText,
                title: "Получите отчёт",
                desc: "Понятный отчёт с цифрами и советами — что конкурент делает хорошо и где его слабые места.",
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative z-10 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="absolute top-6 right-6 text-4xl font-bold text-slate-100">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </BlurFadeIn>
      </section>

      {/* What we analyze — Marquee */}
      <section className="relative z-10 py-12 overflow-hidden">
        <div className="text-center mb-6">
          <BlurFadeIn delay={0.1}>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
              Что мы анализируем
            </p>
          </BlurFadeIn>
        </div>
        <Marquee pauseOnHover className="[--duration:30s] [--gap:1rem]">
          {[
            "Цены и тарифы",
            "SEO-оценка",
            "Соцсети",
            "Отзывы клиентов",
            "Стек технологий",
            "Скорость сайта",
            "Контент-стратегия",
            "SWOT-анализ",
            "Рекомендации",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:border-indigo-200 hover:text-indigo-600 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {item}
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:35s] [--gap:1rem] mt-3">
          {[
            "Позиционирование",
            "Структура сайта",
            "UX/UI разбор",
            "Мобильная версия",
            "Трафик и каналы",
            "Email-маркетинг",
            "Уникальные фичи",
            "Целевая аудитория",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:border-violet-200 hover:text-violet-600 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              {item}
            </div>
          ))}
        </Marquee>
      </section>

      {/* Gradient divider */}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-violet-300/50 to-transparent" />
      </div>

      {/* For whom */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <WordFadeIn
            words="Для кого это"
            delay={0.08}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-slate-900"
          />
          <BlurFadeIn delay={0.2}>
            <p className="text-slate-500 max-w-lg mx-auto">
              Неважно, кто вы — если у вас есть конкуренты, этот инструмент для вас
            </p>
          </BlurFadeIn>
        </div>

        <BlurFadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-full"
              >
                <MagicCard
                  className="rounded-2xl p-6 border border-slate-100 shadow-sm cursor-default h-full flex flex-col"
                  gradientColor="#E2E8F0"
                  gradientOpacity={0.5}
                  gradientFrom="#6366f1"
                  gradientTo="#8b5cf6"
                >
                  <div className="text-3xl mb-3">{uc.emoji}</div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900">
                    {uc.title}
                  </h3>
                  <p className="text-sm text-indigo-600 font-medium mb-3 italic">
                    «{uc.quote}»
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">
                    {uc.description}
                  </p>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </BlurFadeIn>
      </section>

      {/* Pricing */}
      <section className="relative z-10 py-16 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="max-w-2xl mx-auto text-center px-6">
          <BlurFadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Готовы узнать больше о конкурентах?
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              Вставьте ссылку на сайт конкурента — отчёт будет готов через пару минут
            </p>
            <ShineBorder
              shineColor={["#ffffff", "#c7d2fe", "#ffffff"]}
              borderWidth={2}
              duration={8}
              className="inline-flex rounded-xl"
            >
              <button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-white text-indigo-600 font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
              >
                Попробовать
                <ArrowRight className="w-4 h-4" />
              </button>
            </ShineBorder>
          </BlurFadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-20 px-6">
        <BlurFadeIn delay={0.1}>
          <div className="max-w-2xl mx-auto text-center">
            <WordFadeIn
              words="Вставьте ссылку и убедитесь сами"
              delay={0.06}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900"
            />
            <p className="text-slate-500 mb-8">
              Полный отчёт о конкуренте — через пару минут
            </p>
            <div className="flex justify-center">
              <UrlInput
                url={url}
                setUrl={setUrl}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </BlurFadeIn>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-slate-100">
        <p className="text-center text-sm text-slate-400">
          КонкурентАнализ ·{" "}
          <a
            href="https://t.me/competitorai"
            className="hover:text-indigo-600 transition-colors"
          >
            Telegram
          </a>{" "}
          ·{" "}
          <a
            href="mailto:hello@competitorai.ru"
            className="hover:text-indigo-600 transition-colors"
          >
            Обратная связь
          </a>
        </p>
      </footer>
    </div>
  );
}
