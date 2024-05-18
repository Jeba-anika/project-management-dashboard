import ConfirmModal from '@/components/shared/ConfirmModal/ConfirmModal';
import { useProject } from '@/hooks/useProject';
import useUpdateProject from '@/hooks/useUpdateProject';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Form, List } from 'antd';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskModal from './TaskModal';

const TaskList = ({ list, columnName }) => {
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)
    const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState({})
    const [form] = Form.useForm();
    const { selectedProject, setSelectedProject } = useProject()
    const { EditProject, updatedData } = useUpdateProject()

    const handleEditTask = (values) => {
        const project = { ...selectedProject }
        const tasks = [...project.tasks]
        const taskIndex = tasks.findIndex(task => task.id === selectedTask.id);
        if (taskIndex === -1) {
            console.error('Task not found');
            return;
        }
        const selectedT = tasks.find(task => task.id === selectedTask.id)
        tasks[taskIndex] = {
            ...selectedT,
            name: values.name,
            description: values.description,
            status: values.status
        }
        project.tasks = [...tasks]

        EditProject(project, {
            onSuccess: (updatedProject) => {
                setSelectedProject(updatedProject)
                setIsEditTaskModalOpen(false)
                form.resetFields()
                setSelectedTask({})
            },
            onError: (error) => {
                console.error('Mutation failed:', error);
            },
        })


    }
    const handleDeleteTask = () => {
        const project = { ...selectedProject }
        const tasks = [...project.tasks]
        console.log(tasks)
        console.log(selectedTask.id)
        const selectedT = tasks.filter(task => task.id !== selectedTask.id)
        console.log(selectedT)
        project.tasks = [...selectedT]
        console.log(project)
        EditProject(project, {
            onSuccess: (updatedProject) => {
                setSelectedProject(updatedProject)

            },
            onError: (error) => {
                console.error('Mutation failed:', error);
            },
        })

    }


    return (
        <>
            <div className='text-sm font-bold'>{columnName}</div>
            <List


                itemLayout="horizontal"

                dataSource={list}
                renderItem={(item, index) => (
                    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
                        {(draggableProvided, draggableSnapshot) => (
                            <List.Item
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                            >


                                <Card
                                    extra={<div className='flex gap-3'>
                                        <Button icon={<EditOutlined />} onClick={() => {
                                            setIsEditTaskModalOpen(true)
                                            setSelectedTask(item)
                                        }} />
                                        <Button icon={<DeleteOutlined className='text-red-500' onClick={() => {
                                            setIsDeleteTaskModalOpen(true)
                                            setSelectedTask(item)
                                        }} />} />
                                    </div>} style={{
                                        minWidth: '100%'
                                    }} title={item.name}>{item.description}</Card>
                            </List.Item>)}
                    </Draggable>
                )}
            />
            <TaskModal initialVals={selectedTask} isAdd={false} isEditOpen={isEditTaskModalOpen} onEditSubmitForm={handleEditTask} handleCancel={() => setIsEditTaskModalOpen(false)} form={form} />
            <ConfirmModal isOpen={isDeleteTaskModalOpen} handleCancel={() => setIsDeleteTaskModalOpen(false)} handleOk={() => {
                handleDeleteTask()
                setIsDeleteTaskModalOpen(false)
            }} ><p>Are you sure you want to delete the task?</p></ConfirmModal>
        </>
    );
};

export default TaskList;