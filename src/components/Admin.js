import "./AirbnbHome.css";

import { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
let Bus = [
  "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

  "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

  "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

  "https://images.unsplash.com/photo-1564694202883-46e7448c1b26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
];
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
  const [future, setFuture] = useState(datefuture);
  const handleSubmit = (e) => {
    e.preventDefault();
    const book_date = document.getElementById("book-date");
    const price = document.getElementById("price");

    const from = document.getElementById("from");
    const to = document.getElementById("to");
    const seats = document.getElementById("seats");

    if (
      !book_date.value ||
      !price.value ||
      !from.value ||
      !to.value ||
      !seats.value
    ) {
      alert("Please fill all the fields");
    } else {
      let data = {
        book_date: book_date.value,
        price: price.value,
        from: from.value,
        to: to.value,
        seats: seats.value,
        image: Bus[Math.round(Math.random() * 3 + 1) - 1],
      };
      console.log(data);
      writeUserData(data);
    }
  };
  async function writeUserData(item) {
    const docRef = await addDoc(collection(db, "bus"), item);
    console.log(docRef);
    alert("your bus setup has done");
    navigate("/admin/bus");
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {/* <BookPage /> */}
      <div className="container">
        <div className="content">
          <div className="text"> Bus Set- Up with Movers</div>
          <div className="form2">
            <div className="txt">Travel SetUp</div>
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
                <input
                  type="text"
                  name=""
                  id="seats"
                  placeholder={"Write available seats"}
                />
              </div>
              <div className="inputData">
                <input
                  type="text"
                  name=""
                  id="price"
                  placeholder={"Paymend Dues"}
                />
              </div>

              <div className="inputData">
                <label for="from">From Location</label>

                <select id="from" name="from">
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Sialkot">Sialkot</option>
                </select>
              </div>
              <div className="inputData">
                <label for="to">Destination</label>
                <select id="to" name="to">
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Peshawer">Peshawer</option>
                  <option value="Quetta">Quetta</option>
                </select>
              </div>
              <div className="book">
                <button type="submit">Done </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
