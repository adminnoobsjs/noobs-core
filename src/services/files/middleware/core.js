'use strict';
const fs = require('fs');
const path = require('path')

/**
 * File Manager local provider
 */
module.exports = function (parameters) {

    /** Initiate the object */
    var _controller = {};
    var baseFolder =  (('basefolder' in parameters) ? parameters['basefolder'] : './');  // The folder we start working at

    /**
     * Create a file
     * @param {String} filePath
     * @param {object} content
     * @param {function} callback
     */
    _controller.createAsunc = function (filePath, content, callback) {
        if (!fs.existsSync(path.dirname(filePath))){
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        fs.writeFile(filePath, content, function (err) {
            callback(null, err)
        });
        callback('success');
    }

    /**
     * Create a file
     * @param {String} filePath
     * @param {object} content
     * @param {function} callback
     */
    _controller.create = function (filePath, content, callback) {
        if (!fs.existsSync(path.dirname(filePath))){
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        fs.writeFile(filePath, content, function (err) {
            callback(null, err)
        });
        callback('success');
    }

    /**
     * Append to file
     * @param {String} filePath
     * @param {object} content
     * @param {function} callback
     */
    _controller.append = function (filePath, content, callback) {
        console.log(filePath);
        if (!fs.existsSync(path.dirname(filePath))){
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }
        fs.appendFile(filePath, content, callback);
    }

     /**
     * Rename to file
     * @param {String} filePath
     * @param {String} newfilePath
     * @param {function} callback
     */
    _controller.rename = function (filePath, newfilePath, callback) {
        fs.rename(filePath, newfilePath, callback);
    }

    /**
     * Delete a file
     * @param {String} filePath
     * @param {function} callback
    */
    _controller.delete = function (filePath, callback) {
        fs.unlink(filePath,callback);
    }
   
    /**
     * Read a File
     * @param {String} filePath
     * @param {function} callback
    */
    _controller.readFile = function (filePath, callback) {
        fs.readFile(filePath, callback );
    }

    /**
     * Read a Directory
     * @param {String} directory
     * @param {function} callback
     */
    _controller.readDirectory = function (directory, callback) {
        fs.readdir(directory, callback );
    }

    /**
     * File Exists
     * @param {String} filePath
     * @param {function} callback
    */
    _controller.exists = function (filePath, callback) {
       fs.exists(filePath, callback)
    }

    /**
     * Is the object a file
     * @param {String} path
    */
    _controller.isFile = function (path) {
        return fs.statSync(path).isFile()
     } 

    /**
     * Is the object a folder
     * @param {String} path
    */
    _controller.isFolder = function (path) {
        return fs.statSync(path).isDirectory();
     } 

    /**
     * Return stats
     * @param {String} path
    */
    _controller.stats = function (path) {
        return fs.statSync(path)
     } 

    return _controller;
};

