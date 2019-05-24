const VALIDATION_ERROR = 'ValidationError';
const debugMode = (process.env.NODE_ENV === 'development');

module.exports = (err, req, res, next) =>{
    if(err && err.name === VALIDATION_ERROR) {
        let alert = {
            title: 'Error!',
            detail: 'Server occurred an error,  please try again'
        };
        if (debugMode) {
            alert.detail = err.errors;
            alert.title = err._message;
            alert.type = VALIDATION_ERROR;
        }
        return res.status(422).json({alert});
    } else if(err) {
        return res.status(422).json(err);
    }
    next();
};