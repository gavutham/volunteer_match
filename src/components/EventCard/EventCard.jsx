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
import { useContext } from "react";
import { Context } from "../../context/context";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, organizer, setMutateEvent }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const isVol = user?.role === "Volunteer";

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
            <Badge
              variant="light"
              color="#E3FEF7"
              key={tag}
              style={{ color: "#003C43", outline: "0.5px solid #003C43" }}
            >
              {tag}
            </Badge>
          ))}
        </Flex>
        <Text size="sm" c="dimmed" lineClamp={3}>
          {event.desc}
        </Text>
        <Button
          color="#003C43"
          fullWidth
          mt="md"
          radius="md"
          disabled={event.completed}
          onClick={
            isVol
              ? open
              : event.time < Date.now()
              ? () => navigate(`/event/complete/${event._id}`)
              : () => navigate(`/event/edit/${event._id}`)
          }
          style={{ color: event.completed ? "black" : "#E3FEF7" }}
        >
          {isVol
            ? event.completed
              ? "Event Completed"
              : "Know More"
            : event.time < Date.now()
            ? event.completed
              ? "Event completed"
              : "Complete Event"
            : "Edit Event"}
        </Button>
      </Card>

      {isVol && (
        <Modal opened={opened} onClose={close} title="About Event" size="lg">
          <EventModal
            event={event}
            organizer={organizer}
            close={close}
            setMutate={setMutateEvent}
          />
        </Modal>
      )}
    </>
  );
};

export default EventCard;
