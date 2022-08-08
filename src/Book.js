import "./components/AirbnbHome.css";

import { useState, useEffect } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Grid, Paper, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const items = [{ no: 1, book: true }];
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
const datefuture = () => {
  var myDate = new Date();

  myDate.setDate(myDate.getDate() + 10);
  return myDate.toISOString().substring(0, 10);
};
const Home = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [objects, setObjects] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    let obj = [];
    [...Array(parseInt(params.seats)).keys()].forEach((i, index) =>
      obj.push({ no: i + 1, booked: false })
    );
    setObjects(obj);
  }, [params.seats]);

  const [future, setFuture] = useState(datefuture);
  const handleSubmit = (e) => {
    e.preventDefault();
    const book_date = document.getElementById("book-date");
    const book_time = document.getElementById("book-time");

    const member = document.getElementById("member");
    const seatnumber = document.getElementById("seatnumber");

    if (
      !book_date.value ||
      !book_time.value ||
      !member.value ||
      !seatnumber.value
    ) {
      alert("Please fill all the fields");
    } else {
      let data = {
        book_date: book_date.value,
        book_time: book_time.value,
        member: member.value,
        seatnumber: seatnumber.value,
        price: params.price,
        from: params.from,
        to: params.to,
      };
      writeUserData(data);
    }
  };
  useEffect(() => {
    const users = window.localStorage.getItem("users");
    setUser(JSON.parse(users));
  }, []);
  async function writeUserData(item) {
    const users = window.localStorage.getItem("users");
    const user = JSON.parse(users);

    if (user.phone) {
      item.phone = user.phone;
      console.log(item);
      const docRef = await addDoc(collection(db, "reciept"), item);
      console.log(docRef);
      alert("your seath has been booked");
      navigate("/");
    } else {
      navigate("/");
    }
  }

  const handleSeats = (item) => {
    let obj = objects.map((i) =>
      i.no === item.no
        ? {
            ...i,
            booked: i.booked === true ? false : true,
            phone: i.booked === true ? "" : user.phone,
          }
        : i
    );
    setObjects(obj);
  };
  const handleDone = () => {
    let check = objects.find((item) => item.phone == user.phone);
    if (!check) {
      alert("please select your sitting ");
    } else {
      let obj = objects.map((i) => ({
        ...i,
        done: user.phone === i.phone ? true : false,
      }));
      setObjects(obj);
    }
  };
  console.log(objects);
  return (
    <>
      <Toolbar />
      <Box
        sx={{
          textAlign: "center",
          my: 2,
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Paper sx={{ maxWidth: 350, p: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              Female
            </Grid>
            <Grid item xs={3}>
              Female
            </Grid>
            <Grid item xs={3}>
              Male
            </Grid>
            <Grid item xs={3}>
              Male
            </Grid>
            {params?.seats &&
              objects?.map((item, index) => (
                <Grid key={index} item xs={3}>
                  <Button
                    onClick={() => {
                      !item.done
                        ? handleSeats(item)
                        : alert("This seat is doned already");
                    }}
                    variant={item.booked ? "contained" : "outlined"}
                  >
                    {item.no}
                  </Button>
                </Grid>
              ))}
          </Grid>
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Button variant="outlined" onClick={handleDone}>
              Done
            </Button>
          </Box>
        </Paper>
      </Box>
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="container">
          <div className="content">
            <div className="text">Book Your seat with Movers</div>
            <div className="form2">
              <div className="txt">
                Date &amp; Time you would like to Travel
              </div>
              <form action="" onSubmit={handleSubmit}>
                <div className="inputData">
                  <input
                    type="date"
                    name=""
                    id="book-date"
                    min={new Date().toISOString().substring(0, 10)}
                    max={future}
                  />
                </div>
                <div className="inputData">
                  <input type="time" name="" id="book-time" />
                </div>

                <div className="inputData">
                  <label for="member">Member</label>

                  <select id="member" name="member">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div className="inputData">
                  <label for="seatnumber">Seat Category</label>
                  <select id="seatnumber" name="member">
                    <option value="ab">AB</option>
                    <option value="bc">BC</option>
                    <option value="cd">CD</option>
                    <option value="ef">EF</option>
                  </select>
                </div>
                <div className="book">
                  <button type="submit">Book </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Home;
