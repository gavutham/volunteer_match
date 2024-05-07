/* eslint-disable react/prop-types */
import { Box, Loader, SimpleGrid, Text } from "@mantine/core";
import EventCard from "../EventCard/EventCard";
import { useContext, useEffect, useState } from "react";
import { eventFilter } from "../../utils/functions";
import api from "../../services/api";
import { Context } from "../../context/context";
import { useNavigate } from "react-router-dom";

const EventsList = ({ className, filters }) => {
  const { user } = useContext(Context);
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [isLoading, setLoading] = useState(false);
  const [mutateEvent, setMutateEvent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredEvents(events.filter((event) => eventFilter(filters, event)));
  }, [filters, events]);

  useEffect(() => {
    if (!user) navigate("/login");
  });

  useEffect(() => {
    setLoading(true);
    const getEvents = async () => {
      try {
        const eventsProm = user.events.map(async (id) => {
          const res = await api.get("/event/" + id);
          if (res.status === 200) {
            return res.data;
          }
        });

        const events = await Promise.all(eventsProm);
        setEvents(events.map((e) => ({ ...e, time: new Date(e.time) })));
      } catch (error) {
        console.log(error);
      }
    };

    getEvents();
    setLoading(false);
  }, [mutateEvent, user]);

  useEffect(() => {
    const orgs = [...new Set(events.map((r) => r.uid))];
    const getUsers = async () => {
      try {
        const usersProm = orgs.map(async (uId) => {
          const res = await api.get("/user/" + uId);
          if (res.status === 200) {
            return res.data;
          }
        });

        const users = await Promise.all(usersProm);
        setOrganizers(users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [events]);

  return (
    <Box className={className}>
      {user?.role === "Organizer" ? (
        <Box m="lg">
          <Text fw="bolder" fz={"32px"} my="xl" pt="md">
            Manage Events
          </Text>
          <Text fw="lighter" fz={"26px"} mb="xl">
            Effortlessly orchestrate every detail - master your events with
            ease.
          </Text>
        </Box>
      ) : (
        <Text fw="bolder" fz={"32px"} m="lg" pt="md">
          Registered Events
        </Text>
      )}

      {isLoading ? (
        <Loader color="#003C43" type="dots" />
      ) : (
        <SimpleGrid cols={2} p="lg" spacing="xl">
          {filteredEvents.map((event, index) => (
            <EventCard
              event={event}
              key={index}
              organizer={organizers.find((org) => org._id === event.uid)}
              setMutateEvent={setMutateEvent}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default EventsList;
