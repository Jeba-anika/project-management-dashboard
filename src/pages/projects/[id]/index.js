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
            //finding destination and source column index
            const destinationColumnIx = columns.findIndex(column => column.id === Number(destination.droppableId))
            const sourceColumnIx = columns.findIndex(column => column.id === Number(source.droppableId))
            const otherColumnIx = columns.findIndex(column => (column.id !== Number(source.droppableId) && column.id !== Number(destination.droppableId)))
            const otherColumnData = columns[otherColumnIx].data


            const destinationColumnName = columns[destinationColumnIx].columnName//destination column name
            const destColData = columns[destinationColumnIx].data//destination column data
            const sourceColData = columns[sourceColumnIx].data//source column data
            const sourceData = sourceColData.filter(data => data.id === result.draggableId)//dragged data from source column
            const newSourceColData = sourceColData.filter(data => data.id !== result.draggableId)//remaining data from source column
            //final source column data
            columns[sourceColumnIx].data = [...newSourceColData]

            //final destination column data
            const firstSlicedDest = destColData.slice(0, destination.index)
            const lastSlicedDest = destColData.slice(destination.index)
            columns[destinationColumnIx].data = [...firstSlicedDest, { ...sourceData[0], status: destinationColumnName }, ...lastSlicedDest]
            const editedProject = {
                ...selectedProject,
                tasks: [...firstSlicedDest, { ...sourceData[0], status: destinationColumnName }, ...lastSlicedDest, ...newSourceColData, ...otherColumnData]
            }

            console.log(editedProject)
            EditProject(editedProject, {
                onSuccess: (updatedProject) => {
                    setSelectedProject(updatedProject);

                },
                onError: (error) => {
                    console.error('Mutation failed:', error);
                },
            })

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