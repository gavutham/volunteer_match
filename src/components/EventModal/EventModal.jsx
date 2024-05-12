/* eslint-disable react/prop-types */
import { Badge, Button, Card, Flex, Group, Image, Text } from "@mantine/core";
import {
  IconCalendarFilled,
  IconMapPinFilled,
  IconUserFilled,
  IconCoins,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import classes from "./EventModal.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/context";
import api from "../../services/api";

const EventModal = ({ event, organizer, close, setMutate }) => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(Context);
  const opted_len = event.opted.length;
  const isOpted = event.opted.some((uid) => uid === user._id);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      var path = `/event/${isOpted ? "unopt" : "opt"}`;
      path += `?eventId=${event._id}&uId=${user._id}`;

      console.log(path);
      const res = await api.put(path.toString());
      if (res.status === 200) {
        const userRes = await api.get("/user/" + user._id);
        if (userRes.status === 200)
          dispatch({ type: "LOGIN_SUCCESS", payload: userRes.data });
        setMutate((prev) => !prev);
        close();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={classes.card}>
      <Card padding="lg" radius="md" w={"100%"}>
        <Card.Section>
          <Image src="/events.png" height={160} alt="event-img" />
        </Card.Section>

        <Flex my="md" gap="sm" align="baseline">
          <Text fw={500} fz={"28px"}>
            {event.title}
          </Text>
          <Group style={{ fontStyle: "italic" }} gap={"4px"}>
            <Text size="md" fw={400}>
              by
            </Text>
            <Text
              size="md"
              fw={400}
              className={classes.link}
              onClick={() => navigate(`/profile/${event.uid}`)}
            >
              {organizer?.name}
            </Text>
          </Group>
        </Flex>

        <Group justify="left">
          <Group justify="right" gap={"2px"}>
            <IconMapPinFilled stroke={1} size={20} fw={500} color="#135D66" />
            <Text size="xs" fw={500}>
              {event.location}
            </Text>
          </Group>
          <Group justify="right" gap={"2px"}>
            <IconUserFilled stroke={1} size={20} fw={500} color="#135D66" />
            <Text size="xs" c="" gap={"2px"} fw={500}>
              Limit: {event.limit}
            </Text>
          </Group>
          <Group gap={"2px"}>
            <IconCalendarFilled stroke={1} size={20} color="#135D66" />
            <Text size="xs">{event.time.toLocaleString()}</Text>
          </Group>
        </Group>

        <Flex gap="sm" my="lg" wrap="wrap">
          {event.tags.map((tag) => (
            <Badge
              color="#E3FEF7"
              key={tag}
              style={{ color: "#003C43", outline: "0.5px solid #003C43" }}
            >
              {tag}
            </Badge>
          ))}
        </Flex>

        <Text size="sm" mb="md">
          {event.desc}
        </Text>

        <Flex justify="space-between" align="center">
          <Flex align="center" gap={"2px"}>
            <IconCoins stroke={1} size={20} fw={500} color="#135D66" />
            <Text size="xs" fw={500}>
              Points: {event.points}
            </Text>
          </Flex>
          <Flex align="center" gap={"2px"}>
            <IconCircleCheckFilled stroke={1} size={20} color="#135D66" />
            <Text size="xs" fw={400}>
              Opted: {opted_len}
            </Text>
          </Flex>
        </Flex>

        {isOpted && (
          <Text size="14px" mx="auto" color="#003C43">
            Already Opted for the event !
          </Text>
        )}

        <Button
          type="submit"
          mt="sm"
          loading={loading}
          disabled={opted_len >= event.limit}
          color={isOpted ? "red" : "#003C43"}
          style={{ color: isOpted ? "white" : "#E3FEF7" }}
          onClick={handleSubmit}
        >
          {!isOpted && opted_len >= event.limit && (
            <Text>Already Opted for the event</Text>
          )}

          {isOpted ? "Un-opt me from the event" : "Opt me for the event"}
        </Button>
      </Card>
    </div>
  );
};

export default EventModal;
