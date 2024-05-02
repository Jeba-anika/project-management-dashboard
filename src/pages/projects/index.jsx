import Loader from "@/components/Loader";
import MainLayout from "@/components/MainLayout/MainLayout";
import ProjectCard from "@/components/Projects/ProjectCard";
import useFetchData from "@/hooks/useFetchData";
import { Col, Row } from 'antd';

const ProjectsPage = () => {
    const { data, isLoading } = useFetchData({ url: 'http://localhost:3000/projects', key: 'projects' })

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader size={'large'} /></div>
    }
    return (
        <div className="my-10">
            <Row
                align='middle'
                justify='center'
                gutter={[16, 16]}
            >
                {
                    data.length > 0 && data?.map(project => <Col key={project.id} className="gutter-row" span={8}>
                        <div className="flex justify-center">
                            <ProjectCard project={project} />
                        </div>
                    </Col>)
                }


            </Row>

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