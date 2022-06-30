const app = require('./app');

// Route
const loginRouter = require('./routes/loginRouter');
const dashboardRouter = require('./routes/dashboardRouter');
const userRouter = require('./routes/userRouter');
const all = require('./routes/moviesRouter');

// Llamamos a los routers
app.use(loginRouter);
app.use(dashboardRouter);
app.use(userRouter);
app.use(all);

module.exports = app;