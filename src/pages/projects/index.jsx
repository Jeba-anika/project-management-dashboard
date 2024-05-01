import Loader from "@/components/Loader";
import ProjectCard from "@/components/Projects/ProjectCard";
import { Col, Row } from 'antd';
import { useQuery } from "react-query";

const ProjectsPage = () => {
    const { isLoading, isError, data, error } = useQuery('projects', async () => {
        const response = await fetch('http://localhost:3000/projects');
        return response.json();
    })
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader size={'large'} /></div>
    }
    return (
        <div>
            <Row
                gutter={[16, 16]}
            >
                {
                    data.length > 0 && data?.map(project => <Col key={project.id} className="gutter-row" span={8}>
                        <ProjectCard project={project} />
                    </Col>)
                }


            </Row>
        </div>
    );
};

export default ProjectsPage;