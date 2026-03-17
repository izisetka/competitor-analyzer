import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { saveReport } from "@/lib/store";
import { generateMockData } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL обязателен" }, { status: 400 });
    }

    const id = uuidv4();

    const firecrawlKey = process.env.FIRECRAWL_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (firecrawlKey && openaiKey) {
      try {
        const crawlResponse = await fetch("https://api.firecrawl.dev/v1/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firecrawlKey}`,
          },
          body: JSON.stringify({
            url: url.startsWith("http") ? url : `https://${url}`,
            formats: ["markdown"],
          }),
        });

        const crawlData = await crawlResponse.json();
        const scrapedContent = crawlData.data?.markdown || "";

        const gptResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `Ты — эксперт по конкурентному анализу. Проанализируй данные о компании и верни JSON.
Все тексты должны быть на русском языке.
JSON формат:
{
  "company": { "name": "", "description": "", "industry": "", "founded": "", "employees": "", "location": "", "logo": "" },
  "product": { "pricing": [{"name": "", "price": "", "features": []}], "features": [], "usp": "", "targetAudience": "" },
  "marketing": { "seoScore": 0, "trafficEstimate": "", "socialMedia": {"twitter": "", "linkedin": "", "facebook": "", "instagram": ""}, "contentStrategy": "" },
  "tech": { "stack": [], "analytics": [], "cms": "", "cdn": "", "hosting": "" },
  "swot": { "strengths": [], "weaknesses": [], "opportunities": [], "threats": [] },
  "recommendations": []
}`,
              },
              {
                role: "user",
                content: `Проанализируй сайт ${url}. Вот его содержимое:\n\n${scrapedContent.slice(0, 15000)}`,
              },
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
          }),
        });

        const gptData = await gptResponse.json();
        const analysis = JSON.parse(gptData.choices[0].message.content);

        const report = {
          id,
          url,
          createdAt: new Date().toISOString(),
          ...analysis,
        };

        saveReport(report);
        return NextResponse.json({ id, report });
      } catch {
        const report = generateMockData(url, id);
        saveReport(report);
        return NextResponse.json({ id, report });
      }
    }

    // No API keys — use mock data
    const report = generateMockData(url, id);
    saveReport(report);
    return NextResponse.json({ id, report });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
