import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorScreen from "./components/screens/error-screen";
import AuthenticationProvider from "./components/providers/authentication-provider";
import ErrorHandler from "./components/contexts/error-handler";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import BalanceScreen from "./components/screens/timebank/balance-screen";
import { useAtomValue } from "jotai";
import { languageAtom } from "./atoms/languageAtom";
import Header from "./components/header/header";
import HomeScreen from "./components/screens/home/home-screen";

/**
 * Application component
 *
 */
const App = () => {
  useAtomValue(languageAtom);
  const router = createBrowserRouter([
    {
      element: <Header />,
      children: [
        {
          path: "/",
          element: <HomeScreen />,
          errorElement: <ErrorScreen />
        }
      ]
    }
  ]);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ErrorHandler>
          <AuthenticationProvider>
            <RouterProvider router={router} />
          </AuthenticationProvider>
        </ErrorHandler>
      </ThemeProvider>
    </div>
  );
};

export default App;
