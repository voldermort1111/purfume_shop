import FieldTextInput from "components/Forms/text-input";
import PerfumeModal from "components/modal";
import { Field, Formik, Form } from "formik";
import { useEffect, useMemo, useState } from "react";
import { Button, FormGroup } from "reactstrap";
import * as Yup from "yup";
import { getProviders } from "./../../../services/provider.service";
import { getCapacities } from "./../../../services/capacity.service";
import { getOdorGroups } from "./../../../services/odor-group.service";
import { getStyles } from "./../../../services/style.service";
import { getOdorRanges } from "./../../../services/odor-range.service";
import { getRetentionTimes } from "./../../../services/retention-time.service";

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, "Không quá 100 ký tự")
    .required("Không được bỏ trống"),
  code: Yup.string()
    .max(20, "Không quá 20 ký tự")
    .required("Không được bỏ trống"),
  status: Yup.string().required("Không được bỏ trống"),
  gender: Yup.string().required("Không được bỏ trống"),
  quantity: Yup.number()
    .typeError("Số lượng phải là số")
    .min(1, "Số lượng nhỏ nhất là 1")
    .max(1000000000, "Số lượng quá lớn")
    .required("Không được bỏ trống"),
  price: Yup.number()
    .typeError("Giá phải là số")
    .min(10000)
    .max(10000000000, "Số lượng quá lớn")
    .required("Không được bỏ trống"),
  originPrice: Yup.number()
    .typeError("Giá phải là số")
    .min(10000)
    .max(10000000000, "Số lượng quá lớn")
    .required("Không được bỏ trống"),
  providerId: Yup.number().required("Không được bỏ trống"),
  capacityId: Yup.number().required("Không được bỏ trống"),
  styleId: Yup.number().required("Không được bỏ trống"),
  odorRetentionTimeId: Yup.number().required("Không được bỏ trống"),
  odorGroupId: Yup.number().required("Không được bỏ trống"),
  odorRangeId: Yup.number().required("Không được bỏ trống"),
});

