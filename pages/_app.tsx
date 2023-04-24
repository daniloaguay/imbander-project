import { useState } from "react";
import { CircularProgress, Box } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/login";
import { auth } from "../firebase/firebase";

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import { GlobalStyles } from '../styles/global';
import Toggle from '../components/Toggle';

const App: React.FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const [user, loading, error] = useAuthState(auth);

  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (!user) {
    return (
      <div>
        <Login loginType={undefined} />
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Toggle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
