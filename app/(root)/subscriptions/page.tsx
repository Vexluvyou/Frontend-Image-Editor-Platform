'use client';
// import { SignedIn, auth } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import Script from "next/script";
import Header from "@/components/shared/Header";
import { plans } from "@/constants";
import { useRouter } from 'next/navigation';
import { MyApp, UserBoxProps } from "@/lib/services/my-app";
import { AppKey } from "@/lib/services/key";
import { HttpClient } from "@/lib/services/http-client";

interface PaymentData {
  id: string;
  user_id: string;
  customer_id: string;
  price_name: string;
  subscription_id: string;
  first_billed_at: string;
  next_billed_at: string;
  billing_interval: string;
  status: string;
  updatedAt: string;
  createdAt: string;
}

const Credits = () => {
  const [paddle, setPaddle] = useState<Paddle>();
  const http = new HttpClient();
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [user, setUser] = useState<UserBoxProps>({ userId: "", username: "" }); // Initialize user with fallback values
  const [subscription, setSubscription] = useState<{ subscription_id: string } | null>(null);
  const [userPayment, setUserPayment] = useState<PaymentData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await http.get(`payment`);
        setPayments(res || []);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem(AppKey.userId) || "";
    const username = localStorage.getItem(AppKey.username) || "";
    // const storedSubscription = localStorage.getItem(AppKey.subscription);

    if (userId && username) {
      setUser({ userId, username });
      // if (storedSubscription) {
      //   try {
      //     setSubscription(JSON.parse(storedSubscription));
      //   } catch (err) {
      //     console.error("Failed to parse subscription:", err);
      //   }
      // }
    } else {
      router.replace("/sign-in");
    }

    initializePaddle({
      environment: 'sandbox',
      token: MyApp.tokenPayment,
    })
      .then((paddleInstance) => setPaddle(paddleInstance))
      .catch((e) => {
        console.error('Paddle Init Error:', e);
      });
  }, [router]);

  const handleCheckout = (priceId: string) => {
    if (!paddle) {
      console.warn("Paddle not initialized");
      return;
    }

    paddle.Checkout.open({
      items: [
        {
          priceId,
          quantity: 1,
        },
      ],
      customData: {
        user_id: user.userId,
        username: user.username
      },
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        successUrl: `${window.location.origin}/subscriptions/success`,
      },
    });
  };

  useEffect(() => {
    if (user && payments.length > 0) {
      const match = payments.find(p => p.user_id === user.userId);
      setUserPayment(match || null);
    }
  }, [user, payments]);

  return (
    <>
      <Header
        title="Subscription"
        subtitle="Choose a subscription package that suits your needs!"
      />

      <section>
        <ul className="subscription-list">

          {/* Free package */}
          {plans.slice(0, 1).map((plan) => (
            <li key={plan.name} className="free-subscription-form mt-10 mb-10">

              <div className="flex-center flex-col gap-3">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="p-20-semibold mt-2 text-purple-500">
                  {plan.name}
                </p>
                <p className="h1-semibold text-dark-600">${plan.price}</p>
                <p className="p-16-regular">{plan.credits} Credits</p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${inclusion.isIncluded ? "check.svg" : "cross.svg"
                        }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {/* Button to handle subscription */}
              {plan._id !== 1 && (
                <button
                  type="button"
                  className="signin-signup-button"
                  onClick={() => handleCheckout(plan.priceId!)}
                >
                  Subscribe
                </button>
              )}

            </li>
          ))}

          {/* Premium Subscription package */}
          {/* Monthly Package */}
          {plans.slice(1, 2).map((plan) => (
            <li key={plan.name} className="premium-monthly-subscription-form mt-5 mb-5">

              <div className="flex-center flex-col gap-3 mt-5">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="p-20-semibold mt-2 text-purple-500">
                  {plan.name}
                </p>
                <p className="h1-semibold text-dark-600">${plan.price}</p>
                <p className="p-16-regular">{plan.plans} </p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${inclusion.isIncluded ? "check.svg" : "cross.svg"
                        }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {/* Button to handle subscription */}
              {plan._id !== 1 && (
                <button
                  type="button"
                  className="subscription-button"
                  onClick={() => {
                    if (userPayment) {
                      router.push("/subscriptions/manage-subscription");
                    } else {
                      handleCheckout(plan.priceId!);
                    }
                  }}
                >
                  {userPayment ? "Check Plans" : "Subscribe"}
                </button>
              )}

            </li>
          ))}

          {/* Yearly Package*/}
          {plans.slice(2).map((plan) => (
            <li key={plan.name} className="premium-yearly-subscription-form">

              <div className="flex-center flex-col gap-3 mt-10">
                <Image src={plan.icon} alt="check" width={50} height={50} />
                <p className="p-20-semibold mt-2 text-purple-500">
                  {plan.name}
                </p>
                <p className="h1-semibold text-dark-600">${plan.price}</p>
                <p className="p-16-regular">{plan.plans} </p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={`/assets/icons/${inclusion.isIncluded ? "check.svg" : "cross.svg"
                        }`}
                      alt="check"
                      width={24}
                      height={24}
                    />
                    <p className="p-16-regular">{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {/* Button to handle subscription */}
              {plan._id !== 1 && (
                subscription?.subscription_id ? (
                  <button
                    type="button"
                    className="subscription-button"
                    onClick={() => router.push('/manage-subscription')}
                  >
                    Check Plans
                  </button>
                ) : (
                  <button
                    type="button"
                    className="subscription-button"
                    onClick={() => {
                      if (userPayment) {
                        router.push("/subscriptions/manage-subscription");
                      } else {
                        handleCheckout(plan.priceId!);
                      }
                    }}
                  >
                    {userPayment ? "Check Plans" : "Subscribe"}

                  </button>
                )
              )}

            </li>
          ))}

        </ul>
      </section>
    </>
  );
};

export default Credits;

// Paddle Script for called Paddle
<Script
  src="https://cdn.paddle.com/paddle/v2/paddle.js"
  strategy="afterInteractive"
/>

// {/* Button to handle subscription */}
//               {/* {plan._id !== 1 && (
//                 <button
//                   type="button"
//                   className="subscription-button"
//                   onClick={() => handleCheckout(plan.priceId!)}
//                 >
//                   Subscribe
//                 </button>
//               )} */}

//               {/* Uncomment if there's a free plan */}
//               {/* {plan.name === "Free" ? (
//                 <Button variant="outline" className="credits-btn">
//                   Free Consumable
//                 </Button>
//               ) : (
//                 <SignedIn>
//                   <Checkout
//                     plan={plan.name}
//                     amount={plan.price}
//                     credits={plan.credits}
//                     buyerId={user._id}
//                   />
//                 </SignedIn>
//               )} */}


// {
//   plan._id !== 1 && (
//     subscription?.subscription_id ? (
//       payment?.status === 'active' ? (
//         <button
//           type="button"
//           className="subscription-button"
//           onClick={() => router.push('/manage-subscription')}
//         >
//           Check Plans
//         </button>
//       ) : (
//         <button
//           type="button"
//           className="subscription-button"
//           onClick={() => handleCheckout(plan.priceId!)}
//         >
//           Subscribe
//         </button>
//       )
//     ) : (
//       <button
//         type="button"
//         className="subscription-button"
//         onClick={() => handleCheckout(plan.priceId!)}
//       >
//         Subscribe
//       </button>
//     )
//   )
// } 