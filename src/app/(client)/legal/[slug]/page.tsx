import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";

const DOCS = {
  terms: "이용약관",
  privacy: "개인정보처리방침",
  refund: "환불 정책",
  ads: "광고 상품 안내",
} as const;

type Slug = keyof typeof DOCS;

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: DOCS[slug as Slug] ?? "약관" };
}

// TODO(법무): 확정된 약관·방침 본문으로 교체
export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = DOCS[slug as Slug];
  if (!title) notFound();
  return <ComingSoon title={title} description={`${title} 본문을 준비하고 있습니다. 문의는 하단 고객센터로 연락해 주세요.`} />;
}
