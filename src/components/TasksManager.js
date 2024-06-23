//do zrobienia:
//1. funkcjonalności: 
// rozpoczęcia odliczania
// zatrzymania odliczania, jeśli zostało wcześniej rozpoczęte
// zakończenia zadania, co spowoduje przeniesienie go na koniec listy (można wykorzystać .sort())
// usunięcia z listy, co spowoduje, że zadanie nie zostanie wyrenderowane, ale będzie cały czas przechowywane w state (można wykorzystać .filter()).
// Uznajemy, że w jednym momencie możemy wykonywać jedno zadanie.
// Wciśnięcie przycisku zakończone powinno jednocześnie zatrzymywać naliczanie czasu.
// Usunięcie zadania ma być możliwe dopiero po jego zakończeniu (uznajemy, że nie ma omyłkowo dodanych zadań).
// Ostylowanie CSS

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
            console.log('New task was added!', newTask);
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
                (
                    <section key={index}>
                        <header>{ task.task }, {task.time}</header>
                        <footer>
                            <button onClick={ (e) => this.handleStartAndStop(e)}>start/stop</button>
                            <button>zakończone</button>
                            <button disabled="true">usuń</button>
                         </footer>
                    </section>
                )
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
        
        handleStartAndStop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Button start/stop was clicked!')
        }

        onClick = () => {
            const { tasks } = this.state;
        console.log(tasks);
    }

}

export default TasksManager;
