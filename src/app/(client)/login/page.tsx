import type { Metadata } from "next";
import Link from "next/link";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "로그인" };

// TODO(API): 인증 연동 후 로그인 화면 구현 (?next= 파라미터로 원래 화면 복귀)
export default function LoginPage() {
  return (
    <ComingSoon
      title="로그인 준비 중"
      description="회원 기능은 곧 열립니다. 로그인 없이도 AI 설계 초안은 무료로 만들 수 있습니다."
    >
      {/* TODO(API): 인증 연동 후 이 미리보기 링크 제거 */}
      <p className="m-0 pt-4 text-sm text-muted">
        화면 미리보기:{" "}
        <Link href="/mypage" className="link">
          마이페이지
        </Link>{" "}
        ·{" "}
        <Link href="/admin" className="link">
          관리자
        </Link>
      </p>
    </ComingSoon>
  );
}
