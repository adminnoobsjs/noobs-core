'use strict';
const axios = require("axios");

/**
 * The token class
 */
module.exports = function (moduleManager) {

    /** Initiate the object */
    var _serviceManager = {};

     /**
      * Enable a fetch request
      * @param {string} address 
      * @param {object} options 
      * @param {object} callback 
      * @param {object} errorCallback 
      */
    _serviceManager.fetch = function (address, options, callback, errorCallback) {
        var result = '';
        const data = {
            contents: [
                { parts: [{ text: JSON.stringify(prompt) }] },
            ],
        };

        axios.post(address, options.data, options.headers).then((response) => {
            callback (response.data)
        }).catch((error) => {
            errorCallback(error.response ? error.response.data : error.message)
        });
    }
 
    return _serviceManager;
};
