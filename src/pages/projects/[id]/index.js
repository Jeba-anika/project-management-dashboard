import ProjectLayout from "@/components/Projects/Layout";
import TaskList from "@/components/Projects/Tasks/TaskList";
import { useProject } from "@/hooks/useProject";
import { Col, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';





const ProjectDetail = () => {
    //const [state, setState] = useState(initialData);
    const { selectedProject, setSelectedProject, getToDoTasks, getDoneTasks, getTasksInProgress, toDoTasks, taskInProgress, doneTasks } = useProject()
    const router = useRouter()
    const id = router.query.id



    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/projects/${id}`)
            const data = await res.json()
            if (data) {
                setSelectedProject(data)
            }
        }
        fetchData()
    }, [id, setSelectedProject])

    useEffect(() => {
        getToDoTasks(selectedProject)
        getDoneTasks(selectedProject)
        getTasksInProgress(selectedProject)
    }, [getToDoTasks, selectedProject, getDoneTasks, getTasksInProgress])


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
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="mx-auto">Tasks</div>
            <Row gutter={16}>{
                columns.map(column => <Droppable key={column.id} droppableId={`${column.id}`}>

                    {(droppableProvided, droppableSnapshot) => (
                        <Col ref={droppableProvided.innerRef}
                            {...droppableProvided.droppableProps} className="gutter-row" span={8}>
                            <div >
                                <TaskList list={column?.data}></TaskList>
                            </div>
                            {droppableProvided.placeholder}
                        </Col>
                    )}

                </Droppable >)
            }</Row>

        </DragDropContext >
    );
};

export default ProjectDetail;

ProjectDetail.getLayout = function getLayout(page) {
    return (
        <ProjectLayout>
            {page}
        </ProjectLayout>
    )
}