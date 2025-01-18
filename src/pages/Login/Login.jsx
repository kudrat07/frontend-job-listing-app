import React, {useEffect, useState} from 'react'
import styles from "./login.module.css"
import { useNavigate } from 'react-router-dom';
import {login} from "../../services/index"
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useAuth } from '../../Context/AuthContext';


const Login = () => {
  const {logIn} = useAuth()
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleSignUp = () => {
    navigate("/register")
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email) {
      return toast.error("Email is required");
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return toast.error("Email is invalid");
    }
    if (!formData.password) {
      return toast.error("Password is required");
    }
    setIsLoading(true);
    try {
      const response = await login(formData);
      if (response.message === "Logged in successfully") {
        toast.success(response.message);
          localStorage.setItem("token",response.token)

          if(response.token){
            logIn()
            localStorage.setItem("name",response.user.name)
            localStorage.setItem("userId",response.user._id)
          }

        setFormData({
          email: "",
          password: "",
        });
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
        <h1>Already have an account?</h1>
        <h3>Your personal job finder is here</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='email'
            id='email'
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="text"
            name='password'
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign in"}
          </button>
      <h4>Don’t have an account? <span className={styles.span} onClick={handleSignUp}>Sign Up</span></h4>
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


export default Login
