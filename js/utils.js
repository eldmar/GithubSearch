export const debounce = (func, ms) => {
  let timerId;

  return function (...args) {
    // Очищати попередній таймаут
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func(...args); // handleInput(event)
    }, ms);
  };
};
