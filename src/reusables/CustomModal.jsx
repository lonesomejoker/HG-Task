import { Modal } from "antd";
const CustomModal = ({
  title,
  children,
  handleOk,
  confirmLoading,
  open,
  handleCancel,
}) => {
  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>{children}</div>
      </Modal>
    </>
  );
};
export default CustomModal;
