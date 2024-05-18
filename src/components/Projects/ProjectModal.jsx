import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import CommonSelectDropdown from './../shared/CommonSelectDropdown/CommonSelectDropdown.jsx';
const { Option } = Select;


const ProjectModal = ({ isAdd, users, isUserDataLoading, isAddOpen, isEditOpen, selectedProject, handleCancel, onSubmitForm, handleAssignedUsersChange }) => {
    const [usersData, setUsersData] = useState([])

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(() => {
        const usersOptions = users?.map((user, index) => { return { label: user.username, value: user.email } })
        setUsersData(usersOptions)
    }, [users])


    return (
        <Modal title={isAdd ? `Add New Project` : `Edit Project`} footer={null} open={isAdd ? isAddOpen : isEditOpen} onCancel={handleCancel}>
            <Form
                name={isAdd ? `Add New Project` : `Edit Project`}
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
                {
                    !isAdd && <Form.Item
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
                }

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
                    <CommonSelectDropdown isLoading={isUserDataLoading} options={usersData} handleChangeOption={handleAssignedUsersChange} />
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

export default ProjectModal;