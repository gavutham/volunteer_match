import { useContext, useEffect } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import Events from "../../components/Events/Events.jsx";
import { Flex } from "@mantine/core";
import Filters from "../../components/Filters/Filters.jsx";
import classes from "./Home.module.css";

const Home = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);

  return (
    <>
      <Header />
      <Flex>
        <Filters className={classes.homeFilters} />
        <Events className={classes.homeEvents} />
      </Flex>
    </>
  );
};

export default Home;
