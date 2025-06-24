// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";

// import Header from "@/components/shared/Header";
// import { Collection } from "@/components/shared/Collection";
// import { Button } from "@/components/ui/button";

// import { AppKey } from "@/lib/services/key";
// import { HttpClient } from "@/lib/services/http-client";
// import { UserBoxProps } from "@/lib/services/my-app";

// interface PaymentData {
//   id: string;
//   user_id: string;
//   customer_id: string;
//   price_name: string;
//   subscription_id: string;
//   first_billed_at: string;
//   next_billed_at: string;
//   billing_interval: string;
//   status: string;
//   updatedAt: string;
//   createdAt: string;
// }

// const Profile = () => {
//   const searchParams = useSearchParams();
//   const page = Number(searchParams.get("page")) || 1;

//   const http = new HttpClient();
//   const [payments, setPayments] = useState<PaymentData[]>([]);
//   const [user, setUser] = useState<UserBoxProps>();
//   const [userPayment, setUserPayment] = useState<PaymentData | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const res = await http.get(`payment`);
//         setPayments(res || []);
//       } catch (error) {
//         console.error("Failed to fetch payments:", error);
//       }
//     };

//     fetchPayments();
//   }, []);

//   useEffect(() => {
//     const username = localStorage.getItem(AppKey.username);
//     const email = localStorage.getItem(AppKey.email);
//     const userId = localStorage.getItem(AppKey.userId);

//     if (!userId) {
//       router.replace("/sign-in");
//     }

//     setUser({
//       username: username || "Guest0001",
//       email: email || "guest@example.com",
//       userId: userId || "",
//     });
//   }, [router]);

//   useEffect(() => {
//     if (user && payments.length > 0) {
//       const match = payments.find(p => p.user_id === user.userId);
//       setUserPayment(match || null);
//     }
//   }, [user, payments]);

//   return (
//     <>
//       <Header title="Profile" />

//       {/* Profile Section */}
//       <div className="mt-8 p-4 shadow-md rounded-xl flex items-center justify-between">
//         {/* User Info */}
//         <div className="flex items-center gap-4">
//           <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-lg">
//             {user?.username?.[0] || "A"}
//           </div>

//           <div>
//             <p className="text-black font-semibold">{user?.username}</p>
//             <p className="text-sm text-gray-600">{user?.email}</p>
//           </div>
//         </div>

//         <div>
//           <button className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
//             Edit Profile</button>
//         </div>
//       </div>

//       {/* Image Manipulation & Subscription Info Section */}
//       <section className="profile mt-8 grid md:grid-cols-2 gap-8">

//         {/* Image Manipulation Section */}
//         {/* <div className="profile-image-manipulation">
//           <p className="text-lg font-medium">IMAGE MANIPULATION DONE</p>
//           <div className="mt-4 flex items-center gap-4">
//             <Image
//               src="/assets/icons/photo.svg"
//               alt="Image Icon"
//               width={50}
//               height={50}
//               className="size-9 md:size-12"
//             />
//             <h2 className="text-2xl font-bold text-gray-800">0</h2>
//           </div>
//         </div> */}

//         {/* Subscription Info */}
//         <div className="profile-balance">
//           <p className="text-lg font-medium">SUBSCRIPTION PLAN</p>
//           <div className="mt-4 flex items-center gap-4">
//             <Image
//               src="/assets/icons/crown.png"
//               alt="Crown Icon"
//               width={50}
//               height={50}
//               className="size-9 md:size-12"
//             />
//             <p className="text-2xl font-bold text-gray-800">
//               {userPayment?.price_name || "Free"}
//             </p>
//           </div>

//           <div className="mt-2">
//             <Button
//               onClick={() =>
//                 router.push(
//                   userPayment
//                     ? "/subscriptions/manage-subscription"
//                     : "/subscriptions"
//                 )
//               }
//               className="subscription-button rounded-md hover:bg-indigo-700"
//             >
//               {userPayment ? "View Subscription" : "Subscribe"}
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Recently Used Images */}
//       <section className="mt-12">
//         <Collection
//         // images={images?.data}
//         // totalPages={images?.totalPages}
//         // page={page}
//         // hasSearch={true}
//         />
//       </section>
//     </>
//   );
// };

// export default Profile;
