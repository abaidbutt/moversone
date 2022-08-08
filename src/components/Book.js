import "./Book.css";
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
const Book = () => {
  let Bus = [
    {
      name: "Islamabad",
      price: "200",
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },

    {
      name: "Lahore",
      price: "150",
      image:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Sialkot",
      price: "120",
      image:
        "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "BaniGala",
      price: "140",
      image:
        "https://images.unsplash.com/photo-1564694202883-46e7448c1b26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];
  // console.log(Bus[0].price);
  const bookBus1 = (event) => {
    console.log(event);
    const imageTarget = document.querySelector("#targetImage");
    const nameTarget = document.querySelector("#targetName");
    const priceTarget = document.querySelector("#targetPrice");
    const cards = document.querySelector(".cards_box");
    const request = document.querySelector(".request");

    imageTarget.src = Bus[0].image;
    nameTarget.innerHTML = Bus[0].name;
    priceTarget.innerHTML = "$" + Bus[0].price;
    cards.style.display = "none";
    request.style.display = "block";

    writeUserData();
    function writeUserData() {
      const db = getDatabase();
      set(ref(db, "booking/"), {
        BusImage: Bus[0].image,
        BusName: Bus[0].name,
        BusPrice: "$" + Bus[0].price,
      });
    }
  };
  const bookBus2 = (event) => {
    console.log(event);
    const imageTarget = document.querySelector("#targetImage");
    const nameTarget = document.querySelector("#targetName");
    const priceTarget = document.querySelector("#targetPrice");
    const cards = document.querySelector(".cards_box");
    const request = document.querySelector(".request");

    imageTarget.src = Bus[1].image;
    nameTarget.innerHTML = Bus[1].name;
    priceTarget.innerHTML = "$" + Bus[1].price;
    cards.style.display = "none";
    request.style.display = "block";

    writeUserData();
    function writeUserData() {
      const db = getDatabase();
      set(ref(db, "booking/"), {
        BusImage: Bus[1].image,
        BusName: Bus[1].name,
        BusPrice: "$" + Bus[1].price,
      });
    }
  };
  const bookBus3 = (event) => {
    console.log(event);
    const imageTarget = document.querySelector("#targetImage");
    const nameTarget = document.querySelector("#targetName");
    const priceTarget = document.querySelector("#targetPrice");
    const cards = document.querySelector(".cards_box");
    const request = document.querySelector(".request");

    imageTarget.src = Bus[2].image;
    nameTarget.innerHTML = Bus[2].name;
    priceTarget.innerHTML = "$" + Bus[2].price;
    cards.style.display = "none";
    request.style.display = "block";

    writeUserData();
    function writeUserData() {
      const db = getDatabase();
      set(ref(db, "booking/"), {
        BusImage: Bus[2].image,
        BusName: Bus[2].name,
        BusPrice: "$" + Bus[2].price,
      });
    }
  };
  const bookBus4 = (event) => {
    console.log(event);
    const imageTarget = document.querySelector("#targetImage");
    const nameTarget = document.querySelector("#targetName");
    const priceTarget = document.querySelector("#targetPrice");
    const cards = document.querySelector(".cards_box");
    const request = document.querySelector(".request");

    imageTarget.src = Bus[3].image;
    nameTarget.innerHTML = Bus[3].name;
    priceTarget.innerHTML = "$" + Bus[3].price;
    cards.style.display = "none";
    request.style.display = "block";

    writeUserData();
    function writeUserData() {
      const db = getDatabase();
      set(ref(db, "booking/"), {
        BusImage: Bus[3].image,
        BusName: Bus[3].name,
        BusPrice: "$" + Bus[3].price,
      });
    }
  };
  const bookBus = (item) => {
    console.log(item);
    const imageTarget = document.querySelector("#targetImage");
    const nameTarget = document.querySelector("#targetName");
    const priceTarget = document.querySelector("#targetPrice");
    const cards = document.querySelector(".cards_box");
    const request = document.querySelector(".request");

    imageTarget.src = item.image;
    nameTarget.innerHTML = item.name;
    priceTarget.innerHTML = "$" + item.price;
    cards.style.display = "none";
    request.style.display = "block";

    writeUserData();
    function writeUserData() {
      const db = getDatabase();
      set(ref(db, "booking/"), {
        BusImage: item.image,
        BusName: item.name,
        BusPrice: "$" + item.price,
      });
    }
  };
  const request = (event) => {
    console.log(event);
    const imageTarget = document.querySelector("#targetImage");
    const nameTarget = document.querySelector("#targetName");
    const priceTarget = document.querySelector("#targetPrice");
    const request = document.querySelector(".request");
    const cards = document.querySelector(".cards_box");
    request.style.display = "none";
    cards.style.display = "block";
    alert("Your request has been sent");

    imageTarget.src = "";
    nameTarget.innerHTML = "";
    priceTarget.innerHTML = "";
  };
  return (
    <div className="box">
      <div className="content">
        <div className="text">Find best Bus</div>
        <div className="target">
          <div className="trgt">
            <div className="card">
              <img src="" id="targetImage" alt="" />
              <div className="hotel_name" id="targetName"></div>
              <div className="price" id="targetPrice"></div>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="cards_box">
            {Bus.map((item, index) => (
              <div className="card" onClick={() => bookBus(item)}>
                <img src={item.image} alt="hotel1" />
                <div className="hotel_name">{item.name}</div>
                <div className="price">{"$" + item.price}</div>
              </div>
            ))}
            {/* <div className="card" onClick={bookBus1}>
              <img src={Bus[0].image} alt="hotel1" />
              <div className="hotel_name">{Bus[0].name}</div>
              <div className="price">{"$" + Bus[0].price}</div>
            </div> */}
            {/*  */}
            {/* <div className="card" onClick={bookBus2}>
              <img src={Bus[1].image} alt="hotel2" />
              <div className="hotel_name">{Bus[1].name}</div>
              <div className="price">{"$" + Bus[1].price}</div>
            </div> */}
            {/*  */}
            {/* <div className="card" onClick={bookBus3}>
              <img src={Bus[2].image} alt="hotel3" />
              <div className="hotel_name">{Bus[2].name}</div>
              <div className="price">{"$" + Bus[2].price}</div>
            </div> */}
            {/*  */}
            {/* <div className="card" onClick={bookBus4}>
              <img src={Bus[3].image} alt="hotel4" />
              <div className="hotel_name">{Bus[3].name}</div>
              <div className="price">{"$" + Bus[3].price}</div>
            </div> */}
          </div>
          <div className="request">
            <button className="btn" onClick={request}>
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Book;
