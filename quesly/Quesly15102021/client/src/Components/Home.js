import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import "../Styles/Home.css";
import bg from "../Images/bg1.jpg";
import { Button } from "@material-ui/core";
import axios from "axios";
import HeadShake from "react-reveal/HeadShake";

function Home() {
  const [query, setQuery] = useState({
    category: null,
    question: "",
    username: "",
  });


  const [submit, setSubmit] = useState(false);
  const [posts, setPosts] = useState([]);
  const [callApi, setCallApi] = useState(false);
  const [user, setUser] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [toggleAnswer,setToggleAnswer] = useState(false);
  const [index, setIndex] = useState("");
  const [index2, setIndex2] = useState("");
  const [loadAnswers,setLoadAnswers] = useState(false);
  const [userAnswer, setUserAnswer] = useState({
    id : "",
    answer : ""
  });

  let name, value;

  const inputsHandler = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setQuery({ ...query, [name]: value,username:user.username });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmit(true);
    if (query.category !== null) {
      const { question, category, username } = query;
      const data = { question, category, username };

      await axios
        .post("/post-question", data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setCallApi(!callApi);
          alert("Question Posted!");
          console.log(response);
        })
        .catch((e) => {
          alert("Failed to Post Question!");
          console.log(e);
        });
      setQuery({ ...query, question: "" });
    }
  };

  const CategoryCheck = () => {
    if (query.category === null && submit) {
      return (
        <HeadShake>
          <p style={{ paddingTop: "1rem", color: "red" }}>
            Please Select a Category!
          </p>
        </HeadShake>
      );
    } else {
      return null;
    }
  };

  const loadPosts = async () => {
    await axios
      .get("/getQueries-by-user")
      .then((response) => {
        setPosts(response.data);

        console.log(response.data);

        // setUserAnswers(response.data.answers);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const inputAnswer = (e,id) => {
    setUserAnswer({...userAnswer,answer:e.target.value,id:id});
  }

  const submitAnswer = async (e) => {
    await axios.post('/post-answer',userAnswer,{headers:{"Content-Type" : "application/json"}})
    .then((response) => {
      console.log(response);
      setLoadAnswers(!loadAnswers);
      alert("Answer Posted!");
    }).catch((e) => {
      console.log(e);
      alert("Could not Post Answer!");
    })
    setUserAnswer({...userAnswer,answer:"",id:""});
  }
  console.log(userAnswer);

  const getUser = async () => {
    await axios
      .get("/getUser")
      .then((response) => {
        setUser(response.data);
        setQuery({ ...query, username: user.username });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const showAnswerSection = async (index) => {
    let i = index;
    setIndex(index);
    setIndex2(i);
    if(index === i){
      setShowAnswer(true);
      setToggleAnswer(!toggleAnswer)
    }
  };



  console.log(showAnswer);

  const history = useHistory();

  if (sessionStorage.getItem("token")) {
    var token = sessionStorage.getItem("token");
  } else {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    getUser();
  }, [callApi]);

  useEffect(() => {
    loadPosts();
  }, [callApi || loadAnswers]);

 

  return (
    <>
      {token ? (
        <>
          <Navbar />

          <div style={{ background: "#f1f2f2" }} class="container-fluid">
            <div id="home-wrapper" class="row">
              <div id="dummy" class="col-0 col-md-3 col-lg-3"></div>
              <div id="questionWrapper" class="col-12 col-md-6 col-lg-6">
                <div id="user_info_wrapper">
                  <div className="question-box">
                    <div id="inner_question">
                      <div id="user_info">
                        <div id="user_img_container">
                          <img id="user_img" src={bg} />
                        </div>
                        <h4
                          style={{
                            marginBottom: "0",
                            paddingLeft: "1rem",
                            textTransform: "capitalize",
                          }}
                        >
                          {user.username}
                        </h4>
                      </div>

                      <textarea
                        value={query.question}
                        name="question"
                        onChange={inputsHandler}
                      />
                      <div id="button_container">
                        <Button
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          id="question_post"
                          variant="outlined"
                        >
                          Select Category
                        </Button>
                        <Button
                          onClick={submitHandler}
                          id="question_post"
                          variant="outlined"
                        >
                          Post A Question
                        </Button>
                      </div>
                      <CategoryCheck />
                    </div>
                  </div>
                </div>
                {posts.map((elem, index) => {
                  return (
                    <div id="posts" key={index}>
                      <div id="post-wrapper">
                        <div id="user-outer">
                          <div id="user_info">
                            <div id="user_img_container">
                              <img id="user_img" src={bg} />
                            </div>
                            <div>
                            <h4
                              style={{
                                marginBottom: "0",
                                paddingLeft: "1rem",
                                textTransform: "capitalize",
                              }}
                            >
                              {elem.username}
                            </h4>
                            <p style={{margin:"0", paddingLeft: "1rem",fontSize:"1rem",
                                textTransform: "capitalize"}}>{elem.category}</p>
                            </div>
                          </div>
                        </div>

                        <div id="question-wrapper">
                          <p>{elem.question}</p>
                        </div>
                      </div>
                      <div
                        style={{ margin: "0" }}
                        class="dropdown-divider"
                      ></div>

                      <div id="reaction-bar">
                        <div id="inner-reaction-bar">
                          <div id="upvote-wrapper">
                            <i
                              style={{
                                fontSize: "2rem",
                                marginLeft: "1.25rem",
                              }}
                              class="fa fa-arrow-up"
                              aria-hidden="true"
                            ></i>
                            <p
                              style={{
                                marginBottom: "0",
                                marginLeft: "0.5rem",
                                fontWeight: "700",
                                marginRight: "1rem",
                              }}
                            >
                              Upvotes
                            </p>
                          </div>

                          <div
                            onClick={() => showAnswerSection(index)}
                            id="answer-wrapper"
                          >
                            <i
                              style={{
                                fontSize: "2rem",
                                marginLeft: "1.25rem",
                              }}
                              class="fa fa-comment-o"
                              aria-hidden="true"
                            ></i>
                            <p
                              style={{
                                marginBottom: "0",
                                marginLeft: "0.5rem",
                                fontWeight: "700",
                                marginRight: "1.25rem",
                              }}
                            >
                              Answers
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                      style={{margin:"0"}}
                        class="dropdown-divider"
                      ></div>

                      {index == index2 && showAnswer? (
                        <>
                          <div id="answers-wrapper" key={index}>
                            <div id="add-answer">
                              <div id="answer_user_info">
                               
                                  <div id="user_img_container">
                                    <img id="user_img" src={bg} />
                                  </div>

                                  <input
                                    id="add_answer"
                                    placeholder="Add an answer..."
                                    value={userAnswer.answer}
                                    onChange={(e) => {inputAnswer(e,elem._id)} }
                                  ></input>
                                  

                                <Button style={{position:"relative",marginRight:"4rem"}} onClick={()=> submitAnswer(elem._id) } color="primary" variant="contained">
                                  Add Answer
                                </Button>
                                <i onClick={() => setShowAnswer(false)} style={{marginBottom:"1.5rem",cursor:"pointer",fontSize:"1.25rem"}} class="fa fa-times" aria-hidden="true"></i>
                              </div>
                            </div>

                            <div
                              style={{ marginBottom: "0" }}
                              class="dropdown-divider"
                            ></div>

                            <div id="answer_section">

                            {elem.answers.map((element) => {
                                return (
                              <div style={{marginTop:"0.8rem"}}>                      
                              <div id="user_info" style={{ height: "3rem" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    height: "100%",
                                    alignItems: "center",
                                    marginLeft: "1.5rem",
                                  }}
                                >
                                  <div id="answer_user_img_container">
                                    <img id="answer_user_img" src={bg} />
                                  </div>
                                  <h5
                                    style={{
                                      marginBottom: "0",
                                      paddingLeft: "0.5rem",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Sayak
                                  </h5>
                                </div>
                              </div>
                              
                                    <div id="user_answer" key={index}>
                                      <p style={{ marginBottom: "0.5rem" }}>
                                        {element.answer}
                                      </p>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <i
                                          style={{ fontSize: "1.25rem" }}
                                          class="fa fa-arrow-up"
                                          aria-hidden="true"
                                        ></i>
                                        <p
                                          style={{
                                            margin: "0",
                                            paddingLeft: "0.5rem",
                                          }}
                                        >
                                          {element.upvotes}
                                        </p>
                                      </div>
                                    </div>
                                    <div style={{marginBottom:"0"}} class="dropdown-divider"></div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* <div style={{margin:"0"}} class="dropdown-divider"></div> */}
                          </div>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div id="dummy" class="col-0 col-md-3 col-lg-3"></div>
            </div>

            <div
              class="modal fade"
              id="exampleModalCenter"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Please Select Your Category
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form id="category_form">
                      <div class="form-check">
                        <label
                          for="health"
                          class="form-check-input"
                          value="health"
                        >
                          Health & Fitness
                        </label>
                        <input
                          type="radio"
                          name="category"
                          onChange={inputsHandler}
                          value="health"
                          class="form-control shadow-none"
                          id="health"
                        />
                      </div>

                      <div class="form-check">
                        <label
                          for="business"
                          class="form-check-input"
                          value="business"
                        >
                          Business & Marketing
                        </label>
                        <input
                          type="radio"
                          name="category"
                          onChange={inputsHandler}
                          value="business"
                          class="form-control shadow-none"
                          id="business"
                        />
                      </div>

                      <div class="form-check">
                        <label
                          for="lifestyle"
                          class="form-check-input"
                          value="lifestyle"
                        >
                          Lifestyle
                        </label>
                        <input
                          type="radio"
                          name="category"
                          onChange={inputsHandler}
                          value="lifestyle"
                          class="form-control shadow-none"
                          id="lifestyle"
                        />
                      </div>

                      <div class="form-check">
                        <label
                          for="education"
                          class="form-check-input"
                          value="education"
                        >
                          Education
                        </label>
                        <input
                          type="radio"
                          name="category"
                          onChange={inputsHandler}
                          value="education"
                          class="form-control shadow-none"
                          id="education"
                        />
                      </div>

                      <div class="form-check">
                        <label
                          for="sports"
                          class="form-check-input"
                          value="trending"
                        >
                          Trending
                        </label>
                        <input
                          type="radio"
                          name="category"
                          onChange={inputsHandler}
                          value="trending"
                          class="form-control shadow-none"
                          id="trending"
                        />
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push("/register")
      )}
    </>
  );
}

export default Home;
