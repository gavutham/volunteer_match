import { useContext, useEffect, useState } from "react";
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
import { Context } from "../../context/context";
import { USER } from "../../utils/constants";


const Profile = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    
  };

  const form = useForm({
    initialValues: {
      name: user.name,
      email: user.email,
      password: user.password,
      tags: [],
    },
    validate: {
      name: (value) => !value && "Enter a valid name",
      password: (value) => !value && "Enter a valid password",
      
    },
  });

  console.log(error);

  return (
    <Flex align="center" justify="center" h={"100vh"} w={"100%"}>
  <Flex w={"60%"} align="center" justify="center">
    <form onSubmit={form.onSubmit((values) => handleSignUp(values))}>
      <Stack gap="md" w={500} justify="center">
        <Flex justify="center" gap="xs" align="flex-end">
          <Text fw={500} size="lg" style={{ textAlign: "center", fontSize: 30}}>
            PROFILE
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
        <Button type="submit" loading={isFetching}>
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
  <Flex w={"40%"} align="center" justify="center">
    <Stack diredction="column" gap="md" justify="center">
      <div style={{ height: "40%", borderRadius: "50%", overflow: "hidden", width: "70%" }}>
        <img
          src="../../../public/user.jpg"
          alt="Current user's profile picture"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <Flex justify="center" style={{width:"70%"}}>
        <Button style={{marginTop:"10px"}} >Change the profile</Button>
      </Flex>
    </Stack>
  </Flex>
</Flex>

  );

};

export default Profile;
