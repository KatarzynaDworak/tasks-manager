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

    onNewTasValueChange = (e) => {
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
    

    render() {
        const { tasks, newTaskValue } = this.state;

        return (
            <div>
                <form
                onSubmit={this.addNewTask}>
                    <input 
                        name="text"
                        value={newTaskValue}
                        onChange={this.onNewTasValueChange}
                    >
                    </input>
                    <br></br>
                    <button>SUBMIT</button>
                    <ul>
                        { tasks.map(({id, text}) => {
                            return <li key={id}>{text}</li>
                        })
                        }
                    </ul>
                </form>
            </div>
        )
    }
}

export default ToDo;