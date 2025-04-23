// pages/index.tsx
import MenuItem from "@/components/MenuItem";
import { menuItems } from "@/data/menu";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
      <Link href="/checkout" className="mt-6 inline-block text-blue-600 underline">
  Go to Checkout
</Link>
    </div>
  );
}
