"use client";

import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Building2,
  Globe,
  Users,
  MapPin,
  Calendar,
  ArrowLeft,
  Package,
  Megaphone,
  Cpu,
  Target,
  Lightbulb,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
  Star,
  ChevronRight,
} from "lucide-react";
import { CompetitorReport } from "@/lib/types";

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const tabs = [
  { id: "overview", label: "Обзор", icon: Building2 },
  { id: "product", label: "Продукт", icon: Package },
  { id: "marketing", label: "Маркетинг", icon: Megaphone },
  { id: "tech", label: "Технологии", icon: Cpu },
  { id: "swot", label: "SWOT", icon: Target },
  { id: "recommendations", label: "Рекомендации", icon: Lightbulb },
];

function CircularGauge({ score, size = 120 }: { score: number; size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true });
  const [animatedScore, setAnimatedScore] = useState(0);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = score / (1500 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, score]);

  const color = score >= 80 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444";

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 100 100" className="gauge-circle">
      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="8" />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={isInView ? strokeDashoffset : circumference}
        style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
      />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-foreground"
        style={{ fontSize: "22px", fontWeight: 700, transform: "rotate(90deg)", transformOrigin: "center" }}
      >
        {animatedScore}
      </text>
    </svg>
  );
}

function CountUpNumber({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (1200 / 16);
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
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [report, setReport] = useState<CompetitorReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch(`/api/report/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setReport(null);
        } else {
          setReport(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen p-6 max-w-7xl mx-auto">
        <Skeleton className="h-8 w-64 mb-8 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
        <Skeleton className="h-12 w-full mb-4 rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center mesh-gradient">
        <div className="text-center glass-strong rounded-2xl p-12">
          <h1 className="text-2xl font-bold mb-4">Отчёт не найден</h1>
          <Link href="/analyze" className="gradient-text font-semibold hover:opacity-80 transition-opacity">
            Начать новый анализ →
          </Link>
        </div>
      </div>
    );
  }

  const { company, product, marketing, tech, swot, recommendations } = report;

  return (
    <div className="min-h-screen mesh-gradient">
      {/* Mesh blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-400/5 blur-3xl animate-[mesh-move_20s_ease-in-out_infinite]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-purple-400/5 blur-3xl animate-[mesh-move-2_25s_ease-in-out_infinite]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 glass-strong border-b border-border/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link
            href="/analyze"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Новый анализ</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
              CA
            </div>
            <span className="font-bold text-lg tracking-tight">CompetitorAI</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header with company name + score gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{company.name}</h1>
              <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 px-3 py-1 text-xs font-semibold shadow-lg shadow-indigo-500/20">
                {company.industry}
              </Badge>
            </div>
            <p className="text-muted-foreground">{report.url}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <CircularGauge score={marketing.seoScore} size={100} />
              <p className="text-xs text-muted-foreground mt-1 font-medium">SEO Score</p>
            </div>
          </div>
        </motion.div>

        {/* Pill tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="glass-strong rounded-2xl p-1.5 inline-flex gap-1 min-w-max">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              <motion.div variants={fadeUp} className="glass-strong rounded-2xl p-8 shadow-xl shadow-indigo-500/5">
                <h2 className="text-xl font-bold mb-4 gradient-text">О компании</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {company.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <InfoItem icon={Calendar} label="Основана" value={company.founded} />
                  <InfoItem icon={Users} label="Сотрудники" value={company.employees} />
                  <InfoItem icon={MapPin} label="Расположение" value={company.location} />
                  <InfoItem icon={Globe} label="Индустрия" value={company.industry} />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* PRODUCT */}
          {activeTab === "product" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              <motion.div variants={fadeUp} className="glass-strong rounded-2xl p-8 shadow-xl shadow-indigo-500/5">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h2 className="text-xl font-bold">Уникальное предложение (USP)</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{product.usp}</p>
                <Separator className="my-4 bg-border/50" />
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Целевая аудитория:</span>
                  <span className="text-sm font-medium">{product.targetAudience}</span>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 gradient-text" />
                  Тарифные планы
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.pricing.map((tier, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="glass-strong rounded-2xl p-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 tilt-card"
                    >
                      <h4 className="font-bold text-lg mb-1">{tier.name}</h4>
                      <p className="text-2xl font-bold gradient-text mb-4">{tier.price}</p>
                      <ul className="space-y-2.5">
                        {tier.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="glass-strong rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-4">Ключевые функции</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((f, i) => (
                    <Badge
                      key={i}
                      className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 border-indigo-200/50 px-3 py-1.5 font-medium"
                    >
                      {f}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* MARKETING */}
          {activeTab === "marketing" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="glass-strong rounded-2xl p-8">
                  <h3 className="text-base font-bold mb-4 text-muted-foreground">SEO Оценка</h3>
                  <div className="flex items-center gap-6">
                    <CircularGauge score={marketing.seoScore} size={90} />
                    <div>
                      <span className="text-4xl font-bold">{marketing.seoScore}</span>
                      <span className="text-muted-foreground ml-1">/ 100</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="glass-strong rounded-2xl p-8">
                  <h3 className="text-base font-bold mb-4 text-muted-foreground">Оценка трафика</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">{marketing.trafficEstimate}</span>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="glass-strong rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-4">Социальные сети</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(marketing.socialMedia).map(([platform, value]) => (
                    <div key={platform} className="text-center p-4 rounded-xl bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-100/50">
                      <p className="text-sm text-muted-foreground capitalize mb-1 font-medium">{platform}</p>
                      <p className="font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="glass-strong rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-3">Контент-стратегия</h3>
                <p className="text-muted-foreground leading-relaxed">{marketing.contentStrategy}</p>
              </motion.div>
            </motion.div>
          )}

          {/* TECH */}
          {activeTab === "tech" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              <motion.div variants={fadeUp} className="glass-strong rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-4">Технологический стек</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.stack.map((t, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200/50 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="glass-strong rounded-2xl p-8">
                  <h3 className="text-base font-bold mb-4">Аналитика</h3>
                  <div className="flex flex-wrap gap-2">
                    {tech.analytics.map((a, i) => (
                      <Badge key={i} className="bg-purple-50 text-purple-700 border-purple-200/50 font-medium">{a}</Badge>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="glass-strong rounded-2xl p-8 space-y-4">
                  <h3 className="text-base font-bold mb-2">Инфраструктура</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">CMS</span>
                    <span className="font-semibold text-sm">{tech.cms}</span>
                  </div>
                  <Separator className="bg-border/30" />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">CDN</span>
                    <span className="font-semibold text-sm">{tech.cdn}</span>
                  </div>
                  <Separator className="bg-border/30" />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground text-sm">Хостинг</span>
                    <span className="font-semibold text-sm">{tech.hosting}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* SWOT */}
          {activeTab === "swot" && (
            <motion.div variants={stagger} initial="initial" animate="animate">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SwotCard
                  title="Сильные стороны"
                  items={swot.strengths}
                  icon={CheckCircle2}
                  color="emerald"
                  gradient="from-emerald-500 to-teal-400"
                />
                <SwotCard
                  title="Слабые стороны"
                  items={swot.weaknesses}
                  icon={AlertTriangle}
                  color="red"
                  gradient="from-red-500 to-rose-400"
                />
                <SwotCard
                  title="Возможности"
                  items={swot.opportunities}
                  icon={ArrowUpRight}
                  color="blue"
                  gradient="from-blue-500 to-cyan-400"
                />
                <SwotCard
                  title="Угрозы"
                  items={swot.threats}
                  icon={ShieldAlert}
                  color="amber"
                  gradient="from-amber-500 to-orange-400"
                />
              </div>
            </motion.div>
          )}

          {/* RECOMMENDATIONS */}
          {activeTab === "recommendations" && (
            <motion.div variants={stagger} initial="initial" animate="animate">
              <div className="glass-strong rounded-2xl p-8 shadow-xl shadow-indigo-500/5">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">AI-рекомендации для конкуренции</h2>
                </div>
                <div className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="flex gap-4 p-5 rounded-xl bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border border-indigo-100/50 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-sm shrink-0 shadow-lg shadow-indigo-500/20">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed">{rec}</p>
                      </div>
                      <PriorityBadge index={i} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function PriorityBadge({ index }: { index: number }) {
  if (index < 2)
    return (
      <span className="shrink-0 self-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200/50">
        Высокий
      </span>
    );
  if (index < 4)
    return (
      <span className="shrink-0 self-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200/50">
        Средний
      </span>
    );
  return (
    <span className="shrink-0 self-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200/50">
      Низкий
    </span>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-indigo-50/50 to-purple-50/50 border border-indigo-100/30">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-indigo-600 shrink-0" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

function SwotCard({
  title,
  items,
  icon: Icon,
  color,
  gradient,
}: {
  title: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
}) {
  const bgMap: Record<string, string> = {
    emerald: "from-emerald-50/80 to-teal-50/80 border-emerald-200/50",
    red: "from-red-50/80 to-rose-50/80 border-red-200/50",
    blue: "from-blue-50/80 to-cyan-50/80 border-blue-200/50",
    amber: "from-amber-50/80 to-orange-50/80 border-amber-200/50",
  };
  const dotMap: Record<string, string> = {
    emerald: "bg-emerald-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
  };
  const textMap: Record<string, string> = {
    emerald: "text-emerald-600",
    red: "text-red-600",
    blue: "text-blue-600",
    amber: "text-amber-600",
  };

  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-2xl p-6 bg-gradient-to-br ${bgMap[color]} border backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <span className={`mt-1.5 w-2 h-2 rounded-full ${dotMap[color]} shrink-0`} />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
