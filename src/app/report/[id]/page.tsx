"use client";

import { useEffect, useState, useRef, use } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { WordFadeIn } from "@/components/ui/word-fade-in";
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
  Layers,
  Server,
  Activity,
} from "lucide-react";
import { CompetitorReport } from "@/lib/types";

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
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

  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 100 100" className="gauge-circle">
      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="8" />
      <circle
        cx="50" cy="50" r="45" fill="none"
        stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={isInView ? strokeDashoffset : circumference}
        style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
      />
      <text
        x="50" y="50" textAnchor="middle" dominantBaseline="central"
        className="fill-slate-900"
        style={{ fontSize: "22px", fontWeight: 700, transform: "rotate(90deg)", transformOrigin: "center" }}
      >
        {animatedScore}
      </text>
    </svg>
  );
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
      <div className="min-h-screen bg-slate-50 p-6 max-w-7xl mx-auto">
        <Skeleton className="h-8 w-64 mb-8 rounded-xl bg-slate-200" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl bg-slate-200" />
          ))}
        </div>
        <Skeleton className="h-12 w-full mb-4 rounded-2xl bg-slate-200" />
        <Skeleton className="h-64 w-full rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-slate-900">
        <div className="text-center rounded-2xl p-12 border border-slate-200 bg-white shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Отчёт не найден</h1>
          <Link href="/analyze" className="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors">
            Начать новый анализ →
          </Link>
        </div>
      </div>
    );
  }

  const { company, product, marketing, tech, swot, recommendations } = report;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Subtle background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/4 h-[600px] w-[600px] rounded-full bg-indigo-50/50 blur-[120px]" />
        <div className="absolute top-1/3 -right-1/4 h-[500px] w-[500px] rounded-full bg-violet-50/40 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 border-b border-slate-200 backdrop-blur-sm bg-white/80">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <Link
            href="/analyze"
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Новый анализ</span>
          </Link>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/25">
              CA
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">КонкурентАнализ</span>
          </Link>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <WordFadeIn
                words={company.name}
                delay={0.08}
                className="text-3xl md:text-4xl font-bold tracking-tight justify-start text-slate-900"
              />
              <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-3 py-1 text-xs font-semibold">
                {company.industry}
              </Badge>
            </div>
            <p className="text-slate-500">{report.url}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <CircularGauge score={marketing.seoScore} size={100} />
              <p className="text-xs text-slate-500 mt-1 font-medium">SEO-оценка</p>
            </div>
          </div>
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          <MetricCard icon={TrendingUp} label="Трафик" value={marketing.trafficEstimate} color="emerald" delay={0} />
          <MetricCard icon={Layers} label="Технологий" value={`${tech.stack.length}`} color="blue" delay={0.05} />
          <MetricCard icon={Users} label="Сотрудники" value={company.employees} color="violet" delay={0.1} />
          <MetricCard icon={Calendar} label="Основана" value={company.founded} color="amber" delay={0.15} />
        </motion.div>

        {/* Pill tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="rounded-2xl p-1.5 inline-flex gap-1 min-w-max bg-white border border-slate-200 shadow-sm">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
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
              <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">О компании</h2>
                <p className="text-slate-500 mb-6 leading-relaxed">{company.description}</p>
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
              <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h2 className="text-xl font-bold text-slate-900">Уникальное предложение (USP)</h2>
                </div>
                <p className="text-slate-500 leading-relaxed">{product.usp}</p>
                <Separator className="my-4 bg-slate-100" />
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-400">Целевая аудитория:</span>
                  <span className="text-sm font-medium text-slate-700">{product.targetAudience}</span>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <DollarSign className="w-5 h-5 text-indigo-500" />
                  Тарифные планы
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.pricing.map((tier, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="rounded-2xl p-6 bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                    >
                      <h4 className="font-bold text-lg mb-1 text-slate-900">{tier.name}</h4>
                      <p className="text-2xl font-bold text-indigo-600 mb-4">{tier.price}</p>
                      <ul className="space-y-2.5">
                        {tier.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-slate-900">Ключевые функции</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((f, i) => (
                    <Badge
                      key={i}
                      className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1.5 font-medium"
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
                <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4 text-slate-400 uppercase tracking-wider">SEO-оценка</h3>
                  <div className="flex items-center gap-6">
                    <CircularGauge score={marketing.seoScore} size={90} />
                    <div>
                      <span className="text-4xl font-bold text-slate-900">{marketing.seoScore}</span>
                      <span className="text-slate-400 ml-1">/ 100</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-semibold mb-4 text-slate-400 uppercase tracking-wider">Оценка трафика</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">{marketing.trafficEstimate}</span>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-slate-900">Социальные сети</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(marketing.socialMedia).map(([platform, value]) => (
                    <div key={platform} className="text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-xs text-slate-400 capitalize mb-1 font-medium">{platform}</p>
                      <p className="font-bold text-slate-900">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-slate-900">Контент-стратегия</h3>
                <p className="text-slate-500 leading-relaxed">{marketing.contentStrategy}</p>
              </motion.div>
            </motion.div>
          )}

          {/* TECH */}
          {activeTab === "tech" && (
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
              <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-slate-900">Технологии сайта</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.stack.map((t, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-4 h-4 text-violet-500" />
                    <h3 className="text-base font-bold text-slate-900">Аналитика</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tech.analytics.map((a, i) => (
                      <Badge key={i} className="bg-violet-50 text-violet-700 border-violet-200 font-medium">{a}</Badge>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-4 h-4 text-cyan-500" />
                    <h3 className="text-base font-bold text-slate-900">Инфраструктура</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">CMS</span>
                    <span className="font-semibold text-sm text-slate-700">{tech.cms}</span>
                  </div>
                  <Separator className="bg-slate-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">CDN</span>
                    <span className="font-semibold text-sm text-slate-700">{tech.cdn}</span>
                  </div>
                  <Separator className="bg-slate-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">Хостинг</span>
                    <span className="font-semibold text-sm text-slate-700">{tech.hosting}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* SWOT */}
          {activeTab === "swot" && (
            <motion.div variants={stagger} initial="initial" animate="animate">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SwotCard title="Сильные стороны" items={swot.strengths} icon={CheckCircle2} color="emerald" gradient="from-emerald-500 to-teal-400" />
                <SwotCard title="Слабые стороны" items={swot.weaknesses} icon={AlertTriangle} color="red" gradient="from-red-500 to-rose-400" />
                <SwotCard title="Возможности" items={swot.opportunities} icon={ArrowUpRight} color="blue" gradient="from-blue-500 to-cyan-400" />
                <SwotCard title="Угрозы" items={swot.threats} icon={ShieldAlert} color="amber" gradient="from-amber-500 to-orange-400" />
              </div>
            </motion.div>
          )}

          {/* RECOMMENDATIONS */}
          {activeTab === "recommendations" && (
            <motion.div variants={stagger} initial="initial" animate="animate">
              <div className="rounded-2xl p-8 bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Рекомендации</h2>
                </div>
                <div className="space-y-3">
                  {recommendations.map((rec, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      whileHover={{ x: 4, transition: { duration: 0.2 } }}
                      className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold text-sm shrink-0 shadow-lg shadow-indigo-500/20">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed text-slate-600">{rec}</p>
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

function MetricCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: "emerald" | "blue" | "violet" | "amber";
  delay: number;
}) {
  const colorMap = {
    emerald: { bg: "bg-emerald-50", border: "border-l-[3px] border-emerald-500", text: "text-emerald-600", icon: "text-emerald-500" },
    blue: { bg: "bg-blue-50", border: "border-l-[3px] border-blue-500", text: "text-blue-600", icon: "text-blue-500" },
    violet: { bg: "bg-violet-50", border: "border-l-[3px] border-violet-500", text: "text-violet-600", icon: "text-violet-500" },
    amber: { bg: "bg-amber-50", border: "border-l-[3px] border-amber-500", text: "text-amber-600", icon: "text-amber-500" },
  };

  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`${c.bg} ${c.border} rounded-xl p-4`}
    >
      <Icon className={`w-4 h-4 ${c.icon} mb-2`} />
      <p className={`text-xl font-bold tracking-tight ${c.text}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </motion.div>
  );
}

function PriorityBadge({ index }: { index: number }) {
  if (index < 2)
    return (
      <span className="shrink-0 self-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-200">
        Высокий
      </span>
    );
  if (index < 4)
    return (
      <span className="shrink-0 self-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200">
        Средний
      </span>
    );
  return (
    <span className="shrink-0 self-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
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
    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
        <Icon className="w-5 h-5 text-indigo-500 shrink-0" />
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-slate-700">{value}</p>
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
    emerald: "bg-emerald-50/50 border-emerald-200",
    red: "bg-red-50/50 border-red-200",
    blue: "bg-blue-50/50 border-blue-200",
    amber: "bg-amber-50/50 border-amber-200",
  };
  const dotMap: Record<string, string> = {
    emerald: "bg-emerald-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={`rounded-2xl p-6 ${bgMap[color]} border transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-lg text-slate-900">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
            <span className={`mt-1.5 w-2 h-2 rounded-full ${dotMap[color]} shrink-0`} />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
