import { Box, Button, Center, Flex, List, Loader, Text } from "@mantine/core";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import AttendanceCard from "../../components/AttendanceCard/AttendanceCard";
import { IconUser } from "@tabler/icons-react";

const CompleteEvent = () => {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getEvent = async () => {
      const res = await api.get(`/event/${id}`);
      if (res.status === 200) {
        setEvent(res.data);
      }
      setLoading(false);
    };
    getEvent();
  }, [id]);

  const handleSubmit = async () => {
    setButtonLoading(true);
    const selected = [];
    event.opted.forEach((uid) => {
      const ele = document.getElementsByName(uid);
      if (ele[0].checked) selected.push(uid);
    });

    try {
      const res = await api.post("/event/complete", {
        userIds: selected,
        points: event.points,
        eventId: event._id,
      });

      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }

    setButtonLoading(false);
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Center style={{ margin: "auto", height: "calc(100vh - 75px)" }}>
          <Loader color="#003C43" type="dots" size={50} />
        </Center>
      ) : (
        <Flex direction="column" w={"100%"} px={"10vw"} py="xl">
          <Text size="32px" fw="bolder">
            Event Attendance
          </Text>
          <Box my="32px">
            <List id="attendance" icon={<IconUser />}>
              {event.opted?.map((uid) => (
                <AttendanceCard key={uid} uid={uid} />
              ))}
            </List>
          </Box>
          <Button
            loading={buttonLoading}
            color="#003C43"
            w="20vw"
            mx="auto"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Box maw={"30vw"} mx="auto" style={{ textAlign: "center" }}>
            <Text color="grey" mt="md">
              Note: Submitting will complete this event and providing attendance
              to only those are selected
            </Text>
          </Box>
        </Flex>
      )}
    </div>
  );
};

export default CompleteEvent;
