import type { Metadata } from "next";
import { AdminTitle } from "./AdminTitle";
import { InquiryInbox } from "./InquiryInbox";

export const metadata: Metadata = { title: "문의함" };

export default function AdminInboxPage() {
  return (
    <>
      <AdminTitle title="문의함" description="설계 의뢰와 제조사 입점 문의를 한곳에서 보고 상태를 바꿉니다." />
      <InquiryInbox />
    </>
  );
}
