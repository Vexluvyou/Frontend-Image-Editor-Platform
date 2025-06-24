// app/(root)/HomeClient.tsx
"use client";

import { useSearchParams } from "next/navigation";

const HomeClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // or whatever param you're using

  return (
    <div>
      <h1 className="text-2xl font-bold">Home Page</h1>
      {query && <p>Search Query: {query}</p>}
      {/* your actual page content here */}
    </div>
  );
};

export default HomeClient;
