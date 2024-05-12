import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import Events from "../../components/Events/Events.jsx";
import { Box, Button, Flex, Text } from "@mantine/core";
import Filters from "../../components/Filters/Filters.jsx";
import classes from "./Home.module.css";

const Home = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    title: "",
    tags: user?.tags,
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
        {user?.role === "Volunteer" && (
          <Box className={classes.homeEvents} m="xl">
            <Text fw="bolder" fz={"32px"} my="lg">
              Discover {"What's"} On
            </Text>
            <Text fw="lighter" fz={"26px"}>
              Uncover the pulse of upcoming events!{" "}
            </Text>
            <Events filters={filters} className={classes.homeEvents} />
          </Box>
        )}

        {user?.role === "Organizer" && (
          <Box className={classes.homeEvents} m="xl">
            <Text fw="bolder" fz={"32px"} my="lg">
              Create an Event
            </Text>
            <Text fw="lighter" fz={"26px"}>
              Craft moments, inspire change - ignite your event with purpose.
            </Text>
            <Button
              my="xl"
              variant="outline"
              color="#003C43"
              onClick={() => navigate("/events/create")}
            >
              Click to Create
            </Button>
            <Text fw="bolder" fz={"32px"} my="xl" pt="md">
              Manage Events
            </Text>
            <Text fw="lighter" fz={"26px"} mb="xl">
              Effortlessly orchestrate every detail - master your events with
              ease.
            </Text>
            <Events filters={filters} className={classes.homeEvents} />
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Home;
