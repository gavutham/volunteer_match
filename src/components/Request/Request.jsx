import { Badge, Button, Card, Flex, Modal, Text } from "@mantine/core";
import {
  IconBan,
  IconCalendar,
  IconCheck,
  IconMapPin,
} from "@tabler/icons-react";
import classes from "./Request.module.css";
import { useDisclosure } from "@mantine/hooks";
import EventModal from "../EventModal/EventModal";

/* eslint-disable react/prop-types */
const Request = ({ event, organizer, setMutateRequests }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        mb="lg"
        className={classes.card}
        onClick={open}
      >
        <Flex align="center" justify="space-between">
          <div className={classes.left}>
            <Flex align="baseline" gap="10px" mb="md">
              <Text fw={500} fz="26px">
                {event.title}
              </Text>

              <Text size="sm" c="dimmed">
                organized by
              </Text>
              <Text size="md" fw={400}>
                {organizer?.name}
              </Text>
            </Flex>

            <Flex gap="sm" mb="sm">
              {event.tags.map((tag, index) => (
                <Badge color="#003C43" key={index} style={{ color: "#E3FEF7" }}>
                  {tag}
                </Badge>
              ))}
            </Flex>

            <Flex gap="md">
              <Flex align="center" gap="5px">
                <IconMapPin stroke={1} size={20} />
                <Text fw={500} fz="14px">
                  {event.location}
                </Text>
              </Flex>
              <Flex align="center" gap="5px">
                <IconCalendar stroke={1} size={20} />
                <Text fw={500} fz="14px">
                  {event.time.toLocaleString()}
                </Text>
              </Flex>
            </Flex>
          </div>
          <div className={classes.right}>
            <Button
              rightSection={<IconCheck />}
              color="#135D66"
              fullWidth
              mt="md"
              radius="md"
            >
              Accept
            </Button>
            <Button
              rightSection={<IconBan />}
              color="red"
              fullWidth
              variant="light"
              mt="md"
              radius="md"
            >
              Reject
            </Button>
          </div>
        </Flex>
      </Card>

      <Modal opened={opened} onClose={close} title="About Event">
        <EventModal event={event} setMutate={setMutateRequests} />
      </Modal>
    </>
  );
};

export default Request;
