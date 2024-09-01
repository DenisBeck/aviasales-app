/* eslint-disable consistent-return */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../loader';
import TicketsItem from '../tickets-item';
import { fetchTickets, filterTickets, sortCheapest, sortFastest, sortOptimal } from '../../redux/slices/ticketsSlice';
import { selectFetchingData } from '../../redux/selectors/filteredAndSorted';

import classes from './TicketsList.module.scss';

function TicketsList() {
  const { data, error, countToRender, searchId, stop } = useSelector(selectFetchingData);
  const { transfers } = useSelector((state) => state.filter);
  const { sortingBy } = useSelector((state) => state.sorting);
  const dispatch = useDispatch();

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
    if (!stop && data && !error) {
      dispatch(fetchTickets(searchId));
    }
  }, [data]);

  useEffect(() => {
    if (!searchId) {
      return;
    }
    if (!data) {
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
  }, [searchId, data, transfers, sortingBy]);

  const content = (
    <ul className={classes['tickets-list']}>
      {data?.slice(0, countToRender).map((ticket) => (
        <TicketsItem key={ticket.id} data={ticket} />
      ))}
    </ul>
  );

  return (
    <div className={classes['tickets-container']}>
      <div className={classes.indicator}>
        {stop && <p>Все данные получены!</p>}
        {!stop && !error && <Loader />}
        {error && error}
      </div>
      {data && !data?.length && <p>Рейсов, подходящих под заданные фильтры, не найдено</p>}
      {data?.length > 0 && content}
    </div>
  );
}

export default TicketsList;
