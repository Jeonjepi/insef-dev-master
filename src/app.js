const express = require('express');
// const helmet = require('helmet');
// const xss = require('xss-clean');
const cors = require('cors');
const methodOverride = require('method-override');
const compression    = require("compression");
const passport = require('passport');
const httpStatus = require('http-status');
const { jwtStrategy } = require('./config/passport');
// const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

// if (config.env !== 'test') {
//     app.use(morgan.successHandler);
//     app.use(morgan.errorHandler);
// }
app.use(compression());
// set security HTTP headers
// app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// method override / DELETE와 PUT을 사용 가능하게 해줌
app.use(methodOverride('X-HTTP-Method-Override'));

// sanitize request data
// app.use(xss());
// app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//     app.use('/v1/auth', authLimiter);
// }

// v1 api routes
app.use('/v1', routes);

//정적 파일 제공
app.use(express.static("public"));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Api Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
