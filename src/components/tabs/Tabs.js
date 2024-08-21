import React from 'react';

import classes from './Tabs.module.scss';

function Tabs() {
  return (
    <ul className={classes.tabs}>
      <li className={[classes['tabs-item'], classes.active].join(' ')}>Самый дешевый</li>
      <li className={classes['tabs-item']}>Самый быстрый</li>
      <li className={classes['tabs-item']}>Оптимальный</li>
    </ul>
  );
}

export default Tabs;
