import React from 'react';

import TicketsItem from '../tickets-item';

import classes from './TicketsList.module.scss';

function TicketsList() {
  return (
    <ul className={classes['tickets-list']}>
      <TicketsItem />
      <TicketsItem />
      <TicketsItem />
      <TicketsItem />
      <TicketsItem />
    </ul>
  );
}

export default TicketsList;
