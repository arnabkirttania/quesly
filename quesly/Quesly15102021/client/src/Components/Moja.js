import React, { useState } from "react";
import "../Styles/Moja.css";
import { Link } from "react-router-dom";
import brand1 from "../Images/brand1.png";
import { makeStyles } from "@material-ui/core";
import { blueGrey } from "@material-ui/core/colors";
import TrajanPro from '../Fonts/TrajanPro-Bold.otf'
import Fade from 'react-reveal/Fade'


function Moja() {
  const [step, setStep] = useState(1);
  const [bg1, setBg1] = useState("linear-gradient(145deg, #e7cac3, #c2aaa4)");
  const [bx1, setBx1] = useState("1px 3px 1px #9E9E9E");
  const [bg2, setBg2] = useState("linear-gradient(145deg, #e7cac3, #c2aaa4)");
  const [bx2, setBx2] = useState("1px 3px 1px #9E9E9E");
  const [transform1, setTransform1] = useState("scale(1)");
  const [transform2, setTransform2] = useState("scale(1)");
  const [transition1, setTransition1] = useState(".3s");
  const [transition, setTransition2] = useState(".3s");
  const [texts1, setTexts1] = useState("none");
  const [texts2, setTexts2] = useState("none");
  const [clicked, setClicked] = useState(false);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username:"",
    password: "",
    cpassword: "",
    category: ["Health", "Education"],
  });

  let name, value;

  const inputsHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const FormFields = (props) => {
    switch (props.step) {
      case 1:
        {
          return (
            <>
            <Fade top>
              <h1 id="label-text">What is your First Name?</h1>
              
              <input
                className="regfield"
                name="firstname"
                id="fname"
                type="text"
                placeholder="First Name"
                required
                autoFocus
                onChange={inputsHandler}
                value={user.firstname}
              />
              </Fade>
            </>
          );
        }
        break;
      case 2:
        {
          return (
            <>
            <Fade top>
              <h1 id="label-text">May i have your Last Name?</h1>
              
              <input
                className="regfield"
                name="lastname"
                id="fname"
                type="text"
                placeholder="Last Name"
                required
                autoFocus
                onChange={inputsHandler}
                value={user.lastname}
              />
              </Fade>
            </>
          );
        }
        break;
      case 3:
        {
          return (
            <>
              <Fade top>
              <h1 id="label-text">Mind dropping down your Email?</h1>
              
              <input
                className="regfield"
                name="email"
                id="fname"
                type="text"
                placeholder="abc123@gmail.com"
                required
                autoFocus
                onChange={inputsHandler}
                value={user.username}
                
              />
              </Fade>
            </>
          );
        }
        break;
        case 4:
          {
            return (
              <>
              <Fade top>
                <h1 id="label-text">What should we call you?</h1>
                
                {/* <p style={{margin:"0"}}>(Minimum 5 letters)</p> */}
                <input
                  className="regfield"
                  name="username"
                  id="fname"
                  type="text"
                  placeholder="Peter97"
                  required
                  autoFocus
                  onChange={inputsHandler}
                  value={user.email}
                />
                </Fade>
              </>
            );
          }
          break;
      case 5:
        {
          return (
            <>
            <Fade top>
              <h1 id="label-text">Choose Your Interests</h1>
              

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: "7.2rem",
                }}
              >
                <div
                  class="container-fluid"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <input
                    className="category"
                    name="health"
                    type="checkbox"
                    value="health"
                  ></input>
                  <label style={{ fontSize: "1.5rem" }} for="health">
                    Health & Fitness
                  </label>

                  <input
                    className="category"
                    name="education"
                    type="checkbox"
                    value="education"
                  ></input>
                  <label style={{ fontSize: "1.5rem" }} for="education">
                    Education
                  </label>

                  <input
                    className="category"
                    name="lifestyle"
                    type="checkbox"
                    value="lifestyle"
                  ></input>
                  <label style={{ fontSize: "1.5rem" }} for="lifestyle">
                    Lifestyle
                  </label>

                  <input
                    className="category"
                    name="business"
                    type="checkbox"
                    value="business and marketing"
                  ></input>
                  <label style={{ fontSize: "1.5rem" }} for="business">
                    Business & Marketing
                  </label>

                  <input
                    className="category"
                    name="sports"
                    type="checkbox"
                    value="sports"
                  ></input>
                  <label style={{ fontSize: "1.5rem" }} for="trending">
                    Trending
                  </label>
                  
                </div>
               
              </div>
              </Fade>
            </>
          );
        }
        break;
      case 6:
        {
          return (
            <>
            <Fade top>
              <h1 id="label-text">Create your Password</h1>
              
              <input
                className="regfield"
                name="password"
                id="fname"
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                required
                autoFocus
                onChange={inputsHandler}
                value={user.password}
              />
              </Fade>
            </>
          );
        }
        break;
      case 7:
        {
          return (
            <>
            <Fade top>
              <h1 id="label-text">Kindly confirm your Password</h1>
              
              <input
                className="regfield"
                name="cpassword"
                id="fname"
                type="password"
                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                required
                autoFocus
                onChange={inputsHandler}
                value={user.cpassword}
              />
              </Fade>
            </>
          );
        }
        break;
      default: {
        setStep(1);
        return (
          <>
          <Fade top>
            <h1 id="label-text">What is your First Name?</h1>
            
            <input
              className="regfield"
              id="fname"
              type="text"
              placeholder="First Name"
              required
              autoFocus
            />
            </Fade>
          </>
        );
      }
    }
  };

  const hoverEffect1 = () => {
    if (!clicked) {
      setBg1("linear-gradient(145deg, #c2aaa4, #e7cac3)");
      setBx1("inset 5px 5px 11px #c9b0a9,inset -5px -5px 11px #e7cac3");
      setTransform1("scale(1.15)");
      setTransition1(".3s");
      setTexts1("0px 0px 6px rgba(160, 80, 45, 1)");
    }
  };

  const hoverEffect2 = () => {
    if (!clicked) {
      setBg2("linear-gradient(145deg, #c2aaa4, #e7cac3)");
      setBx2("inset 5px 5px 11px #c9b0a9,inset -5px -5px 11px #e7cac3");
      setTransform2("scale(1.15)");
      setTransition2(".3s");
      setTexts2("0px 0px 6px rgba(160, 80, 45, 1)")
    }
  };

  // const clickEffect = () => {
  //   setBg("red");
  // };

  return (
    <div>
     
      <div id="regWrapper" class="container-fluid">
        <div class="container" id="regContainer">
          <img
            style={{ position: "absolute", top: "1.25rem" }}
            src={brand1}
            width="200px"
          />
          <form className="regForm" method="POST">
            <section id="slider">
              <FormFields step={step} />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "4rem",
                  padding: "0",
                }}
                class="container"
              >
                <Fade top>
                <button
                  style={{ background: bg1, boxShadow: bx1, transform: transform1, transition: transition1, textShadow: texts1 }}
                  onMouseEnter={hoverEffect1}
                  onMouseLeave={() => {
                    if (!clicked) {
                      setBx1("1px 3px 1px #9E9E9E");
                      setBg1("linear-gradient(145deg, #e7cac3, #c2aaa4)");
                      setTransform1("scale(1)");
                      setTransition1(".3s");
                      setTexts1("none");
                    }
                  }}
                  type="button"
                  className="prev"
                  onClick={() => {
                    setStep(step - 1);
                    setClicked(!clicked);
                    setBx1("inset 5px 5px 9px #b59f99,inset -5px -5px 9px #fbdbd3");
                    setTransform1("scale(1)");
                    setTexts1("0px 0px 6px rgba(160, 80, 45, 1)");
                  }}
                >
                  <i class="fa fa-chevron-left" aria-hidden="true"></i> Back{" "}
                </button>
                </Fade>

                {step != 7 ? (
                  <Fade top>
                  <button
                    style={{ background: bg2, boxShadow: bx2, transform: transform2, transition: transition1, textShadow: texts2  }}
                    onMouseEnter={hoverEffect2}
                    onMouseLeave={() => {
                      if (!clicked) {
                        setBx2("1px 3px 1px #9E9E9E");
                        setBg2("linear-gradient(145deg, #e7cac3, #c2aaa4)");
                        setTransform2("scale(1)");
                        setTransition2(".3s");
                        setTexts2("none");
                      }
                    }}
                    type="button"
                    className="next"
                    onClick={() => {
                      setStep(step + 1);
                      setClicked(!clicked);
                      setBx2("inset 5px 5px 9px #b59f99,inset -5px -5px 9px #fbdbd3");
                      setTransform2("scale(1)");
                      setTexts2("0px 0px 6px rgba(160, 80, 45, 1)");
                    }}
                  >
                    Next <i class="fa fa-chevron-right" aria-hidden="true"></i>
                  </button>
                  </Fade>
                ) : null}

                {step === 7 ? (
                  <Fade top>
                  <button className="signUp" type="submit">
                    Sign Up
                  </button>
                  </Fade>
                ) : null}
              </div>
            </section>
          </form>
          <Link className="hyperlink" to="/login">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Moja;
