import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 배포본: node_modules 없이 실행되는 독립 서버(.next/standalone)를 만듭니다.
  output: "standalone",
};

export default nextConfig;
