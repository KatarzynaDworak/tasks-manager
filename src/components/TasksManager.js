import React from 'react';

class TasksManager extends React.Component {
    state = {
        tasks: [],
        task: '' // aktualnie wprowadzone zadanie
    }

    // utworzenie formularza ze wszystkimi polami
    render() {
        return (
            <section>
                <form onSubmit={ (e) => {
                    e.preventDefault();
                    this.handleTask(e.target[0].value);
                }}>
                    <h1 onClick={ this.onClick }>TasksManager</h1>
                    <input 
                        name="task" 
                        value={ this.state.task } 
                        onChange={ (e) => this.handleChange(e.target.value) }>
                    </input>
                    <button type='submit'>Dodaj!</button>
                    <ul>{ this.renderTaskList() }</ul>
                </form>
            </section>
        )
    }

    // pobieramy istniejące zadania z serwera
    componentDidMount() {
        this.fetchTasks();
    }

    // aktualizacja komponentu
    componentDidUpdate() {
        // Jeśli potrzebujesz dodatkowych funkcji przy aktualizacji komponentu, dodaj je tutaj
    }

    handleChange = (task) => {
        this.setState({ task: task });
    }

    handleTask = (newTask) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: newTask,
                isRunning: '',
                isDone: '',
                isRemoved: ''
            }) // Przesyłamy zadanie jako JSON
        };

        fetch('http://localhost:3005/data', options)
            .then(response => response.json())
            .then(data => {
                console.log('New task was added!', data);
                
                // pobieranie numeru ID
                const taskId = data.id;
                console.log('Number of new task: ', taskId);
                this.fetchTasks();
            })
            .catch(err => console.log(err));
    }

    fetchTasks = () => {
        fetch('http://localhost:3005/data')
            .then(response => response.json())
            .then(data => {
                console.log('Task list', data);
                this.setState({ tasks: data });
            })
            .catch(err => console.log(err));
    }

    onClick = () => {
        const { tasks } = this.state;
        console.log(tasks);
    }

    // renderujemy listę zadań
    renderTaskList = () => {
        return (
            this.state.tasks.map((task, index) => 
                <li key={index}>{ task.task }</li>
            )
        )
    }

    // wysyłamy nowe zadanie na serwer
    submitHandler() {
        // Funkcja obsługująca wysłanie zadania
    }
}

export default TasksManager;
