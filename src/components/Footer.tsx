import Link from "next/link";
import { BUSINESS } from "@/config/site";

export const LEGAL_LINKS = [
  { href: "/legal/terms", label: "이용약관" },
  { href: "/legal/privacy", label: "개인정보처리방침", strong: true },
  { href: "/legal/refund", label: "환불 정책" },
  { href: "/legal/ads", label: "광고 상품 안내" },
] as const;

/** 전자상거래법상 표시 의무 항목(상호·대표·사업자번호·통신판매업 신고번호·주소·연락처)을 포함합니다. */
export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-5 py-10 text-sm text-muted">
        <nav aria-label="약관 및 정책">
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={
                    "no-underline hover:underline " +
                    ("strong" in l && l.strong ? "font-bold text-ink" : "text-muted")
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <address className="flex flex-col gap-1 not-italic leading-relaxed">
          <p className="m-0">
            {BUSINESS.companyName} · 대표 {BUSINESS.ceo} · 사업자등록번호 {BUSINESS.bizRegNo} ·
            통신판매업 신고번호 {BUSINESS.mailOrderRegNo}
          </p>
          <p className="m-0">
            {BUSINESS.address} · 고객센터 {BUSINESS.phone} · {BUSINESS.email} · 개인정보 보호책임자{" "}
            {BUSINESS.privacyOfficer}
          </p>
        </address>
      </div>
    </footer>
  );
}
