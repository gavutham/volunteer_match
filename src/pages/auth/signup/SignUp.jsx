import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/context";
import { useNavigate } from "react-router-dom";
import {
  Anchor,
  Button,
  Flex,
  MultiSelect,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { USER } from "../../../utils/constants";
import api from "../../../services/api";

const SignUp = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate("/");
  }, [user]);

  const handleSignUp = async (values) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        tags: values.tags,
      };

      const res = await api.post("/auth/signup", user);
      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      } else {
        setError(true);
        dispatch({ type: "LOGIN_FAILURE" });
      }
    } catch (err) {
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: null,
      tags: [],
    },
    validate: {
      name: (value) => !value && "Name is required",
      email: (value) =>
        !value
          ? "Email is required"
          : !/\S+@\S+\.\S+/.test(value) && "Invalid email address",
      password: (value) => !value && "Password is required",
      role: (value) => !value && "Role is required",
    },
  });

  console.log(error);

  return (
    <Flex align="center" justify="center" h={"100vh"}>
      <form onSubmit={form.onSubmit((values) => handleSignUp(values))}>
        <Stack gap="md" w={500} justify="center">
          <Flex justify="center" gap="xs" align="baseline">
            <Text fw={500} size="lg">
              Sign Up
            </Text>
            <Text fw={200} size="sm">
              into
            </Text>
          </Flex>
          <Text
            size="xl"
            fw={700}
            style={{ textAlign: "center", fontSize: 32 }}
          >
            Volunteer Match
          </Text>
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
          <PasswordInput
            label="Password"
            placeholder="Enter your Password"
            {...form.getInputProps("password")}
          />
          <Select
            label="Role"
            placeholder="Select Your Role"
            data={USER.ROLES}
            {...form.getInputProps("role")}
          />
          {form.values.role === "Volunteer" && (
            <MultiSelect
              label="Interests"
              placeholder="Select relevant Tags"
              data={USER.TAGS}
              {...form.getInputProps("tags")}
            />
          )}
          <Button type="submit" loading={isFetching} color="#135D66">
            Sign Me Up
          </Button>
          <Flex justify="center" gap="sm">
            <Text>Existing User?</Text>
            <Anchor onClick={() => navigate("/login")}>try Logging In</Anchor>
          </Flex>
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

export default SignUp;
