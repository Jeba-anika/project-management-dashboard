const { useQueryClient, useMutation } = require("react-query");

const useAddProject = () => {
    const queryClient = useQueryClient();
    const addProject = async (project) => {
        const response = await fetch(`http://localhost:3000/projects`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        });

        if (!response.ok) {
            throw new Error('Error adding project');
        }
        const data = await response.json()
        console.log(data)
        return data
    };
    const { mutate: AddProject, data: addedData } = useMutation(addProject, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('projects'); // re-fetch after update
            console.log('Adding successful:', data)
        }
    })


    return { AddProject, addedData }
}

export default useAddProject