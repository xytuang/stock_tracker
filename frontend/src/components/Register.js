import { Formik, Field, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const registerUser = async (values) => {
  try {
      const response = await axios.post("http://localhost:8080/auth/register", {
          email: values.email,
          password: values.password,
          username: values.username
      }, { withCredentials: true });
      return response;
  } catch (error) {
      throw error;
  }
};

const Register = () => {
  const navigate = useNavigate()
    return (
      <div className="Register">
        <h1>Register</h1>
        <Formik
          initialValues={{ username: "", email: "", password: ""}}
          onSubmit={async (values) => {
            try {
              const res = await registerUser(values)
              if (res.status === 200) {
                const user = res.data
                console.log("Register success", user)
                navigate("/login")
              }
              else {
                console.log("Register failed")
              }
            }
            catch (error) {
              console.error("Error registering: ", error)
            }
          }}
        >
          <Form>
            <div>
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
        <button onClick={() => navigate("/login")}>Login here</button>
      </div>
    );
  }

  export default Register