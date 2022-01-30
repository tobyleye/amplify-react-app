import { API } from "aws-amplify";
import { Input } from "antd";
import { useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";

function Admin({ onAddProduct }) {
  let [itemInfo, setItemInfo] = useState({
    name: "bag of rice",
    price: "2000",
  });
  let updateItemInfo = (e) =>
    setItemInfo((info) => ({ ...info, [e.target.name]: e.target.value }));

  let addNewItem = async (e) => {
    e.preventDefault();
    try {
      let data = {
        body: {
          ...itemInfo,
          price: Number(itemInfo.price),
        },
      };
      await API.post("ecommerceapi", "/products", data);
      onAddProduct()
    } catch (err) {
      console.log("error adding item:", err);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={addNewItem}>
        <Input
          value={itemInfo.name}
          name="name"
          placeholder="name"
          onChange={updateItemInfo}
          required
        />
        <Input
          value={itemInfo.price}
          name="price"
          placeholder="price"
          onChange={updateItemInfo}
          required
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "auto",
  },
};

export default withAuthenticator(Admin);
