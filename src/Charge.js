import "./components/Book.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import React from "react";
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
let Bus = [
  {
    name: "Islamabad",
    to: "Karachi",
    price: "200",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },

  {
    name: "Lahore",
    to: "Islamabad",
    price: "150",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Sialkot",
    to: "Faisalabad",
    price: "120",
    image:
      "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "BaniGala",
    to: "Multan",
    price: "140",
    image:
      "https://images.unsplash.com/photo-1564694202883-46e7448c1b26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

const Book = () => {
  const navigate = useNavigate();
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
    const q = query(collection(db, "bus"));
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
  const bookBus = (item) => {
    navigate(`/book/${item.from}/${item.price}/${item.to}/${item.seats}`);
  };

  // const request = (event) => {
  //   console.log(event);
  //   const imageTarget = document.querySelector("#targetImage");
  //   const nameTarget = document.querySelector("#targetName");
  //   const priceTarget = document.querySelector("#targetPrice");
  //   const request = document.querySelector(".request");
  //   const cards = document.querySelector(".cards_box");
  //   request.style.display = "none";
  //   cards.style.display = "block";
  //   alert("Your request has been sent");

  //   imageTarget.src = "";
  //   nameTarget.innerHTML = "";
  //   priceTarget.innerHTML = "";
  // };
  // console.log(Bus);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="box">
        <div className="content">
          <div className="text">Find best Bus</div>
          <div className="target">
            <div className="trgt">
              <div className="card">
                <img
                  src="images.jpg"
                  id="targetImage"
                  alt=""
                  style={{
                    width: "10%",
                    height: "10%",
                  }}
                />
                <div className="hotel_name" id="targetName"></div>
                <div className="price" id="targetPrice"></div>
              </div>
            </div>
          </div>
          <div className="cards">
            <div className="cards_box">
              {booked?.map((item, index) => (
                <div className="card" key={index}>
                  <img src={item.image} alt="hotel1" />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div className="hotel_name">
                        {item.from} to {item.to}
                      </div>
                      <div className="price">{item.book_date}</div>
                    </div>
                    <div className="price">{"$" + item.price}</div>
                  </div>
                  <div className="request">
                    <button className="btn" onClick={() => bookBus(item)}>
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Book;
