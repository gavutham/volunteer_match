export function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const eventFilter = (filters, event) => {
  const eventTags = event.tags.map((e) => e.toLowerCase());
  if (filters.date === null) {
    if (filters.title.length === 0 && filters.tags.length === 0) {
      return true;
    } else if (filters.tags.length === 0) {
      return event.title.toLowerCase().includes(filters.title.toLowerCase());
    } else if (filters.title.length === 0) {
      return filters.tags.some((filter) => eventTags.includes(filter));
    } else {
      return (
        event.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        filters.tags.some((filter) => eventTags.includes(filter))
      );
    }
  } else {
    if (filters.title.length === 0 && filters.tags.length === 0) {
      return isSameDay(filters.date, event.time);
    } else if (filters.tags.length === 0) {
      return (
        event.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        isSameDay(filters.date, event.time)
      );
    } else if (filters.title.length === 0) {
      return (
        filters.tags.some((filter) => eventTags.includes(filter)) &&
        isSameDay(filters.date, event.time)
      );
    } else {
      return (
        event.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        filters.tags.some((filter) => eventTags.includes(filter)) &&
        isSameDay(filters.date, event.time)
      );
    }
  }
};
