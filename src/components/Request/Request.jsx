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
import { useContext, useState } from "react";
import { Context } from "../../context/context";
import api from "../../services/api";

/* eslint-disable react/prop-types */
const Request = ({ event, organizer }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useContext(Context);

  const handleAccept = async () => {
    setLoading(true);
    try {
      const path = `/event/opt?eventId=${event._id}&uId=${user._id}`.toString();
      const res = await api.put(path);
      if (res.status === 200) {
        const userRes = await api.get("/user/" + user._id);
        if (userRes.status === 200)
          dispatch({ type: "LOGIN_SUCCESS", payload: userRes.data });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleReject = () => {
    console.log("rejected");
  };

  const handleClickCard = (event) => {
    const innerText = event.target.innerText;
    const isButton = innerText === "Accept" || innerText === "Reject";

    if (!isButton) {
      open();
    }
  };

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        mb="lg"
        className={classes.card}
        onClick={handleClickCard}
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
              loading={loading}
              mt="md"
              radius="md"
              onClick={handleAccept}
            >
              Accept
            </Button>
            <Button
              rightSection={<IconBan />}
              color="red"
              fullWidth
              variant="light"
              loading={loading}
              mt="md"
              radius="md"
              onClick={handleReject}
            >
              Reject
            </Button>
          </div>
        </Flex>
      </Card>

      <Modal opened={opened} onClose={close} title="About Event" size="lg">
        <EventModal
          event={event}
          close={close}
          organizer={organizer}
          type="request"
        />
      </Modal>
    </>
  );
};

export default Request;
