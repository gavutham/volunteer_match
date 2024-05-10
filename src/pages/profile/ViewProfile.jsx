import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Anchor,
  Badge,
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
import Header from "../../components/header/Header";



const ViewProfile = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const {id} = useParams();
  console.log(id);

  const handleSignUp = async (values) => {
    
  };

  const interests=["Youth Empowerment","Health","Fundraising"]
  return (
    <div>
    <Header></Header>
    
    
    <Flex align="center" justify="center" h={"100vh"} w={"100%"}>

  <Flex w={"60%"} align="center" justify="center">
    <form>
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
        <div>
          <Stack diredction="column" gap="md" justify="center">
            <Text fw={400} size="xl">
              Name
            </Text>
            <div style={{ border: "0.5px solid #808080", padding: "12px", borderRadius: "5px" }}>
                    <Text>
                      Volunteer
                    </Text>
            </div>
            <Text fw={400} size="xl">
              Email
            </Text>
            <div style={{ border: "0.5px solid #808080", padding: "12px", borderRadius: "5px" }}>
                    <Text>
                      volunteer@test.com
                    </Text>
            </div>
            <Text fw={400} size="xl">
              Interests
            </Text>
          </Stack>
            {interests.map((interest) => (
              <Badge
                color="#003C43" 
                key={interests} 
                style={{ color: "#E3FEF7" }}
                mr="sm"
              >
                {interest}
              </Badge>
            ))}
        </div>
        <Text fw={400} size="xl">
              Points: {user.points}
        </Text>
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
      </Flex>
    </Stack>
  </Flex>
    </Flex>
    </div>
  );

};

export default ViewProfile;
