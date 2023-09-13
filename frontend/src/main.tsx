import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ApolloProvider, HttpLink } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Home } from "./components/Home";
import { ApolloLink } from "@apollo/react-hooks";
import { Profile } from "./components/Profile";
import { App } from "./app";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const router = createBrowserRouter([
//   {
//     path: "/sign-in",
//     element: <SignIn />,
//   },
//   {
//     path: "/sign-up",
//     element: <SignUp />,
//   },
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        {/* <RouterProvider router={router} /> */}
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
