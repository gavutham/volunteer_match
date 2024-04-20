import { useContext, useEffect } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import Events from "../../components/Events/Events.jsx";

const Home = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);

  return (
    <>
      <Header />
      <Events />
    </>
  );
};

export default Home;
