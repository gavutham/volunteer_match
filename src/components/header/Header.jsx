import { Group, Text, Avatar, Box } from "@mantine/core";
import classes from "./Header.module.css";
import { useContext } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const links = [
    { label: "Logout" },
    { link: "/leaderboard", label: "Leaderboard" },
  ];

  const items = links.map((link) => (
    <a
      key={link.label}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();

        if (link.label === "Logout") {
          dispatch({ type: "LOGOUT" });
        } else {
          navigate(link.link);
        }
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <div>
      <header className={classes.header}>
        <Box className={classes.inner}>
          <Text size="25px">Volunteer Match</Text>
          <Group gap={5} visibleFrom="xs">
            {items}
            <Group
              gap="sm"
              className={classes.link}
              style={{ border: "1px solid #724804", borderRadius: "5px" }}
              onClick={() => navigate("/profile")}
            >
              <Text fw={500} size="sm">
                {user?.name}
              </Text>
              <Avatar src="/user.png" alt={user?.name} radius="xl" size={20} />
            </Group>
          </Group>
        </Box>
      </header>
    </div>
  );
}

export default Header;
