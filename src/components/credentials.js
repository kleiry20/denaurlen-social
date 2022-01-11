import React, { Component, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Url =
  "https://ap-south-1.aws.data.mongodb-api.com/app/gaming-social-fyglu/endpoint";
function Credentials() {
  let [user, setUser] = useState({});
  let [redirect, setRedirect] = useState(false);
  let [userid, setUserid] = useState("");

  function submitForm(e) {
    e.preventDefault();
    axios
      .post(Url + "/users", user)
      .then(function (response) {
        if (response.data.create) {
          setUserid(response.data.user.insertedId.$oid);
        } else {
          setUserid(response.data.user._id.$oid);
        }
        setRedirect(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleInputChange(event) {
    user = { ...user };
    user[event.target.name] = event.target.value;
    setUser(user);
  }

  // redirect = { ...redirect };
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/validation",
          state: { username: user.username, userid: userid },
        }}
      />
    );
  } else {
    return (
      <div className="container fluid p-5">
        <div className="row justify-content-center align-center">
          <div className="col-sm-3">
            <Form onSubmit={submitForm}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ fontSize: "24px" }}>
                  Enter the credentials
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  className="mb-3 mt-3"
                  name="name"
                  onChange={handleInputChange}
                />
                <Form.Control
                  name="username"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                />
              </Form.Group>
              <div className="row p-2">
                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Credentials;
