import { createSelector } from '@reduxjs/toolkit';

// const { data } = (state) => state.tickets;
export const selectFilters = (state) => state.filter.transfers;
export const selectSortingType = (state) => state.sorting.sortingBy;
export const selectFetchingData = (state) => state.tickets;

const selectFilteredAndSorted = createSelector([selectFilters, selectFetchingData, selectSortingType], () => {
  // const checkedStops = [];
  // transfers.forEach((transfer, index) => {
  //   if (transfer) {
  //     checkedStops.push(index);
  //   }
  // });
  // const filtered = data.filter((item) => item.segments.some((segment) => checkedStops.includes(segment.stops.length)));
  // switch (sortingBy) {
  //   case 'cheapest':
  //     return filtered.sort((a, b) => a.price - b.price);
  //   case 'fastest':
  //     return filtered.sort(
  //       (a, b) =>
  //         a.segments.reduce((sum, item) => sum + item.duration, 0) -
  //         b.segments.reduce((sum, item) => sum + item.duration, 0)
  //     );
  //   default:
  //     return filtered.sort(
  //       (a, b) =>
  //         a.price * a.segments.reduce((sum, item) => sum + item.duration, 0) -
  //         b.price * b.segments.reduce((sum, item) => sum + item.duration, 0)
  //     );
  // }
});

export default selectFilteredAndSorted;
