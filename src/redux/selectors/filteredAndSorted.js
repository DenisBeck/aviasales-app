import { createSelector } from '@reduxjs/toolkit';

import selectFilters from './filters';
import selectFetchingData from './fetchingData';
import selectSortingType from './sortingType';

const selectFilteredAndSorted = createSelector(
  [selectFilters, selectFetchingData, selectSortingType],
  (transfersFilter, tickets, sort) => {
    const { data } = tickets;

    if (!data) {
      return null;
    }

    const checkedStops = [];
    transfersFilter.forEach((transfer, index) => {
      if (transfer) {
        checkedStops.push(index);
      }
    });

    const filtered = data.filter((item) =>
      item.segments.some((segment) => checkedStops.includes(segment.stops.length))
    );

    switch (sort) {
      case 'cheapest':
        return filtered.sort((a, b) => a.price - b.price);
      case 'fastest':
        return filtered.sort(
          (a, b) =>
            a.segments.reduce((sum, item) => sum + item.duration, 0) -
            b.segments.reduce((sum, item) => sum + item.duration, 0)
        );
      default:
        return filtered.sort(
          (a, b) =>
            a.price * a.segments.reduce((sum, item) => sum + item.duration, 0) -
            b.price * b.segments.reduce((sum, item) => sum + item.duration, 0)
        );
    }
  }
);

export default selectFilteredAndSorted;
