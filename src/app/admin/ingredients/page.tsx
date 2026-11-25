import type { Metadata } from "next";
import { AdminTitle } from "../AdminTitle";
import { IngredientSearch } from "./IngredientSearch";

export const metadata: Metadata = { title: "원료 검색" };

export default function AdminIngredientsPage() {
  return (
    <>
      <AdminTitle
        title="공전 · 개별인정형 원료 검색"
        description="원료명이나 기능성으로 찾고, 표시 가능한 기능성 문구와 1일 섭취량을 확인합니다."
      />
      <IngredientSearch />
    </>
  );
}
