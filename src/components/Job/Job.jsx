import React, { useEffect, useState } from "react";
import styles from "./job.module.css";
import { DeleteJobById, getJobs } from "../../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";

const Job = () => {
  const [job, setjob] = useState([]);
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth()

  useEffect(() => {
    const job = async () => {
      try {
        const response = await getJobs();
        setjob(response);
      } catch (error) {
        console.log(error);
      }
    };
    job();
  }, [isLoggedIn]);

  const isEditable = (job) => {
    if (localStorage.getItem("userId") === job.userId) {
      return true;
    } else {
      return false;
    }
  };
  const handleDelete = async(job) => {
    if (localStorage.getItem("userId") === job.userId) {

      const userConfirmed = window.confirm(
        "Are you sure you want to delete this job?"
      );
      if (!userConfirmed) {
        return;
      }

      try {
        const response = await DeleteJobById(job._id);
        setjob((prevJobs) => prevJobs.filter((j) => j._id !== job._id));
        if (response.message === "job deleted successfully") {
          toast.success(response.message);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const handleEdit = (job) => {
    navigate(`/edit/${job._id}`)
  }

  return (
    <>
      {job.map((allJob) => (
        <div className={styles.jobContainer} key={allJob._id}>
          <div className={styles.jobWrapper}>
            <div className={styles.aboutJob}>
              <div className={styles.logo}>
                <img src={allJob.logoUrl} alt="" />
              </div>
              <div className={styles.details}>
                <div className={styles.title}>
                  <h1>{allJob.jobPosition}</h1>
                </div>
                <div className={styles.span}>
                  <span>₹ {allJob.salary}</span>
                  <span> {allJob.location}</span>
                </div>
                <div className={styles.jobType}>
                  <p>{allJob.remoteOffice}</p>
                  <p>{allJob.jobType}</p>
                </div>
              </div>
            </div>
            <div className={styles.aboutSkills}>
              <div className={styles.skills}>
                {allJob.skills.map((skill, index) => (
                  <p key={index}>{skill}</p>
                ))}
              </div>
              <div className={styles.detailsBtn}>
                {isEditable(allJob) && (
                  <button className={styles.detailsBtn1} onClick={() => handleEdit(allJob)}>Edit job</button>
                )}
                {isEditable(allJob) && (
                  <button
                    className={styles.detailsBtn1}
                    onClick={() => handleDelete(allJob)}
                  >
                    Delete job
                  </button>
                )}
                <button
                  className={styles.detailsBtn2}
                  onClick={() => navigate(`/JobDetails/${allJob._id}`)}
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Job;
