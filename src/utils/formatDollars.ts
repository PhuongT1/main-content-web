export const formatDollars = (dollars: any) => {
  dollars = (Math.round(dollars * 100) / 100).toFixed(2);
  dollars = dollars.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return dollars;
};
