import type { Metadata } from "next";
import { AdminTitle } from "../AdminTitle";
import { BlueprintTools } from "./BlueprintTools";

export const metadata: Metadata = { title: "설계 · 발송" };

export default function AdminBlueprintsPage() {
  return (
    <>
      <AdminTitle
        title="유사 설계 불러오기 · 다중 발송"
        description="주원료가 같은 설계서를 불러와 부원료만 바꾸고, 여러 제조사에 한 번에 보냅니다."
      />
      <BlueprintTools />
    </>
  );
}
