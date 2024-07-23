import { Formik, Field, Form } from "formik"
import axios from "axios"
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const loginUser = async (values) => {
  try {
      const response = await axios.post("http://localhost:8080/auth/login", {
          email: values.email,
          password: values.password,
      }, {withCredentials: true});
      return response;
  } catch (error) {
      throw error;
  }
};

const Login = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AuthContext)
    return (
      <div className="login">
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
                const res = await loginUser(values)
                if (res.status === 200) {
                  const user = res.data
                  //console.log(user._id)
                  window.localStorage.setItem("id", user._id)
                  //console.log(window.localStorage.getItem("id"))
                  setIsAuthenticated(true)
                  navigate("/landing")
                }
                else {
                  console.log("Login failed")
                }
            }
            catch (error) {
              console.error("Error logging in: ", error)
            }
          }}
        >
          <Form>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
        <button onClick={() => navigate("/register")}>Register here</button>
      </div>
    );
  }

  export default Login