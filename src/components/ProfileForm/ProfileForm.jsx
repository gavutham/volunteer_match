import { useContext, useState } from "react";
import {
  Button,
  Flex,
  MultiSelect,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Context } from "../../context/context";
import { USER } from "../../utils/constants";
import api from "../../services/api";

const ProfileForm = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const isVolunteer = user?.role === "Volunteer";

  const handleUpdate = async (values) => {
    setError(false);
    setLoading(true);

    const updatedUser = {
      ...user,
      email: values.email,
      name: values.name,
      password: values.password,
      tags: values.tags,
    };

    const path = `/user/${user._id}`;

    try {
      const res = await api.put(path, updatedUser);

      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        setLoading(false);
      } else {
        setError(true);
        console.log(res);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const form = useForm({
    initialValues: {
      name: user.name,
      email: user.email,
      password: user.password,
      tags: user.tags,
    },
    validate: {
      name: (value) => !value && "Enter a valid name",
      password: (value) => !value && "Enter a valid password",
    },
  });
console.log(user)
  return (
    <Flex w={"60%"} align="center" justify="center">
      <form onSubmit={form.onSubmit((values) => handleUpdate(values))}>
        <Stack gap="md" w={500} justify="baseline">
          <Flex dir="column" justify="space-between" align="center" mb="sm">
            <Text fw={700} size="30px">
              User Profile
            </Text>
            {isVolunteer && (
              <Text fw={500} size="xl">
                Points: {user.points}
              </Text>
            )}
          </Flex>

          <TextInput
            label="Name"
            placeholder="Enter your Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="Enter your Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Password"
            placeholder="Enter your Password"
            {...form.getInputProps("password")}
          />
          {user.role === "Volunteer" && (
            <MultiSelect
              label="Interests"
              placeholder="Select relevant Tags"
              data={USER.TAGS}
              {...form.getInputProps("tags")}
            />
          )}
          <Button type="submit" loading={isFetching || loading} color="#135D66">
            Submit
          </Button>
          {error && (
            <Text size="md" c="red" align="center">
              Some Error Occurred, Please Try Again
            </Text>
          )}
        </Stack>
      </form>
    </Flex>
  );
};

export default ProfileForm;
