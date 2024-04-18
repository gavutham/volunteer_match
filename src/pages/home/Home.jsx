import { useContext, useEffect } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  //implement after the testing of login and signup

  // useEffect(() => {
  //   if (user === null) navigate("/login");
  // }, [user]);

  return <div>Hi {user?.name}</div>;
};

export default Home;
