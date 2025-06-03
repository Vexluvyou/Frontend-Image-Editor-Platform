"use client"; // Marking this file as a client component

import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { AppKey } from "@/lib/services/key";
import { UserBoxProps } from "@/lib/services/my-app";
import { useRouter } from "next/navigation"; // useRouter from next/navigation in Next.js 13
import { useEffect, useState } from "react";

const AddTransformationPage = ({ params: { type } }: { params: { type: keyof typeof transformationTypes } }) => {
  const transformation = transformationTypes[type];
  const [user, setUser] = useState<UserBoxProps>({ userId: "", username: "" }); // Initialize user with fallback values
  const router = useRouter();

  // Check User Login
  useEffect(() => {
    const userId = localStorage.getItem(AppKey.userId) || "";  
    const username = localStorage.getItem(AppKey.username) || ""; 
    if (userId && username) {
      setUser({ userId, username });
    } else {
      // router.push("/sign-in");
      router.replace("/sign-in");
    }
  }, [router]);

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user.userId || ""} // Provide a fallback empty string for userId
          type={transformation.type as keyof typeof transformationTypes}
          creditBalance={0} // Replace with real creditBalance if applicable
        />
      </section>
    </>
  );
};

export default AddTransformationPage;
