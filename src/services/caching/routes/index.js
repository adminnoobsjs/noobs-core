'use strict';
const express = require('express');
const bodyParser = require('body-parser');

/**
   * Initailise the cache api endpoint. The following endpoints are available
   *  - HAS https://domain/backoffice/caching/api/has/:key : Returns if the key exists
   *  - GET https://domain/backoffice/caching/api/get/:key : Returns the cache value in the payload 
   *  - POST https://domain/backoffice/caching/api/set/:key : Receives the cache value in the payload () e.g. {data:This is the data } 
   *  - DEL https://domain/backoffice/caching/api/delete/:key : Deletes a key 
   *  - GET https://domain/backoffice/caching/api/status : returns a "success" 
   * @param {object} servicemanager
   * @returns {object} _routeManager
   */
module.exports = function (serviceManager) {

    /** Initiate the object */
    var _routeManager = {};

    // Initialise the view manager    
    _routeManager.initialise = function () {

        // Extract the interface manager from the parameters and configure
        var _interfaceManager = serviceManager.core.services.interface != null ? serviceManager.core.services.interface : null;

        if (_interfaceManager != null) {

            _interfaceManager.app().use(bodyParser.text({type:"*/*"}))

            // The cache has command
            _interfaceManager.app().route('/services/caching/api/has/:key').get(function (req, res) {
                serviceManager.core.services.caching.has(req.params.key).then(exists => res.status(200).send(exists));
            });

            // The cache get command
            _interfaceManager.app().route('/services/caching/api/get/:key').get(function (req, res) {
                serviceManager.core.services.caching.get(req.params.key).then(data => res.status(200).send(data));
            });

            // The cache set command
            _interfaceManager.app().route('/services/caching/api/set/:key').post(function (req, res) {
                serviceManager.core.services.caching.set(req.params.key, req.body)
                res.status(200).send('success');
            });

            // The cache delete command
            _interfaceManager.app().route('/services/caching/api/delete/:key').delete(function (req, res) {
                serviceManager.core.services.caching.del(req.params.key)
                res.status(200).send('success');
            });
            
            // The server ping
            _interfaceManager.app().route('/services/caching/api/status').get(function (req, res) {
                res.status(200).send('success');
            });
        }
    }();

    return _routeManager;
};

