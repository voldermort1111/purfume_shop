import { Card, Modal } from "reactstrap";
import PropTypes from "prop-types";

export default function PerfumeModal({
  isToggle,
  setIsToggle,
  content,
  title = "",
  size = "md",
  customTitle,
}) {
  return (
    <Modal
      className="modal-dialog-centered"
      size={size}
      isOpen={isToggle}
      toggle={() => typeof setIsToggle === "function" && setIsToggle(false)}
    >
      <div className="modal-body p-0">
        <Card className="bg-secondary shadow border-0">
          <div className="modal-header">
            <h1 className="display-5 modal-title">
              {customTitle
                ? customTitle
                : title === "ADD"
                ? "Thêm mới"
                : title === "EDIT"
                ? "Chỉnh sửa"
                : "Chi tiết"}
            </h1>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() =>
                typeof setIsToggle === "function" && setIsToggle(false)
              }
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          {content}
        </Card>
      </div>
    </Modal>
  );
}

PerfumeModal.propTypes = {
  isToggle: PropTypes.bool.isRequired,
  setIsToggle: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.element,
  size: PropTypes.string,
};
