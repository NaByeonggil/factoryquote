"use client";

import { useRef, useState } from "react";
import { AlertCircle, ArrowRight, FileSearch, Loader2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/Button";
import { Chip, ChipGroup } from "@/components/Chip";
import { SelectField, TextField } from "@/components/Field";
import { LockedBox } from "@/components/LockedBox";
import { BENEFITS, FORMULATIONS, TARGETS } from "@/config/site";

type Status = "idle" | "loading" | "done" | "error";

type DraftRow = { ingredient: string; type: string; claim: string };
type Draft = { rows: DraftRow[]; form: string; dailyIntake: string };

// TODO(API): POST /api/drafts 로 { target, picked, form, qty, budget } 를 보내 AI 초안을 받아오기.
// 지금은 디자인 시안의 예시 데이터를 돌려줍니다.
async function requestDraft(input: { form: string }): Promise<Draft> {
  await new Promise((r) => setTimeout(r, 900));
  return {
    rows: [
      { ingredient: "밀크씨슬 추출물", type: "고시형", claim: "간 건강에 도움을 줄 수 있음" },
      { ingredient: "[원료 후보]", type: "[구분]", claim: "[기능성 문구]" },
      { ingredient: "[원료 후보]", type: "[구분]", claim: "[기능성 문구]" },
    ],
    form: input.form,
    dailyIntake: "[횟수]",
  };
}

export function Designer() {
  const [picked, setPicked] = useState<string[]>(["간 건강"]);
  const [form, setForm] = useState<string>("정제");
  const [status, setStatus] = useState<Status>("idle");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [pickError, setPickError] = useState<string | undefined>();
  const resultRef = useRef<HTMLElement>(null);

  const canSubmit = picked.length > 0 && status !== "loading";

  function toggle(label: string) {
    setPickError(undefined);
    setPicked((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));
  }

  async function generate() {
    if (picked.length === 0) {
      setPickError("원하는 기능성을 1개 이상 선택해 주세요.");
      return;
    }
    if (status === "loading") return;
    setStatus("loading");
    // 모바일(1단 배치)에서는 결과 영역으로 이동
    if (window.matchMedia("(max-width: 959px)").matches) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    try {
      setDraft(await requestDraft({ form }));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-wrap items-start gap-6">
      <form
        aria-label="제품 조건 입력"
        onSubmit={(e) => {
          e.preventDefault();
          generate();
        }}
        className="flex min-w-0 flex-[1_1_420px] flex-col gap-6 rounded-card border border-line bg-white p-5 sm:p-8"
      >
        <SelectField id="target" label="타깃 고객" options={TARGETS} />

        <ChipGroup legend="원하는 기능성" hint="(복수 선택)" error={pickError}>
          {BENEFITS.map((b) => (
            <Chip key={b} selected={picked.includes(b)} onClick={() => toggle(b)}>
              {b}
            </Chip>
          ))}
        </ChipGroup>

        <ChipGroup legend="희망 제형">
          {FORMULATIONS.map((f) => (
            <Chip key={f} selected={form === f} onClick={() => setForm(f)}>
              {f}
            </Chip>
          ))}
        </ChipGroup>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4">
          <TextField id="qty" label="1차 생산 수량" placeholder="예: 3,000병" inputMode="numeric" />
          <TextField id="budget" label="개당 목표 원가" placeholder="예: 3,000원 이하" />
        </div>

        <Button
          type="submit"
          className="w-full"
          aria-disabled={!canSubmit}
          aria-describedby={picked.length === 0 ? "pick-hint" : undefined}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden />
              초안 만드는 중…
            </>
          ) : status === "done" ? (
            "조건 바꿔서 다시 만들기"
          ) : (
            "AI 초안 만들기"
          )}
        </Button>
        {picked.length === 0 && (
          <p id="pick-hint" className="-mt-3 mb-0 text-[13px] text-muted">
            기능성을 1개 이상 선택하면 초안을 만들 수 있습니다.
          </p>
        )}
      </form>

      <section
        ref={resultRef}
        aria-label="AI 초안 결과"
        aria-live="polite"
        aria-busy={status === "loading"}
        className="flex min-w-0 flex-[1_1_520px] scroll-mt-4 flex-col gap-5 rounded-card border border-line bg-white p-5 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="m-0 text-[22px] font-extrabold text-navy">AI 설계 초안</h2>
          <span className="rounded-full bg-primary-tint px-3 py-1.5 text-[13px] font-bold text-primary-deep">
            무료 미리보기
          </span>
        </div>

        {status === "idle" && <EmptyState />}
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState onRetry={generate} />}
        {status === "done" && draft && <DraftResult draft={draft} />}
      </section>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line-strong px-6 py-14 text-center">
      <FileSearch size={32} className="text-primary" aria-hidden />
      <p className="m-0 text-base font-bold text-navy">아직 만든 초안이 없습니다</p>
      <p className="m-0 max-w-[360px] text-sm leading-relaxed text-muted">
        왼쪽에서 타깃과 기능성, 제형을 고르고 <strong className="text-ink">AI 초안 만들기</strong>를
        누르면 원료 후보와 표시 가능한 기능성을 보여드립니다.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-3" role="status">
      <span className="sr-only">AI 초안을 만드는 중입니다</span>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-12 animate-pulse rounded-lg bg-subtle" />
      ))}
      <div className="h-28 animate-pulse rounded-xl bg-subtle" />
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-start gap-3 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-6">
      <div className="flex items-center gap-2 font-bold text-[#991B1B]">
        <AlertCircle size={20} aria-hidden />
        초안을 만들지 못했습니다
      </div>
      <p className="m-0 text-sm text-[#7F1D1D]">잠시 후 다시 시도해 주세요. 입력한 조건은 그대로 남아 있습니다.</p>
      <Button variant="ghost" size="sm" onClick={onRetry}>
        다시 시도
      </Button>
    </div>
  );
}

