import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = ({ personData, setPersonData, isEditing }) => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    profession: "",
    email: "",
    phone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Check if personData is provided (for editing mode)
    if (personData) {
      setProfile(personData);
    }
  }, [personData]);

  const sendData = async () => {
    try {
      const response = await fetch("http://localhost:5000/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        console.log("form data sent");
      } else {
        console.log("data could not be sent");
      }
    } catch (error) {
      console.log(error);
    }

    navigate("/");
  };

  const updateContent = async () => {
    fetch(`${"http://localhost:5000/profiles"}/${personData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
      })
      .then(() => {
        console.log("data upated succussfully");
      })
      .catch((error) => {
        console.error("Error updating data", error);
      });
    setPersonData(profile);
    navigate("/Dashboard");
  };

  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  function confirmPasswordHandler(e) {
    e.preventDefault();
    const { value } = e.target;
    setConfirmPassword(value);
  }

  function validateInputInfo(e) {
    e.preventDefault();
    let emptyValue = "";

    for (const key in profile) {
      if (profile[key] === "") {
        emptyValue = "please fill all the attributes";
      }
    }
    let error = "";
    if (emptyValue) {
      console.log(emptyValue);
    } else {
      if (profile.phone.length !== 10) {
        error = "please enter 10 digit numbers";
      }
      if (confirmPassword !== profile.password) {
        error = "confirm Password";
      }
      if (error) {
        console.log(`please fix this ${error}`);
      } else {
        isEditing ? updateContent() : sendData();
      }
    }
  }

  return (
    <div className="Container">
      <div className="Registration-card">
        <h2>{isEditing ? "Edit Profile" : "Registration"}</h2>

        <form>
          <div className="form-group">
            <label for="name">Full Name:</label>
            <input
              type="text"
              name="name"
              required
              value={profile.name}
              placeholder="Enter Full Name"
              onChange={handleInputChange}
            />
          </div>

          {/*  */}
          <div className="form-group">
            <label for="profession">Profession:</label>
            <input
              type="text"
              name="profession"
              required
              value={profile.profession}
              placeholder="Enter your profession"
              onChange={handleInputChange}
            />
          </div>

          {/*  */}
          <div className="form-group">
            <label for="email"> Email:</label>
            <input
              type="email"
              name="email"
              required
              value={profile.email}
              placeholder="Enter email "
              onChange={handleInputChange}
            />
          </div>

          {/*  */}
          <div className="form-group">
            <label for="phone">Phone number:</label>
            <input
              type="phone"
              name="phone"
              required
              value={profile.phone}
              placeholder="Enter your phone number"
              onChange={handleInputChange}
            />
          </div>

          {/*  */}
          <div className="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              name="password"
              required
              value={profile.password}
              placeholder="Enter your password"
              onChange={handleInputChange}
            />
          </div>

          {/*  */}
          <div className="form-group">
            <label for="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={confirmPassword}
              placeholder="Please confirm your password"
              onChange={confirmPasswordHandler}
            />
          </div>
          {/*  */}
          <div className="form-group">
            <button type="submit" onClick={validateInputInfo}>
              {isEditing ? "Update Profile" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
