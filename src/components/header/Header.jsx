import { useState } from "react";
import {
  Container,
  Group,
  Burger,
  Text,
  Avatar,
  Menu,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { useContext, useEffect } from "react";
import { Context } from "../../context/context.jsx";

// const user = {
//   name: "Jane Spoonfighter",
//   email: "janspoon@fighter.dev",
//   image:
//     "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
// };

function Header() {
  const { user, dispatch } = useContext(Context);
  const links = [
    { link: "/login", label: "Logout" },
    { link: "/profile", label: user.name, image: user.image },
  ];
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      //   data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        console.log("Clicked:", link.label);

        if (link.label === "Logout") {
          // Redirect to the login page
          dispatch({ type: "LOGOUT" });
        }
        if (link.label === user.name) {
          // Redirect to the login page
        }
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <div>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Text size="25px">Volunteer Match</Text>
          <Group gap={5} visibleFrom="xs">
            {items}
            {/* if items.link.label == user: */}
            <Group gap={7}>
              <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
              <Text fw={500} size="sm" lh={1} mr={3}>
                {user.name}
              </Text>
            </Group>
          </Group>
          {/* <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" /> */}
        </Container>
      </header>
    </div>
  );
}

export default Header;
