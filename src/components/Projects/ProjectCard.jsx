import { useProject } from '@/hooks/useProject';
import { DeleteOutlined, DoubleRightOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import ProjectEditModal from './ProjectEditModal';
const { Meta } = Card;




const ProjectCard = ({ project }) => {
    const queryClient = useQueryClient();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter()
    const { setSelectedProject } = useProject()
    const handleCancelEditModal = () => {
        setIsEditModalOpen(false)
    }
    const handleCancelDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }

    const updateProject = async (project) => {
        const response = await fetch(`http://localhost:3000/projects/${project.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        });

        if (!response.ok) {
            throw new Error('Error updating project');
        }
        const data = await response.json()
        return data
    };

    const deleteProject = async (projectId) => {
        const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error deleting project');
        }

        return await response.json();
    };



    const { mutate: EditProject } = useMutation(updateProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('projects'); // re-fetch after update
        }
    })
    const { mutate: DeleteProject } = useMutation(deleteProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('projects'); // re-fetch after deletion
        }
    });

    const handleEditProject = (values) => {
        EditProject({ ...project, ...values })
        setIsEditModalOpen(false)
    }
    const handleDeleteProject = () => {
        DeleteProject(project.id)
        setIsDeleteModalOpen(false)
    }

    const confirmDialogContent = (<div>Are you sure you want to delete Project: <span className='text-red-500'>{project.name}</span>?</div>)

    return <>

        <Card
            style={{
                width: 300,
            }}

            actions={[
                <DoubleRightOutlined key="setting" onClick={() => {
                    setSelectedProject(project)
                    router.push(`/projects/${project.id}`)
                }} />,
                <EditOutlined key="edit" onClick={() => setIsEditModalOpen(true)} />,
                <DeleteOutlined key="ellipsis" onClick={() => setIsDeleteModalOpen(true)} />,
            ]}
        >
            <Meta
                title={project.name}
                description={project.description}
            />
            <div className='mt-4'>
                <p>Status: {project.status}</p>
            </div>
        </Card>
        <ProjectEditModal selectedProject={project} isOpen={isEditModalOpen} handleCancel={handleCancelEditModal} onSubmitForm={handleEditProject} />
        <ConfirmModal isOpen={isDeleteModalOpen} handleCancel={handleCancelDeleteModal} handleOk={handleDeleteProject}>{confirmDialogContent}</ConfirmModal>
    </>
};
export default ProjectCard;