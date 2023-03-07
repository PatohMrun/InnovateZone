import React, { useState, useE } from "react";
import "../styles/Credentials.css";
import supabase from "../supabase";

const Test = () => {
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    console.log(data);
    if (error) {
      console.error('Sign-up error:', error);
    } else {
      console.log('Sign-up successful');
      const user = data.user;
      console.log('User:', user);
    }
  }


  
  

// Listen for changes in the user's authentication state
// supabase.auth.onAuthStateChange((event, session) => {
//   if (event !== 'SIGNED_IN' && session.user.email_verified) {
//     // User is signed in and email is verified, so update your database
//     // with the user's information
//     console.log("user mot verified");
//     supabase
//       .from('myTable')
//       .insert({ email: session.user.email })
//       .then((data) => {
//         console.log('User added to database');
//         // Perform your desired action here once the user is verified
//         // without the need to refresh the page
//       })
//       .catch((error) => {
//         console.error('Database insert error:', error);
//       });
//   }
//   else{
//     console.log("mmmmmm");
//   }
// });







  
  

  return (
    <div className="testing">
      <form onSubmit={handleSubmit} className="sign_up">
        <div className="form-group">
          <h2>Sign up as Guest Blogger</h2>
          <label htmlFor="name">Name:</label>
          <input
            style={{ padding: "10px" }}
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {emailConfirmed && (
        <p>Please check your email to confirm your email address.</p>
      )}
    </div>
  );
};
export default Test;



// if(user){
//   console.log("The user has been created");
// }
// if (error) {
//   console.log("Error signing up:", error.message);
// } else {
//   console.log("Signed up successfully:");
//     // console.log(user.email);
// //   Send email verification and set email confirmation state
// //   await supabase.auth.api.sendEmailVerification(formData.email);

  
// //   Send confirmation message to the user
//   window.alert(`Thank you for signing up! Please check your email at ${formData.email} to confirm your email address.`);
  
// //   Set up a listener to notify you once the email is confirmed
//   const { data } = await supabase.auth.onAuthStateChange((event, session) => {
//       if (event === "SIGNED_IN") {
//           const emailVerified = session.user.email_verified;
//           if (emailVerified) {
//             console.log("Email Verified");
//               const confirmationMessage = `Email confirmed for user ${session.user.email}`;
//               setEmailConfirmed(true);
//                 window.alert(confirmationMessage);
//       }
//     }
//   });
// }
