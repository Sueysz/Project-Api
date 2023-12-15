export const errorHandling = (res, options) => {
    const { errorMessage = 'An error has occurred', error = new Error(errorMessage), errorCode = 500 } = options
    const errorTime = new Date().getTime();
    console.error(errorTime, " error: ", error);
    res.status(errorCode).json({ error: error.message, errorTime });
};
