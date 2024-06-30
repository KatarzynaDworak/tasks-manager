import React from "react";

export class TasksManager extends React.Component {
    state = {
        tasks: [],
        newTask: ''
    }

    renderTaskList() {
        return (
            this.state.tasks.map((task, id) => {
                <li key={id}>{ task }</li>
            })
        )
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ newTask: e.target.value })
    }

    addNewTask = (e) => {
        e.preventDefault();
        this.renderTaskList()
    }

    render() {
        return (
            <section>
                <form onSubmit={this.addNewTask}>
                    <label>Task Manager</label>
                    <input 
                        value={this.state.newTask}
                        onChange={this.handleChange}
                        placeholder="Write your task">
                    </input>
                    <button>SUBMIT</button>
                    <ul>
                        {this.renderTaskList}
                    </ul>
                </form>
            </section>
        )
    }
}

export default TasksManager;