import { Flex, Text } from "@mantine/core";
import Header from "../../components/header/Header";
import { USER } from "../../utils/constants";
import Filters from "../../components/Filters/Filters";
import classes from "./Requests.module.css";
import { useEffect, useState } from "react";
import Request from "../../components/Request/Request";
import { eventFilter } from "../../utils/functions";

const requestedOrganizers = [
  {
    uid: "blah",
    name: "Optimus Prime",
  },
];

const requested = [
  {
    uid: "blah",
    title: "Event title",
    desc: "Ea mollit quis ea laborum. Excepteur elit aliquip nulla sit enim Lorem fugiat incididunt et esse officia deserunt eiusmod pariatur. Cillum minim enim laborum pariatur non deserunt laborum nisi nostrud est esse. Ipsum ex veniam ut commodo. Sunt est sit magna ex ex aliqua excepteur non. Dolor in laboris veniam magna Lorem laborum ex minim non tempor ipsum aliquip fugiat. Eu sunt irure elit non deserunt ut veniam ut sint ad cillum cillum. Consequat elit elit cupidatat amet duis enim ut Lorem excepteur duis. Duis labore cillum dolore non est do enim reprehenderit.",
    tags: USER.TAGS.slice(0, 3),
    time: new Date(2024, 4, 29),
    location: "chennai",
    limit: 20,
    opted: [],
  },
  {
    uid: "blah",
    title: "Event title",
    desc: "Ea mollit quis ea laborum. Excepteur elit aliquip nulla sit enim Lorem fugiat incididunt et esse officia deserunt eiusmod pariatur. Cillum minim enim laborum pariatur non deserunt laborum nisi nostrud est esse. Ipsum ex veniam ut commodo. Sunt est sit magna ex ex aliqua excepteur non. Dolor in laboris veniam magna Lorem laborum ex minim non tempor ipsum aliquip fugiat. Eu sunt irure elit non deserunt ut veniam ut sint ad cillum cillum. Consequat elit elit cupidatat amet duis enim ut Lorem excepteur duis. Duis labore cillum dolore non est do enim reprehenderit.",
    tags: USER.TAGS.slice(3, 5),
    time: new Date(2024, 4, 29),
    location: "chennai",
    limit: 20,
    opted: [],
  },
  {
    uid: "blah",
    title: "Event title",
    desc: "Ea mollit quis ea laborum. Excepteur elit aliquip nulla sit enim Lorem fugiat incididunt et esse officia deserunt eiusmod pariatur. Cillum minim enim laborum pariatur non deserunt laborum nisi nostrud est esse. Ipsum ex veniam ut commodo. Sunt est sit magna ex ex aliqua excepteur non. Dolor in laboris veniam magna Lorem laborum ex minim non tempor ipsum aliquip fugiat. Eu sunt irure elit non deserunt ut veniam ut sint ad cillum cillum. Consequat elit elit cupidatat amet duis enim ut Lorem excepteur duis. Duis labore cillum dolore non est do enim reprehenderit.",
    tags: USER.TAGS.slice(5, 9),
    time: new Date(2024, 4, 29),
    location: "chennai",
    limit: 20,
    opted: [],
  },
];

const Requests = () => {
  const [filters, setFilters] = useState({
    title: "",
    tags: [],
    date: null,
  });

  const [filteredRequestedEvents, setFilteredRequestedEvents] =
    useState(requested);

  useEffect(() => {
    setFilteredRequestedEvents(
      requested.filter((event) => eventFilter(filters, event))
    );
  }, [filters]);

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
                (org) => org.uid === event.uid
              )}
            />
          ))}
        </div>
      </Flex>
    </>
  );
};

export default Requests;
