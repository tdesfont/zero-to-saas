// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Timetracking from './pages/Timetracking';
import Events from './pages/Events';
import Tasks from './pages/Tasks';
import RoutinesSubTasks from './pages/RoutinesSubTasks';
import Threads from './pages/Threads';
import RecurringTask from './pages/RecurringTask';
import Today from './pages/Today';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="timetracking" element={<Timetracking />} />
          <Route path="events" element={<Events />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="routinesubtasks" element={<RoutinesSubTasks />} />
          <Route path="recurringtask" element={<RecurringTask />} />
          <Route path="today" element={<Today></Today>} />
          <Route path="threads" element={<Threads />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