export default function CreateEditProductModal({
  isToggle,
  setIsToggle,
  formDefaultValue,
  title,
  onSubmit,
}) {
  const [providers, setProviders] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [styles, setStyles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [ranges, setRanges] = useState([]);
  const [retentionTimes, setRetentionTimes] = useState([]);

  useEffect(() => {
    getProviders().then((result) => {
      if (result.data && result.data.length) {
        const temp = result.data.map((_data) => ({
          value: _data.id,
          label: _data.name,
        }));
        setProviders([{ label: "------", value: "" }, ...temp]);
      }
    });
    getCapacities().then((result) => {
      if (result.data && result.data.length) {
        const temp = result.data.map((_data) => ({
          value: _data.id,
          label: _data.value + " " + _data.unit,
        }));
        setCapacities([{ label: "------", value: "" }, ...temp]);
      }
    });
    getStyles().then((result) => {
      if (result.data && result.data.length) {
        const temp = result.data.map((_data) => ({
          value: _data.id,
          label: _data.value,
        }));
        setStyles([{ label: "------", value: "" }, ...temp]);
      }
    });
    getOdorGroups().then((result) => {
      if (result.data && result.data.length) {
        const temp = result.data.map((_data) => ({
          value: _data.id,
          label: _data.name + " - " + _data.value,
        }));
        setGroups([{ label: "------", value: "" }, ...temp]);
      }
    });
    getOdorRanges().then((result) => {
      if (result.data && result.data.length) {
        const temp = result.data.map((_data) => ({
          value: _data.id,
          label: _data.value,
        }));
        setRanges([{ label: "------", value: "" }, ...temp]);
      }
    });
    getRetentionTimes().then((result) => {
      if (result.data && result.data.length) {
        const temp = result.data.map((_data) => ({
          value: _data.id,
          label: _data.value,
        }));
        setRetentionTimes([{ label: "------", value: "" }, ...temp]);
      }
    });
  }, []);

  const modalContent = useMemo(
    () => (
      <>
        {formDefaultValue ? (
          <>
            <Formik
              validationSchema={ValidationSchema}
              initialValues={{
                status: formDefaultValue.status,
                name: formDefaultValue.name,
                code: formDefaultValue.code,
                gender: formDefaultValue.gender,
                quantity: formDefaultValue.quantity,
                price: formDefaultValue.price,
                originPrice: formDefaultValue.originPrice,
                providerId: formDefaultValue.providerId,
                capacityId: formDefaultValue.capacityId,
                styleId: formDefaultValue.styleId,
                odorRetentionTimeId: formDefaultValue.odorRetentionTimeId,
                odorGroupId: formDefaultValue.odorGroupId,
                odorRangeId: formDefaultValue.odorRangeId,
              }}
              onSubmit={(value) =>
                onSubmit({ ...value, id: formDefaultValue.id })
              }
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <FormGroup>
                          <Field
                            label="Tên sản phẩm"
                            required
                            id="name"
                            name="name"
                            component={FieldTextInput}
                          />
                          {errors.name && touched.name ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.name}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <FormGroup>
                          <Field
                            label="Mã sản phẩm"
                            required
                            id="code"
                            name="code"
                            component={FieldTextInput}
                          />
                          {errors.code && touched.code ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.code}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 col-sm-3 col-xs-3">
                        <FormGroup>
                          <Field
                            label="Trạng thái"
                            required
                            id="status"
                            name="status"
                            disabled={title === "ADD"}
                            type="select"
                            options={[
                              { label: "ACTIVE", value: "ACTIVE" },
                              {
                                label: "STOP_SELLING",
                                value: "STOP_SELLING",
                              },
                            ]}
                            component={FieldTextInput}
                          />
                          {errors.status && touched.status ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.status}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="col-md-3 col-sm-3 col-xs-3">
                        <FormGroup>
                          <Field
                            label="Số lượng"
                            required
                            id="quantity"
                            name="quantity"
                            component={FieldTextInput}
                          />
                          {errors.quantity && touched.quantity ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.quantity}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="col-md-3 col-sm-3 col-xs-3">
                        <FormGroup>
                          <Field
                            label="Giới tính"
                            required
                            id="gender"
                            name="gender"
                            type="select"
                            options={[
                              { label: "Nam", value: "Male" },
                              {
                                label: "Nữ",
                                value: "Female",
                              },
                              {
                                label: "Cả 2",
                                value: "All",
                              },
                            ]}
                            component={FieldTextInput}
                          />
                          {errors.gender && touched.gender ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.gender}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <FormGroup>
                          <Field
                            label="Giá bán"
                            required
                            id="price"
                            name="price"
                            component={FieldTextInput}
                          />
                          {errors.price && touched.price ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.price}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <FormGroup>
                          <Field
                            label="Giá gốc"
                            id="originPrice"
                            name="originPrice"
                            component={FieldTextInput}
                          />
                          {errors.originPrice && touched.originPrice ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.originPrice}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <FormGroup>
                          <Field
                            label="Thương hiệu"
                            required
                            id="providerId"
                            name="providerId"
                            type="select"
                            options={providers}
                            component={FieldTextInput}
                          />
                          {errors.providerId && touched.providerId ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.providerId}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <FormGroup>
                          <Field
                            label="Dung tích"
                            required
                            id="capacityId"
                            name="capacityId"
                            type="select"
                            options={capacities}
                            component={FieldTextInput}
                          />
                          {errors.capacityId && touched.capacityId ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.capacityId}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <FormGroup>
                          <Field
                            label="Phong cách"
                            required
                            id="styleId"
                            name="styleId"
                            type="select"
                            options={styles}
                            component={FieldTextInput}
                          />
                          {errors.styleId && touched.styleId ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.styleId}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <FormGroup>
                          <Field
                            label="Nhóm hương"
                            required
                            id="odorGroupId"
                            name="odorGroupId"
                            type="select"
                            options={groups}
                            component={FieldTextInput}
                          />
                          {errors.odorGroupId && touched.odorGroupId ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.odorGroupId}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <FormGroup>
                          <Field
                            label="Lưu hương"
                            required
                            id="odorRetentionTimeId"
                            name="odorRetentionTimeId"
                            type="select"
                            options={retentionTimes}
                            component={FieldTextInput}
                          />
                          {errors.odorRetentionTimeId &&
                          touched.odorRetentionTimeId ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.odorRetentionTimeId}
                              </small>
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-6">
                        <FormGroup>
                          <Field
                            label="Toả hương"
                            required
                            id="odorRangeId"
                            name="odorRangeId"
                            type="select"
                            options={ranges}
                            component={FieldTextInput}
                          />
                          {errors.odorRangeId && touched.odorRangeId ? (
                            <div style={{ marginTop: 10 }}>
                              <small className="text-danger">
                                {errors.odorRangeId}
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
        ) : null}
      </>
    ),
    [
      setIsToggle,
      formDefaultValue,
      providers,
      capacities,
      styles,
      ranges,
      groups,
      retentionTimes,
    ]
  );

  return (
    <>
      <PerfumeModal
        isToggle={isToggle}
        setIsToggle={setIsToggle}
        title={title}
        content={modalContent}
        size="lg"
      />
    </>
  );
}
