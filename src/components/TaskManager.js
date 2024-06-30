//2. dodanie funkcjonalności
//3. ostylowanie zadania

import React from "react";

export class TasksManager extends React.Component {
    state = {
        newTask: '',
        tasks: []
    }

    componentDidMount() {
        // Fetch existing tasks from the server when the component mounts
        fetch('http://localhost:3005/data')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    this.setState({ tasks: data });
                } else {
                    console.error('Data fetched is not an array', data);
                }
            })
            .catch(err => console.log(err));
    }

    renderTaskList = () => {
        return this.state.tasks.map((task, id) => (
                <li key={id}>{ task.text }</li>
            ))
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ newTask: e.target.value })
    }

    addNewTask = (e) => {
        e.preventDefault();

        if (this.state.newTask.trim() === '') return;

        const newTask = {
            text: this.state.newTask,
            time: 0,
            isRunning: false,
            isDone: false,
            isRemoved: false
        }

        // Add the new task to the state
        this.setState((prevState) => ({
            tasks: [...prevState.tasks, this.state.newTask],
            newTask: ''
        }))
        
        // Send the new task to the server
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            body: JSON.stringify(newTask)
            }
        }

        fetch('http://localhost:3005/data', options)
        .then(response => response.json())
        .then(data => {
            console.log('New task added to server', data);
        })
        .catch(err => console.log(err));  
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
                        {this.renderTaskList()}
                    </ul>
                </form>
            </section>
        )
    }
}

export default TasksManager;