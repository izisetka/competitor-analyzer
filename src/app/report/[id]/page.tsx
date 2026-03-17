"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ShineBorder } from "@/components/ui/shine-border";
import { MagicCard } from "@/components/ui/magic-card";
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
} from "lucide-react";
import { CompetitorReport } from "@/lib/types";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [report, setReport] = useState<CompetitorReport | null>(null);
  const [loading, setLoading] = useState(true);

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
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Отчёт не найден</h1>
          <Link href="/analyze" className="text-primary hover:underline">
            Начать новый анализ
          </Link>
        </div>
      </div>
    );
  }

  const { company, product, marketing, tech, swot, recommendations } = report;

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto border-b border-border">
        <Link
          href="/analyze"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Новый анализ</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            CA
          </div>
          <span className="font-semibold">CompetitorAI</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div {...fadeIn} className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
              {company.industry}
            </Badge>
          </div>
          <p className="text-muted-foreground">{report.url}</p>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-card border border-border p-1 h-auto flex-wrap">
            <TabsTrigger value="overview" className="gap-1.5">
              <Building2 className="w-4 h-4" /> Обзор
            </TabsTrigger>
            <TabsTrigger value="product" className="gap-1.5">
              <Package className="w-4 h-4" /> Продукт
            </TabsTrigger>
            <TabsTrigger value="marketing" className="gap-1.5">
              <Megaphone className="w-4 h-4" /> Маркетинг
            </TabsTrigger>
            <TabsTrigger value="tech" className="gap-1.5">
              <Cpu className="w-4 h-4" /> Технологии
            </TabsTrigger>
            <TabsTrigger value="swot" className="gap-1.5">
              <Target className="w-4 h-4" /> SWOT
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="gap-1.5">
              <Lightbulb className="w-4 h-4" /> Рекомендации
            </TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview">
            <motion.div {...fadeIn}>
              <Card className="bg-card border-border relative overflow-hidden rounded-xl">
                <ShineBorder shineColor={["#3B82F6", "#8B5CF6", "#3B82F6"]} />
                <CardHeader>
                  <CardTitle className="text-xl">О компании</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {company.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <InfoItem icon={Calendar} label="Основана" value={company.founded} />
                    <InfoItem icon={Users} label="Сотрудники" value={company.employees} />
                    <InfoItem icon={MapPin} label="Расположение" value={company.location} />
                    <InfoItem icon={Globe} label="Индустрия" value={company.industry} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* PRODUCT */}
          <TabsContent value="product">
            <motion.div {...fadeIn} className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Уникальное предложение (USP)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{product.usp}</p>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Целевая аудитория:
                    </span>
                    <span className="text-sm">{product.targetAudience}</span>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Тарифные планы
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.pricing.map((tier, i) => (
                    <MagicCard key={i} className="p-6 bg-card">
                      <h4 className="font-semibold text-lg mb-1">{tier.name}</h4>
                      <p className="text-2xl font-bold text-primary mb-4">
                        {tier.price}
                      </p>
                      <ul className="space-y-2">
                        {tier.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </MagicCard>
                  ))}
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Ключевые функции</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((f, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-0">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* MARKETING */}
          <TabsContent value="marketing">
            <motion.div {...fadeIn} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base">SEO Оценка</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-3 mb-3">
                      <span className="text-4xl font-bold text-primary">
                        {marketing.seoScore}
                      </span>
                      <span className="text-muted-foreground mb-1">/ 100</span>
                    </div>
                    <Progress value={marketing.seoScore} className="h-2" />
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Оценка трафика</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-8 h-8 text-green-500" />
                      <span className="text-2xl font-bold">
                        {marketing.trafficEstimate}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Социальные сети</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(marketing.socialMedia).map(([platform, value]) => (
                      <div key={platform} className="text-center p-4 rounded-lg bg-secondary/50">
                        <p className="text-sm text-muted-foreground capitalize mb-1">
                          {platform}
                        </p>
                        <p className="font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Контент-стратегия</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{marketing.contentStrategy}</p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* TECH */}
          <TabsContent value="tech">
            <motion.div {...fadeIn} className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Технологический стек</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tech.stack.map((t, i) => (
                      <Badge key={i} variant="outline" className="px-3 py-1.5 text-sm">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Аналитика</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tech.analytics.map((a, i) => (
                        <Badge key={i} variant="secondary">{a}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Инфраструктура</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CMS</span>
                      <span className="font-medium">{tech.cms}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CDN</span>
                      <span className="font-medium">{tech.cdn}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Хостинг</span>
                      <span className="font-medium">{tech.hosting}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* SWOT */}
          <TabsContent value="swot">
            <motion.div {...fadeIn}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SwotCard
                  title="Сильные стороны"
                  items={swot.strengths}
                  icon={CheckCircle2}
                  color="text-green-500"
                  gradient="from-green-500/10"
                />
                <SwotCard
                  title="Слабые стороны"
                  items={swot.weaknesses}
                  icon={AlertTriangle}
                  color="text-amber-500"
                  gradient="from-amber-500/10"
                />
                <SwotCard
                  title="Возможности"
                  items={swot.opportunities}
                  icon={ArrowUpRight}
                  color="text-blue-500"
                  gradient="from-blue-500/10"
                />
                <SwotCard
                  title="Угрозы"
                  items={swot.threats}
                  icon={ShieldAlert}
                  color="text-red-500"
                  gradient="from-red-500/10"
                />
              </div>
            </motion.div>
          </TabsContent>

          {/* RECOMMENDATIONS */}
          <TabsContent value="recommendations">
            <motion.div {...fadeIn}>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    AI-рекомендации для конкуренции
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{rec}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
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
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
      <Icon className="w-5 h-5 text-primary shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
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
  return (
    <MagicCard className="p-0 bg-card">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent opacity-50`} />
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon className={`w-5 h-5 ${color}`} />
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className={`mt-1 w-1.5 h-1.5 rounded-full ${color.replace("text-", "bg-")} shrink-0`} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </MagicCard>
  );
}
