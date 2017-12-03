'use strict';

var Request = function(builder) {
  if (!builder) {
    throw new Error('No builder supplied to constructor');
  }

  this.host = builder.host;
  this.port = builder.port;
  this.scheme = builder.scheme;
  this.queryParameters = builder.queryParameters;
  this.bodyParameters = builder.bodyParameters;
  this.headers = builder.headers;
  this.path = builder.path;
};

<<<<<<< HEAD
Request.prototype.getHost = function() {
  return this.host;
};

Request.prototype.getPort = function() {
  return this.port;
};

Request.prototype.getScheme = function() {
  return this.scheme;
};

Request.prototype.getPath = function() {
  return this.path;
};

Request.prototype.getQueryParameters = function() {
  return this.queryParameters;
};

Request.prototype.getBodyParameters = function() {
  return this.bodyParameters;
};

Request.prototype.getHeaders = function() {
  return this.headers;
};
=======
Request.prototype._getter = function (key) {
  return function () { return this[key]; };
};

Request.prototype.getHost = Request.prototype._getter('host');

Request.prototype.getPort = Request.prototype._getter('port');

Request.prototype.getScheme = Request.prototype._getter('scheme');

Request.prototype.getPath = Request.prototype._getter('path');

Request.prototype.getQueryParameters = Request.prototype._getter('queryParameters');

Request.prototype.getBodyParameters = Request.prototype._getter('bodyParameters');

Request.prototype.getHeaders = Request.prototype._getter('headers');
>>>>>>> 9ccbbe21029b626d3f991d3795c43fd1ac045348

Request.prototype.getURI = function() {
  if (!this.scheme || !this.host || !this.port) {
    throw new Error('Missing components necessary to construct URI');
  }
  var uri = this.scheme + '://' + this.host;
  if (this.scheme === 'http' && this.port !== 80 ||
    this.scheme === 'https' && this.port !== 443) {
    uri += ':' + this.port;
  }
  if (this.path) {
    uri += this.path;
  }
  return uri;
};

Request.prototype.getURL = function() {
  var uri = this.getURI();
  if (this.getQueryParameters()) {
    return uri + this.getQueryParameterString(this.getQueryParameters());
  } else {
    return uri;
  }
};

<<<<<<< HEAD
Request.prototype.addQueryParameters = function(queryParameters) {
  for (var key in queryParameters) {
    this.addQueryParameter(key, queryParameters[key]);
  }
};

Request.prototype.addQueryParameter = function(key, value) {
  if (!this.queryParameters) {
    this.queryParameters = {};
  }
  this.queryParameters[key] = value;
};

Request.prototype.addBodyParameters = function(bodyParameters) {
  for (var key in bodyParameters) {
    this.addBodyParameter(key, bodyParameters[key]);
  }
};

Request.prototype.addBodyParameter = function(key, value) {
  if (!this.bodyParameters) {
    this.bodyParameters = {};
  }
  this.bodyParameters[key] = value;
};

Request.prototype.addHeaders = function(headers) {
  if (!this.headers) {
    this.headers = headers;
  } else {
    for (var key in headers) {
      this.headers[key] = headers[key];
    }
  }
};

Request.prototype.getQueryParameterString = function() {
  var queryParameters = this.getQueryParameters();
  if (!queryParameters) {
    return;
  }
  var queryParameterString = '?';
  var first = true;
  for (var key in queryParameters) {
    if (queryParameters.hasOwnProperty(key)) {
      if (!first) {
        queryParameterString += '&';
      } else {
        first = false;
      }
      queryParameterString += key + '=' + queryParameters[key];
    }
  }
  return queryParameterString;
};

var Builder = function() {
  var host, port, scheme, queryParameters, bodyParameters, headers, jsonBody;
};

Builder.prototype.withHost = function(host) {
  this.host = host;
  return this;
};

Builder.prototype.withPort = function(port) {
  this.port = port;
  return this;
};

Builder.prototype.withScheme = function(scheme) {
  this.scheme = scheme;
  return this;
};

Builder.prototype.withQueryParameters = function(queryParameters) {
  this.queryParameters = queryParameters;
  return this;
};

Builder.prototype.withPath = function(path) {
  this.path = path;
  return this;
};

Builder.prototype.withBodyParameters = function(bodyParameters) {
  this.bodyParameters = bodyParameters;
  return this;
};

Builder.prototype.withHeaders = function(headers) {
  this.headers = headers;
  return this;
=======
Request.prototype.getQueryParameterString = function() {
  var queryParameters = this.getQueryParameters();
  if (queryParameters) {
    return '?' + Object.keys(queryParameters).filter(function (key) {
      return queryParameters[key] !== undefined;
    }).map(function (key) {
      return key + '=' + queryParameters[key];
    }).join('&');
  }
};

Request.prototype.execute = function (method, callback) {
  if (callback) {
    method(this, callback);
    return;
  }
  var _self = this;

  return new Promise(function(resolve, reject) {
    method(_self, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

var Builder = function() {
};

Builder.prototype._setter = function (key) {
  return function (value) {
    this[key] = value;
    return this;
  };
};

Builder.prototype.withHost = Builder.prototype._setter('host');

Builder.prototype.withPort = Builder.prototype._setter('port');

Builder.prototype.withScheme = Builder.prototype._setter('scheme');

Builder.prototype.withPath = Builder.prototype._setter('path');

Builder.prototype._assigner = function (key) {
  return function () {
    for (var i = 0; i < arguments.length; i++) {
      this[key] = this._assign(this[key], arguments[i]);
    }
    return this;
  };
};

Builder.prototype.withQueryParameters = Builder.prototype._assigner('queryParameters');

Builder.prototype.withBodyParameters = Builder.prototype._assigner('bodyParameters');

Builder.prototype.withHeaders = Builder.prototype._assigner('headers');

Builder.prototype.withAuth = function(accessToken) {
  if (accessToken) {
    this.withHeaders(
      {'Authorization' : 'Bearer ' + accessToken}
    );
  }
  return this;
};

Builder.prototype._assign = function(src, obj) {
  if (obj && Object.keys(obj).length > 0) {
    return Object.assign(src || {}, obj);
  }
  return src;
>>>>>>> 9ccbbe21029b626d3f991d3795c43fd1ac045348
};

Builder.prototype.build = function() {
  return new Request(this);
};

module.exports.builder = function() {
  return new Builder();
};
