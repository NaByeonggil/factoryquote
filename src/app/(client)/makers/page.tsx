import type { Metadata } from "next";
import { PageTitle } from "@/components/SectionHeading";
import { MakerFinder } from "./MakerFinder";

export const metadata: Metadata = { title: "제조사 찾기" };

export default function MakersPage() {
  return (
    <main className="container-page flex flex-col gap-8 pt-10 pb-16 sm:pt-14 sm:pb-24">
      <PageTitle
        eyebrow="제조사 찾기"
        title="조건에 맞는 건강기능식품 제조사"
        description="제형·인증·MOQ로 걸러 보세요. 일반 목록 등록은 무료이며, 유료 노출은 '광고'로 따로 표시합니다."
      />
      <MakerFinder />
    </main>
  );
}
