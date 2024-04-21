import { Flex, SimpleGrid } from "@mantine/core";
import { USER } from "../../utils/constants";
import EventCard from "../EventCard/EventCard";

const events = [
  {
    uid: "",
    title: "Event title",
    desc: "Ea mollit quis ea laborum. Excepteur elit aliquip nulla sit enim Lorem fugiat incididunt et esse officia deserunt eiusmod pariatur. Cillum minim enim laborum pariatur non deserunt laborum nisi nostrud est esse. Ipsum ex veniam ut commodo. Sunt est sit magna ex ex aliqua excepteur non. Dolor in laboris veniam magna Lorem laborum ex minim non tempor ipsum aliquip fugiat. Eu sunt irure elit non deserunt ut veniam ut sint ad cillum cillum. Consequat elit elit cupidatat amet duis enim ut Lorem excepteur duis. Duis labore cillum dolore non est do enim reprehenderit.",
    tags: USER.TAGS.slice(0, 3),
    time: new Date(2024, 4, 29),
    limit: 20,
    opted: [],
  },
  {
    uid: "",
    title: "Event title",
    desc: "Ea mollit quis ea laborum. Excepteur elit aliquip nulla sit enim Lorem fugiat incididunt et esse officia deserunt eiusmod pariatur. Cillum minim enim laborum pariatur non deserunt laborum nisi nostrud est esse. Ipsum ex veniam ut commodo. Sunt est sit magna ex ex aliqua excepteur non. Dolor in laboris veniam magna Lorem laborum ex minim non tempor ipsum aliquip fugiat. Eu sunt irure elit non deserunt ut veniam ut sint ad cillum cillum. Consequat elit elit cupidatat amet duis enim ut Lorem excepteur duis. Duis labore cillum dolore non est do enim reprehenderit.",
    tags: USER.TAGS.slice(3, 5),
    time: new Date(2024, 4, 29),
    limit: 20,
    opted: [],
  },
  {
    uid: "",
    title: "Event title",
    desc: "Ea mollit quis ea laborum. Excepteur elit aliquip nulla sit enim Lorem fugiat incididunt et esse officia deserunt eiusmod pariatur. Cillum minim enim laborum pariatur non deserunt laborum nisi nostrud est esse. Ipsum ex veniam ut commodo. Sunt est sit magna ex ex aliqua excepteur non. Dolor in laboris veniam magna Lorem laborum ex minim non tempor ipsum aliquip fugiat. Eu sunt irure elit non deserunt ut veniam ut sint ad cillum cillum. Consequat elit elit cupidatat amet duis enim ut Lorem excepteur duis. Duis labore cillum dolore non est do enim reprehenderit.",
    tags: USER.TAGS.slice(5, 9),
    time: new Date(2024, 4, 29),
    limit: 20,
    opted: [],
  },
];

const Events = ({ className }) => {
  return (
    <SimpleGrid cols={2} p="lg" spacing="xl" className={className}>
      {events.map((event) => (
        <EventCard event={event} key={event.title} />
      ))}
    </SimpleGrid>
  );
};

export default Events;
