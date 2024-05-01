import ProjectLayout from "@/components/Projects/Layout";
import { useProject } from "@/hooks/useProject";
import { Avatar, List } from 'antd';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';


const TeamMembersPage = () => {
    const [teamMembers, setTeamMembers] = useState([])
    const { selectedProject, setSelectedProject } = useProject()
    const router = useRouter()
    const id = router.query.id


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/projects/${id}`)
            const data = await res.json()
            console.log(data[0])
            if (data) {
                setSelectedProject(data)
            }
        }
        fetchData()
    }, [id, setSelectedProject])

    useEffect(() => {
        if (selectedProject?.assignedTo) {
            const assignedMembers = selectedProject?.assignedTo?.members
            console.log(selectedProject)
            setTeamMembers(assignedMembers)
        }
    }, [selectedProject?.assignedTo])



    return (
        <div>
            <h1 className="text-center text-xl">Team Members</h1>
            <List
                itemLayout="horizontal"
                dataSource={teamMembers}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                            title={item.username}
                            description={item.email}
                        />
                        <div>Role: {item.role}</div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default TeamMembersPage;

TeamMembersPage.getLayout = function getLayout(page) {
    return (
        <ProjectLayout>
            {page}
        </ProjectLayout>
    )
}