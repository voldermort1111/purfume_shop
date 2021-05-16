import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, FormGroup, Col } from "reactstrap";
import { Field, Form, Formik } from "formik";
// import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { login } from "./../services/auth.service";
import { SessionStoreKey } from "./../constants/app.constants";
import FieldTextInput from "components/Forms/text-input";
import { NotificationManager } from "react-notifications";
import { hasChangeAuth } from "redux/actions/auth.action";
import { useDispatch } from "react-redux";

const LoginValidateSchema = Yup.object().shape({
  email: Yup.string()
    .email("Không đúng định dạng email")
    .required("Không được bỏ trống"),
  password: Yup.string().required("Không được bỏ trống"),
});

export default function Login() {
  // const history = useHistory();
  const dispatch = useDispatch();

  // const token = sessionStorage.getItem(SessionStoreKey.ACCESS_TOKEN);
  // if (token) {
  //   history.push("/");
  //   return <></>;
  // }
  const submit = ({ email, password }) => {
    login({ email, password })
      .then((result) => {
        sessionStorage.setItem(
          SessionStoreKey.ACCESS_TOKEN,
          result.data.accessToken
        );
        dispatch(hasChangeAuth(result.data.accessToken));
        // history.push("/");
      })
      .catch((error) =>
        NotificationManager.error(
          error.response.data?.message || error.message || "Đã xảy ra lỗi!"
        )
      );
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-3 text-center">
            <h1 className="display-4">Đăng nhập</h1>
          </CardHeader>
          <CardBody className="px-lg-3 py-lg-3">
            <Formik
              validationSchema={LoginValidateSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={submit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <FormGroup>
                          <Field
                            label="Email"
                            placeholder="Email"
                            required
                            id="email"
                            name="email"
                            component={FieldTextInput}
                          />
                          {errors.email && touched.email ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.email}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-sm-12 col-xs-12">
                        <FormGroup>
                          <Field
                            label="Password"
                            placeholder="Password"
                            required
                            id="password"
                            name="password"
                            type="password"
                            component={FieldTextInput}
                          />
                          {errors.password && touched.password ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.password}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Đăng nhập
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}
