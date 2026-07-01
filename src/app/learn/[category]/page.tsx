import type { Metadata } from "next";
import { getCategoryById } from "@/data/tutorials";
import CategoryPageClient from "./client";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryById(category);
  if (!cat) return { title: "未找到" };
  return {
    title: `${cat.name} 教程`,
    description: `${cat.description}，共 ${cat.tutorials.length} 篇教程`,
  };
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  return <CategoryPageClient params={params} />;
}
