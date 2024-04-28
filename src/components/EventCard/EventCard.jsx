/* eslint-disable react/prop-types */
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
import { IconCalendar } from "@tabler/icons-react";
import EventModal from "../EventModal/EventModal";

const EventCard = ({ event }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image src="/events.png" height={160} alt="event-img" />
        </Card.Section>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500} fz={"28px"}>
            {event.title}
          </Text>
          <Group justify="center" gap={"2px"}>
            <IconCalendar stroke={1} size={20} />
            <Text size="xs" c="dimmed">
              {event.time.toLocaleString()}
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
        <Text size="sm" c="dimmed" lineClamp={3}>
          {event.desc}
        </Text>
        <Button color="blue" fullWidth mt="md" radius="md" onClick={open}>
          Know More
        </Button>
      </Card>

      <Modal opened={opened} onClose={close} title="About Event">
        <EventModal event={event} />
      </Modal>
    </>
  );
};

export default EventCard;
