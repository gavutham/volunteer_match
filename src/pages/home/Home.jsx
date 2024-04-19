import { useContext, useEffect } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";
import { Text } from "@mantine/core";

const Home = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  //implement after the testing of login and signup

  // useEffect(() => {
  //   if (user === null) navigate("/login");
  // }, [user]);

  return <Text fw={500}>Hi {user?.name}</Text>;
};

export default Home;
