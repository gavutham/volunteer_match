import { useContext, useEffect } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "@mantine/core";
import Header from "../../components/header/Header.jsx";

const Home = () => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);

  return (
    <>
      <Header />
      i\ho
      <Text fw={500}>Hi {user?.name}</Text>
      {user && (
        <Button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</Button>
      )}
    </>
  );
};

export default Home;
