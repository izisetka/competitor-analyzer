"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Building2,
  Globe,
  Users,
  MapPin,
  Calendar,
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
} from "lucide-react";
import { CompetitorReport } from "@/lib/types";

const tabs = [
  { id: "overview", label: "Обзор", icon: Building2 },
  { id: "product", label: "Продукт", icon: Package },
  { id: "marketing", label: "Маркетинг", icon: Megaphone },
  { id: "tech", label: "Технологии", icon: Cpu },
  { id: "swot", label: "SWOT", icon: Target },
  { id: "recommendations", label: "Рекомендации", icon: Lightbulb },
];

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [report, setReport] = useState<CompetitorReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch(`/api/report/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setReport(null);
        else setReport(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 max-w-6xl mx-auto">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-3">Отчёт не найден</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Начать новый анализ →
          </Link>
        </div>
      </div>
    );
  }

  const { company, product, marketing, tech, swot, recommendations } = report;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <Link href="/" className="font-semibold text-lg text-gray-900">CompetitorAI</Link>
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Новый анализ
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Company header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-semibold text-gray-900">{company.name}</h1>
            <Badge className="bg-gray-100 text-gray-700 border-0 text-xs font-medium">
              {company.industry}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">{report.url}</p>
        </div>

        {/* Underline tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-6 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div>
          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">О компании</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{company.description}</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <InfoItem icon={Calendar} label="Основана" value={company.founded} />
                  <InfoItem icon={Users} label="Сотрудники" value={company.employees} />
                  <InfoItem icon={MapPin} label="Расположение" value={company.location} />
                  <InfoItem icon={Globe} label="Индустрия" value={company.industry} />
                </div>
              </div>
            </div>
          )}

          {/* PRODUCT */}
          {activeTab === "product" && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Уникальное предложение (USP)</h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{product.usp}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">Целевая аудитория:</span>
                  <span className="font-medium text-gray-900">{product.targetAudience}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  Тарифные планы
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.pricing.map((tier, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
                      <h4 className="font-semibold text-gray-900 mb-1">{tier.name}</h4>
                      <p className="text-xl font-semibold text-blue-600 mb-4">{tier.price}</p>
                      <ul className="space-y-2">
                        {tier.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-gray-500">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Ключевые функции</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((f, i) => (
                    <Badge key={i} className="bg-gray-100 text-gray-700 border-0 font-medium text-xs">
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MARKETING */}
          {activeTab === "marketing" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">SEO Оценка</h3>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-semibold text-gray-900">{marketing.seoScore}</span>
                    <span className="text-sm text-gray-400 mb-1">/ 100</span>
                  </div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${marketing.seoScore}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Оценка трафика</h3>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-2xl font-semibold text-gray-900">{marketing.trafficEstimate}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Социальные сети</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(marketing.socialMedia).map(([platform, value]) => (
                    <div key={platform} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 capitalize mb-1">{platform}</p>
                      <p className="text-sm font-semibold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Контент-стратегия</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{marketing.contentStrategy}</p>
              </div>
            </div>
          )}

          {/* TECH */}
          {activeTab === "tech" && (
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Технологический стек</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.stack.map((t, i) => (
                    <span key={i} className="px-3 py-1.5 text-sm font-medium bg-gray-100 text-gray-700 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Аналитика</h3>
                  <div className="flex flex-wrap gap-2">
                    {tech.analytics.map((a, i) => (
                      <Badge key={i} className="bg-gray-100 text-gray-700 border-0 text-xs font-medium">{a}</Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Инфраструктура</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">CMS</span>
                    <span className="text-sm font-medium text-gray-900">{tech.cms}</span>
                  </div>
                  <div className="border-t border-gray-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">CDN</span>
                    <span className="text-sm font-medium text-gray-900">{tech.cdn}</span>
                  </div>
                  <div className="border-t border-gray-100" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Хостинг</span>
                    <span className="text-sm font-medium text-gray-900">{tech.hosting}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SWOT */}
          {activeTab === "swot" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SwotCard title="Сильные стороны" items={swot.strengths} icon={CheckCircle2} borderColor="border-l-green-500" />
              <SwotCard title="Слабые стороны" items={swot.weaknesses} icon={AlertTriangle} borderColor="border-l-red-500" />
              <SwotCard title="Возможности" items={swot.opportunities} icon={ArrowUpRight} borderColor="border-l-blue-500" />
              <SwotCard title="Угрозы" items={swot.threats} icon={ShieldAlert} borderColor="border-l-amber-500" />
            </div>
          )}

          {/* RECOMMENDATIONS */}
          {activeTab === "recommendations" && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">AI-рекомендации</h2>
              <div className="space-y-4">
                {recommendations.map((rec, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed flex-1 pt-1">{rec}</p>
                    <PriorityDot index={i} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PriorityDot({ index }: { index: number }) {
  if (index < 2)
    return <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 mt-2" title="Высокий приоритет" />;
  if (index < 4)
    return <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 mt-2" title="Средний приоритет" />;
  return <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 mt-2" title="Низкий приоритет" />;
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
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-gray-400 shrink-0" />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function SwotCard({
  title,
  items,
  icon: Icon,
  borderColor,
}: {
  title: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
  borderColor: string;
}) {
  return (
    <div className={`bg-white border border-gray-200 ${borderColor} border-l-4 rounded-lg p-5`}>
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
