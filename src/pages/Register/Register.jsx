import React, { useState } from "react";
import styles from "./register.module.css";
import { register } from "../../services/index";
import toast from "react-hot-toast";
import registerImg from "../../assets/register.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.name.length === 0) {
      return toast.error("Name is required");
    }
    if (!formData.email) {
      return toast.error("Email is required");
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return toast.error("Email is invalid");
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      return toast.error("Phone number is invalid");
    }
    if (!formData.password) {
      return toast.error("Password is required");
    } else if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[!@#$%^&*]/.test(formData.password)
    ) {
      return toast.error("Password is too weak");
    }
    if (!checked) {
      return toast.error("You must agree to the terms and privacy policy");
    }
    setIsLoading(true);
    try {
      const response = await register(formData);
      if (response.message === "user created successfully") {
        toast.success(response.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
        setChecked(false);
        navigate("/")
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  }
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Create an account</h1>
        <h3>Your personal job finder is here</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <div className={styles.checkbox}>
            <input
              id="termsCheckbox"
              type="checkbox"
              name="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label htmlFor="termsCheckbox">
              By creating an account, I agree to our terms of use and privacy
              policy
            </label>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Create Account"}
          </button>
          <h4>
            Already have an account?{" "}
            <span className={styles.span} onClick={handleSignIn}>
              Sign In
            </span>
          </h4>
        </form>
      </div>
      <div className={styles.register_img}>
        <div className={styles.h1}>
          <h1>Your Personal Job Finder</h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
