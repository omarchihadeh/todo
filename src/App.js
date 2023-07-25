import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import { AddTodo } from './components/AddTodo';
import { TodoLists } from './components/TodoLists';

const App = () => {
  return (
    <>
      <Header />
      <div className="container p-4 mt-2">
        <h2>Todo Application</h2>
        <AddTodo />
        <TodoLists />
      </div>
    </>
  );
}

export default App;