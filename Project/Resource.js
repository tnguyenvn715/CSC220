// <editor-fold desc="Resource">

//CREDIT: code used below is provided by Professor Block
/**
 * 
 * @param {URL} url
 * @returns {Resource}
 */
function Resource(url) {
    this.url = url;
    this.method = "GET";
    this.isAsynchronous = true;
    this.isLoaded = false;
    this.objectToNotify = null;
    this.onLoadHandler = null;
    this.onErrorHandler = null;
    this.request = null;
    this.totalBytes = null;
    this.loadedBytes = null;
    this.loadedPercentage = 0;
}

/**
 * 
 * @param {type} objectToNotify
 * @param {type} onLoadHandler
 * @param {type} onErrorHandler
 * @returns {undefined}
 */
Resource.prototype.beginLoad = function(
        objectToNotify, 
        onLoadHandler,
        onErrorHandler) {
    if (typeof objectToNotify === 'undefined') {
        // no notification necessary
    } else if (typeof objectToNotify != null && 
            typeof onLoadHandler === 'function') {
        this.objectToNotify = objectToNotify;
        this.onLoadHandler = onLoadHandler;
        if (typeof onErrorHandler === 'function') {
            this.onErrorHandler = onErrorHandler;
        }
    }
    var _this = this;
    var request = new XMLHttpRequest();
    this.request = request;
    this.request.withCredentials = true;

    this.request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                _this.callLoadHandler();
            } else {
                _this.callErrorHandler();
            }
        }
    }
    this.request.onprogress = function (evt) {
        var total = evt.total;
        var loaded = evt.loaded;
        var percentage = Math.round(loaded / total * 100);
        _this.onProgress(total, loaded, percentage);
    }
    this.request.open(this.method, this.url, this.isAsynchronous);
    this.request.send();
}

/**
 * 
 * @param {type} total
 * @param {type} loaded
 * @param {type} roundedPercentage
 * @returns {undefined}
 */
Resource.prototype.onProgress = function(total, loaded, roundedPercentage) {
    this.totalBytes = total;
    this.loadedBytes = loaded;
    this.loadedPercentage = roundedPercentage;
}

/**
 * 
 * @returns {Boolean}
 */
Resource.prototype.getIsLoadingStatusAvailable = function() {
    return this.totalBytes != null && this.loadedBytes != null;
}

/**
 * 
 * @returns {Number|type}
 */
Resource.prototype.getLoadedPercentage = function() {
    return this.loadedPercentage;
}

/**
 * 
 * @returns {undefined}
 */
Resource.prototype.callLoadHandler = function() {
    this.isLoaded = true;
    if (this.onLoadHandler != null) {
        this.callHandler(this.onLoadHandler);
    }
}

/**
 * 
 * @returns {Boolean}
 */
Resource.prototype.getIsLoaded = function() {
    return this.isLoaded;
}

/**
 * 
 * @returns {Resource.request.responseText}
 */
Resource.prototype.getLoadedString = function() {
    return this.request.responseText;
}

/**
 * 
 * @returns {undefined}
 */
Resource.prototype.callErrorHandler = function() {
    if (this.onErrorHandler != null) {
        this.callHandler(this.onErrorHandler);
    }
}

/**
 * 
 * @param {type} handler
 * @returns {undefined}
 */
Resource.prototype.callHandler = function(handler) {
    if (this.objectToNotify != null) {
        handler.call(this.objectToNotify, this);
    } else {
        handler(this);
    }
}
// </editor-fold>
