import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import coins from "../images/coins.png";
import Ellipse1 from "../images/Ellipse1.png";
import dp from "../images/dp.png";
import greenArrow from "../images/greenArrow.png";
import { useTimer } from "react-timer-hook";
import { useLocation } from "react-router-dom";
import axios from "axios";

import "../styles/gradient.css";

import post from "../images/post.png";
import Vector from "../images/Vector.jpg";
import comment from "../images/comment.png";
import share from "../images/share.png";
import commentor from "../images/commentor.png";

const Url =
  "https://ap-south-1.aws.data.mongodb-api.com/app/gaming-social-fyglu/endpoint";

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ fontSize: "20px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
function Validation(props) {
  const location = useLocation();
  const { username, userid } = location.state;
  let [grossCoins, setGrossCoins] = useState(0);
  let [updateGC, setUpdateGC] = useState(false);
  let [user, setUser] = useState({});
  let [leaduser, setLeadUser] = useState({});
  const time = new Date();

  useEffect(() => {
    axios
      .get(Url + "/grosscoins")
      .then(function (response) {
        // handle success
        setGrossCoins(response.data[0].total.$numberInt);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [updateGC]);

  useEffect(() => {
    axios
      .get(Url + "/users?id=" + userid)
      .then(function (response) {
        // handle success
        console.log(response);
        setUser(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [grossCoins]);

  function leadPoints() {
    let new_nc = 100;
    let new_gc = 0;
    if (leaduser.username !== undefined) {
      new_nc = parseInt(leaduser.net_coins.$numberInt) + 100;
      new_gc = parseInt(leaduser.gross_coins.$numberInt) + new_nc;
    } else {
      new_gc = 100;
    }
    axios
      .post(Url + "/leadpoints?id=" + userid, {
        net_coins: new_nc,
        gross_coins: new_gc,
        lead: true,
      })
      .then(function (response) {
        setGrossCoins(parseInt(grossCoins) + 100);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get(Url + "/leaduser")
      .then(function (response) {
        // handle success
        console.log(response);
        setLeadUser(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, [user]);

  function showLeadUser() {
    if (leaduser.username !== undefined) {
      let leadCoins = leaduser.net_coins
        ? parseInt(leaduser.net_coins.$numberInt)
        : 0;
      return (
        <div className="mx-1 ms-3">
          <div>
            <Image
              src={Ellipse1}
              className="img-fluid rounded-start me-1"
              alt=".."
            />
            <span className="">
              {leadCoins}
              <Image className="ms-1" src={greenArrow} alt="arrow" />
            </span>
          </div>
          <p className="card-text " style={{ fontSize: "12px" }}>
            {leaduser.username}
            <span className="text-muted"> in Lead</span>
          </p>
        </div>
      );
    } else {
      return (
        <div className="mx-1 ms-3">
          <div>
            <Image
              src={Ellipse1}
              className="img-fluid rounded-start me-1"
              alt=".."
            />
            <span className="">
              0
              <Image className="ms-1" src={greenArrow} alt="arrow" />
            </span>
          </div>
          <p className="card-text " style={{ fontSize: "12px" }}>
            No Lead Found
            <span className="text-muted"> in Lead</span>
          </p>
        </div>
      );
    }
  }

  time.setSeconds(time.getSeconds() + 600);
  let gc = leaduser.gross_coins ? parseInt(leaduser.gross_coins.$numberInt) : 0;
  return (
    <div className="container fluid m-0 p-0">
      <div className="d-flex align-items-center my-2">
        <div className="ms-1">
          <Image
            src={dp}
            className="rounded-circle me-1"
            alt="dp"
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        </div>
        <div className="mx-1">
          <p className="card-text m-0">alfredo_rosser1</p>
          <p className="card-text text-muted" style={{ fontSize: "12px" }}>
            6 June 2021, 12:10 pm
          </p>
        </div>
        <div className="ms-5">
          <Image src={Ellipse1} className="img-fluid rounded-start" alt=".." />
          <span className="card-text ms-2">{gc} </span>
          <p className="card-text text-muted" style={{ fontSize: "12px" }}>
            Gross coins
          </p>
        </div>
        <div className="ms-2">
          <Image className="float-end" src={greenArrow} alt="arrow" />
        </div>
        <div className="ms-2">
          <Image className="float-end" src={greenArrow} alt="arrow" />
        </div>
      </div>
      {/* POST */}
      <div className="">
        <Image className="img-fluid m-0 p-0" src={post} alt="post" />
      </div>
      {/* BELOW POST */}
      <div className=" mt-2 ms-1">
        <Image
          src={Vector}
          className="img-fluid me-2"
          alt=".."
          style={{
            width: "30px",
            height: "30px",
          }}
        />
        <Image
          src={comment}
          className="img-fluid me-1"
          alt=".."
          style={{
            width: "30px",
            height: "30px",
          }}
        />
        <Image
          src={share}
          className="img-fluid me-1"
          alt=".."
          style={{
            width: "30px",
            height: "30px",
          }}
        />
        <div className="me-2 float-end">
          <button
            type="button"
            className="btn btn-primary "
            style={{ background: "#4B0082", borderRadius: "5px" }}
          >
            <span onClick={leadPoints}>Lead +100</span>
            <span
              className={`dot box`}
              // style={{
              //   height: "25px",
              //   width: "25px",

              //   borderRadius: "50%",
              //   display: "inline-block",
              // }}
            ></span>
          </button>
        </div>
      </div>
      <p
        className="ms-2 mt-2"
        style={{ fontSize: "14px", fontFamily: "Inter" }}
      >
        50 interested
      </p>
      {/* row-1 */}
      <div className="row">
        <div className="d-flex align-items-center my-2">
          <div className="ms-1">
            <Image
              src={commentor}
              className="ms-2 img-fluid rounded-start"
              alt=".."
              style={{
                width: "65px",
                height: "60px",
              }}
            />
          </div>
          {showLeadUser()}
          <MyTimer expiryTimestamp={time} />
        </div>
      </div>
      {/* row-2 */}
      <div className="row m-2 ">
        <div className="p-0">
          @alfredo r.. <span> If everything seems under control, you're</span>
        </div>
        <p className="p-0">going fast enough. Be Fast, Be Curious..! 😎</p>
      </div>
    </div>
  );
}

export default Validation;
