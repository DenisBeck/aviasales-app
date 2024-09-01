/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../loader';
import TicketsItem from '../tickets-item';
import { fetchTickets } from '../../redux/slices/ticketsSlice';
import selectFilteredAndSorted from '../../redux/selectors/filteredAndSorted';
import selectErrors from '../../redux/selectors/errors';
import selectFetchingData from '../../redux/selectors/fetchingData';

import classes from './TicketsList.module.scss';

function TicketsList() {
  const { error, countToRender, searchId, stop } = useSelector(selectFetchingData);
  const { errorsCount } = useSelector(selectErrors);
  const tickets = useSelector(selectFilteredAndSorted);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchId && !stop && errorsCount < 3) {
      dispatch(fetchTickets(searchId));
    }
  });

  const content = (
    <ul className={classes['tickets-list']}>
      {tickets?.slice(0, countToRender).map((ticket) => (
        <TicketsItem key={ticket.id} data={ticket} />
      ))}
    </ul>
  );

  return (
    <div className={classes['tickets-container']}>
      <div className={classes.indicator}>
        {!stop && errorsCount < 3 && <Loader />}
        {errorsCount >= 3 && error}
      </div>
      {tickets && !tickets?.length && <p>Рейсов, подходящих под заданные фильтры, не найдено</p>}
      {tickets?.length > 0 && content}
    </div>
  );
}

export default TicketsList;
