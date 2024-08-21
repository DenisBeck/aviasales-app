/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import classes from './Filter.module.scss';

function Filter() {
  return (
    <div className={classes.filter}>
      <h3 className={classes['filter-title']}>Количество пересадок</h3>
      <ul className={classes['filter-checkboxes']}>
        <li className={classes['filter-checkbox']}>
          <input type="checkbox" id="check-1" name="transfer" className={classes['checkbox-input']} />
          <label htmlFor="check-1" className={classes['checkbox-label']}>
            Все
          </label>
        </li>
        <li className={classes['filter-checkbox']}>
          <input type="checkbox" id="check-2" name="transfer" className={classes['checkbox-input']} />
          <label htmlFor="check-2" className={classes['checkbox-label']}>
            Без пересадок
          </label>
        </li>
        <li className={classes['filter-checkbox']}>
          <input type="checkbox" id="check-3" name="transfer" className={classes['checkbox-input']} />
          <label htmlFor="check-3" className={classes['checkbox-label']}>
            1 пересадка
          </label>
        </li>
        <li className={classes['filter-checkbox']}>
          <input type="checkbox" id="check-4" name="transfer" className={classes['checkbox-input']} />
          <label htmlFor="check-4" className={classes['checkbox-label']}>
            2 пересадки
          </label>
        </li>
        <li className={classes['filter-checkbox']}>
          <input type="checkbox" id="check-5" name="transfer" className={classes['checkbox-input']} />
          <label htmlFor="check-5" className={classes['checkbox-label']}>
            3 пересадки
          </label>
        </li>
      </ul>
    </div>
  );
}

export default Filter;
