import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageLayout from "./layout/PageLayout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import theme from "./theme/theme.js";
import Dictionary from "./pages/Dictionary.jsx";
import AIPage from "./pages/AIPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Contact from "./pages/Contact.jsx";
import HomePage from "./pages/HomePage.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute"; 
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "dictionary",
        element: <Dictionary />,
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "profile",
        element: <Profile/>,
      },
      {
        path: "ai-translate",
        element: (
          <ProtectedRoute>
            <AIPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </StrictMode>
);