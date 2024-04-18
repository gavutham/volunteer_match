import { useContext, useEffect } from "react";
import { Context } from "../../../context/context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();

  //implement after the testing of login and signup

  // useEffect(() => {
  //   if (user !== null) navigate("/");
  // }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      //get this from form login submission

      // const res = await api.post("/auth/login", {
      // 	email: emailRef.current.value,
      // 	password: passRef.current.value,
      // });

      const res = { data: { name: "gavutham", email: "kg@gmail.com" } };

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      console.log(user);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div>
      {/* build the login form here*/}
      <button disabled={isFetching} onClick={handleLogin}>
        login
      </button>
    </div>
  );
};

export default Login;
