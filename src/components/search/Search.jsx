import React,{useState} from "react";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import arrow from "../../assets/arrow.png"
import styles from "./search.module.css";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";


const Search = () => {
    const {isLoggedIn} = useAuth()
    const [value, setValue] = useState([]);
    const [showSkills, setShowSkills] = useState(false);
    const navigate = useNavigate()

    const handleSkillsOption = (skill) => {
        setShowSkills(!showSkills)
        setValue((prev) => (
          prev.includes(skill) ? prev : [...value,skill]
        ))
      };
    
      const removeSkill = (skill) => {
        setValue((prev) => (prev.filter((s) => (s !== skill))))
      }
      const clearSkill = () => {
        setValue([])
      }
  
  return (
    <>
      <div className={styles.skillContainer}>
        <div className={styles.skillWrapper}>
          <div className={styles.searchInput}>
            <FiSearch className={styles.searchIcon} />
            <input type="text" placeholder="Type any job title" />
          </div>
          <div className={styles.skills}>
            <div className={styles.list}>
              <p onClick={() => setShowSkills(!showSkills)}>
                skills <img src={arrow} alt="" />
              </p>
              {showSkills && (
                <ul>
                  {["Frontend", "Backend", "CSS", "JavaScript"].map(
                    (skill, index) => (
                      <li key={index} onClick={() => handleSkillsOption(skill)}>
                        {skill}
                      </li>
                    )
                  )}
                </ul>
              )}
              {value.map((val, index) => (
                <div className={styles.selectedSkills} key={index}>
                  <p>{`${val}`}</p>
                  <button onClick={() => removeSkill(val)}>X</button>
                </div>
              ))}
            </div>
            <div className={styles.skillsBtn}>
              {isLoggedIn && <button className={styles.skillsBtn1} onClick={() => (navigate("/create"))}>+ Add Job</button>}
              <button className={styles.skillsBtn1}>Apply Filter</button>
              <button className={styles.skillsBtn2} onClick={clearSkill}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
