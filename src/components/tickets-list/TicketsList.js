/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../loader';
import TicketsItem from '../tickets-item';
import { fetchTickets, filterTickets, sortCheapest, sortFastest, sortOptimal } from '../../redux/slices/ticketsSlice';

import classes from './TicketsList.module.scss';

function TicketsList() {
  const { data, error } = useSelector((state) => state.tickets);
  const { transfers } = useSelector((state) => state.filter);
  const { sortingBy } = useSelector((state) => state.sorting);
  const dispatch = useDispatch();

  const { filteredAndSorted, tickets, countToRender, searchId, stop } = data;

  const getCheckedStops = (stops) => {
    const checkedStops = [];
    stops.forEach((item, index) => {
      if (item) {
        checkedStops.push(index);
      }
    });
    return checkedStops;
  };

  useEffect(() => {
    let timerId;
    if (!stop && tickets && !error) {
      timerId = setTimeout(() => {
        dispatch(fetchTickets(searchId));
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [tickets]);

  useEffect(() => {
    if (!searchId) {
      return;
    }
    if (!tickets) {
      dispatch(fetchTickets(searchId));
    } else {
      dispatch(filterTickets(getCheckedStops(transfers)));
      switch (sortingBy) {
        case 'cheapest':
          dispatch(sortCheapest());
          break;
        case 'fastest':
          dispatch(sortFastest());
          break;
        default:
          dispatch(sortOptimal());
      }
    }
  }, [searchId, tickets, transfers, sortingBy]);

  const content = (
    <ul className={classes['tickets-list']}>
      {filteredAndSorted.slice(0, countToRender).map((ticket) => (
        <TicketsItem key={ticket.id} data={ticket} />
      ))}
    </ul>
  );

  return (
    <div className={classes['tickets-container']}>
      <p className={classes.indicator}>
        {stop && <p>Все данные получены!</p>}
        {!stop && !error && <Loader />}
        {error && error}
      </p>
      {tickets && !filteredAndSorted?.length && <p>Рейсов, подходящих под заданные фильтры, не найдено</p>}
      {filteredAndSorted.length > 0 && content}
    </div>
  );
}

export default TicketsList;
