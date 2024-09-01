import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCountToRender } from '../../redux/slices/ticketsSlice';

import classes from './Showmore.module.scss';

function Showmore() {
  const { data, countToRender } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  if (data?.length < countToRender) {
    return null;
  }

  return (
    <button type="button" className={classes.showmore} onClick={() => dispatch(setCountToRender(countToRender + 5))}>
      Показать еще 5 билетов!
    </button>
  );
}

export default Showmore;
