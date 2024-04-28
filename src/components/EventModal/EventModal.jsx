import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendarFilled,
  IconMapPinFilled,
  IconUserFilled,
  IconCoins,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import React, { useState } from "react";
import classes from "./EventModal.module.css";
import Events from "../Events/Events";
import { render } from "react-dom";

const EventModal = ({ event, organizer }) => {
  const opted_len = event.opted.length;
  console.log(event);
  return (
    <div className={classes.card}>
      <Card padding="lg" radius="md" w={"100%"}>
        <Card.Section>
          <Image src="/public/events.png" height={160} alt="event-img" />
        </Card.Section>

        <Group justify="space-between" mt="md">
          <Text fw={500} fz={"28px"}>
            {event.title}
          </Text>
          <Group gap={"2px"} mt="xs">
            <IconCalendarFilled stroke={1} size={20} />
            <Text size="xs">{event.time.toLocaleString()}</Text>
          </Group>
        </Group>

        <Group justify="space-between" mb="xs">
          <Group>
            <Text size="sm" c="dimmed">
              by
            </Text>
            <Text size="md" fw={400}>
              {organizer?.name}
            </Text>
          </Group>
        </Group>

        <Group justify="left">
          <Group justify="right" gap={"2px"}>
            <IconMapPinFilled stroke={1} size={20} fw={500} />
            <Text size="xs" fw={500}>
              {event.location}
            </Text>
          </Group>
          <Group justify="right" gap={"2px"}>
            <IconUserFilled stroke={1} size={20} fw={500} />
            <Text size="xs" c="" gap={"2px"} fw={500}>
              Limit: {event.limit}
            </Text>
          </Group>
          <Group justify="right" gap={"2px"}>
            <IconCoins stroke={1} size={20} fw={500} />
            <Text size="xs" fw={500}>
              Points: {event.points}
            </Text>
          </Group>
        </Group>

        <Flex gap="sm" my="md" wrap="wrap">
          {event.tags.map((tag) => (
            <Badge variant="light" key={tag}>
              {tag}
            </Badge>
          ))}
        </Flex>
        <Text size="sm">{event.desc}</Text>
        <Button type="submit" mt="sm" disabled={opted_len > event.limit}>
          Opt me
        </Button>

        <Group justify="right" mt="md" gap={"2px"}>
          <IconCircleCheckFilled stroke={1} size={20} fw={500} />
          <Text size="xs" fw={400}>
            Opted: {opted_len}
          </Text>
        </Group>
      </Card>
    </div>
  );
};

export default EventModal;
