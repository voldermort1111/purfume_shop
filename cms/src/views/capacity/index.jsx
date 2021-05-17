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
  createCapacity,
  deleteCapacity,
  getPageCapacities,
  updateCapacity,
} from "./../../services/capacity.service";
import { NotificationManager } from "react-notifications";
import PerfumeModal from "components/modal";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FieldTextInput from "components/Forms/text-input";
import DeleteConfirmModal from "components/modal/delete-confirm";
import { LIMIT_PAGE_COMPONENT } from "constants/app.constants";

const ValidationSchema = Yup.object().shape({
  value: Yup.number()
    .typeError("Phải là số")
    .max(1000, "Không lớn hơn 1000")
    .min(1, "Phải lớn hơn 1")
    .required("Không được bỏ trống"),
});

const formDefault = {
  id: null,
  value: "",
  unit: "ml",
};

export default function Capacity() {
  const [capacities, setCapacities] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [idForRemove, setIdForRemove] = useState(null);
  const [isToggleDelete, setIsToggleDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [formDefaultValue, setFormDefaultValue] = useState(formDefault);
  const [reload, setReload] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    getPageCapacities({ limit: LIMIT_PAGE_COMPONENT, page: currentPage })
      .then((result) => {
        setCapacities(result.data[0]);
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
    ({ value, unit, id }) => {
      const exit = capacities?.find(
        (_data) =>
          +_data.value === +value && _data.unit === unit && +_data.id === +id
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
          createCapacity({ value: +value, unit })
            .then(() => NotificationManager.success(`Tạo mới thành công!`))
            .catch((error) =>
              NotificationManager.error(
                error.response.data?.message ||
                  error.message ||
                  "Đã xảy ra lỗi!"
              )
            )
            .finally(() => setReload(Date.now()));
        } else {
          updateCapacity(id, { value: +value, unit })
            .then(() => NotificationManager.success(`Sửa thành công!`))
            .catch((error) =>
              NotificationManager.error(
                error.response.data?.message ||
                  error.message ||
                  "Đã xảy ra lỗi!"
              )
            )
            .finally(() => setReload(Date.now()));
        }
        setFormDefaultValue(formDefault);
        setIsToggle(false);
      }
    },
    [reload, setReload, capacities, title]
  );

  const submitRemove = (value) => {
    if (value) {
      deleteCapacity(idForRemove)
        .then(() => NotificationManager.success(`Xóa thành công!`))
        .catch((error) =>
          NotificationManager.error(
            error.response.data?.message || error.message || "Đã xảy ra lỗi!"
          )
        )
        .finally(() => setReload(Date.now()));
    }
    setIdForRemove(null);
  };

  const modalContent = useMemo(
    () => (
      <>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            value: formDefaultValue.value,
            unit: formDefaultValue.unit,
          }}
          onSubmit={({ value, unit }) =>
            submit({ value, unit, id: formDefaultValue.id })
          }
        >
          {({ errors, touched }) => (
            <Form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-8 col-sm-8 col-xs-8">
                    <FormGroup>
                      <Field
                        label="Dung tích"
                        placeholder="Dung tích"
                        required
                        id="value"
                        name="value"
                        component={FieldTextInput}
                      />
                      {errors.value && touched.value ? (
                        <div style={{ marginTop: 10 }}>
                          <small className="text-danger">{errors.value}</small>
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>
                  <div className="col-md-4 col-sm-4 col-xs-4">
                    <FormGroup>
                      <Field
                        label="Đơn vị"
                        placeholder="Đơn vị"
                        required
                        id="unit"
                        name="unit"
                        type="select"
                        options={[
                          { value: "ml", label: "ml" },
                          { value: "l", label: "l" },
                        ]}
                        component={FieldTextInput}
                      />
                      {errors.unit && touched.unit ? (
                        <div style={{ marginTop: 10 }}>
                          <small className="text-danger">{errors.unit}</small>
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
                    <th scope="col">Dung tích</th>
                    <th scope="col">Đơn vị</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {capacities.map((capacity, index) => (
                    <tr key={index}>
                      <th scope="row">
                        {index + 1 + (currentPage - 1) * LIMIT_PAGE_COMPONENT}
                      </th>
                      <td>{capacity.value}</td>
                      <td>{capacity.unit}</td>
                      <td>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => {
                            setTitle("EDIT");
                            setFormDefaultValue({
                              id: capacity.id,
                              value: capacity.value,
                              unit: capacity.unit,
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
                            setIdForRemove(capacity.id);
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
