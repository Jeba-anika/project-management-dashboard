import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { useRouter } from 'next/router';
const { Meta } = Card;
const ProjectCard = ({ project }) => {
    const router = useRouter()
    return <Card
        style={{
            width: 300,
        }}

        actions={[
            <SettingOutlined key="setting" onClick={() => router.push(`/projects/${project.id}`)} />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
        ]}
    >
        <Meta
            title={project.name}
            description="This is the description"
        />
    </Card>
};
export default ProjectCard;