//do zrobienia:
//1. funkcjonalności: 
// DO NAPRAWY - rozpoczęcia odliczania + zatrzymania odliczania, jeśli zostało wcześniej rozpoczęte
// DO ZROBIENIA - zakończenia zadania, co spowoduje przeniesienie go na koniec listy (można wykorzystać .sort())
// DO ZROBIENIA - usunięcia z listy, co spowoduje, że zadanie nie zostanie wyrenderowane, ale będzie cały czas przechowywane w state (można wykorzystać .filter()).
// DO ZROBIENIA - Uznajemy, że w jednym momencie możemy wykonywać jedno zadanie.
// DO ZROBIENIA - Wciśnięcie przycisku zakończone powinno jednocześnie zatrzymywać naliczanie czasu.
// DO ZROBIENIA - Usunięcie zadania ma być możliwe dopiero po jego zakończeniu (uznajemy, że nie ma omyłkowo dodanych zadań).
// DO ZROBIENIA - Ostylowanie CSS

import React from 'react';

class TasksManager extends React.Component {
    state = {
        tasks: [
            {
                text: [],
                time: 0,
                isRunning: false,
                isDone: false,
                isRemoved: false
            }
        ],
        task: '', // aktualnie wprowadzone zadanie
    };

    constructor(props) {
        super(props);
        this.intervalIds = {}; // Inicjalizujemy tablicę identyfikatorów liczników czasu
    }

    // Pobieramy istniejące zadania z serwera przy montowaniu komponentu
    componentDidMount() {
        fetch('http://localhost:3005/data')
        .then(response => response.json())
        .then(data => {
            console.log('Task list', data);
            if (Array.isArray(data)) {
                this.setState({ tasks: [...state.tasks, data] });
            } else {
                console.error('Data fetched is not an array', data);
            }
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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: newTask,
                isRunning: false,
                elapsedTime: 0,
                isDone: false,
                isRemoved: false,
            }), // Przesyłamy zadanie jako JSON
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
                task: '',
            }));
        })
        .catch(err => console.log(err));
    }

    // renderujemy listę zadań
    renderTaskList = () => {
        if (!Array.isArray(this.state.tasks)) {
            return null;
        }

        return this.state.tasks.map((task, index) => (
            <section key={index}>
                <header>{task.task}, {this.formatTime(task.elapsedTime)}</header>
                <footer>
                    <button onClick={(e) => this.handleStartAndStop(e, index)}>start/stop</button>
                    <button onClick={(e) => this.handleFinish(e)}>zakończone</button>
                    <button disabled={true}>usuń</button>
                </footer>
            </section>
        ));
    }

    // utworzenie formularza ze wszystkimi polami
    render() {
        return (
            <section>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.handleTask(e.target[0].value);
                }}>
                    <h1 onClick={this.onClick}>TasksManager</h1>
                    <input
                        name="task"
                        value={this.state.task}
                        onChange={(e) => this.handleChange(e.target.value)}>
                    </input>
                    <button type='submit'>Dodaj!</button>
                    <ul>{this.renderTaskList()}</ul>
                </form>
            </section>
        );
    }

    handleStartAndStop = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Button start/stop was clicked!');

        this.setState(prevState => {
            const tasks = [...prevState.tasks];
            const task = tasks[index];

            if (task.isRunning) {
                clearInterval(this.intervalIds[index]);
                delete this.intervalIds[index];
            } else {
                this.intervalIds[index] = setInterval(() => {
                    this.setState(prevState => {
                        const tasks = [...prevState.tasks];
                        tasks[index].elapsedTime += 1;
                        return { tasks };
                    });
                }, 1000);
            }

            task.isRunning = !task.isRunning;
            return { tasks };
        });
    }

    handleFinish = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Button "ZAKOŃCZ" was clicked!');
    }

    formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    onClick = () => {
        const { tasks } = this.state;
        console.log(tasks);
    }
}

export default TasksManager;
