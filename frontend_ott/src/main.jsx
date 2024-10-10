import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PageLayout from "./layout/PageLayout.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import theme from "./theme/theme.js"
import Dictionary from "./pages/Dictionary.jsx";
import About from "./pages/Contact.jsx"
import AIPage from "./pages/AIPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Contact from "./pages/Contact.jsx";
import HomePage from "./pages/HomePage.jsx";
// const styles = {
//   global: (props) => ({
//     body: {
//       bg: mode("gray.200", "#000")(props),
//       color: mode("gray.200", "WhiteAlpha.900")(props),
//     },
//   }),
// };

// // 2. Add your color mode config
// const config = {
//   initialColorMode: "dark",
//   useSystemColorMode: true,
// };

// 3. extend the theme


const router = createBrowserRouter([
  {
    path: "/",
    element:<PageLayout/>,
    errorElement:<NotFound/>,
      children: [
        {
          path:"auth",
          element:<AuthPage/>
        },
        {
          path:"dictionary",
          element:<Dictionary/>,
        },
        {
          path:"Contact",
          element:<Contact/>,
        },
        {
          path:"ai-translate",
          element:<AIPage/>,
        },
        {
          path:"/",
          element:<HomePage/>
        }
        
        

      ]
    
  },
  
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
