import {
    divide
} from "lodash";
import Task
    from "~/components/Task";

type TaskListProps = {
    isLoading?: boolean
    tasks: TaskData[]
    onPinTask: (id: string)=>void
    onArchiveTask: (id: string)=>void
}

export default function ({isLoading,tasks, onArchiveTask, onPinTask}: TaskListProps){
    const event = {onArchiveTask, onPinTask}

    if (isLoading) {
        return <div>is Loading</div>
    }

    if (tasks.length === 0) {
        return <div>isEmpty</div>
    }

    return (
        <div>
            {tasks.map(task => (
                <Task  key={task.id} task={task} {...event} />
            ))}
        </div>
    )
}