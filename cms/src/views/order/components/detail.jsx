import PerfumeModal from "components/modal";
import { useEffect, useMemo, useState } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { Button, Table } from "reactstrap";
import { getProductByOrder } from "services/order.service";
import { currencyFormatter } from "utils/format";
import { statusOb, statusTextColor } from "./../../../constants/app.constants";

export default function OrderDetail({ isToggle, setIsToggle, order }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (order && order.id) {
      getProductByOrder(order.id)
        .then((result) => setProducts(result.data))
        .catch((error) =>
          NotificationManager.error(
            error.response.data?.message || error.message || "Đã xảy ra lỗi!"
          )
        );
    }
  }, [order]);
  const modalContent = useMemo(
    () => (
      <>
        <div className="modal-body">
          {order ? (
            <>
              <div className="row">
                <div className="col-md-5 col-sm-5 col-xs-5">
                  <label className="form-control-label">Người nhận</label>
                  <p>{order.receiver}</p>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4">
                  <label className="form-control-label">Số điện thoại</label>
                  <p>{order.phoneNumber}</p>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-3">
                  <label className="form-control-label">Trạng thái đơn</label>
                  <p className={statusTextColor[order.status]}>
                    {statusOb[order.status]}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <label className="form-control-label">Địa chỉ</label>
                  <p>{order.address}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <label className="form-control-label">Ghi chú</label>
                  <p>{order.note || "Không có"}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                  <label className="form-control-label">Giá trị đơn hàng</label>
                  <p
                    className="text-danger"
                    style={{ fontSize: 30, fontStyle: "italic" }}
                  >
                    {" "}
                    {currencyFormatter.format(order.price)}
                  </p>
                </div>
              </div>
              <h1>Sản phẩm</h1>
              <Table className="align-items-center" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="text-center">
                      STT
                    </th>
                    <th scope="col" className="text-center">
                      Tên sản phẩm
                    </th>
                    <th scope="col" className="text-center">
                      Mã
                    </th>
                    <th scope="col" className="text-center">
                      Đơn giá
                    </th>
                    <th scope="col" className="text-center">
                      số lượng
                    </th>
                    <th scope="col" className="text-center">
                      Tổng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((_data, index) => (
                    <tr key={index}>
                      <th scope="row" className="text-center">
                        {index + 1}
                      </th>
                      <td className="text-center">{_data.product.name}</td>
                      <td className="text-center">{_data.product.code}</td>
                      <td className="text-center">
                        {currencyFormatter.format(_data.unitPrice)}
                      </td>
                      <td className="text-center">{_data.quantity}</td>
                      <td className="text-center">
                        {currencyFormatter.format(
                          _data.quantity * _data.unitPrice
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : null}
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
        </div>
      </>
    ),
    [setIsToggle, order, products]
  );

  return (
    <>
      <PerfumeModal
        isToggle={isToggle}
        setIsToggle={setIsToggle}
        title={"Chi tiết"}
        content={modalContent}
        size="lg"
      />
    </>
  );
}
