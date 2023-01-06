export const Card = ({ inputHandler, registerHandler, loginHandler, req }) => {
  return (
    <div className="card grey lighten-4">
      <div className="card-content">
        <span className="card-title">Authentication</span>
        <div className="row" style={{ margin: '1rem 0', marginBottom: '0' }}>
          <div className="input-field">
            <input
              id="user_email"
              type="text"
              name="email"
              onChange={inputHandler}
            />
            <label htmlFor="user_email">Email</label>
          </div>
          <div className="input-field">
            <input
              id="user_password"
              type="password"
              name="password"
              onChange={inputHandler}
            />
            <label htmlFor="user_password">Password</label>
          </div>
        </div>
      </div>
      <div className="card-action">
        <button className="btn" onClick={loginHandler} disabled={req.loading}>
          Login
        </button>
        <button
          className="btn grey darken-3 right"
          onClick={registerHandler}
          disabled={req.loading}
        >
          Register
        </button>
      </div>
    </div>
  );
};
