import type { Metadata } from "next";
import { getCategoryById } from "@/data/tutorials";
import TutorialPageClient from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const cat = getCategoryById(category);
  if (!cat) return { title: "未找到" };
  const tutorial = cat.tutorials.find(t => t.slug === slug);
  if (!tutorial) return { title: "未找到" };
  return {
    title: `${tutorial.title} - ${cat.name}`,
    description: tutorial.description,
  };
}

export default function TutorialPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  return <TutorialPageClient params={params} />;
}
