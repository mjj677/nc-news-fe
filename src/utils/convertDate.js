export const ConvertDate = (time) => {
  const timestamp = time;
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const readableDate = date.toLocaleDateString("en-US", options);
  return readableDate;
};
