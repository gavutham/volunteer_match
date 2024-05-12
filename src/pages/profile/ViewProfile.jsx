import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, Flex, Stack, Text } from "@mantine/core";
import Header from "../../components/header/Header";
import api from "../../services/api";

const ViewProfile = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get(`/user/${id}`);
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, [id]);

  return (
    <div>
      <Header />

      <Flex align="center" justify="center" h={"calc(100vh - 75px)"} w={"100%"}>
        <Flex w={"60%"} align="center" justify="center">
          <div>
            <Stack gap="md" w={500} justify="center">
              <Flex justify="center" gap="xs" align="flex-end">
                <Text
                  fw={500}
                  size="lg"
                  mb="lg"
                  style={{ textAlign: "center", fontSize: 30 }}
                >
                  User Profile
                </Text>
              </Flex>
              <div>
                <Stack diredction="column" gap="md" justify="center">
                  <Flex align="baseline">
                    <Text
                      mb="lg"
                      style={{ fontStyle: "italic" }}
                      fw="lighter"
                      size="xl"
                      mr="md"
                    >
                      Name :
                    </Text>
                    <Text fw="bolder" fz="h3">
                      {user.name}
                    </Text>
                  </Flex>
                  <Flex align="baseline">
                    <Text
                      mb="lg"
                      style={{ fontStyle: "italic" }}
                      fw="lighter"
                      size="xl"
                      mr="md"
                    >
                      Email :
                    </Text>
                    <Text fw="bolder" fz="h3">
                      {user.email}
                    </Text>
                  </Flex>
                  {user.role === "Volunteer" && (
                    <>
                      {" "}
                      <Flex align="baseline" wrap="wrap">
                        <Text
                          mb="lg"
                          style={{ fontStyle: "italic" }}
                          fw="lighter"
                          size="xl"
                          mr="md"
                        >
                          Interests :
                        </Text>

                        {user.tags?.map((interest) => (
                          <Badge
                            color="#003C43"
                            key={interest}
                            style={{ color: "#E3FEF7" }}
                            mr="sm"
                            size="md"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </Flex>
                      <Flex align="baseline">
                        <Text
                          mb="lg"
                          style={{ fontStyle: "italic" }}
                          fw="lighter"
                          size="xl"
                          mr="md"
                        >
                          Points :
                        </Text>
                        <Text fw="bolder" fz="h2">
                          {user.points}
                        </Text>
                      </Flex>
                    </>
                  )}
                </Stack>
              </div>
            </Stack>
          </div>
        </Flex>
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
            <Flex justify="center" style={{ width: "70%" }}></Flex>
          </Stack>
        </Flex>
      </Flex>
    </div>
  );
};

export default ViewProfile;
