import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Charge from "./Charge";
import Book from "./Book";
import Home from "./components/AirbnbHome";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booked from "./components/booked";
import Admin from "./components/Admin";
import Bus from "./components/Bus";
function Main() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />}>
            {/* <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/book/:from/:price/:to/:seats" element={<Book />} />
          <Route path="/booked" element={<Booked />} />
          <Route path="/home" element={<Charge />} />
          <Route path="/admin/bus" element={<Bus />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

ReactDOM.render(
  <>
    <Main />
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
