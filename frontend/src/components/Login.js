import { Formik, Field, Form } from "formik"
import axios from "axios"

function Login() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            
            const res = await axios.post("http://localhost:8080/auth/login", {email: values.email, password: values.password })
            if (res.status != 200) {
                alert("Invalid credentials!")
            }
            else {
                alert(JSON.stringify(values, null, 2));
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
      </div>
    );
  }

  export default Login