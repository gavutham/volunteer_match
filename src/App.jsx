import { RouterProvider } from "react-router-dom";
import { router } from "./utils/routes.jsx";
import { ContextProvider } from "./context/context.jsx";
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

const App = () => {
  return (
    <MantineProvider>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </MantineProvider>
  );
};

export default App;
