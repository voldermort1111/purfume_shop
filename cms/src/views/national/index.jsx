import Header from "components/Headers/Header";
import PerfumePagination from "components/Pagination";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Container,
  FormGroup,
  Row,
  Table,
} from "reactstrap";
import {
  createNational,
  deleteNational,
  getPageNationals,
  updateNational,
} from "./../../services/national.service";
import { NotificationManager } from "react-notifications";
import PerfumeModal from "components/modal";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FieldTextInput from "components/Forms/text-input";
import DeleteConfirmModal from "components/modal/delete-confirm";
import { LIMIT_PAGE_COMPONENT } from "constants/app.constants";

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Không quá 50 ký tự")
    .required("Không được bỏ trống"),
});

const formDefault = {
  id: null,
  name: "",
};

export default function National() {
  const [nationals, setNationals] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [idForRemove, setIdForRemove] = useState(null);
  const [isToggleDelete, setIsToggleDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [formDefaultValue, setFormDefaultValue] = useState(formDefault);
  const [reload, setReload] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    getPageNationals({ limit: LIMIT_PAGE_COMPONENT, page: currentPage })
      .then((result) => {
        setNationals(result.data[0]);
        setTotalItem(result.data[1]);
      })
      .catch((error) =>
        NotificationManager.error(
          error.response.data?.message || error.message || "Đã xảy ra lỗi!"
        )
      );
  }, [reload, currentPage]);

  const onPaginationChange = useCallback(
    (value) => setCurrentPage(value),
    [setCurrentPage]
  );

  const pagination = useMemo(
    () => (
      <PerfumePagination
        totalItem={totalItem}
        limit={LIMIT_PAGE_COMPONENT}
        onChange={onPaginationChange}
      />
    ),
    [totalItem, onPaginationChange]
  );

  const submit = useCallback(
    ({ name, id }) => {
      const exit = nationals?.find(
        (_data) => _data.name === name && +_data.id === +id
      );
      if (exit) {
        if (title === "EDIT") {
          NotificationManager.error(
            `Bạn chưa thay đổi thông tin hoặc dữ liệu đã tồn tại!`
          );
        } else {
          NotificationManager.error(`Dữ liệu đã tồn tại!`);
        }
      } else {
        if (title === "ADD") {
          createNational({ name })
            .then(() => NotificationManager.success(`Tạo mới thành công!`))
            .catch((error) =>
              NotificationManager.error(
                error.response.data?.message ||
                  error.message ||
                  "Đã xảy ra lỗi!"
              )
            )
            .finally(() => setReload(!reload));
        } else {
          updateNational(id, { name })
            .then(() => NotificationManager.success(`Sửa thành công!`))
            .catch((error) =>
              NotificationManager.error(
                error.response.data?.message ||
                  error.message ||
                  "Đã xảy ra lỗi!"
              )
            )
            .finally(() => setReload(!reload));
        }
        setFormDefaultValue(formDefault);
        setIsToggle(false);
      }
    },
    [reload, setReload, nationals, title]
  );

  const submitRemove = (value) => {
    if (value) {
      deleteNational(idForRemove)
        .then(() => NotificationManager.success(`Xóa thành công!`))
        .catch((error) =>
          NotificationManager.error(
            error.response.data?.message || error.message || "Đã xảy ra lỗi!"
          )
        )
        .finally(() => setReload(!reload));
    }
    setIdForRemove(null);
  };

  const modalContent = useMemo(
    () => (
      <>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            name: formDefaultValue.name,
          }}
          onSubmit={({ name }) => submit({ name, id: formDefaultValue.id })}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <FormGroup>
                      <Field
                        label="Tên quốc gia"
                        placeholder="Tên quốc gia"
                        required
                        id="name"
                        name="name"
                        component={FieldTextInput}
                      />
                      {errors.name && touched.name ? (
                        <div style={{ marginTop: 10 }}>
                          <small className="text-danger">{errors.name}</small>
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
    [submit, setIsToggle, formDefaultValue]
  );

  return (
    <>
      <Header />
      <PerfumeModal
        isToggle={isToggle}
        setIsToggle={setIsToggle}
        title={title}
        content={modalContent}
      />
      <DeleteConfirmModal
        isToggle={isToggleDelete}
        setIsToggle={setIsToggleDelete}
        onSubmit={submitRemove}
      />
      <Container className="mt--8" fluid>
        <div style={{ marginBottom: 20 }}>
          <Button
            className="btn-icon btn-3"
            color="primary"
            type="button"
            onClick={() => {
              setTitle("ADD");
              setFormDefaultValue(formDefault);
              setIsToggle(true);
            }}
          >
            <span className="btn-inner--icon">
              <i className="ni ni-fat-add" />
            </span>
            <span className="btn-inner--text">Thêm mới</span>
          </Button>
        </div>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0"></CardHeader>
              <Table className="align-items-center" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Quốc gia</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {nationals.map((_data, index) => (
                    <tr key={index}>
                      <th scope="row">
                        {index + 1 + (currentPage - 1) * LIMIT_PAGE_COMPONENT}
                      </th>
                      <td>{_data.name}</td>
                      <td>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => {
                            setTitle("EDIT");
                            setFormDefaultValue({
                              id: _data.id,
                              name: _data.name,
                            });
                            setIsToggle(true);
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => {
                            setIdForRemove(_data.id);
                            setIsToggleDelete(true);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">{pagination}</CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}