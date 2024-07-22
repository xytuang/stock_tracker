import { Formik, Field, Form } from "formik";
import axios from "axios";

function Register() {
    return (
      <div className="Login">
        <h1>Register</h1>
        <Formik
          initialValues={{ username: "", email: "", password: ""}}
          onSubmit={async (values) => {
            const res = await axios.post("http://localhost:8080/auth/login", {email: values.email, password: values.password, username: values.username})
            alert(JSON.stringify(values, null, 2));
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
      </div>
    );
  }

  export default Register