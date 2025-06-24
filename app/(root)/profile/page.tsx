import Profile from "@/app/(root)/profile/Profile";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile />
    </Suspense>
  );
}
