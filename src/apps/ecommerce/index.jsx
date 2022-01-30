import { useEffect, useRef, useState } from "react";
import { API } from "aws-amplify";
import Admin from "./admin";

export default function Main() {
    const [products, setProducts] =useState([])
  const didCancel = useRef(false);

  useEffect(() => {
    retrieveProducts();
    return () => (didCancel.current = true);
  }, []);

  async function retrieveProducts() {
    const data = await API.get("ecommerceapi", "/products");
    console.log('products retrieved =', data)
    if (!didCancel.current) {
      setProducts(data.data.Items);
    }
  }

  return (
    <div>
      <ul>
        <li>{products}</li>
      </ul>

      <Admin />
    </div>
  );
}