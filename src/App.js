import "./App.css";
import React, { useEffect, useState } from "react";
import AirbnbHome from "./components/AirbnbHome";
// import airbnb_logo from "/images.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
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
import {firebaseConfig} from './firebaseConfig';
import { useNavigate } from "react-router-dom";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
function App() {
  let navigate = useNavigate();

  const [hide, sethide] = useState(true);
  const [show, setshow] = useState(true);
  const validateForm = async (event) => {
    event.preventDefault();

    const input1 = document.querySelector("#input1");
    const input2 = document.querySelector("#input2");
    const status = document.querySelector(".status");

    let validation = "Please fill-in the above fields";
    if (input1.value === "movers@admin.com" && input2.value === "1234") {
      navigate("/admin");
      const userData = {
        email: input1.value,
        password: input2.value,
      };
      window.localStorage.setItem("users", JSON.stringify(userData));
      return;
    }

    if (!input1.value || !input2.value) {
      console.warn("validation error");
      status.classList.add("active");
      status.innerHTML = `${validation}`;
    } else {
      const data = { name: input1.value, phone: input2.value };
      const q = query(
        collection(db, "users"),
        where("phone", "==", input2.value),
        where("name", "==", input1.value)
        // orderBy("createdAt", "desc")
      );
      try {
        const unsub = onSnapshot(q, (snapshot) => {
          let documents = [];
          snapshot.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });

          if (documents.length) {
            console.log("Document data:", documents);
            let userData = {
              name: documents[0].name,
              id: documents[0].id,
              phone: documents[0].phone,
            };
            console.log(userData);
            window.localStorage.setItem("users", JSON.stringify(userData));
            navigate("/home");
          } else {
            writeUserData(data);

            console.log("No such document!");
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  async function writeUserData(item) {
    window.localStorage.setItem("users", JSON.stringify(item));

    const docRef = await addDoc(collection(db, "users"), item);
    navigate("/home");
    console.log(docRef, "after add");
  }
  useEffect(() => {
    const users = window.localStorage.getItem("users");
    const user = JSON.parse(users);
    console.log(user, "this user");
    if (user?.name) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="App">
      {/* <AirbnbHome /> */}

      <div className="wrapper">
        <div className="content">
          <div className="logo">
            <img src={process.env.PUBLIC_URL + "/images.jpg"} alt="" />
          </div>
          <div className="c1">
            <span>Become an member of the Movers today</span>
          </div>
          <div className="form">
            <div className="status"></div>
            <form action="#" onSubmit={validateForm}>
              <div className="eInput">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <input
                  id="input1"
                  type="text"
                  placeholder="Enter Name"
                  // onKeyUp={handleMail}
                />
              </div>
              <div className="eInput">
                <FontAwesomeIcon className="icon" icon={faLock} />
                <input
                  id="input2"
                  type="number"
                  placeholder="Enter number"
                  // onKeyUp={handlenumber}
                />
              </div>
              <div className="submit">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
