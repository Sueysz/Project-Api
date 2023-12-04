export const errorHandling = (res, error, errorMessage = 'An error has occurred',errorCode = 500) => {
    const errorTime = new Date().getTime();
    console.error("error:"+errorTime, error);
    res.status(errorCode).json({ error: errorMessage, errorTime });
};
