import { Modal } from "antd";

const ConfirmModal = ({ isOpen, handleCancel, children, handleOk }) => {
    return (
        <Modal title={`Are you sure?`} open={isOpen} onOk={handleOk} onCancel={handleCancel}>
            {children}
        </Modal>
    );
};

export default ConfirmModal;