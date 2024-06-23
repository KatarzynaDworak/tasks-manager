import React from 'react';

class TasksManager extends React.Component {
    state = {
        tasks: [],
        task: '' // aktualnie wprowadzone zadanie
    }

    // Pobieramy istniejące zadania z serwera przy montowaniu komponentu
    componentDidMount() {
        fetch('http://localhost:3005/data')
        .then(response => response.json())
        .then(data => {
            console.log('Task list', data);
            this.setState({ tasks: data });
        })
        .catch(err => console.log(err));
    }

    // aktualizacja komponentu
    componentDidUpdate() {
        // Jeśli potrzebujesz dodatkowych funkcji przy aktualizacji komponentu, dodaj je tutaj
    }

    handleChange = (newTask) => {
        this.setState({ task: newTask });
    }

    // przesyłamy zadanie na serwer JSON
    handleTask = (newTask) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: newTask,
                isRunning: false,
                isDone: false,
                isRemoved: false
            }) // Przesyłamy zadanie jako JSON
        };

        this.submitHandler(options);
    }

    // Wysyłamy nowe zadanie na serwer
    submitHandler = (options) => {
        fetch('http://localhost:3005/data', options)
        .then(response => response.json())
        .then(newTask => {
            console.log('New task was added!', data);
            // Dodajemy nowe zadanie do stanu
            this.setState(prevState => ({
                tasks: [...prevState.tasks, newTask],
                task: ''
            }));
        })
        .catch(err => console.log(err));
    }

    // renderujemy listę zadań
    renderTaskList = () => {
        return (
            this.state.tasks.map((task, index) => 
                <li key={index}>{ task.task }</li>
            )
        )
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

    onClick = () => {
        const { tasks } = this.state;
        console.log(tasks);
    }

}

export default TasksManager;
