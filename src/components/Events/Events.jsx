/* eslint-disable react/prop-types */
import { Box, SimpleGrid, Text } from "@mantine/core";
import EventCard from "../EventCard/EventCard";
import { useEffect, useState } from "react";
import { eventFilter } from "../../utils/functions";
import api from "../../services/api";

const Events = ({ className, filters }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    setFilteredEvents(events.filter((event) => eventFilter(filters, event)));
  }, [filters, events]);

  useEffect(() => {
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
  }, []);

  return (
    <Box className={className}>
      <Text fw={500} fz={"32px"} px="lg" pt="md">
        Checkout the Events Happening !!
      </Text>
      <SimpleGrid cols={2} p="lg" spacing="xl">
        {filteredEvents.map((event, index) => (
          <EventCard event={event} key={index} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Events;
