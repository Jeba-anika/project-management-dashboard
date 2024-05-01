import create from 'zustand';


const useProjectStore = create((set) => ({
    selectedProject: [],
    toDoTasks: [],
    taskInProgress: [],
    doneTasks: [],
    setSelectedProject: (project) => set(() => ({ selectedProject: project })),
    getToDoTasks: (project) => set(() => {
        const filtered = project?.tasks?.filter(task => task.status === "To Do")
        return { toDoTasks: filtered }
    }),
    getDoneTasks: (project) => set(() => {

        const filtered = project?.tasks?.filter(task => task.status === "Done")

        return { doneTasks: filtered }
    }),
    getTasksInProgress: (project) => set(() => {

        const filtered = project?.tasks?.filter(task => task.status === "In Progress")

        return { taskInProgress: filtered }
    }),
}));

export const useProject = () => {
    const { selectedProject, setSelectedProject, getToDoTasks, getDoneTasks, getTasksInProgress, toDoTasks, taskInProgress, doneTasks } = useProjectStore();
    return { selectedProject, setSelectedProject, getToDoTasks, getDoneTasks, getTasksInProgress, toDoTasks, taskInProgress, doneTasks };
};
