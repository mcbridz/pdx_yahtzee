import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import "../styles/Profile.css";

const Profile = (props) => {
  const [updateUser, setUpdateUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  // const [newPassword, setNewPassword] = useState("");
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);

  function onClose() {
    newAvatar();
    setPreview(null);
  }
  function onCrop(pv) {
    setPreview(pv);
  }
  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleChange = (evt) => {
    setUpdateUser({ ...updateUser, [evt.target.name]: evt.target.value });
  };

  const newAvatar = () => {
    setAvatar(preview);
  };

  const getUserInfo = () => {
    fetch("/" + props.credentials.username, {
      headers: {
        Authorization: `Bearer ${props.credentials.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setUpdateUser(user);
      });
  };

  useEffect(() => {
    getUserInfo();
  });

  return (
    <div>
      <h1 className="profile-title">{props.credentials.username}'s Profile</h1>
      <div className="profile-edit-form">
        <h2>Upload an Avatar</h2>
        <div id="avatar-div">
          <Avatar
            width={150}
            height={150}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
            src={null}
          />

          {preview || avatar ? (
            <img
              src={preview ? preview : avatar}
              alt="Preview"
              id="avatar-preview"
            />
          ) : (
            ""
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label for="username">Username:</label>
            <input
              type="text"
              value={updateUser.username}
              onChange={handleChange}
              name="username"
            />
            <input
              type="text"
              value={updateUser.firstName}
              onChange={handleChange}
              name="firstName"
            />
            <input
              type="text"
              value={updateUser.lastName}
              onChange={handleChange}
              name="lastName"
            />
            <input
              type="email"
              value={updateUser.email}
              onChange={handleChange}
              name="email"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
