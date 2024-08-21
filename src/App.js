import React from 'react';

import classes from './App.module.scss';
import Logo from './components/logo';
import Filter from './components/fitler';
import Tabs from './components/tabs';
import TicketsList from './components/tickets-list';
import Showmore from './components/showmore';

function App() {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Logo />
      </header>
      <main className={classes.main}>
        <aside className={classes.sidebar}>
          <Filter />
        </aside>
        <div className={classes.content}>
          <Tabs />
          <TicketsList className={classes.Tickets} />
          <Showmore />
        </div>
      </main>
    </div>
  );
}

export default App;
