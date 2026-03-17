"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { Input } from "@/components/ui/input";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import {
  Search,
  BarChart3,
  Shield,
  Brain,
  Globe,
  ArrowRight,
  Sparkles,
  Eye,
  Package,
  Megaphone,
  Code,
  Target,
  Lightbulb,
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
    title: "AI аналитика",
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

const reportCards = [
  { icon: Eye, title: "Обзор", metric: "24", label: "параметра", borderColor: "border-l-indigo-500" },
  { icon: Package, title: "Продукт", metric: "18", label: "метрик", borderColor: "border-l-purple-500" },
  { icon: Megaphone, title: "Маркетинг", metric: "31", label: "канал", borderColor: "border-l-pink-500" },
  { icon: Code, title: "Технологии", metric: "15", label: "стек", borderColor: "border-l-cyan-500" },
  { icon: Target, title: "SWOT", metric: "4x4", label: "матрица", borderColor: "border-l-amber-500" },
  { icon: Lightbulb, title: "Рекомендации", metric: "12", label: "действий", borderColor: "border-l-emerald-500" },
];

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
    <span className="text-blue-600">
      {displayText}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Refs for animated beam in "how it works"
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

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

  function scrollToInput() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelector<HTMLInputElement>("input")?.focus();
  }

  return (
    <div className="relative min-h-screen overflow-hidden mesh-gradient">
      {/* Subtle background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-400/[0.03] blur-3xl animate-[mesh-move_20s_ease-in-out_infinite]" />
        <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-purple-400/[0.03] blur-3xl animate-[mesh-move-2_25s_ease-in-out_infinite]" />
        <div className="absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full bg-pink-400/[0.02] blur-3xl animate-[mesh-move-3_30s_ease-in-out_infinite]" />
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
        {/* Dot grid background — hero only */}
        <DotPattern
          width={24}
          height={24}
          cr={0.8}
          className="absolute inset-0 opacity-[0.035] z-0"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-gray-200 bg-white">
            <Sparkles className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-500">На базе ИИ</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]"
        >
          Анализ конкурентов
          <br />
          <span className="text-foreground">за{" "}</span>
          <TypingText texts={["60 секунд", "один клик", "минуту"]} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Введите URL конкурента — получите полный отчёт: продукт, маркетинг,
          технологии, SWOT-анализ и рекомендации
        </motion.p>

        {/* Hero URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 w-full max-w-2xl"
        >
          <div className="relative bg-white rounded-2xl p-3 shadow-lg shadow-slate-200/50 border border-slate-100">
            <BorderBeam
              size={120}
              duration={8}
              colorFrom="#3b82f6"
              colorTo="#6366f1"
              borderWidth={1.5}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                {/* Animated placeholder overlay */}
                {!url && (
                  <div className="absolute left-14 top-1/2 -translate-y-1/2 text-xl z-[1]">
                    <AnimatedPlaceholder />
                  </div>
                )}
                <Input
                  type="text"
                  placeholder=""
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="pl-14 h-16 bg-slate-50/50 border-0 text-xl rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-500/30 relative z-[2] bg-transparent"
                />
              </div>
              <button
                className="h-16 px-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
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

          {/* Quick examples */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {placeholderDomains.map((example) => (
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
      </section>

      {/* Social proof — grayscale logos */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        transition={{ duration: 0.6 }}
        className="relative z-10 py-8 overflow-hidden border-b border-[#E5E5E5]"
      >
        <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
          Анализируйте лидеров рынка
        </p>
        <Marquee pauseOnHover className="[--duration:35s]">
          {companies.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 mx-2"
            >
              <span className="text-sm text-gray-300 font-medium">{name}</span>
            </div>
          ))}
        </Marquee>
      </motion.section>

      {/* How it works */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 border-b border-[#E5E5E5]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Как это работает
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Три простых шага до полного отчёта о конкуренте
          </p>
        </motion.div>

        <div ref={stepsContainerRef} className="grid md:grid-cols-3 gap-10 relative">
          {/* Animated beams connecting steps — desktop only, absolute positioned */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            <AnimatedBeam
              containerRef={stepsContainerRef}
              fromRef={step1Ref}
              toRef={step2Ref}
              pathColor="#e2e8f0"
              pathWidth={2}
              pathOpacity={0.4}
              gradientStartColor="#3b82f6"
              gradientStopColor="#6366f1"
              duration={4}
            />
            <AnimatedBeam
              containerRef={stepsContainerRef}
              fromRef={step2Ref}
              toRef={step3Ref}
              pathColor="#e2e8f0"
              pathWidth={2}
              pathOpacity={0.4}
              gradientStartColor="#6366f1"
              gradientStopColor="#8b5cf6"
              duration={4}
              delay={1}
            />
          </div>

          {[
            { step: "01", title: "Введите URL", desc: "Просто вставьте ссылку на сайт конкурента", ref: step1Ref },
            { step: "02", title: "AI сканирует", desc: "Автоматический парсинг страниц и AI-анализ данных", ref: step2Ref },
            { step: "03", title: "Получите отчёт", desc: "Продукт, маркетинг, технологии, SWOT за 60 секунд", ref: step3Ref },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerItem}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div
                ref={item.ref}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 relative z-10"
              >
                <span className="font-mono text-sm font-medium text-foreground">{item.step}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Report preview */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 border-b border-[#E5E5E5]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Что внутри отчёта
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Полная картина о конкуренте в одном дашборде
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          {/* Floating animation wrapper */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            className="max-w-3xl w-full"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-slate-200/40 border border-slate-100">
              {/* Mock browser bar */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-300" />
                  <div className="w-3 h-3 rounded-full bg-amber-300" />
                  <div className="w-3 h-3 rounded-full bg-green-300" />
                </div>
                <div className="flex-1 ml-3 h-7 bg-slate-50 rounded-lg flex items-center px-3">
                  <span className="text-xs text-muted-foreground">competitorai.ru/report/wildberries</span>
                </div>
              </div>

              {/* Report cards grid */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
              >
                {reportCards.map((card, i) => (
                  <motion.div
                    key={i}
                    variants={staggerItem}
                    transition={{ duration: 0.4 }}
                    className={`bg-white rounded-xl p-4 border border-slate-100 border-l-[3px] ${card.borderColor} hover:shadow-md transition-shadow`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mb-3">
                      <card.icon className="w-4 h-4 text-slate-600" />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">{card.title}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-foreground">{card.metric}</span>
                      <span className="text-xs text-muted-foreground">{card.label}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 w-full py-16 border-b border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={sectionVariants}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center"
            >
              <div>
                <div className="text-4xl font-bold font-mono text-foreground mb-1">
                  <NumberTicker value={12847} className="text-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">сайтов проанализировано</p>
              </div>
              <div className="md:border-x md:border-[#E5E5E5]">
                <div className="text-4xl font-bold font-mono text-foreground mb-1">
                  <NumberTicker value={127} className="text-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">метрик в каждом отчёте</p>
              </div>
              <div>
                <div className="text-4xl font-bold font-mono text-foreground mb-1">
                  {"< "}<NumberTicker value={60} className="text-foreground" /> сек
                </div>
                <p className="text-sm text-muted-foreground">среднее время анализа</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 border-b border-[#E5E5E5]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Всё что нужно для анализа
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Один URL — полная картина о конкуренте за считанные секунды
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              transition={{ duration: 0.5 }}
              className="tilt-card"
            >
              <div className="bg-white rounded-2xl p-8 h-full border border-slate-100 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Готовы узнать всё <br />о конкурентах?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
            Бесплатно. Без регистрации. Результат за минуту.
          </p>
          <div className="flex justify-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-12 px-8 font-semibold flex items-center gap-2 transition-colors"
              onClick={scrollToInput}
            >
              Начать бесплатно
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <p>CompetitorAI — AI-анализ конкурентов</p>
      </footer>
    </div>
  );
}
