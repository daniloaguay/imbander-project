import { Avatar, Box } from "@material-ui/core";
import styles from "../../styles/chats.module.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";

export default function Topbar({ email }) {

  const [user] = useAuthState(auth);

  return (
    <Box
      style={{
        display: "flex",
        position: "fixed",
        top: "0",
        height: "80px",
        width: "75%",
        padding: "20px",
        flexGrow: "1",
        backgroundColor: "#e0e0e0",
        borderRadius: "0 0 20px 0",
        boxShadow: "10px 10px 20px 0 rgb(251, 117, 117)",
      }}
    >
      <Avatar src={user.photoURL} />
      <text style={{ paddingLeft: "15px" }}>{email}</text>
    </Box>
  );
}
