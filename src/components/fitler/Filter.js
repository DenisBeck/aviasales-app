/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleAllTransfers, toggleTransfersCount } from '../../redux/slices/filterSlice';

import classes from './Filter.module.scss';

function Filter() {
  const transfers = useSelector((state) => state.filter.transfers);
  const dispatch = useDispatch();

  return (
    <div className={classes.filter}>
      <h3 className={classes['filter-title']}>Количество пересадок</h3>
      <ul className={classes['filter-checkboxes']}>
        <li className={classes['filter-checkbox']}>
          <input
            type="checkbox"
            id="check-all"
            name="transfer"
            className={classes['checkbox-input']}
            onChange={() => dispatch(toggleAllTransfers())}
            checked={transfers.every((item) => item === true)}
          />
          <label htmlFor="check-all" className={classes['checkbox-label']}>
            Все
          </label>
        </li>
        <li className={classes['filter-checkbox']}>
          <input
            type="checkbox"
            id="check-0"
            name="transfer"
            className={classes['checkbox-input']}
            onChange={() => dispatch(toggleTransfersCount(0))}
            checked={transfers[0]}
          />
          <label htmlFor="check-0" className={classes['checkbox-label']}>
            Без пересадок
          </label>
        </li>
        <li className={classes['filter-checkbox']}>
          <input
            type="checkbox"
            id="check-1"
            name="transfer"
            className={classes['checkbox-input']}
            onChange={() => dispatch(toggleTransfersCount(1))}
            checked={transfers[1]}
          />
          <label htmlFor="check-1" className={classes['checkbox-label']}>
            1 пересадка
          </label>
        </li>
        <li className={classes['filter-checkbox']}>
          <input
            type="checkbox"
            id="check-2"
            name="transfer"
            className={classes['checkbox-input']}
            onChange={() => dispatch(toggleTransfersCount(2))}
            checked={transfers[2]}
          />
          <label htmlFor="check-2" className={classes['checkbox-label']}>
            2 пересадки
          </label>
        </li>
        <li className={classes['filter-checkbox']}>
          <input
            type="checkbox"
            id="check-3"
            name="transfer"
            className={classes['checkbox-input']}
            onChange={() => dispatch(toggleTransfersCount(3))}
            checked={transfers[3]}
          />
          <label htmlFor="check-3" className={classes['checkbox-label']}>
            3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
