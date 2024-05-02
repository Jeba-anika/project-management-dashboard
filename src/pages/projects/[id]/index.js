import MainLayout from "@/components/MainLayout/MainLayout";
import ProjectLayout from "@/components/Projects/Layout";
import TaskList from "@/components/Projects/Tasks/TaskList";
import TaskModal from "@/components/Projects/Tasks/TaskModal";
import { useProject } from "@/hooks/useProject";
import useUpdateProject from "@/hooks/useUpdateProject";
import { FolderAddOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Form, Input, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
const { Search } = Input;





const ProjectDetail = () => {
    //const [state, setState] = useState(initialData);
    const { selectedProject, setSelectedProject, getToDoTasks, getDoneTasks, getTasksInProgress, toDoTasks, taskInProgress, doneTasks } = useProject()
    const router = useRouter()
    const id = router.query.id
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
    const { EditProject, updatedData } = useUpdateProject()
    const [form] = Form.useForm();



    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/projects/${id}`)
            const data = await res.json()
            if (data) {
                setSelectedProject(data)
            }
        }
        fetchData()
    }, [id, setSelectedProject,])

    useEffect(() => {
        getToDoTasks(selectedProject)
        getDoneTasks(selectedProject)
        getTasksInProgress(selectedProject)
    }, [getToDoTasks, selectedProject, getDoneTasks, getTasksInProgress, updatedData])


    const columns = [
        {
            id: 1,
            columnName: 'To-Do',
            data: toDoTasks
        },
        {
            id: 2,
            columnName: 'In Progress',
            data: taskInProgress
        },
        {
            id: 3,
            columnName: 'Done',
            data: doneTasks
        },
    ]


    const onDragEnd = (result) => {
        console.log(result)
        if (!result.destination) {
            return;
        }
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            console.log(`Item moved from column ${source.droppableId} to column ${destination.droppableId}`);
        } else {
            console.log(`Item reordered within column ${source.droppableId}`);
        }

    }



    const handleAddTask = async (values) => {
        const project = { ...selectedProject }
        project.tasks = [...project.tasks, {
            id: crypto.randomUUID(),
            ...values, "assignedTo": {
                "members": [
                    {
                        "userId": 1,
                        "username": "admin",
                        "password": "hashed_password",
                        "email": "admin@example.com",
                        "role": "Admin"
                    },
                    {
                        "userId": 2,
                        "username": "user1",
                        "password": "hashed_password",
                        "email": "user1@example.com",
                        "role": "Member"
                    }
                ]
            },
        }]
        EditProject(project, {
            onSuccess: (updatedProject) => {
                setSelectedProject(updatedProject);
                setIsAddTaskModalOpen(false);
                form.resetFields();
            },
            onError: (error) => {
                console.error('Mutation failed:', error);
            },
        })

    }

    const onSearch = (value, _e, info) => {
        if (value) {
            const selectedP = { ...selectedProject }
            const tasks = selectedP.tasks
            const filteredTask = tasks.filter(task => task.name.split(' ').join('').toLowerCase().includes(value.split(' ').join('').toLowerCase()))
            selectedP.tasks = filteredTask
            setSelectedProject(selectedP)
        }
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="mx-auto mb-8">
                    <Flex gap="middle" justify="space-between">
                        <div className="text-xl font-serif font-bold">
                            Tasks
                        </div>
                        <div className="flex gap-3">
                            <Search
                                placeholder="input search text"
                                onSearch={onSearch}
                                style={{
                                    width: 200,
                                }}
                            />
                            <Button onClick={() => setIsAddTaskModalOpen(true)} icon={<FolderAddOutlined />}>Add Task</Button>
                        </div>

                    </Flex>
                </div>
                <Row gutter={16}>{
                    columns.map(column => <Droppable key={column.id} droppableId={`${column.id}`}>

                        {(droppableProvided, droppableSnapshot) => (
                            <Col ref={droppableProvided.innerRef}
                                {...droppableProvided.droppableProps} className="gutter-row" span={8}>
                                <div >
                                    <TaskList columnName={column?.columnName} list={column?.data}></TaskList>
                                </div>
                                {droppableProvided.placeholder}
                            </Col>
                        )}

                    </Droppable >)
                }</Row>

            </DragDropContext >
            <TaskModal isAdd={true} isAddOpen={isAddTaskModalOpen} onAddSubmitForm={handleAddTask} handleCancel={() => setIsAddTaskModalOpen(false)} form={form} />
        </>
    );
};

export default ProjectDetail;

ProjectDetail.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            <ProjectLayout>
                {page}
            </ProjectLayout>
        </MainLayout>
    )
}