import React, { useCallback, useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { useHistory } from "react-router-dom";
import "../styles/Profile.css";

const Profile = (props) => {
  const [updateUser, setUpdateUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
  });
  // const [newPassword, setNewPassword] = useState("");
  const [preview, setPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const history = useHistory();

  const checkLoginStatus = useCallback(() => {
    if (props.credentials.username === "") {
      history.push("/login");
    }
  }, [props.credentials, history]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

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

  async function getUserInfo() {
    await fetch("/" + props.credentials.username, {
      headers: {
        Authorization: `Bearer ${props.credentials.token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((user) => {
        console.log("RESPONSE FOR PROFILE");
        console.log(user);
        setUpdateUser(user);
      });
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Edit Your Profile</h1>
      <div className="profile-edit-form">
        {/* <h2>Upload an Avatar</h2>
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
        </div> */}
        <form onSubmit={handleSubmit}>
          <div className="edit-inputs">
            <div className="label-input-group">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                type="text"
                value={updateUser.username}
                onChange={handleChange}
                name="username"
                id="username"
                className="input"
              />
            </div>
            <div className="label-input-group">
              <label htmlFor="firstName" className="input-label">
                First Name
              </label>
              <input
                type="text"
                value={updateUser.firstName}
                onChange={handleChange}
                name="firstName"
                id="firstName"
                className="input"
              />
            </div>
            <div className="label-input-group">
              <label htmlFor="lastName" className="input-label">
                Last Name
              </label>
              <input
                type="text"
                value={updateUser.lastName}
                onChange={handleChange}
                name="lastName"
                id="lastName"
                className="input"
              />
            </div>
            <div className="label-input-group">
              <label htmlFor="emailAddress" className="input-label">
                Email Address
              </label>
              <input
                type="emailAddress"
                value={updateUser.emailAddress}
                onChange={handleChange}
                name="emailAddress"
                id="emailAddress"
                className="input"
              />
            </div>
          </div>
          <button className="edit-button">Edit Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
