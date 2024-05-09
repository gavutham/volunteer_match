import { useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Center, Loader } from "@mantine/core";

const EditEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getEvent = async () => {
      const res = await api.get(`/event/${id}`);
      if (res.status === 200) {
        setEvent(res.data);
        setLoading(false);
      }
    };

    getEvent();
  }, [id]);

  console.log(event);

  return (
    <div>
      <Header />
      {loading ? (
        <Center style={{ margin: "auto", height: "calc(100vh - 75px)" }}>
          <Loader color="#003C43" type="dots" size={50} />
        </Center>
      ) : (
        <div>edit form goes here</div>
      )}
    </div>
  );
};

export default EditEvent;
