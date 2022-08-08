import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr9Y1YZca5eoEMI69o1VcMpw74PEYH3ww",
  authDomain: "bussticketapp.firebaseapp.com",
  projectId: "bussticketapp",
  storageBucket: "bussticketapp.appspot.com",
  messagingSenderId: "79830776119",
  appId: "1:79830776119:web:feace03101cd48abac82b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default function FolderList() {
  const [booked, setBooked] = React.useState();
  const handler = async () => {
    // let results = [];
    // const colRef = collection(fireDB, collectionName);

    // const doc = await getDocs(colRef);
    // doc.forEach((item, index) => {
    //   results.push({ id: item.id, data: item.data() });
    // });
    // setBooked(results);
    let value = window.localStorage.getItem("users");
    let user = JSON.parse(value);
    const q = query(
      collection(db, "reciept"),
      where("phone", "==", user.phone)
    );
    try {
      const unsub = onSnapshot(q, (snapshot) => {
        let documents = [];
        snapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        console.log(documents);
        setBooked(documents);
      });
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    handler();
  }, []);
  return (
    <Container maxWidth="md">
      <Typography sx={{ color: "#fff" }} textAlign="center" variant="h3">
        Bus Booked Details{" "}
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {booked?.length ? (
          booked?.map((item, index) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar src="./images.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={item?.from + " - " + item?.to}
                secondary={item?.book_date + " at " + item?.book_time}
              />
              {item?.seatnumber + " - " + item?.member}
            </ListItem>
          ))
        ) : (
          <Typography>NO booking found</Typography>
        )}
      </List>
    </Container>
  );
}
