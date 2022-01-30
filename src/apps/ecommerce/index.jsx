import { useEffect, useRef, useState } from "react";
import { API } from "aws-amplify";
import Admin from "./admin";
import { List } from "antd"

export default function Main() {
  const [products, setProducts] = useState([]);
  const didCancel = useRef(false);

  useEffect(() => {
    retrieveProducts();
  }, []);

  async function retrieveProducts() {
    const data = await API.get("ecommerceapi", "/products");
    console.log("products retrieved =", data);
    setProducts(data.data.Items);
    
  }

  function onDeleteProduct(item) {
      console.log('delete product')
  }

  return (
    <div>
      <List
        style={{
          marginBottom: 50,
        }}
        bordered
        dataSource={products}
        renderItem={(item) => (
          <List.Item
            actions={[
              <button onClick={() => onDeleteProduct(item)}>delete</button>,
            ]}
          >
            <List.Item.Meta title={item.name} description={`N` + item.price} />
          </List.Item>
        )}
      />

      <Admin onAddProduct={retrieveProducts}/>
    </div>
  );
}
