import Header from "components/Headers/Header";
import PerfumePagination from "components/Pagination";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  deleteProduct,
  getProductsPage,
  updateProduct,
  createProduct,
} from "./../../services/product.service";
import { NotificationManager } from "react-notifications";
import DeleteConfirmModal from "components/modal/delete-confirm";
import { LIMIT_PAGE_SPECIAL } from "constants/app.constants";
import { currencyFormatter } from "utils/format";
import CreateEditProductModal from "./components/create-edit";
import ProductImage from "./components/image";

const formDefault = {
  id: null,
  name: "",
  code: "",
  status: "ACTIVE",
  gender: "Male",
  quantity: "",
  price: "",
  originPrice: "",
  providerId: "",
  capacityId: "",
  styleId: "",
  odorRetentionTimeId: "",
  odorGroupId: "",
  odorRangeId: "",
};

export default function Product() {
  const [products, setProducts] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [idForRemove, setIdForRemove] = useState(null);
  const [isToggleDelete, setIsToggleDelete] = useState(false);
  const [title, setTitle] = useState("");
  const ref = useRef(title);
  const [formDefaultValue, setFormDefaultValue] = useState(formDefault);
  const [reload, setReload] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [isToggleImage, setIsToggleImage] = useState(false);

  useEffect(() => {
    getProductsPage({
      limit: LIMIT_PAGE_SPECIAL,
      page: currentPage,
      sortBy: "createdAt",
      direction: "DESC",
      loadEagerRelations: 0,
    })
      .then((result) => {
        setProducts(result.data[0]);
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
    ({
      id,
      name,
      code,
      status,
      gender,
      quantity,
      price,
      originPrice,
      providerId,
      capacityId,
      styleId,
      odorRetentionTimeId,
      odorGroupId,
      odorRangeId,
    }) => {
      if (ref.current === "ADD") {
        createProduct({
          name,
          code,
          status,
          gender,
          quantity: +quantity,
          price: +price,
          originPrice: +originPrice,
          providerId: +providerId,
          capacityId: +capacityId,
          styleId: +styleId,
          odorRetentionTimeId: +odorRetentionTimeId,
          odorGroupId: +odorGroupId,
          odorRangeId: +odorRangeId,
        })
          .then(() => NotificationManager.success(`Tạo mới thành công!`))
          .catch((error) =>
            NotificationManager.error(
              error.response.data?.message || error.message || "Đã xảy ra lỗi!"
            )
          )
          .finally(() => setReload(!reload));
      } else {
        updateProduct(id, {
          name,
          code,
          status,
          gender,
          quantity: +quantity,
          price: +price,
          originPrice: +originPrice,
          providerId: +providerId,
          capacityId: +capacityId,
          styleId: +styleId,
          odorRetentionTimeId: +odorRetentionTimeId,
          odorGroupId: +odorGroupId,
          odorRangeId: +odorRangeId,
        })
          .then(() => NotificationManager.success(`Sửa thành công!`))
          .catch((error) =>
            NotificationManager.error(
              error.response.data?.message || error.message || "Đã xảy ra lỗi!"
            )
          )
          .finally(() => setReload(!reload));
      }
      setFormDefaultValue(formDefault);
      setIsToggle(false);
    }
  );

  const submitRemove = (value) => {
    if (value) {
      deleteProduct(idForRemove)
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

  const createEditModal = useMemo(
    () => (
      <CreateEditProductModal
        isToggle={isToggle}
        setIsToggle={setIsToggle}
        formDefaultValue={formDefaultValue}
        title={title}
        onSubmit={submit}
      />
    ),
    [isToggle, setIsToggle, formDefaultValue, title, submit]
  );

  const imageModal = useMemo(
    () => (
      <ProductImage
        isToggle={isToggleImage}
        setIsToggle={setIsToggleImage}
        id={formDefaultValue.id}
      />
    ),
    [isToggleImage, setIsToggleImage, formDefaultValue.id]
  );

  return (
    <>
      <Header />
      {createEditModal}
      {imageModal}
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
              ref.current = "ADD";
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
                    <th scope="col" className="text-center">
                      STT
                    </th>
                    <th scope="col" className="text-center">
                      Tên
                    </th>
                    <th scope="col" className="text-center">
                      Mã sản phẩm
                    </th>
                    <th scope="col" className="text-center">
                      Trạng thái
                    </th>
                    <th scope="col" className="text-center">
                      Giới tính
                    </th>
                    <th scope="col" className="text-center">
                      Số lượng
                    </th>
                    <th scope="col" className="text-center">
                      Giá bán
                    </th>
                    <th scope="col" className="text-center">
                      Giá gốc
                    </th>
                    <th scope="col" className="text-center" />
                  </tr>
                </thead>
                <tbody>
                  {products.map((_data, index) => (
                    <tr key={index}>
                      <th scope="row" className="text-center">
                        {index + 1 + (currentPage - 1) * LIMIT_PAGE_SPECIAL}
                      </th>
                      <td className="text-center">{_data.name}</td>
                      <td className="text-center">{_data.code}</td>
                      <td className="text-center">{_data.status}</td>
                      <td className="text-center">{_data.gender}</td>
                      <td className="text-center">{_data.quantity}</td>
                      <td className="text-center">
                        {currencyFormatter.format(_data.price)}
                      </td>
                      <td className="text-center">
                        {currencyFormatter.format(_data.originPrice)}
                      </td>
                      <td className="text-center">
                        <Button
                          color="success"
                          size="sm"
                          onClick={() => {
                            setFormDefaultValue({
                              id: _data.id,
                              avatar: _data.avatar,
                            });
                            setIsToggleImage(true);
                          }}
                        >
                          <i class="fas fa-images"></i>
                        </Button>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => {
                            setTitle("EDIT");
                            ref.current = "EDIT";
                            setFormDefaultValue({
                              id: _data.id,
                              name: _data.name,
                              code: _data.code,
                              status: _data.status,
                              gender: _data.gender,
                              quantity: _data.quantity,
                              price: _data.price,
                              originPrice: _data.originPrice,
                              providerId: _data.providerId,
                              capacityId: _data.capacityId,
                              styleId: _data.styleId,
                              odorRetentionTimeId: _data.odorRetentionTimeId,
                              odorGroupId: _data.odorGroupId,
                              odorRangeId: _data.odorRangeId,
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
