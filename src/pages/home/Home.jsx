import { useContext, useEffect } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Text } from "@mantine/core";
import { USER } from "../../utils/constants.js";
import EventCard from "../../components/EventCard/EventCard.jsx";

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

const Home = () => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);

  return (
    <>
      <Text fw={500}>Hi {user?.name}</Text>
      {user && (
        <Button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</Button>
      )}

      <Flex gap={"50px"} direction="column" align="center">
        {events.map((event) => (
          <EventCard event={event} key={event.title} />
        ))}
      </Flex>
    </>
  );
};

export default Home;
