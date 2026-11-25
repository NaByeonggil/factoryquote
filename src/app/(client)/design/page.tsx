import type { Metadata } from "next";
import { PageTitle } from "@/components/SectionHeading";
import { Designer } from "./Designer";

export const metadata: Metadata = { title: "AI 설계 도우미" };

export default function DesignPage() {
  return (
    <div className="bg-ground">
      <main className="container-page flex flex-col gap-8 pt-10 pb-16 sm:pt-14 sm:pb-[88px]">
        <PageTitle
          eyebrow="AI 설계 도우미 · 무료"
          title="만들고 싶은 제품을 알려주세요"
          description="건강기능식품 공전과 개별인정형 원료 기준으로 초안을 만듭니다."
        />
        <Designer />
        <p className="m-0 text-[13px] leading-relaxed text-muted">
          AI 초안은 참고용이며, 최종 표시 가능 여부는 품목제조 신고와 표시·광고 사전심의 결과를 따릅니다.
        </p>
      </main>
    </div>
  );
}
