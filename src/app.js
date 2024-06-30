import React from 'react';
import { createRoot } from 'react-dom/client';

import TaskManager from './components/TaskManager';

import './styles/main.css';
import ToDo from './components/ToDo';

const App = () => {
    
    
    return (
        <>
            <TaskManager />
        </>
    );
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
