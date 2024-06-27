import React from 'react';
import { createRoot } from 'react-dom/client';

import TasksManager from './components/TasksManager';
import ContainerJS from './components/ContainerJs';

import './styles/main.css';
import ToDo from './components/ToDo';

const App = () => {
    
    
    return (
        <>
            <TasksManager />
            <ContainerJS />
            <ToDo />
        </>
    );
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
