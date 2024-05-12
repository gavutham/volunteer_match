/* eslint-disable react/prop-types */
import classes from "./LeaderBoardTable.module.css";
import { Card, List, Text } from "@mantine/core";

const LeaderBoardTable = ({ list }) => {
  return (
    <List listStyleType="none" className={classes.list}>
      {list.map((l, i) => (
        <Card shadow="sm" withBorder className={classes.item} key={i}>
          <div className={classes.wrapper}>
            <Text style={{ flex: 1 }}>{i + 1}</Text>
            <Text style={{ flex: 999 }}>
              {l.name} {`(${l.points} points)`}
            </Text>
          </div>
        </Card>
      ))}
    </List>
  );
};

export default LeaderBoardTable;
