'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();

  return (
    <div className="success-payment">
      {/* Logo */}
      <div>
        <Link href="/">
          <Image
            src="/assets/images/logo-text.png"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        {/* Title and subtitle */}
        <div className="flex items-start justify-between mb-6">
          <div className="text-center flex-1 mt-10">

          <Image
              src="/assets/icons/success.png" // Replace with your actual icon path
              alt="success"
              width={40}
              height={40}
              className="mx-auto mb-4"
            />

            <h2 className="text-2xl font-semibold text-gray-800">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mt-2 mb-2">
              Your payment has been completed.
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          type="button"
          className="success-button"
          onClick={() => router.push("/subscriptions")}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default Success;
