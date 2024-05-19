import MainLayout from "@/components/MainLayout/MainLayout";
import ProjectLayout from "@/components/Projects/Layout";
import { useProject } from "@/hooks/useProject";
import { List } from 'antd';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';


const RecentActivities = () => {
    const [recentActivities, setRecentActivities] = useState([])
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
        if (selectedProject?.tasks) {
            const tasks = selectedProject?.tasks
            const filtered = tasks.filter(task => task.status === 'Done')
            console.log(selectedProject)
            setRecentActivities(filtered)
        }
    }, [selectedProject, selectedProject?.tasks])



    return (
        <div>
            <h1 className="text-center text-xl">Recent Activities</h1>
            <List
                itemLayout="horizontal"
                dataSource={recentActivities}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            style={{
                                textAlign: 'left'
                            }}
                            title={item.name}
                            description={item.description}
                        />
                        <div>Status: {item.status}</div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default RecentActivities;

RecentActivities.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            <ProjectLayout>
                {page}
            </ProjectLayout>
        </MainLayout>
    )
}