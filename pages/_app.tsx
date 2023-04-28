import { useState } from "react";
import { CircularProgress, Box } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../components/login/login";
import { auth } from "../firebase/firebase";

const App: React.FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const [user, loading, error] = useAuthState(auth);



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
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
