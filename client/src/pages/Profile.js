// import React, { useState } from "react";
// // import Avatar from "react-avatar-edit";
// import "../styles/Profile.css";

// const Profile = (props) => {
//   const [newUsername, setNewUsername] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [preview, setPreview] = useState(null);
//   const [avatar, setAvatar] = useState(null);

//   function onClose() {
//     newAvatar();
//     setPreview(null);
//   }
//   function onCrop(pv) {
//     setPreview(pv);
//   }
//   function onBeforeFileLoad(elem) {
//     if (elem.target.files[0].size > 71680) {
//       alert("File is too big!");
//       elem.target.value = "";
//     }
//   }

//   const handleSubmit = (evt) => {
//     evt.preventDefault();
//   };

//   const newAvatar = () => {
//     setAvatar(preview);
//   };

//   return (
//     <div>
//       <h1 className="profile-title">{props.credentials.username}'s Profile</h1>
//       <div className="profile-edit-form">
//         <h2>Upload an Avatar</h2>
//         <div id="avatar-div">
//           <Avatar
//             width={150}
//             height={150}
//             onCrop={onCrop}
//             onClose={onClose}
//             onBeforeFileLoad={onBeforeFileLoad}
//             src={null}
//           />

//           {preview || avatar ? (
//             <img
//               src={preview ? preview : avatar}
//               alt="Preview"
//               id="avatar-preview"
//             />
//           ) : (
//             ""
//           )}
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label for="username">Username:</label>
//             <input type="text" value={props.credentials.username} />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;
