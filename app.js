const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
// console.log(app);

app.set('view engine', 'pug');

app.use(routes)
app.use(morgan('dev'));
app.use((req, res, next) => {
    const err = new Error("The requested page can not be found");
    err.status = 404;
    next(err);
})

app.use((err, req, res, next) => {
    if(err.status === 404) {
        res.status = 404;
        res.render('page-not-found', { title: "Not Found" });
    } else {
        next(err);
    }
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', { title: "Server Error", message: err.message, stack: err.stack });

})

module.exports = app;