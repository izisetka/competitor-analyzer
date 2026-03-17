"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import {
  Search,
  BarChart3,
  Shield,
  Brain,
  Globe,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    Icon: Search,
    name: "Глубокое сканирование",
    description: "Автоматический парсинг сайтов конкурентов с извлечением ключевых данных",
    className: "col-span-1 md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
    ),
    href: "/analyze",
    cta: "Начать анализ",
  },
  {
    Icon: Brain,
    name: "AI анализ",
    description: "GPT-4o анализирует данные и формирует структурированный отчёт",
    className: "col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
    ),
    href: "/analyze",
    cta: "Попробовать",
  },
  {
    Icon: BarChart3,
    name: "SWOT анализ",
    description: "Сильные и слабые стороны, возможности и угрозы",
    className: "col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
    ),
    href: "/analyze",
    cta: "Узнать больше",
  },
  {
    Icon: Shield,
    name: "Технологии",
    description: "Определение технологического стека, CMS, CDN и аналитики",
    className: "col-span-1 md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
    ),
    href: "/analyze",
    cta: "Узнать стек",
  },
];

const companies = [
  { text: "Notion", icon: Globe },
  { text: "Slack", icon: Zap },
  { text: "Figma", icon: Target },
  { text: "Linear", icon: TrendingUp },
  { text: "Vercel", icon: Globe },
  { text: "Stripe", icon: Zap },
  { text: "GitHub", icon: Target },
  { text: "Shopify", icon: TrendingUp },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />

      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            CA
          </div>
          <span className="font-semibold text-lg">CompetitorAI</span>
        </div>
        <Link href="/analyze">
          <ShimmerButton className="h-9 px-4" shimmerSize="0.05em">
            <span className="text-sm font-medium">Начать</span>
          </ShimmerButton>
        </Link>
      </nav>

      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatedGradientText className="mb-6">
            <span className="text-sm font-medium">Powered by AI</span>
          </AnimatedGradientText>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Анализ конкурентов
          </span>
          <br />
          <span className="text-white">за 60 секунд</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Введите URL конкурента — получите полный отчёт: продукт, маркетинг,
          технологии, SWOT-анализ и рекомендации
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/analyze">
            <ShimmerButton className="h-14 px-10" shimmerSize="0.08em">
              <span className="text-lg font-semibold">Анализировать конкурента</span>
            </ShimmerButton>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-sm text-muted-foreground mt-4"
        >
          Бесплатно. Без регистрации.
        </motion.p>
      </section>

      <section className="relative z-10 py-8 overflow-hidden">
        <p className="text-center text-sm text-muted-foreground mb-4">
          Анализируйте любой сайт
        </p>
        <Marquee pauseOnHover className="[--duration:30s]">
          {companies.map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 backdrop-blur-sm mx-2"
            >
              <t.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{t.text}</span>
            </div>
          ))}
        </Marquee>
      </section>

      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            Всё что нужно для анализа
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Один URL — полная картина о конкуренте
          </p>
        </motion.div>

        <BentoGrid>
          {features.map((feature, i) => (
            <BentoCard key={i} {...feature} />
          ))}
        </BentoGrid>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Как это работает</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Введите URL", desc: "Вставьте ссылку на сайт конкурента" },
            { step: "02", title: "AI анализирует", desc: "Наш AI сканирует сайт и извлекает данные" },
            { step: "03", title: "Получите отчёт", desc: "Готовый отчёт с рекомендациями за минуту" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Готовы узнать всё о конкуренте?
        </h2>
        <Link href="/analyze">
          <ShimmerButton className="h-14 px-10" shimmerSize="0.08em">
            <span className="text-lg font-semibold">Начать анализ бесплатно</span>
          </ShimmerButton>
        </Link>
      </section>

      <footer className="relative z-10 border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>CompetitorAI — AI-анализ конкурентов</p>
      </footer>
    </div>
  );
}
