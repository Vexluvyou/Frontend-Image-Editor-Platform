'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SingOut = () => {
    const router = useRouter();

    return (
        <div className="success-payment">
    
            {/* Title and subtitle */}
            <div className="flex items-start justify-between mb-6">
                <div className="text-center flex-1 mt-5">

                    {/* <Image
                        src="/assets/icons/success.png" // Replace with your actual icon path
                        alt="success"
                        width={40}
                        height={40}
                        className="mx-auto mb-4"
                    /> */}

                    <h2 className="text-2xl font-semibold text-gray-800">
                        Logout!!!
                    </h2>
                    <p className="text-gray-800 mt-2 mb-2">
                        Are you sure you want to logout?
                    </p>
                </div>
            </div>

            {/* Button */}
            <div className="flex justify-center gap-4 mt-6 mb-4">
                <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded-md"
                    onClick={() => router.push("/")}
                >
                    Back
                </button>

                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md"
                    onClick={() => {
                        // Add cancel subscription logic here
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default SingOut;
