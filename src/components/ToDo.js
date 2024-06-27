import React from "react";

export class ToDo extends React.Component {
    state = {
        task: 'TO DO'
    }

    render() {
        return (
            <div>
                <ul>
                    { this.state.task }
                </ul>
            </div>
        )
    }
}

export default ToDo;