const express = require('express')
const reqToTable = require('../components/network')

const routes = (server) => {
    try {
        server.use('/table', reqToTable)
        
    } catch (err) {
        console.error(`Error in routing: ${err}`)
    }
}

module.exports = routes