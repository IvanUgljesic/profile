export const Timer = (callback, delay) => {
    let timerId, start, remaining = delay;

    this.pause = () => {
        window.clearTimeout(timerId);
        remaining -= Date.now() - start;
    };

    this.resume = () => {
        start = Date.now();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
};