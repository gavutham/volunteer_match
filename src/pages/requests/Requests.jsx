import { Flex, Text } from "@mantine/core";
import Header from "../../components/header/Header";
import Filters from "../../components/Filters/Filters";
import classes from "./Requests.module.css";
import { useContext, useEffect, useState } from "react";
import Request from "../../components/Request/Request";
import { eventFilter } from "../../utils/functions";
import { Context } from "../../context/context";
import api from "../../services/api";

const Requests = () => {
  const { user } = useContext(Context);
  const [requests, setRequests] = useState([]);
  const [requestedOrganizers, setRequestedOrganizers] = useState([]);

  const [filters, setFilters] = useState({
    title: "",
    tags: [],
    date: null,
  });

  const [filteredRequestedEvents, setFilteredRequestedEvents] =
    useState(requests);

  useEffect(() => {
    setFilteredRequestedEvents(
      requests.filter((event) => eventFilter(filters, event))
    );
  }, [filters, requests]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const detailsProm = user.requests.map(async (eventId) => {
          const res = await api.get("/event/" + eventId);
          if (res.status === 200) {
            return { ...res.data, time: new Date(res.data.time) };
          }
        });

        const eventDetails = await Promise.all(detailsProm);
        setRequests(eventDetails);
      } catch (error) {
        console.log(error);
      }
    };
    getRequests();
  }, [user]);

  useEffect(() => {
    const orgs = [...new Set(requests.map((r) => r.uid))];
    const getUsers = async () => {
      try {
        const usersProm = orgs.map(async (uId) => {
          const res = await api.get("/user/" + uId);
          if (res.status === 200) {
            return res.data;
          }
        });

        const users = await Promise.all(usersProm);
        setRequestedOrganizers(users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [requests]);

  return (
    <>
      <Header />
      <Flex className={classes.requests}>
        <Filters
          className={classes.requestsFilters}
          filters={filters}
          setFilters={setFilters}
        />
        <div className={classes.requestsEvents}>
          <Text fw={500} fz={"32px"} mb="lg">
            Requests for Events
          </Text>
          {filteredRequestedEvents.map((event, index) => (
            <Request
              key={index}
              event={event}
              organizer={requestedOrganizers.find(
                (org) => org._id === event.uid
              )}
            />
          ))}
        </div>
      </Flex>
    </>
  );
};

export default Requests;
