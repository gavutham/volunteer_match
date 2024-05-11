/* eslint-disable react/prop-types */
import { Box, Checkbox, Container, ListItem, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import api from "../../services/api";

const AttendanceCard = ({ uid }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const res = await api.get(`/user/${uid}`);
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };

    getUser();
  }, [uid]);

  return (
    <ListItem p="md">
      <Checkbox
        name={uid}
        labelPosition="left"
        color="#003C43"
        label={loading ? <Loader color="#003C43" /> : user.name}
        size="xl"
        value={true}
        w={"100%"}
      />
    </ListItem>
  );
};

export default AttendanceCard;
