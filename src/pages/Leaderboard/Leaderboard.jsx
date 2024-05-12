import { Divider, Flex, Image, Text } from "@mantine/core";
import Header from "../../components/header/Header";
import classes from "./Leaderboard.module.css";
import LeaderBoardTable from "../../components/LeaderBoardTable/LeaderBoardTable";
import { useEffect, useState } from "react";
import api from "../../services/api";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const response = await api.get("/event/leaderboard/alltime");
        if (response.status === 200) {
          setLeaderboard(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLeaderboard();
  }, []);

  return (
    <div>
      <Header />
      <Flex h={"100%"}>
        <div className={classes.imgContainer}>
          <Image src="/celeb.jpg" mah="100%" />
        </div>
        <div className={classes.wrapper}>
          <Text fw={700} fz="36px" m="xl" style={{ letterSpacing: 2 }}>
            LeaderBoard
          </Text>

          <div className={classes.container}>
            <Text fw={500} fz="30px">
              Top Contributors
            </Text>
            <LeaderBoardTable list={leaderboard} />
            <Divider w="40%" my="20px" />
          </div>
          {/* <div className={classes.container}>
            <Text fw={500} fz="30px">
              Monthly
            </Text>
            <LeaderBoardTable list={alltime} />
            <Divider w="40%" my="20px" />
          </div>
          <div className={classes.container}>
            <Text fw={500} fz="30px">
              Weekly
            </Text>
            <LeaderBoardTable list={alltime} />
            <Divider w="40%" my="20px" />
          </div> */}
        </div>
        <div className={classes.imgContainer}>
          <Image src="/celeb-r.jpg" mah="100%" />
        </div>
      </Flex>
    </div>
  );
};

export default Leaderboard;
