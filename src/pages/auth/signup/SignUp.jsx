import { useContext } from "react";
import { Context } from "../../../context/context";
import { useNavigate } from "react-router-dom";
import {
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

const SignUp = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();

  //implement after the testing of login and signup

  // useEffect(() => {
  //   if (user !== null) navigate("/");
  // }, [user]);

  const handleSignUp = (values) => {
    console.log(values);

    dispatch({ type: "LOGIN_START" });
    try {
      //get this from form signup submission

      // const res = await api.post("/auth/login", {
      // 	email: emailRef.current.value,
      // 	password: passRef.current.value,
      // });

      const res = { data: { name: "gavutham", email: "kg@gmail.com" } };

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      console.log(user);
    } catch (err) {
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

  return (
    <Flex align="center" justify="center" h={"100vh"}>
      <form onSubmit={form.onSubmit((values) => handleSignUp(values))}>
        <Stack gap="md" w={500} justify="center">
          <Flex justify="center" gap="xs" align="flex-end">
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
            onChange={(value) => setRole(value)}
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
          <Button type="submit" loading={isFetching}>
            Sign Me Up
          </Button>
        </Stack>
      </form>
    </Flex>
  );
};

export default SignUp;
