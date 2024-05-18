import MainLayout from "@/components/MainLayout/MainLayout";
import ProjectCard from "@/components/Projects/ProjectCard";
import ProjectModal from "@/components/Projects/ProjectModal";
import Loader from "@/components/shared/Loader";
import useAddProject from "@/hooks/useAddProject";
import useFetchData from "@/hooks/useFetchData";
import { FolderAddOutlined } from "@ant-design/icons";
import { Button, Col, Row } from 'antd';
import { useState } from "react";

const ProjectsPage = () => {
    const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false)
    const [selectedMembers, setSelectedMembers] = useState([])
    const { data, isLoading } = useFetchData({ url: 'http://localhost:3000/projects', key: 'projects' })
    const { AddProject, addedData } = useAddProject()
    const { data: users, isLoading: isUserDataLoading, isError, error } = useFetchData({ url: 'http://localhost:3000/users', key: 'users' })


    const handleAssignedUsersChange = (value) => {
        const members = []
        for (let i = 0; i < value.length; i++) {
            const filtered = users.filter(user => user.email === value[i])
            members.push(filtered[0])
        }
        setSelectedMembers(members)

    };

    const handleAddProject = async (values) => {
        const data = {
            id: crypto.randomUUID(),
            ...values,
            startDate: new Date(values.startDate.$d).toISOString(),
            dueDate: new Date(values.dueDate.$d).toISOString(),
            status: "Planning",
            assignedTo: {
                members: selectedMembers
            },
            tasks: []
        }
        AddProject(data, {
            onSuccess: (addedProject) => {
                setIsAddProjectModalOpen(false);
                form.resetFields();
            },
            onError: (error) => {
                console.error('Mutation failed:', error);
            },
        })
    }





    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader size={'large'} /></div>
    }
    return (
        <div className="my-10 px-10">
            <div className="text-start px-20 text-bold"><Button onClick={() => setIsAddProjectModalOpen(true)} icon={<FolderAddOutlined />}>Add Project</Button></div>
            <Row
                align='middle'
                justify='center'
                gutter={[16, 16]}
            >
                {
                    data.length > 0 && data?.map(project => <Col key={project.id} className="gutter-row" xs={20} sm={16} md={12} lg={8} xl={8}>
                        <div className="flex justify-center">
                            <ProjectCard project={project} />
                        </div>
                    </Col>)
                }


            </Row>
            <ProjectModal isAdd={true} users={users} isUserDataLoading={isUserDataLoading} isAddOpen={isAddProjectModalOpen} handleCancel={() => setIsAddProjectModalOpen(false)} onSubmitForm={handleAddProject} handleAssignedUsersChange={handleAssignedUsersChange}></ProjectModal>
        </div>
    );
};

export default ProjectsPage;

ProjectsPage.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}