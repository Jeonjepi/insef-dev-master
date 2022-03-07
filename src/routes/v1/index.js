const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const consRoute = require('./cons.route');
const consMediaRoute = require('./consMedia.route');
const agencyRoute = require('./agency.route');
const consCompanyRoute = require('./consCompany.route');
const reportRoute = require('./report.route');
const supportRoute = require('./support.route');
const consDivisionRoute = require('./consDivision.route');
const consTypeRoute = require('./consType.route');
const consRiskFactorsRoute = require('./consRiskFactors.route');
const disasterTypeRoute = require('./disasterType.route');
const userRiskFactorsRoute = require('./userRiskFactors.route');
const agencyRiskFactorsRoute = require('./agencyRiskFactors.route');
const agencyDisasterTypeRoute = require('./agencyDisasterType.route');
const compReportRoute = require('./compReport.route');
const machineRoute = require('./machine.route');
const processRoute = require('./process.route');
const agencyMachineRoute = require('./agencyMachine.route');
const consManagerRoute = require('./consManager.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/',
        route: authRoute,
    },
    {
        path: '/cons',
        route: consRoute,
    },
    {
        path: '/cons',
        route: consMediaRoute,
    },
    {
        path: '/cons',
        route: reportRoute,
    },
    {
        path: '/cons-company',
        route: consCompanyRoute,
    },
    {
        path: '/agency',
        route: agencyRoute,
    },
    {
        path: '/',
        route: supportRoute,
    },
    {
        path: '/cons-division',
        route: consDivisionRoute,
    },
    {
        path: '/cons-type',
        route: consTypeRoute,
    },
    {
        path: '/cons-risk-factor',
        route: consRiskFactorsRoute,
    },
    {
        path: '/users',
        route: userRiskFactorsRoute,
    },
    {
        path: '/agency',
        route: agencyRiskFactorsRoute,
    },
    {
        path: '/cons',
        route: compReportRoute,
    },
    {
        path: '/machine',
        route: machineRoute,
    },
    {
        path: '/process',
        route: processRoute,
    },
    {
        path: '/agency',
        route: agencyMachineRoute,
    },
    {
        path: '/cons',
        route: consManagerRoute,
    },
    {
        path: '/disaster-type',
        route: disasterTypeRoute,
    },
    {
        path: '/agency',
        route: agencyDisasterTypeRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
