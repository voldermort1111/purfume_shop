import { Button, Modal } from "reactstrap";

export default function DeleteConfirmModal({
  isToggle,
  setIsToggle,
  onSubmit,
}) {
  return (
    <Modal
      className="modal-dialog-centered modal-danger"
      contentClassName="bg-gradient-danger"
      isOpen={isToggle}
      toggle={() => setIsToggle(false)}
    >
      <div className="modal-header">
        <h1 className="display-5 modal-title">Xóa dữ liệu</h1>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => setIsToggle(false)}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="py-3 text-center">
          <i className="ni ni-bell-55 ni-3x" />
          <p>Bạn có chắc chắn muốn xóa không?</p>
        </div>
      </div>
      <div className="modal-footer">
        <Button
          className="btn-white"
          color="default"
          type="button"
          onClick={() => {
            onSubmit(1);
            setIsToggle(false);
          }}
        >
          Có
        </Button>
        <Button
          className="text-white ml-auto"
          color="link"
          data-dismiss="modal"
          type="button"
          onClick={() => {
            onSubmit(0);
            setIsToggle(false);
          }}
        >
          Đóng
        </Button>
      </div>
    </Modal>
  );
}
