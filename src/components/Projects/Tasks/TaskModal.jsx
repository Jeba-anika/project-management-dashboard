import CommonSelectDropdown from '@/components/shared/CommonSelectDropdown/CommonSelectDropdown';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const { Option } = Select;


const TaskModal = ({ isAdd, usersData, handleChangeMember, isAddOpen, isEditOpen, handleCancel, onAddSubmitForm, onEditSubmitForm, form, initialVals }) => {
    console.log(usersData)
    const initialValues = initialVals ?? {
        name: '',
        description: '',
        status: 'To Do',
        dueDate: '',
        startDate: ''
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal title={isAdd ? `Add Task` : `Edit Task`} footer={null} open={isAdd ? isAddOpen : isEditOpen} onCancel={handleCancel}>
            <Form
                form={form}
                name={`Add Task`}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={initialValues}

                onFinish={isAdd ? onAddSubmitForm : onEditSubmitForm}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Task Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Task Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Task Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input task description!',
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
                        <Option value="To Do">To Do</Option>
                        <Option value="Done">Done</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Start Date" name="startDate" rules={[
                    {
                        required: true,
                    },
                ]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Due Date" name="dueDate" rules={[
                    {
                        required: true,
                    },
                ]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Assigned To:">
                    <CommonSelectDropdown options={usersData} handleChangeOption={handleChangeMember} />
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

export default TaskModal;