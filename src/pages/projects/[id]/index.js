import ProjectLayout from "@/components/Projects/Layout";

const ProjectDetail = () => {
    return (
        <div>
            project detaIL
        </div>
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