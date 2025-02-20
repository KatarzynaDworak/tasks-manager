import React from "react";

export class ToDo extends React.Component {
    state = {
        newTaskValue: '',
        tasks: [
        {
            id: 123,
            text: 'Odebrać alkohole dla PKO',
            isCompleted: false
        },
        {
            id: 321,
            text: 'Znaleźć kanapy do salonu',
            isCompleted: false
        }
    ]
    }

    onNewTaskValueChange = (e) => {
        this.setState((prevState) => ({
            ...prevState,
            newTaskValue: e.target.value
        }))
    }

    addNewTask = (e) => {
        e.preventDefault();

        if(!this.state.newTaskValue) return

        const newTask = {
            id: Date.now(),
            text: this.state.newTaskValue,
            isCompleted: false
        }

        this.setState((prevState) => ({
            newTaskValue: '',
            tasks: prevState.tasks.concat(newTask)
        }))
    }
    
    deleteTask = (id) => {
        this.setState((prevState) => ({
            tasks: prevState.tasks.filter((task) => task.id !== id)
        }))
    }

    makeDeleteTaskHandler = (id) => (e) => {
        this.deleteTask(id);
    }

    toggleNewTask = (id) => {
        this.setState((prevState) => ({
            tasks: prevState.tasks.map((task) => {
                if(task.id !== id) return task
                return {
                    ...task,
                    isCompleted: !task.isCompleted
                }
            })
        }))
    }

    makeToggleTaskHandler = (id) => (e) => {
        this.toggleNewTask(id)
    }

    render() {
        const { tasks, newTaskValue } = this.state;

        return (
            <div>
                <form
                onSubmit={this.addNewTask}>
                    <input 
                        name="text"
                        value={newTaskValue}
                        onChange={this.onNewTaskValueChange}
                    >
                    </input>
                    <button>SUBMIT</button>
                    <br></br>
                
                    <ul>
                        { tasks.map(({id, text, isCompleted}) => (
                                <li 
                                key={id}
                                onClick={this.makeToggleTaskHandler(id)}
                                >
                                    {text} {isCompleted ? '[COMPLETED]' : ''}
                                <button onClick={this.makeDeleteTaskHandler(id)}>DELETE</button>
                                </li>

                        ))}
                    </ul>
                </form>
            </div>
        )
    }
}

export default ToDo;