import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { jobById } from "../../services";
import styles from "./jobdetails.module.css";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import stipendImg from "../../assets/stipend.png";

const JobDetails = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const { isLoggedIn, logOut } = useAuth();

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  useEffect(() => {
    const fetchJobDetail = async () => {
      if (!id) {
        toast.error("Invalid job ID");
        return;
      }
      try {
        const response = await jobById(id);
        setJobDetails(response);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchJobDetail();
  }, [id]);
  const handleLogOut = () => {
    logOut();
    navigate("/");
    toast.success("Logged out successfully");
  };
  const editBtn = () => {
    if (localStorage.getItem("userId") === jobDetails.userId) {
      return true;
    } else {
      return false;
    }
  };
  
  const splitDescription =
    jobDetails && jobDetails.description
      ? jobDetails.description.split(/(?=\d+\.\s)/) 
      : [];

  const name = localStorage.getItem("name");

  return (
    <div className={styles.jobdetailContainer}>
      <header className={styles.header}>
        <h1>Jobfinder</h1>
        {isLoggedIn ? (
          <div className={styles.loggedInHeader}>
            <button className={styles.logoutBtn} onClick={handleLogOut}>
              Logout
            </button>
            <span>Hello! {name}</span>
          </div>
        ) : (
          <div className={styles.btn}>
            <button className={styles.btn1} onClick={handleSignIn}>
              Login
            </button>
            <button className={styles.btn2} onClick={handleSignUp}>
              Register
            </button>
          </div>
        )}
      </header>
      {jobDetails ? (
        <div className={styles.jobWrapper}>
          <div className={styles.headerWrapper}>
            <div className={styles.jobHeader}>
              <p>
                {jobDetails.jobPosition} work from home job/internship at{" "}
                {jobDetails.company}
              </p>
            </div>
          </div>
          <div className={styles.allInfo}>
            <div className={styles.allInfoHeader}>
              <h2>1w ago</h2>
              <h3>{jobDetails.jobType}</h3>
              <div className={styles.logo}>
                <img src={jobDetails.logoUrl} alt="" />
              </div>
              <h4>{jobDetails.company}</h4>
            </div>

            <div className={styles.name}>
              <h1>{jobDetails.jobPosition}</h1>
              {editBtn() && (
                <button onClick={() => navigate(`/edit/${jobDetails._id}`)}>
                  Edit job
                </button>
              )}
            </div>

            <div className={styles.location}>
              <pre>{jobDetails.location} | India</pre>
            </div>
            <div className={styles.salary}>
              <div className={styles.stipend}>
                <div className={styles.stipendImg}>
                  <img src={stipendImg} alt="stipendImg" />
                </div>
                <h3>Stipend</h3>
              </div>
              <pre>Rs {jobDetails.salary}/month</pre>
            </div>

            <div className={styles.aboutCompany}>
              <h2>About company</h2>
              <div className={styles.about}>
                <p>{jobDetails.about}</p>
              </div>
            </div>
            <div className={styles.companyDescription}>
              <h2>About the job/internship</h2>
              <div className={styles.description}>
                {splitDescription && splitDescription.length > 0 ? (
                  splitDescription.map((item, index) => (
                    <p key={index}>{item.trim()}</p> 
                  ))
                ) : (
                  <p>
                    {jobDetails?.description?.trim() ||
                      "No description available."}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.skills}>
              <pre>Skill(s) required</pre>
              <div className={styles.skill}>
                {jobDetails.skills.map((s, i) => (
                  <p key={i}>{s}</p>
                ))}
              </div>
            </div>

            <div className={styles.companyInformation}>
              <h2>Additional Information</h2>
              <div className={styles.Information}>
                <p>{jobDetails.information}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading job details...</p>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
