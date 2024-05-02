import { Button, Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;


const ProjectAddModal = ({ selectedProject, isOpen, handleCancel, onSubmitForm }) => {


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title={`Edit Project`} footer={null} open={isOpen} onCancel={handleCancel}>
            <Form
                name={`Edit Project`}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={selectedProject}
                onFinish={onSubmitForm}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Project Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Project Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Project Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input project description!',
                        },
                    ]}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a option to change status"

                    >
                        <Option value="In Progress">In Progress</Option>
                        <Option value="Planning">Planning</Option>
                        <Option value="Done">Done</Option>
                    </Select>
                </Form.Item>


                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default ProjectAddModal;