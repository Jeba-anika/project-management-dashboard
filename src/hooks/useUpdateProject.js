const { useQueryClient, useMutation } = require("react-query");

const useUpdateProject = () => {
    const queryClient = useQueryClient();
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
    const { mutate: EditProject, data: updatedData } = useMutation(updateProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('projects'); // re-fetch after update
        }
    })


    return { EditProject, updatedData }
}

export default useUpdateProject