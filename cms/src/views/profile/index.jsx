import FieldTextInput from "components/Forms/text-input";
import Header from "components/Headers/Header";
import PerfumeModal from "components/modal";
import { Field, Formik, Form } from "formik";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { getInfo } from "./../../services/user.service";
import { changePassword } from "./../../services/auth.service";
import { NotificationManager } from "react-notifications";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Mật khẩu quá ngắn")
    .max(16, "Mật khẩu quá dài")
    .matches(/[a-z]/, "Phải bao gồm chữ thường, chữ in hoa và số")
    .matches(/[A-Z]/, "Phải bao gồm chữ thường, chữ in hoa và số")
    .matches(/\d/, "Phải bao gồm chữ thường, chữ in hoa và số")
    .required("Không được bỏ trống"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Không khớp với mật khẩu đã nhập")
    .required("Không được bỏ trống"),
});

export default function Profile() {
  const [user, setUser] = useState({});
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    getInfo().then((result) => setUser(result.data));
  }, []);

  const submit = (value) => {
    console.log(value);
    changePassword({ password: value.password })
      .then(() => NotificationManager.success("Đổi mật khẩu thành công!"))
      .catch((error) =>
        NotificationManager.error(
          error.response.data?.message || error.message || "Đã xảy ra lỗi!"
        )
      )
      .finally(() => setIsToggle(false));
  };

  const modalContent = useMemo(
    () => (
      <>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          onSubmit={submit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <FormGroup>
                      <Field
                        label="password"
                        placeholder="password"
                        required
                        type="password"
                        id="password"
                        name="password"
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
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <FormGroup>
                      <Field
                        label="confirmPassword"
                        placeholder="confirmPassword"
                        required
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        component={FieldTextInput}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div style={{ marginTop: 10 }}>
                          <small className="text-danger">
                            {errors.confirmPassword}
                          </small>
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  color="secondary"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => setIsToggle(false)}
                >
                  Đóng
                </Button>
                <Button color="primary" type="submit">
                  Lưu
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    ),
    [submit, setIsToggle]
  );

  return (
    <>
      <Header />
      <PerfumeModal
        isToggle={isToggle}
        setIsToggle={setIsToggle}
        customTitle={"Đổi mật khẩu"}
        content={modalContent}
      />
      <Container className="mt--8" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0"></CardHeader>
              <Container fluid>
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-xs-6">
                    <label className="form-control-label">Họ tên</label>
                    <p>{user.name}</p>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-6">
                    <label className="form-control-label">Email</label>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-6 col-xs-6">
                    <label className="form-control-label">Số điện thoại</label>
                    <p>{user.phoneNumber}</p>
                  </div>
                  <div className="col-md-6 col-sm-6 col-xs-6">
                    <label className="form-control-label">Quyền</label>
                    <p>{user.role}</p>
                  </div>
                </div>
                <div className="row" style={{ marginBottom: 30 }}>
                  <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                    <Button
                      size="lg"
                      color="primary"
                      onClick={() => setIsToggle(true)}
                    >
                      {" "}
                      Đổi mật khẩu
                    </Button>
                  </div>
                </div>
              </Container>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
