import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TicketsItem from '../tickets-item';
import { fetchTickets, filterTickets, sortCheapest, sortFastest, sortOptimal } from '../../redux/slices/ticketsSlice';

import classes from './TicketsList.module.scss';

function TicketsList() {
  const { data, error, loading } = useSelector((state) => state.tickets);
  const { transfers } = useSelector((state) => state.filter);
  const { sortingBy } = useSelector((state) => state.sorting);
  const dispatch = useDispatch();

  const { filteredAndSorted, tickets, countToRender } = data;

  const getTickets = () => {
    dispatch(fetchTickets());
  };

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
    if (!tickets) {
      getTickets();
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
  }, [tickets, transfers, sortingBy]);

  if (loading) {
    return <h1>LOADING...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!filteredAndSorted?.length) {
    return <p>Рейсов, подходящих под заданные фильтры, не найдено</p>;
  }

  return (
    <ul className={classes['tickets-list']}>
      {filteredAndSorted.slice(0, countToRender).map((ticket) => (
        <TicketsItem key={ticket.id} data={ticket} />
      ))}
    </ul>
  );
}

export default TicketsList;
