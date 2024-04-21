import { Divider, Flex, Image, Text } from "@mantine/core";
import Header from "../../components/header/Header";
import classes from "./Leaderboard.module.css";
import LeaderBoardTable from "../../components/LeaderBoardTable/LeaderBoardTable";

const alltime = [
  {
    name: "User 1",
    points: 50,
  },
  {
    name: "User 1",
    points: 50,
  },
  {
    name: "User 1",
    points: 50,
  },
  {
    name: "User 1",
    points: 50,
  },
  {
    name: "User 1",
    points: 50,
  },
  {
    name: "User 1",
    points: 50,
    position: 32,
  },
];

const Leaderboard = () => {
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
              All Time
            </Text>
            <LeaderBoardTable list={alltime} />
            <Divider w="40%" my="20px" />
          </div>
          <div className={classes.container}>
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
          </div>
        </div>
        <div className={classes.imgContainer}>
          <Image src="/celeb-r.jpg" mah="100%" />
        </div>
      </Flex>
    </div>
  );
};

export default Leaderboard;
