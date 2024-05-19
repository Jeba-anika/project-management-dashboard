import { useProject } from '@/hooks/useProject';
import useUpdateProject from '@/hooks/useUpdateProject';
import { DeleteOutlined, DoubleRightOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Form, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import ConfirmModal from '../shared/ConfirmModal/ConfirmModal';
import ProjectModal from './ProjectModal';
const { Meta } = Card;




const ProjectCard = ({ project }) => {
    const queryClient = useQueryClient();
    const { EditProject } = useUpdateProject()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter()
    const { setSelectedProject } = useProject()
    const [form] = Form.useForm();


    const handleCancelEditModal = () => {
        setIsEditModalOpen(false)
    }
    const handleCancelDeleteModal = () => {
        setIsDeleteModalOpen(false)
    }



    const deleteProject = async (projectId) => {
        const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error deleting project');
        }

        return await response.json();
    };




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
                <Tooltip key="details" placement="bottom" title='Details'><DoubleRightOutlined key="details" onClick={() => {
                    setSelectedProject(project)
                    router.push(`/projects/${project.id}`)
                }} /></Tooltip>
                ,
                <Tooltip key="edit" placement="bottom" title='Edit'><EditOutlined key="edit" onClick={() => setIsEditModalOpen(true)} /></Tooltip>,
                <Tooltip key="delete" placement="bottom" title='Delete'><DeleteOutlined key="delete" onClick={() => setIsDeleteModalOpen(true)} /></Tooltip>,
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
        <ProjectModal isAdd={false} form={form} selectedProject={project} isEditOpen={isEditModalOpen} handleCancel={handleCancelEditModal} onSubmitForm={handleEditProject} />
        <ConfirmModal isOpen={isDeleteModalOpen} handleCancel={handleCancelDeleteModal} handleOk={handleDeleteProject}>{confirmDialogContent}</ConfirmModal>
    </>
};
export default ProjectCard;