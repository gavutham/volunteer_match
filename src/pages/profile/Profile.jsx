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
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import Header from "../../components/header/Header";

const Profile = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Flex align="center" justify="center" h={"calc(100vh - 75px)"} w={"100%"}>
        <ProfileForm />
        <Flex w={"40%"} align="center" justify="center">
          <Stack diredction="column" gap="md" justify="center">
            <div
              style={{
                height: "40%",
                borderRadius: "50%",
                overflow: "hidden",
                width: "70%",
              }}
            >
              <img
                src="../../../public/user.jpg"
                alt="Current user's profile picture"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <Flex justify="center" style={{ width: "70%" }}>
              <Button style={{ marginTop: "10px" }} color="#135D66">
                Choose Profile Picture
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};

export default Profile;
