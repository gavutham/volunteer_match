import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { Flex } from "@mantine/core";
import classes from "./Events.module.css";
import Filters from "../../components/Filters/Filters";
import { Context } from "../../context/context";
import EventsList from "../../components/EventsList/EventsList";

const Events = () => {
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
          className={classes.eventsFilters}
          filters={filters}
          setFilters={setFilters}
        />
        <EventsList filters={filters} className={classes.eventsEvents} />
      </Flex>
    </>
  );
};

export default Events;
