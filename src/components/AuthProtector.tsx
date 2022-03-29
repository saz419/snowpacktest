import React, { FC, useEffect, useState } from "react";
import {
  PasswordInput,
  Text,
  Group,
  PasswordInputProps,
  Anchor,
  TextInput,
} from "@mantine/core";
import { connect } from "react-redux";
import { Dispatch, RootState } from "../store";
import { UserType } from "../store/models/user";
import { useNavigate } from "react-router-dom";

interface Props {
  user: UserType;
  setUser: (e: UserType) => {};
}

const AuthProtector: FC<Props> = ({ setUser, user, ...props }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const handelLogin = () => {
    const userCred = {
      loggedIn: true,
      name: name,
      email: email,
    };
    setUser(userCred);
  };
  useEffect(() => {
    if (user.loggedIn) navigate("/");
  }, [user]);
  return (
    <div className="container w-10/12 m-auto text-center">
      <h1>AuthProtector</h1>
      <div className="login-form w-6/12 m-auto mt-3">
        <input
          name="name"
          placeholder="Please enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
          className="primary-inp mt-4"
        />
        <input
          name="email"
          placeholder="Please enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="primary-inp mt-4"
        />
        <button onClick={handelLogin} className="primary-btn mt-4">
          Login
        </button>
      </div>
    </div>
  );
};

const mapState = (state: RootState) => ({
  user: state.user,
});

const mapDispatch = (dispatch: Dispatch) => ({
  setUser: (e: UserType) => dispatch.user.setUser(e),
});

export default connect(mapState, mapDispatch)(AuthProtector);
