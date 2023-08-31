const showFormattedDate = (date) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};

export { showFormattedDate };
