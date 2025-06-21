'use client';

import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { HttpClient } from "@/lib/services/http-client";
import { AppKey } from "@/lib/services/key";
import { capitalizeFirst, formatDate } from "@/lib/services/my-app";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PaymentData {
  id: string;
  user_id: string;
  customer_id: string;
  price_name: string;
  subscription_id: string;
  type_card: string;
  last4_card: string;
  first_billed_at: string;
  next_billed_at: string;
  billing_interval: string;
  status: string;
  updatedAt: string;
  createdAt: string;
}

const ManageSubscription = () => {
  const http = new HttpClient();
  const router = useRouter();

  const [allPayments, setAllPayments] = useState<PaymentData[]>([]);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [price, setPrice] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false); // For modal

  useEffect(() => {
    const uid = localStorage.getItem(AppKey.userId) || "";
    setUserId(uid);
  }, []);

  useEffect(() => {
    const getAllPayments = async () => {
      try {
        const res = await http.get("payment");
        setAllPayments(res);
      } catch (err) {
        console.error("Failed to get payments:", err);
      }
    };
    getAllPayments();
  }, []);


  useEffect(() => {
    if (userId && allPayments.length > 0) {
      const userPayment = allPayments.find((p) => p.user_id === userId);
      setPayment(userPayment || null);
    }
  }, [userId, allPayments]);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await http.get(`payment/price`);
        setPrice(res.data);

      } catch (err) {
        console.error("Failed to fetch price:", err);
      }
    };

    if (payment?.user_id === userId) {
      fetchPrice();
    }
  }, [payment, userId]);


  const handleCancel = async () => {
    await http.post(`cancel-subscription/${payment?.id}`, { subscription_id: payment?.subscription_id })
    console.log("Subscription cancelled");
    setIsOpen(false);
    router.push("/profile");
  };

  if (!payment) {
    return (
      <div className="manage-subscription">
        <Header title="Manage Subscription" subtitle="No active subscription found." />
        <p className="mt-4 text-gray-600">You do not currently have any active subscriptions.</p>
        <Button className="bg-indigo-600 text-white px-12 py-2 rounded-md mt-16" onClick={() => router.push("/subscriptions")}>
          Subscribe Now
        </Button>
      </div>
    );
  }

  // const subscription_price = Number(price?.unit_price?.amount || 0) / 100;
  const subscription_price = Number(price?.unit_price?.amount || 0) / 100;
  const tax = subscription_price * 0.1;
  const total = (subscription_price + tax).toFixed(2);
  const tax_formatted = tax.toFixed(2);
  const tax_by_percentage = "Tax: 10%";


  return (
    <div className="manage-subscription">
      <Header title="Manage Subscription" subtitle="Purchase of Subscription Plan" />

      <div className="flex flex-col md:flex-row mt-12 gap-6">
        {/* Details */}
        <section className="bg-gray-50 shadow-md p-6 rounded-xl flex-1">
          <h3 className="text-gray-800 font-bold text-xl">Details</h3>
          <div className="grid gap-6 mt-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Billing Date</p>
              <p className="text-black font-semibold">
                {payment.createdAt ? formatDate(payment.createdAt) : "MM/DD/YYYY"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Information</p>
              <div className="flex items-center gap-2">
                <div className="bg-purple-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  {payment.type_card.toUpperCase()}
                </div>
                <p className="text-black font-semibold">
                  **** **** **** {payment.last4_card}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Subscription ID</p>
              <p className="text-black break-words">{payment.subscription_id}</p>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="bg-gray-50 shadow-md p-6 rounded-xl flex-1">
          <h3 className="text-gray-800 font-bold text-lg">Products</h3>

          <div className="flex justify-between mt-4">
            <p className="text-sm text-gray-600 mb-1">Subscription Plan:</p>
            <p className="text-black font-semibold">{capitalizeFirst(payment.price_name)}</p>
          </div>

          <div className="flex justify-between mt-2">
            <p className="text-sm text-gray-600 mb-1">Subscription Period:</p>
            <span className="text-sm text-black font-bold">
              {formatDate(payment.first_billed_at)} – {formatDate(payment.next_billed_at)}
            </span>
          </div>

          <div className="flex justify-between mt-2">
            <div className="mt-2">
              <span className={`px-2 py-1 rounded-sm text-sm font-medium ${payment.status === "active" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}>
                ● {payment.status === "active" ? "Recurring payment" : "Not active"}
              </span>
            </div>
            <div>
              <p className="text-black font-semibold">$ {subscription_price.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mb-1">{tax_by_percentage}</p>
            </div>
          </div>

          <div className="mt-4">
            <hr className="my-2 border-t border-gray-300" />
            <div className="flex justify-between mt-4">
              <p className="text-black font-sm">Subtotal:</p>
              <p className="text-gray-600 font-semibold">$ {subscription_price.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-black font-sm">Tax:</p>
              <p className="text-gray-600 font-semibold">$ {tax_formatted}</p>
            </div>
            <hr className="my-2 border-t border-gray-300" />
            <div className="flex justify-between">
              <p className="text-black font-bold">Total (Inc. tax):</p>
              <p className="text-black font-bold">$ {total}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Action Section */}
      <div className="mt-8 p-4 bg-gray-50 shadow-md rounded-xl flex items-center justify-between">
        <div>
          <p className="text-gray-800 font-bold text-lg">{payment.price_name}</p>
          <p className="text-black font-bold text-sm mt-2 mb-2">
            $ {total}/{payment.billing_interval}
          </p>
          <span className={`px-2 py-1 rounded-sm text-sm font-medium ${payment.status === "active" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"}`}>
            ● {payment.status === "active" ? "Active" : "Not Active"}
          </span>
        </div>

        {payment.status === "active" ? (
          <Button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            Cancel Subscription
          </Button>
        ) : (
          <Button
            type="button"
            className="bg-indigo-600 text-white px-12 py-2 rounded-md"
            onClick={() => router.push("/subscriptions")}
          >
            Subscribe
          </Button>
        )}
      </div>

      {/* Dialog Cancel Confirmation Logout Model */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl text-black font-semibold mb-4">Confirm Cancel Subscription?</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to cancel your subscription?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 font-semibold text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 font-semibold text-white px-4 py-2 rounded-md"
                onClick={handleCancel}
                
              >
                Yes, Cancel
              </button>
              
              {/* <button
                className="bg-red-600 hover:bg-red-700 font-semibold text-white px-4 py-2 rounded-md"
                onClick={async () => {
                  await handleCancel(); // Wait for cancellation to complete
                  window.location.reload(); // Then refresh the page
                }}
              >
                Yes, Cancel
              </button> */}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageSubscription;
