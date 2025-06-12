import {
    fn
} from "storybook/test";
import Task
    from "~/components/Task";
import type {
    Meta,
    StoryObj
} from "@storybook/react-vite";

export const ActionData = {
    onArchiveTask: fn(),
    onPinTask: fn(),
}

const meta = {
    component: Task,
    title :'Task',
    tags: ['autodocs'],
    excludeStories: /.*Data$/,
    args:{
        ...ActionData
    }
} satisfies Meta<typeof Task>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        task: {
            id: "1",
            title: "Test Task",
            state: "TASK_INBOX"
        }
    }
}

export const Pinned: Story = {
    args: {
        task: {
            ...Default.args.task,
            state: 'TASK_PINNED'
        }
    }
}

export const Archived: Story ={
    args: {
        task: {
            ...Default.args.task,
            state: 'TASK_ARCHIVED'
        }
    }
}