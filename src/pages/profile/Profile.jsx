import { Button, Flex, Stack } from "@mantine/core";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import Header from "../../components/header/Header";

const Profile = () => {
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
                src="/user.jpg"
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
