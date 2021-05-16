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
  createProvider,
  deleteProvider,
  getPageProviders,
  updateProvider,
} from "./../../services/provider.service";
import { getNationals } from "./../../services/national.service";
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
  nationalId: Yup.number()
    .typeError("Không được bỏ trống")
    .required("Không được bỏ trống"),
});

const formDefault = {
  id: null,
  nationalId: null,
  name: "",
};

export default function Provider() {
  const [nationals, setNationals] = useState([]);
  const [providers, setProviders] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [idForRemove, setIdForRemove] = useState(null);
  const [isToggleDelete, setIsToggleDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [formDefaultValue, setFormDefaultValue] = useState(formDefault);
  const [reload, setReload] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    getPageProviders({ limit: LIMIT_PAGE_COMPONENT, page: currentPage })
      .then((result) => {
        setProviders(result.data[0]);
        setTotalItem(result.data[1]);
      })
      .catch((error) =>
        NotificationManager.error(
          error.response.data?.message || error.message || "Đã xảy ra lỗi!"
        )
      );
  }, [reload, currentPage]);

  useEffect(() => {
    getNationals()
      .then((result) => {
        if (!result.data) {
          setNationals([{ value: null, label: "-----" }]);
          return;
        }
        const _nationals = result.data.map((_) => ({
          value: _.id,
          label: _.name,
        }));
        setNationals([{ value: null, label: "-----" }, ..._nationals]);
      })
      .catch((error) =>
        NotificationManager.error(
          error.response.data?.message || error.message || "Đã xảy ra lỗi!"
        )
      );
  }, []);

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
    ({ name, nationalId, id }) => {
      const exit = providers?.find(
        (_data) =>
          _data.name === name &&
          +_data.nationalId === +nationalId &&
          +_data.id === +id
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
          createProvider({ name })
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
          updateProvider(id, { name })
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
    [reload, setReload, providers, title]
  );

  const submitRemove = (value) => {
    if (value) {
      deleteProvider(idForRemove)
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
            nationalId: formDefaultValue.nationalId,
          }}
          onSubmit={({ name, nationalId }) =>
            submit({ name, nationalId, id: formDefaultValue.id })
          }
        >
          {({ errors, touched }) => (
            <Form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-8 col-sm-8 col-xs-8">
                    <FormGroup>
                      <Field
                        label="Thương hiệu"
                        placeholder="Thương hiệu"
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
                  <div className="col-md-8 col-sm-8 col-xs-8">
                    <FormGroup>
                      <Field
                        label="Quốc gia"
                        placeholder="Quốc gia"
                        required
                        id="nationalId"
                        name="nationalId"
                        type="select"
                        options={nationals}
                        component={FieldTextInput}
                      />
                      {errors.nationalId && touched.nationalId ? (
                        <div style={{ marginTop: 10 }}>
                          <small className="text-danger">
                            {errors.nationalId}
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
    [submit, setIsToggle, formDefaultValue, nationals]
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
                    <th scope="col">Thương hiệu</th>
                    <th scope="col">Xuất xứ</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {providers.map((_data, index) => (
                    <tr key={index}>
                      <th scope="row">
                        {index + 1 + (currentPage - 1) * LIMIT_PAGE_COMPONENT}
                      </th>
                      <td>{_data.name}</td>
                      <td>{_data.national.name}</td>
                      <td>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => {
                            setTitle("EDIT");
                            setFormDefaultValue({
                              id: _data.id,
                              name: _data.name,
                              nationalId: _data.nationalId,
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
