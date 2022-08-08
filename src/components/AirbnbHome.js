import "./AirbnbHome.css";
import BookPage from "./Book";
import { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
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
const database = getDatabase();

const Home = () => {
  const [valid, setvalid] = useState(true);
  const [hide, sethide] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    const book_date = document.getElementById("book-date");
    const book_time = document.getElementById("book-time");

    const destination = document.getElementById("destination");
    const busnumber = document.getElementById("busnumber");

    if (
      !book_date.value ||
      !book_time.value ||
      !destination.value ||
      !busnumber.value
    ) {
      alert("Please fill all the fields");
    } else {
      writeUserData();
      function writeUserData() {
        const db = getDatabase();
        set(ref(db, "data/"), {
          bookingdate: book_date.value,
          bookingtime: book_time.value,
          destination: destination.value,
          busnumber: busnumber.value,
        });
      }
      alert("Your booking has been made");
      const container = document.querySelector(".container");
      // const BookPageDiv = document.querySelector(".box");
      // setvalid(!valid + BookPageDiv.classList.add("show"));
      // sethide(!hide + container.classList.add("hide"));
    }
  };
  return (
    <>
      {/* <BookPage /> */}
      <div className="container">
        <div className="content">
          <div className="text">Book Now</div>
          <div className="form2">
            <div className="txt">Date &amp; Time you would like to Travel</div>
            <form action="" onSubmit={handleSubmit}>
              <div className="inputData">
                <input type="date" name="" id="book-date" />
              </div>
              <div className="inputData">
                <input type="time" name="" id="book-time" />
              </div>
              {/* <div className="txt">Date & Time you would like to leave</div> */}
              <div className="inputData">
                <label for="destination">Destination</label>

                <select id="destination" name="Destination">
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="BaniGala">BaniGala</option>
                </select>

                {/* <input type="text" name="" id="leave-date" /> */}
              </div>
              <div className="inputData">
                <label for="busnumber">Bus Number</label>
                <select id="busnumber" name="Destination">
                  <option value="fc-40">FC-40</option>
                  <option value="jz-48">JZ-48</option>
                  <option value="wr-32">WR-32</option>
                  <option value="za-02">ZA-02</option>
                </select>
              </div>
              <div className="book">
                <button type="submit">Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
