import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  List,
  ListItem,
  MultiSelect,
  NumberInput,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Context } from "../../context/context";
import { USER } from "../../utils/constants";
import api from "../../services/api";
import { DateTimePicker } from "@mantine/dates";
import classes from "./EventForm.module.css";
import { IconUser } from "@tabler/icons-react";

const EventForm = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);

  const handleUpdate = async (values) => {
    setError(false);
    setLoading(true);

    const selected = [];
    users.forEach((userr) => {
      const ele = document.getElementsByName(userr._id);
      if (ele[0].checked) selected.push(userr._id);
    });

    try {
      const eventData = {
        ...values,
        uid: user._id,
        time: values.time.valueOf(),
        opted: [],
        requests: selected,
      };

      const res = await api.post("/event", eventData);

      if (res.status === 200) {
        const userRes = await api.get("/user/" + user._id);
        if (userRes.status === 200) {
          dispatch({ type: "LOGIN_SUCCESS", payload: userRes.data });
        }
        form.reset();
      } else {
        setError(true);
        console.log(res);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };

  const form = useForm({
    initialValues: {
      title: "",
      desc: "",
      tags: [],
      time: null,
      location: "",
      limit: 0,
      points: 0,
    },
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
    const formTags = form.values.tags;

    const isNotChanged =
      formTags.every((value) => tags.includes(value)) &&
      tags.every((value) => formTags.includes(value));

    if (!isNotChanged) {
      setTags(formTags);
    }
  }, [form]);

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        const body = { tags };
        const response = await api.post("/event/leaderboard/suggestion", body);
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSuggestions();
  }, [tags]);

  return (
    <form onSubmit={form.onSubmit((values) => handleUpdate(values))}>
      <Box mt={"50px"} m="lg" px={"8%"}>
        <Text fw={700} size="30px" mb="md">
          New Event
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
        {users.length !== 0 && (
          <Box w={"80%"}>
            <Text>Suggested Volunteers</Text>
            <List id="attendance" icon={<IconUser />}>
              {users.map((userr) => (
                <ListItem key={userr._id} p="md">
                  <Checkbox
                    name={userr._id}
                    labelPosition="left"
                    color="#003C43"
                    label={
                      <Text
                        size="xl"
                        onClick={() =>
                          window.open(
                            `/profile/${userr._id}`,
                            "_blank",
                            "rel=noopener noreferrer"
                          )
                        }
                        className={classes.profileTile}
                      >
                        {userr.name}
                        <Text ml="sm" color="grey">
                          ({userr.points} points)
                        </Text>
                      </Text>
                    }
                    size="xl"
                    value={true}
                    w={"100%"}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        <Button
          w={"40%"}
          mb="xl"
          type="submit"
          loading={isFetching || loading}
          color="#135D66"
        >
          Create Event
        </Button>
        {error && (
          <Text size="md" c="red" align="center">
            Some Error Occurred, Please Try Again
          </Text>
        )}
      </Flex>
    </form>
  );
};

export default EventForm;
