import { useContext, useEffect, useState } from "react";
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

  const [filters, setFilters] = useState({
    title: "",
    tags: [],
    date: null,
  });

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);

  return (
    <>
      <Header />
      <Flex>
        <Filters
          className={classes.homeFilters}
          filters={filters}
          setFilters={setFilters}
        />
        <Events filters={filters} className={classes.homeEvents} />
      </Flex>
    </>
  );
};

export default Home;
