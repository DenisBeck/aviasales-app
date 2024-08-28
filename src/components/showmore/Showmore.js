import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCountToRender } from '../../redux/slices/ticketsSlice';

import classes from './Showmore.module.scss';

function Showmore() {
  const { data } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  const { countToRender, filteredAndSorted } = data;

  if (filteredAndSorted?.length < countToRender) {
    return null;
  }

  return (
    <button type="button" className={classes.showmore} onClick={() => dispatch(setCountToRender(countToRender + 5))}>
      Показать еще 5 билетов!
    </button>
  );
}

export default Showmore;
