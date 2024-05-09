import {
  Group,
  Text,
  Avatar,
  Box,
  Menu,
  UnstyledButton,
  rem,
} from "@mantine/core";
import classes from "./Header.module.css";
import { useContext, useState } from "react";
import { Context } from "../../context/context.jsx";
import { useNavigate } from "react-router-dom";
import {
  IconChevronDown,
  IconChevronRight,
  IconDoorExit,
  IconUser,
} from "@tabler/icons-react";

function Header() {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  var links;

  if (user?.role === "Volunteer") {
    links = [
      { link: "/", label: "Home" },
      { link: "/events", label: "Events" },
      { link: "/requests", label: "Requests" },
      { link: "/leaderboard", label: "Leaderboard" },
    ];
  } else if (user?.role === "Organizer") {
    links = [
      { link: "/", label: "Home" },
      { link: "/events", label: "Events" },
    ];
  }

  const items = links?.map((link) => (
    <a
      key={link.label}
      className={classes.link}
      onClick={(event) => {
        event.preventDefault();
        navigate(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <Box className={classes.inner}>
          <Text
            size="25px"
            color="#e3fef7"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Volunteer Match
          </Text>
          <Group gap={5} visibleFrom="xs">
            {items}
            <Menu
              width={150}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onOpen={() => setMenuOpen(true)}
              onClose={() => setMenuOpen(false)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton>
                  <Group gap="sm">
                    <Avatar
                      src="/user.jpg"
                      alt={user?.name}
                      radius="xl"
                      size={32}
                    />
                    <Text
                      fw={500}
                      color="#e3fef7"
                      size="sm"
                      style={{
                        color: "#e3fef7",
                      }}
                    >
                      {user?.name}
                    </Text>
                    {!menuOpen && (
                      <IconChevronRight color="#e3fef7" stroke={1.5} />
                    )}
                    {menuOpen && (
                      <IconChevronDown color="#e3fef7" stroke={1.5} />
                    )}
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => navigate("/profile")}
                  leftSection={
                    <IconUser
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Profile
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  onClick={() => dispatch({ type: "LOGOUT" })}
                  leftSection={
                    <IconDoorExit
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Group
              style={{ cursor: "pointer", padding: "2px 20px" }}
              gap={"0px"}
              onClick={() => navigate("/profile")}
            ></Group>
          </Group>
        </Box>
      </header>
    </div>
  );
}

export default Header;
