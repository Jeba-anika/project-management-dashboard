import { useProject } from '@/hooks/useProject';
import useUpdateProject from '@/hooks/useUpdateProject';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Form, List } from 'antd';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskModal from './TaskModal';

const TaskList = ({ list, columnName }) => {
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState({})
    const [form] = Form.useForm();
    const { selectedProject, setSelectedProject } = useProject()
    const { EditProject, updatedData } = useUpdateProject()

    const handleEditTask = (values) => {
        const project = { ...selectedProject }
        const tasks = [...project.tasks]
        const selectedT = tasks.find(task => task.id === selectedTask.id)
        project.tasks = [...project.tasks, {
            ...selectedT,
            name: values.name,
            description: values.description,
            status: values.status
        }]
        EditProject(project)
        setSelectedProject(updatedData)
        setIsEditTaskModalOpen(false)
        form.resetFields()
        setSelectedTask({})
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
        EditProject(project)
        setSelectedProject(updatedData)

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
                                            handleDeleteTask()
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
        </>
    );
};

export default TaskList;