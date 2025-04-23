// pages/success.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    // Get session_id from query string (passed by Stripe)
    const { session_id } = router.query;

    // You can use session_id to fetch additional data, like the order, from your backend if needed
    console.log("Payment successful, session ID:", session_id);

    // Optionally, you can use this session_id to verify the payment status from your backend
  }, [router.query]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-4xl font-bold">Thank you for your order!</h1>
      <p>Your payment was successful.</p>
    </div>
  );
}
