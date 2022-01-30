import {API} from "aws-amplify";
import { Input } from "antd";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { withAuthenticator } from "@aws-amplify/ui-react";

function Admin({}) {
  let [itemInfo, setItemInfo] = useState({});
  let updateItemInfo = (e) =>
    setItemInfo((info) => ({ ...info, [e.target.name]: e.target.value }));

  let addNewItem = async (e) => {
      e.preventDefault()
    try {
      let data = {
        body: {
          ...itemInfo,
          price: Number(itemInfo),
        },
      };
      await API.post("ecommerceapi", "/products", data);
    } catch (err) {
      console.log("error adding item:", err);
    }
  };


  return (
    <div style={styles.container}>
      <form onSubmit={addNewItem}>
        <Input
          name="name"
          placeholder="name"
          onChange={updateItemInfo}
          required
        />
        <Input
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

const styles={
    container:{
        maxWidth: 400,
        margin:'auto'
    }
}

export default withAuthenticator(Admin)