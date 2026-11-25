"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { Chip, ChipGroup } from "@/components/Chip";
import { TextField } from "@/components/Field";
import { ConsentDetails } from "@/components/ConsentDetails";
import { FORMULATIONS, RETENTION } from "@/config/site";

const COLLECTION_CONSENT_ROWS = [
  { term: "수집 항목", detail: "회사명, 담당자 이름, 연락처, 주력 제형, 보유 인증, 최소 생산 수량" },
  { term: "이용 목적", detail: "입점 상담 및 입점 상품 안내" },
  { term: "보유 기간", detail: RETENTION.partnerInquiry },
  { term: "거부 권리", detail: "동의를 거부할 수 있으며, 거부 시 입점 문의 접수가 제한됩니다." },
];

export function PartnerInquiryForm() {
  const [forms, setForms] = useState<string[]>([]);
  const [formsError, setFormsError] = useState<string>();
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string>();
  const [sent, setSent] = useState(false);

  function toggle(label: string) {
    setFormsError(undefined);
    setForms((f) => (f.includes(label) ? f.filter((x) => x !== label) : [...f, label]));
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let ok = true;
    if (forms.length === 0) {
      setFormsError("주력 제형을 1개 이상 선택해 주세요.");
      ok = false;
    }
    if (!consent) {
      setConsentError("개인정보 수집·이용에 동의해야 문의를 보낼 수 있습니다.");
      ok = false;
    }
    if (!ok) return;
    // TODO(API): POST /api/partner-inquiries 로 { ...FormData, forms, consentAt } 저장
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex min-w-0 flex-[1_1_560px] flex-col items-start gap-3 rounded-card border border-line p-6 sm:p-8"
      >
        <CheckCircle2 size={32} className="text-primary" aria-hidden />
        <p className="m-0 text-lg font-bold text-navy">입점 문의를 받았습니다</p>
        <p className="m-0 text-[15px] text-muted">담당자가 확인 후 입력하신 연락처로 연락드리겠습니다.</p>
      </div>
    );
  }

  return (
    <form
      aria-label="입점 문의"
      noValidate={false}
      onSubmit={submit}
      className="grid min-w-0 flex-[1_1_560px] grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-5 rounded-card border border-line p-5 sm:p-8"
    >
      <TextField id="company" label="회사명" required autoComplete="organization" />
      <TextField id="person" label="담당자" required autoComplete="name" />
      <TextField id="phone" label="연락처" type="tel" required autoComplete="tel" placeholder="예: 010-0000-0000" />
      <TextField id="cert" label="보유 인증" placeholder="예: 건기식 GMP, HACCP" />

      <div className="col-span-full">
        <ChipGroup legend="주력 제형" hint="(복수 선택, 필수)" error={formsError}>
          {FORMULATIONS.map((f) => (
            <Chip key={f} selected={forms.includes(f)} onClick={() => toggle(f)}>
              {f}
            </Chip>
          ))}
        </ChipGroup>
      </div>

      <TextField id="moq" label="최소 생산 수량" placeholder="예: 3,000병" />

      <div className="col-span-full flex flex-col gap-2.5">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-[1.55] text-body">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (e.target.checked) setConsentError(undefined);
            }}
            aria-invalid={!!consentError}
            aria-describedby={consentError ? "partner-consent-error" : undefined}
            className="mt-px size-5 flex-none accent-primary"
          />
          <span>
            <strong className="font-bold text-ink">[필수]</strong> 개인정보 수집·이용에 동의합니다
          </span>
        </label>
        <ConsentDetails rows={COLLECTION_CONSENT_ROWS} summary="수집·이용 내용 자세히 보기" />
        {consentError && (
          <p id="partner-consent-error" role="alert" className="m-0 text-[13px] font-medium text-[#B91C1C]">
            {consentError}
          </p>
        )}
      </div>

      <Button type="submit" className="col-span-full">
        입점 문의 보내기
      </Button>
    </form>
  );
}
