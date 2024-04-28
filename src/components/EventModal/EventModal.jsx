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

const EventModal = ({ event, organizer }) => {
  const navigate = useNavigate();
  const opted_len = event.opted.length;

  return (
    <div className={classes.card}>
      <Card padding="lg" radius="md" w={"100%"}>
        <Card.Section>
          <Image src="/public/events.png" height={160} alt="event-img" />
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

        <Button
          type="submit"
          mt="sm"
          disabled={opted_len >= event.limit}
          color="#003C43"
          style={{ color: "#E3FEF7" }}
        >
          Opt me
        </Button>
      </Card>
    </div>
  );
};

export default EventModal;
