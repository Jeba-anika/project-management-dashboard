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
        console.log(data)
        return data
    };
    const { mutate: EditProject, data: updatedData } = useMutation(updateProject, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('projects'); // re-fetch after update
            console.log('Update successful:', data)
        }
    })


    return { EditProject, updatedData }
}

export default useUpdateProject