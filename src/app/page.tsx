"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Marquee } from "@/components/ui/marquee";
import { Input } from "@/components/ui/input";
import {
  Search,
  BarChart3,
  Shield,
  Brain,
  Globe,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Глубокое сканирование",
    description: "Автоматический парсинг сайтов конкурентов с извлечением всех ключевых данных о бизнесе",
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/5",
  },
  {
    icon: Brain,
    title: "AI анализ GPT-4o",
    description: "Нейросеть анализирует данные и формирует структурированный бизнес-отчёт",
    gradient: "from-purple-500 to-pink-400",
    bg: "bg-purple-500/5",
  },
  {
    icon: BarChart3,
    title: "SWOT анализ",
    description: "Сильные и слабые стороны, возможности и угрозы — всё в одном отчёте",
    gradient: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-500/5",
  },
  {
    icon: Shield,
    title: "Технологии и стек",
    description: "Определение CMS, CDN, фреймворков, аналитики и инфраструктуры конкурента",
    gradient: "from-amber-500 to-orange-400",
    bg: "bg-amber-500/5",
  },
];

const companies = [
  "Wildberries",
  "Ozon",
  "Т-Банк",
  "Яндекс",
  "Авито",
  "Сбер",
  "VK",
  "Lamoda",
];

function CountUp({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString("ru-RU")}{suffix}</span>;
}

function TypingText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[currentIndex];
    const timeout = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === current) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
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
  }, [displayText, isDeleting, currentIndex, texts]);

  return (
    <span className="gradient-text">
      {displayText}
      <span className="animate-pulse ml-0.5">|</span>
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
    <div className="relative min-h-screen overflow-hidden mesh-gradient">
      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-3xl animate-[mesh-move_20s_ease-in-out_infinite]" />
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-purple-400/10 blur-3xl animate-[mesh-move-2_25s_ease-in-out_infinite]" />
        <div className="absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-pink-400/8 blur-3xl animate-[mesh-move-3_30s_ease-in-out_infinite]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
            CA
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">CompetitorAI</span>
        </div>
        <a href="/analyze" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Анализ →
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedGradientText className="mb-8 px-4 py-1.5">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Powered by GPT-4o</span>
          </AnimatedGradientText>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.1]"
        >
          <span className="gradient-text">Анализ конкурентов</span>
          <br />
          <span className="text-foreground">за{" "}</span>
          <TypingText texts={["60 секунд", "один клик", "минуту"]} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Введите URL конкурента — получите полный отчёт: продукт, маркетинг,
          технологии, SWOT-анализ и рекомендации
        </motion.p>

        {/* Hero URL Input — glass morphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-2xl"
        >
          <div className="glass-strong rounded-2xl p-2 shadow-xl shadow-indigo-500/5">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="wildberries.ru"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="pl-12 h-14 bg-white/50 border-0 text-lg rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500/30"
                />
              </div>
              <ShimmerButton
                className="h-14 px-8 rounded-xl"
                shimmerSize="0.06em"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <span className="font-semibold flex items-center gap-2">
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
                </span>
              </ShimmerButton>
            </div>
          </div>

          {/* Quick examples */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["wildberries.ru", "ozon.ru", "tbank.ru", "yandex.ru"].map((example) => (
              <button
                key={example}
                onClick={() => setUrl(example)}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground border border-transparent hover:border-border hover:bg-white/50 transition-all duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Animated counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex items-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-foreground"><CountUp end={12847} /></span> сайтов проанализировано
          </div>
          <div className="w-px h-4 bg-border" />
          <span>Бесплатно. Без регистрации.</span>
        </motion.div>
      </section>

      {/* Social proof — grayscale logos */}
      <section className="relative z-10 py-10 overflow-hidden">
        <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest mb-5">
          Анализируйте лидеров рынка
        </p>
        <Marquee pauseOnHover className="[--duration:35s]">
          {companies.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full glass mx-2 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md"
            >
              <Zap className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-semibold text-foreground">{name}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Features — 3D tilt cards */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Всё что нужно</span> для анализа
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Один URL — полная картина о конкуренте за считанные секунды
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="tilt-card"
            >
              <div className={`glass rounded-2xl p-8 h-full ${feature.bg} hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
          Как это <span className="gradient-text">работает</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { step: "01", title: "Введите URL", desc: "Вставьте ссылку на сайт конкурента в поле выше" },
            { step: "02", title: "AI анализирует", desc: "GPT-4o сканирует сайт и извлекает все данные" },
            { step: "03", title: "Получите отчёт", desc: "Готовый отчёт с SWOT и рекомендациями" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-6xl font-bold gradient-text mb-5">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Готовы узнать всё <br />о <span className="gradient-text">конкуренте</span>?
          </h2>
          <ShimmerButton
            className="h-16 px-12 rounded-xl"
            shimmerSize="0.08em"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              document.querySelector<HTMLInputElement>("input")?.focus();
            }}
          >
            <span className="text-lg font-bold flex items-center gap-2">
              Начать анализ бесплатно
              <ArrowRight className="w-5 h-5" />
            </span>
          </ShimmerButton>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <p>CompetitorAI — AI-анализ конкурентов</p>
      </footer>
    </div>
  );
}
