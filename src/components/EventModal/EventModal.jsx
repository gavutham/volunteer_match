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
  IconCalendar,
  IconMapPinFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import React, { useState } from "react";

const EventModal = ({ event, title, location, date }) => {
  return (
    <div>
      <Card padding="lg" radius="md" w={"100%"}>
        <Card.Section>
          <Image src="/public/events.png" height={160} alt="event-img" />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="0">
          <Text fw={500} fz={"28px"}>
            {event.title}
          </Text>
          <Group justify="left" gap={"2px"}>
            <IconCalendar stroke={1} size={20} />
            <Text size="xs" c="dimmed">
              {event.time.toLocaleString()}
            </Text>
          </Group>
        </Group>
        <Group justify="right" gap={"2px"}>
          <IconMapPinFilled stroke={2} size={15} color="red" />
          <Text size="xs" c="">
            {event.location}
          </Text>
        </Group>
        <Group justify="right" gap={"2px"}>
          <IconUserFilled stroke={2} size={15} />
          <Text size="xs" c="" gap={"2px"}>
            limit: {event.limit}
          </Text>
        </Group>

        <Flex gap="sm" my="md" wrap="wrap">
          {event.tags.map((tag) => (
            <Badge variant="light" key={tag}>
              {tag}
            </Badge>
          ))}
        </Flex>
        <Text size="sm">{event.desc}</Text>
      </Card>
    </div>
  );
};

export default EventModal;
