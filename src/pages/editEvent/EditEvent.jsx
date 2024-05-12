import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Box,
  Button,
  Center,
  Flex,
  Loader,
  MultiSelect,
  NumberInput,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./EditEvent.module.css";
import { DateTimePicker } from "@mantine/dates";
import { USER } from "../../utils/constants";

const EditEvent = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({});
  const [error, setError] = useState(false);

  let form = useForm({
    validate: {
      title: (value) => !value && "Enter a valid title",
      desc: (value) => !value && "Enter a valid desc",
      tags: (value) => value.length === 0 && "Select atleast one tag",
      time: (value) => !value && "Select a valid time",
      location: (value) => !value && "Enter a valid location",
      limit: (value) => value === 0 && "Enter a valid limit",
      points: (value) => (value === 0 || value > 20) && "Enter a valid points",
    },
  });

  useEffect(() => {
    setLoading(true);
    const getEvent = async () => {
      const res = await api.get(`/event/${id}`);
      if (res.status === 200) {
        form.setValues({
          title: res.data.title,
          desc: res.data.desc,
          tags: res.data.tags,
          time: new Date(res.data.time),
          location: res.data.location,
          limit: res.data.limit,
          points: res.data.points,
        });
        setEvent(res.data);
        setLoading(false);
      }
    };

    getEvent();
  }, [id]);

  const handleEdit = async (values) => {
    setError(false);
    setLoading(true);
    const updatedEvent = { ...event, ...values, time: values.time.valueOf() };
    try {
      const res = await api.put(`/event/${event._id}`, updatedEvent);

      if (res.status === 200) {
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Center style={{ margin: "auto", height: "calc(100vh - 75px)" }}>
          <Loader color="#003C43" type="dots" size={50} />
        </Center>
      ) : (
        <form onSubmit={form.onSubmit((values) => handleEdit(values))}>
          <Box mt={"50px"} m="lg" px={"8%"}>
            <Text fw={700} size="30px" mb="md">
              Edit Event
            </Text>
            <Text fw="lighter" fz={"26px"} mb="xl">
              Craft moments, inspire change - ignite your event with purpose.
            </Text>
          </Box>
          <Flex gap="xl" className={classes.flex} wrap="wrap" justify="center">
            <TextInput
              className={classes.input}
              label="Title"
              placeholder="Enter event Title"
              {...form.getInputProps("title")}
            />
            <TextInput
              className={classes.input}
              label="Location"
              placeholder="Enter event Location"
              {...form.getInputProps("location")}
            />
            <Textarea
              className={classes.input}
              w={"82%"}
              label="Description"
              rows={4}
              placeholder="Enter event Description"
              {...form.getInputProps("desc")}
            />
            <DateTimePicker
              minDate={new Date(Date.now())}
              className={classes.input}
              label="Date & Time"
              placeholder="Select the Date and Time of the event"
              {...form.getInputProps("time")}
            />
            <MultiSelect
              className={classes.input}
              label="Tags"
              placeholder="Select relevant Tags"
              data={USER.TAGS}
              {...form.getInputProps("tags")}
            />
            <NumberInput
              allowNegative={false}
              className={classes.input}
              label="Volunteers Limit"
              placeholder="Enter the req. no. of volunteers"
              {...form.getInputProps("limit")}
            />
            <NumberInput
              allowNegative={false}
              className={classes.input}
              label="Brownie Points"
              placeholder="Enter the points for volunteers"
              {...form.getInputProps("points")}
            />
            <Button w={"40%"} type="submit" loading={loading} color="#135D66">
              Sumbit
            </Button>
            {error && (
              <Text size="md" c="red" align="center">
                Some Error Occurred, Please Try Again
              </Text>
            )}
          </Flex>
        </form>
      )}
    </div>
  );
};

export default EditEvent;
