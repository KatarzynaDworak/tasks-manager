import React from "react";

export class ToDo extends React.Component {
    state = {
        tasks: [
        {
            id: 123,
            text: 'Kupić prezenty dla PKO',
            isCompleted: false
        },
        {
            id: 321,
            text: 'Kupić kanapy do salonu',
            isCompleted: false
        }
    ]
    }

    render() {
        const { tasks } = this.state;
        
        return (
            <div>
                <ul>
                    { this.state.tasks.map(({id, text}) => {
                        return <li key={id}>{task.text}</li>
                    })
                    }
                </ul>
            </div>
        )
    }
}

export default ToDo;