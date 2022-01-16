import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

function Profile(props) {
  console.log("profile props = ", props);
//   let [user, setUser] = useState(null);

//   let loadUser = async () => {
//     try {
//       let data = await Auth.currentUserPoolUser();
//       let userInfo = {username: data.username, ...data.attributes}
//       setUser(userInfo);
//     } catch (err) {
//       console.log("load user failed", e);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);   

  let user = null
  if (props.user) {
      user = {
         username:  props.user.username,
         ...props.user.attributes
      }
  }

  return (
    <div>
      <h3>Profile</h3>
      {user && (
        <>
          <h4>username: {user.username}</h4>
          <h4>email: {user.email}</h4>
          <h4>phone: {user.phone}</h4>
          <button onClick={props.signOut}>Signout</button>
        </>
      )}
    </div>
  );
}

export default withAuthenticator(Profile);
