// app/(root)/page.tsx
import HomeClient from "@/components/shared/HomeClient";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading homepage...</div>}>
      <HomeClient />
    </Suspense>
  );
}
