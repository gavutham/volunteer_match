import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/context";
import { useNavigate } from "react-router-dom";
import {
  Anchor,
  Button,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import api from "../../../services/api";

const Login = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate("/");
  }, [user]);

  const handleSignUp = async (values) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const cred = {
        email: values.email,
        password: values.password,
      };

      const res = await api.post("/auth/login", cred);
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
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        !value
          ? "Email is required"
          : !/\S+@\S+\.\S+/.test(value) && "Invalid email address",
      password: (value) => !value && "Password is required",
    },
  });

  return (
    <Flex align="center" justify="center" h={"100vh"}>
      <form onSubmit={form.onSubmit((values) => handleSignUp(values))}>
        <Stack gap="md" w={500} justify="center">
          <Flex justify="center" gap="xs" align="baseline">
            <Text fw={500} size="lg">
              Login
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
            label="Email"
            placeholder="Enter your Email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your Password"
            {...form.getInputProps("password")}
          />
          <Button type="submit" loading={isFetching} color="#135D66">
            Log Me In
          </Button>
          <Flex justify="center" gap="sm">
            <Text>{"Don't"} have an account?</Text>
            <Anchor onClick={() => navigate("/signup")}>try Signing Up</Anchor>
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

export default Login;
