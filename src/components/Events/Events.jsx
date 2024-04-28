/* eslint-disable react/prop-types */
import { Box, Loader, SimpleGrid, Text } from "@mantine/core";
import EventCard from "../EventCard/EventCard";
import { useEffect, useState } from "react";
import { eventFilter } from "../../utils/functions";
import api from "../../services/api";

const Events = ({ className, filters }) => {
  const [events, setEvents] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredEvents(events.filter((event) => eventFilter(filters, event)));
  }, [filters, events]);

  useEffect(() => {
    setLoading(true);
    const getEvents = async () => {
      try {
        var res = await api.get("/event");
        if (res.status === 200) {
          setEvents(res.data.map((e) => ({ ...e, time: new Date(e.time) })));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getEvents();
    setLoading(false);
  }, []);

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
      <Text fw={500} fz={"32px"} px="lg" pt="md">
        Checkout the Events Happening !!
      </Text>
      {isLoading ? (
        <Loader color="#003C43" type="dots" />
      ) : (
        <SimpleGrid cols={2} p="lg" spacing="xl">
          {filteredEvents.map((event, index) => (
            <EventCard
              event={event}
              key={index}
              organizer={organizers.find((org) => org._id === event.uid)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Events;
