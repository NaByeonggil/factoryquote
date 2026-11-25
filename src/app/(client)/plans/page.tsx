import type { Metadata } from "next";
import { PageTitle } from "@/components/SectionHeading";
import { Checkout } from "./Checkout";

export const metadata: Metadata = { title: "발주 설계서" };

export default function PlansPage() {
  return (
    <main className="container-page flex flex-col gap-10 pt-10 pb-16 sm:gap-12 sm:pt-14 sm:pb-24">
      <PageTitle
        eyebrow="발주 설계서"
        title="제조사에 그대로 보내는 설계서"
        description="약사가 검수한 설계서로 견적을 요청하세요. 생산 계약으로 이어지면 설계비 일부를 차감합니다."
      />
      <Checkout />
    </main>
  );
}
