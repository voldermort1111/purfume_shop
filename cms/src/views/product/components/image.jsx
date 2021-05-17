import PerfumeModal from "components/modal";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getProductImages,
  updateAvatar,
  getAvatarProduct,
  addImage,
  removeImage,
} from "./../../../services/product.service";
import apiConstants from "./../../../constants/api.constants";
import { Button } from "reactstrap";
import { uploadImage } from "./../../../services/image.service";
import NotificationManager from "react-notifications/lib/NotificationManager";

export default function ProductImage({ isToggle, setIsToggle, id }) {
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [reload, setReload] = useState(true);
  const avatarRef = useRef(null);
  const sideRef = useRef(null);

  useEffect(() => {
    if (id) {
      getProductImages(id).then((result) => setImages(result.data));
      getAvatarProduct(id).then((result) => setAvatar(result.data.avatar));
    }
  }, [id, reload]);

  const handleFileUpload = (event) => {
    uploadImage(event.target.files[0])
      .then((result) =>
        addImage(id, result.data.filename)
          .then(() => setReload(Date.now()))
          .catch((error) =>
            NotificationManager.error(
              error.response.data?.message || error.message || "Đã xảy ra lỗi!"
            )
          )
      )
      .catch((error) =>
        NotificationManager.error(
          error.response.data?.message || error.message || "Đã xảy ra lỗi!"
        )
      );
  };

  const handleAvatarUpload = (event) => {
    uploadImage(event.target.files[0])
      .then((result) =>
        updateAvatar(id, result.data.filename)
          .then(() => setReload(Date.now()))
          .catch((error) =>
            NotificationManager.error(
              error.response.data?.message || error.message || "Đã xảy ra lỗi!"
            )
          )
      )
      .catch((error) =>
        NotificationManager.error(
          error.response.data?.message || error.message || "Đã xảy ra lỗi!"
        )
      );
  };

  const onRemoveImage = (id) => {
    removeImage(id)
      .then(() => setReload(Date.now()))
      .catch((error) =>
        NotificationManager.error(
          error.response.data?.message || error.message || "Đã xảy ra lỗi!"
        )
      );
  };
  const modalContent = useMemo(
    () => (
      <>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-3">
              <h3>Hình đại diện</h3>
            </div>
            <div className="col-md-9 col-sm-9 col-xs-9">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => avatarRef.current && avatarRef.current.click()}
              >
                Tải lên
              </button>
            </div>
          </div>
          <input
            ref={avatarRef}
            className="form-control-alternative"
            type="file"
            onChange={handleAvatarUpload}
            style={{ display: "none" }}
          />
          <div className="row text-center">
            <div className="col-md-12 col-sm-12 col-xs-12">
              {avatar ? (
                <img
                  src={`${apiConstants.URL_API}/image/${avatar}`}
                  className="img-fluid rounded shadow"
                  alt="..."
                  style={{ width: 350, height: 250 }}
                />
              ) : (
                <p>Chưa có</p>
              )}
            </div>
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-md-2 col-sm-2 col-xs-2">
              <h3>Hình Phụ</h3>
            </div>
            <div className="col-md-10 col-sm-10 col-xs-10">
              <input
                ref={sideRef}
                className="form-control-alternative"
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <button
                className="btn btn-primary btn-sm"
                onClick={() => sideRef.current && sideRef.current.click()}
              >
                Tải lên
              </button>
            </div>
          </div>

          <div className="row text-center">
            {!images || !images.length ? (
              <div className="col">
                <p>Chưa có</p>
              </div>
            ) : (
              images?.map((image, index) => (
                <div
                  className="col-md-4 col-sm-4 col-xs-4"
                  style={{ marginBottom: 20 }}
                  key={index}
                >
                  <img
                    src={`${apiConstants.URL_API}/image/${image.value}`}
                    className="img-fluid rounded shadow"
                    alt="..."
                    style={{ width: 250, height: 180, marginBottom: 10 }}
                  />
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => onRemoveImage(image.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </>
    ),
    [id, handleFileUpload, handleAvatarUpload, avatar, images, onRemoveImage]
  );
  return (
    <>
      <PerfumeModal
        isToggle={isToggle}
        setIsToggle={setIsToggle}
        customTitle="Danh sách ảnh"
        content={modalContent}
        size="lg"
      />
    </>
  );
}
