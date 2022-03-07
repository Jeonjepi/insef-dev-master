module.exports = [{
    script: 'src/index.js',
    name: 'insef',
    env_production : {
        "NODE_ENV": "develoment"
    }
    // exec_mode: 'cluster',
    // instances: 2
}]

// {
//     script: 'insef_worker.js',
//         name: 'insef_worker'
// }
