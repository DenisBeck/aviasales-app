import React from 'react';

import itemIcon from '../../assets/img/item-logo.png';

import classes from './TicketsItem.module.scss';

function TicketsItem() {
  return (
    <div className={classes['tickets-item']}>
      <div className={classes['tickets-item-header']}>
        <span className={classes['tickets-item-price']}>13 400 Р</span>
        <img src={itemIcon} alt="Company Logo" className={classes['tickets-item-logo']} />
      </div>
      <ul className={classes['ticket-info']}>
        <li className={classes['ticket-info-item']}>
          <span className={classes['ticket-info-item-top']}>MOW – HKT</span>
          <span className={classes['ticket-info-item-top']}>В пути</span>
          <span className={classes['ticket-info-item-top']}>2 пересадки</span>
          <span className={classes['ticket-info-item-bottom']}>10:45 – 08:00</span>
          <span className={classes['ticket-info-item-bottom']}>21ч 15м</span>
          <span className={classes['ticket-info-item-bottom']}>HKG, JNB</span>
        </li>
        <li className={classes['ticket-info-item']}>
          <span className={classes['ticket-info-item-top']}>MOW – HKT</span>
          <span className={classes['ticket-info-item-top']}>В пути</span>
          <span className={classes['ticket-info-item-top']}>1 пересадка</span>
          <span className={classes['ticket-info-item-bottom']}>11:20 – 00:50</span>
          <span className={classes['ticket-info-item-bottom']}>13ч 30м</span>
          <span className={classes['ticket-info-item-bottom']}>HKG</span>
        </li>
      </ul>
    </div>
  );
}

export default TicketsItem;
