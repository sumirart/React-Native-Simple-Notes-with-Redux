const logger = ({ getState, dispatch }) => next => action => {
    console.log(action);
    next(action);
}

export default logger;