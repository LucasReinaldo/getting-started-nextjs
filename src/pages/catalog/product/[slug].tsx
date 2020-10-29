import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState } from "react";

const AddToCartModal = dynamic(
  () => import("../../../components/AddToCartModal"),
  { loading: () => <p>Loading...</p>, ssr: false }
);

export default function Product() {
  const router = useRouter();
  const [addToCart, setAddToCart] = useState(false);

  function handleAddToCart() {
    setAddToCart(true);
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <button onClick={handleAddToCart}>Add</button>
      {addToCart && <AddToCartModal />}
    </div>
  );
}
