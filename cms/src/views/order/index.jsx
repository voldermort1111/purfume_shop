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
  deleteOrder,
  getPageOrders,
  updateOrder,
} from "./../../services/order.service";
import { NotificationManager } from "react-notifications";
import PerfumeModal from "components/modal";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FieldTextInput from "components/Forms/text-input";
import DeleteConfirmModal from "components/modal/delete-confirm";
import {
  LIMIT_PAGE_SPECIAL,
  statusEnum,
  statusOb,
  statusTextColor,
} from "constants/app.constants";
import { currencyFormatter } from "utils/format";
import OrderDetail from "./components/detail";

const ValidationSchema = Yup.object().shape({
  status: Yup.string().required("Không được bỏ trống"),
});

const formDefault = {
  id: null,
  status: "",
};

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [idForRemove, setIdForRemove] = useState(null);
  const [isToggleDelete, setIsToggleDelete] = useState(false);
  const [title, setTitle] = useState("");
  const [formDefaultValue, setFormDefaultValue] = useState(formDefault);
  const [reload, setReload] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [isToggleDetail, setIsToggleDetail] = useState(false);
  const [indexForDetail, setIndexForDetail] = useState(null);

  useEffect(() => {
    getPageOrders({
      limit: LIMIT_PAGE_SPECIAL,
      page: currentPage,
      sortBy: "createdAt",
      direction: "DESC",
    })
      .then((result) => {
        setOrders(result.data[0]);
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
        limit={LIMIT_PAGE_SPECIAL}
        onChange={onPaginationChange}
      />
    ),
    [totalItem, onPaginationChange]
  );

  const submit = useCallback(
    ({ status, id }) => {
      const exit = orders?.find(
        (_data) => _data.status === status && +_data.id === +id
      );
      if (exit) {
        if (title === "EDIT") {
          NotificationManager.error(
            `Bạn chưa thay đổi thông tin hoặc dữ liệu đã tồn tại!`
          );
        }
      } else {
        if (title === "EDIT") {
          updateOrder(id, { status })
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
    [reload, setReload, orders, title]
  );

  const submitRemove = (value) => {
    if (value) {
      deleteOrder(idForRemove)
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
            status: formDefaultValue.status,
          }}
          onSubmit={({ status }) => submit({ status, id: formDefaultValue.id })}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <FormGroup>
                      <Field
                        label="Trạng thái đơn hàng"
                        required
                        id="status"
                        name="status"
                        type="select"
                        options={statusEnum}
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

  const orderDetail = useMemo(
    () => (
      <OrderDetail
        isToggle={isToggleDetail}
        setIsToggle={setIsToggleDetail}
        order={orders[indexForDetail]}
      />
    ),
    [orders, indexForDetail, isToggleDetail, setIsToggleDetail]
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
      {orderDetail}
      <Container className="mt--8" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0"></CardHeader>
              <Table className="align-items-center" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col" className="text-center">
                      Người nhận
                    </th>
                    <th scope="col" className="text-center">
                      Số điện thoại
                    </th>
                    <th scope="col" className="text-center">
                      Giá
                    </th>
                    <th scope="col" className="text-center">
                      Địa chỉ
                    </th>
                    <th scope="col" className="text-center">
                      Ghi chú
                    </th>
                    <th scope="col" className="text-center">
                      Trạng thái
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((_data, index) => (
                    <tr key={index}>
                      <th scope="row" className="text-center">
                        {index + 1 + (currentPage - 1) * LIMIT_PAGE_SPECIAL}
                      </th>
                      <td className="text-center">{_data.receiver}</td>
                      <td className="text-center">{_data.phoneNumber}</td>
                      <td className="text-center">
                        {currencyFormatter.format(_data.price)}
                      </td>
                      <td className="text-center">{_data.address}</td>
                      <td
                        className="text-truncate text-center"
                        style={{ maxWidth: 150 }}
                      >
                        {_data.note || "Không có"}
                      </td>
                      <td
                        className={`text-center ${
                          statusTextColor[_data.status]
                        }`}
                      >
                        {statusOb[_data.status]}
                      </td>
                      <td>
                        <Button
                          color="info"
                          size="sm"
                          onClick={() => {
                            setIndexForDetail(index);
                            setIsToggleDetail(true);
                          }}
                        >
                          <i className="fas fa-eye"></i>
                        </Button>
                        {_data.status !== "COMPLETED" ? (
                          _data.status === "CENCELED" ? (
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
                          ) : (
                            <Button
                              color="primary"
                              size="sm"
                              onClick={() => {
                                setTitle("EDIT");
                                setFormDefaultValue({
                                  id: _data.id,
                                  status: _data.status,
                                });
                                setIsToggle(true);
                              }}
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                          )
                        ) : null}
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
