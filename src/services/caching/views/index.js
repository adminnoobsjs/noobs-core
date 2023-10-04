'use strict';
const events = require('events');
const express = require('express');

/**
 * The nooblyjs core Caching view manager
 */
module.exports = function (moduleManager) {

    /** Initiate the object */
    var _viewManager = {};

    // Initialise the event emitter
    _viewManager.events = new events.EventEmitter();

    // Initialise the view manager    
    _viewManager.initialise = function () {

        // Extract the inverface manager from the parameters and configure
        var _interfaceManager = moduleManager.core.services.interface ? moduleManager.core.services.interface : null;
        
        // if there is an interface manager passed then add it
        if (_interfaceManager != null) {
            _interfaceManager.app().use(express.json())

            // Register the UI css and js to be used by all backoffice interfaces
            _interfaceManager.registerSite('/backoffice/caching/', (moduleManager.core.common.modules.isModule() ? './node_modules/nooblyjs' : '.') + '/services/caching/views/pages');

            // Raise the initalised event
            _viewManager.events.emit('core-viewmanager-initialise', 'success');
        }

    }();

    return _viewManager;
};