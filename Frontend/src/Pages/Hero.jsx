import React from "react";
import { useNavigate } from "react-router";
const style = {
  Button: {
    padding: "8px",
    marginLeft: "10px",
    backgroundColor: "grey",
    color: "black",
    fontWeight: "bold",
    border: "2px solid black",
  },
};
const Hero = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Frontend setup is complete for notes mern stack project</h1>
      <button style={style.Button} onClick={()=>{
        navigate("/login")
      }}>
        Login page
      </button>
      <button style={style.Button} onClick={()=>{
        navigate("/signup")
      }}>
        Signup page
      </button>
      <button style={style.Button} onClick={()=>{
        navigate("/notes")
      }}>
        Notes page
      </button>
    </div>
  );
};

export default Hero;
