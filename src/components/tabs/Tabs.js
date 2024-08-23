import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSort } from '../../redux/slices/sortingSlice';

import classes from './Tabs.module.scss';

function Tabs() {
  const sorting = useSelector((state) => state.sorting.sortingBy);
  const dispatch = useDispatch();

  return (
    <ul className={classes.tabs}>
      <li key="cheapest" className={classes['tabs-item']}>
        <button 
          className={[classes['tabs-button'], sorting === 'cheapest' && classes.active].join(' ')}
          onClick={() => dispatch(setSort('cheapest'))}
          type='button'>
          Самый дешевый
        </button>
      </li>

      <li key="fastest" className={classes['tabs-item']}>
        <button 
          className={[classes['tabs-button'], sorting === 'fastest' && classes.active].join(' ')}
          onClick={() => dispatch(setSort('fastest'))}
          type='button'>
          Самый быстрый
        </button>
      </li>

      <li key="optimal" className={classes['tabs-item']}>
        <button 
          className={[classes['tabs-button'], sorting === 'optimal' && classes.active].join(' ')}
          onClick={() => dispatch(setSort('optimal'))}
          type='button'>
          Оптимальный
        </button>
      </li>
    </ul>
  );
}

export default Tabs;
