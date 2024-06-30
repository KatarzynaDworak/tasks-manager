//TODO: naprawienie setInterval (za szykbo dziala) oraz delete + ostylowanie zadania

import React from "react";

class TasksManager extends React.Component {
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
        return this.state.tasks.map((task) => (
            <li key={task.id}>
                <span
                    onClick={this.makeToggleTaskHandler(task.id)}
                    style={{ cursor: 'pointer', textDecoration: task.isCompleted ? 'line-through' : 'none' }}
                >
                    {task.text}
                </span>
                {task.isRunning ? (
                    <button onClick={() => this.stopTask(task.id)}>Stop</button>
                ) : (
                    <button onClick={() => this.startTask(task.id)}>Start</button>
                )}
                <span>Time: {this.formatTime(task.time)}</span>
                <button onClick={() => this.makeDeleteTaskHandler(task.id)}>DELETE</button>
            </li>
        ));
    }

    formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}${secs}s`;
    }

    startTask = (id) => {
        this.setState((prevState) => ({
            tasks: prevState.tasks.map((task) => {
                if (task.id === id) {
                    return {
                        ...task,
                        isRunning: true,
                        startTime: Date.now()
                    };
                }
                return task;
            })
        }), () => {
            this.interval = setInterval(() => {
                this.updateTime(id);
            }, 1000);
        });
    }

    stopTask = (id) => {
        clearInterval(this.interval);
        this.setState((prevState) => ({
            tasks: prevState.tasks.map((task) => {
                if (task.id === id && task.isRunning) {
                    const elapsedTime = Date.now() - task.startTime;
                    return {
                        ...task,
                        isRunning: false,
                        time: task.time + Math.floor(elapsedTime / 1000)
                    };
                }
                return task;
            })
        }));
    }

    updateTime = (id) => {
        this.setState((prevState) => ({
            tasks: prevState.tasks.map((task) => {
                if (task.id === id && task.isRunning) {
                    const elapsedTime = Date.now() - task.startTime;
                    return {
                        ...task,
                        time: task.time + Math.floor(elapsedTime / 1000)
                    };
                }
                return task;
            })
        }));
    }

    makeToggleTaskHandler = (id) => () => {
        const { tasks } = this.state;
        const task = tasks.find(t => t.id === id);
        if (task.isRunning) {
            this.stopTask(id);
        } else {
            this.startTask(id);
        }
    }

    makeDeleteTaskHandler = (id) => () => {
        const confirmed = window.confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            this.deleteTask(id);
        }
    }

    deleteTask = (id) => {
        this.setState((prevState) => ({
            tasks: prevState.tasks.filter((task) => task.id !== id)
        }));
    }

    handleChange = (e) => {
        this.setState({ newTask: e.target.value });
    }

    addNewTask = (e) => {
        e.preventDefault();

        if (this.state.newTask.trim() === '') return;

        const newTask = {
            text: this.state.newTask,
            time: 0,
            isRunning: false,
            isCompleted: false,
            id: Date.now()
        };

        // Send the new task to the server
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        };

        fetch('http://localhost:3005/data', options)
            .then(response => response.json())
            .then(data => {
                console.log('New task added to server', data);
                // Add the new task to the state
                this.setState((prevState) => ({
                    tasks: [...prevState.tasks, data],
                    newTask: ''
                }));
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
                        placeholder="Write your task"
                    />
                    <button type="submit">SUBMIT</button>
                    <ul>
                        {this.renderTaskList()}
                    </ul>
                </form>
            </section>
        );
    }
}

export default TasksManager;

