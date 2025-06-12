// import * from './Task.stories'


// import type TaskList
//     from "~/components/TaskList";
// import * from './Task.stories'
// import type TaskList
//     from "~/components/TaskList";
import type {
    Meta,
    StoryObj
} from '@storybook/react-vite';
import TaskList
    from "~/components/TaskList";
import {
    string
} from "zod";
import TaskStories
    from "~/components/Task.stories";

const meta = {
    component: TaskList,
    title: 'TaskList',
    tags: ['autodocs'],
    decorators: [(story)=> (<div style={{margin: '3em'}}>{story()}</div>)],
    args: {
        ...TaskStories.args
    }
} satisfies Meta<typeof TaskList>

type Story = StoryObj<typeof meta>

export const Default :Story = {
    args: {
        tasks: [
            {...TaskStories.args, title: '1', id: '1', state: 'TASK_ARCHIVED'}
        ]
    }
}