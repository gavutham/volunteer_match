import { useContext, useEffect } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";
import { Button, Text } from "@mantine/core";

const Home = () => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);

  return (
    <>
      <Text fw={500}>Hi {user?.name}</Text>
      {user && (
        <Button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</Button>
      )}
    </>
  );
};

export default Home;