function DraftResult({ draft }: { draft: Draft }) {
  return (
    <>
      <div className="relative overflow-x-auto rounded-xl border border-line" tabIndex={0} role="region" aria-label="원료 후보 표 (가로 스크롤)">
        <table className="w-full min-w-[460px] border-collapse text-[15px]">
          <thead>
            <tr className="bg-ground text-left">
              {["원료 후보", "구분", "표시 가능 기능성"].map((h) => (
                <th key={h} scope="col" className="px-4 py-3.5 text-[13px] font-bold text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {draft.rows.map((r, i) => (
              <tr key={i} className="border-t border-line">
                <td className="px-4 py-3.5 font-medium">{r.ingredient}</td>
                <td className="px-4 py-3.5">
                  <span className="text-[13px] font-bold text-primary-deep">{r.type}</span>
                </td>
                <td className="px-4 py-3.5 text-body">{r.claim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-lg bg-subtle px-3 py-2 text-sm text-body">예상 제형: {draft.form}</span>
        <span className="rounded-lg bg-subtle px-3 py-2 text-sm text-body">1일 섭취: {draft.dailyIntake}</span>
      </div>

      <LockedBox
        title="설계서에서 공개되는 항목"
        items={["원료별 함량과 공전·인정 근거", "1일 섭취량 · 상한 검토", "제형별 MOQ · 예상 단가 범위"]}
        note="이 초안만으로는 제조사가 견적을 낼 수 없습니다."
      />

      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/plans" className="flex-[1_1_240px]">
          설계서 받기
          <ArrowRight size={18} aria-hidden />
        </ButtonLink>
        {/* TODO(API): 로그인 연동 후 초안 저장 API 호출 */}
        <ButtonLink href="/login?next=/design" variant="ghost" className="flex-[0_1_auto]">
          초안 저장
        </ButtonLink>
      </div>
    </>
  );
}
