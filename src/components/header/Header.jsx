import { Group, Text, Avatar, Box } from "@mantine/core";
import classes from "./Header.module.css";
import { useContext } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";
import { IconChevronRight } from "@tabler/icons-react";

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
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <Box className={classes.inner}>
          <Text size="25px">Volunteer Match</Text>
          <Group gap={5} visibleFrom="xs">
            {items}
            <Group
              className={classes.link}
              gap={"0px"}
              onClick={() => navigate("/profile")}
            >
              <Group gap="sm">
                <Avatar
                  src="/user.jpg"
                  alt={user?.name}
                  radius="xl"
                  size={32}
                />
                <Text fw={500} size="sm">
                  {user?.name}
                </Text>
              </Group>

              <IconChevronRight />
            </Group>
          </Group>
        </Box>
      </header>
    </div>
  );
}

export default Header;
