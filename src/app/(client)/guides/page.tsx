import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "원료·규제 가이드" };

// TODO(CMS): 가이드 목록·상세 페이지 구현
export default function GuidesPage() {
  return (
    <ComingSoon
      title="원료·규제 가이드 준비 중"
      description="원료 구분, 제형별 MOQ, 기능성 표시·광고 기준을 정리한 가이드를 준비하고 있습니다."
    />
  );
}
