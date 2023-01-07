import React, { useEffect, useContext, useState } from 'react';
import { Card } from './Card.js';
import { useHttp } from '../hooks/http.hooks.js';
import { useMessage } from '../hooks/message.hook.js';
import { AuthContext } from '../context/Auth.context.js';

export const AuthPage = () => {
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const auth = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    console.log(error);

    message(error, false);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  };

  const registerHandler = async () => {
    try {
      const data = await request(
        'http://localhost:5033/api/auth/register',
        'POST',
        {
          ...form,
        }
      );
      message(data.message, true);
    } catch (err) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request(
        'http://localhost:5033/api/auth/login',
        'POST',
        {
          ...form,
        }
      );
      message(data.message, true);
      auth.login(data.userToken, data.userId);
    } catch (err) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h2
          style={{
            margin: '2rem auto 3rem auto',
            textAlign: 'center',
            fontWeight: 300,
            letterSpacing: 7,
          }}
        >
          Shrink the Link
        </h2>
        <Card
          inputHandler={changeHandler}
          registerHandler={registerHandler}
          loginHandler={loginHandler}
          req={{ loading, request }}
        />
      </div>
    </div>
  );

  // return <Navigate to="/" />;
};
