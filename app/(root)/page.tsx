// app/(root)/page.tsx
// import HomeClient from "@/components/shared/HomeClient";
import { Suspense } from "react";
import Home from "./home/HomePage";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading homepage...</div>}>
      <Home />
    </Suspense>
  );
}
