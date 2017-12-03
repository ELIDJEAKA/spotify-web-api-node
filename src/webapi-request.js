'use strict';

var Request = require('./base-request');

var DEFAULT_HOST = 'api.spotify.com',
    DEFAULT_PORT = 443,
    DEFAULT_SCHEME = 'https';

<<<<<<< HEAD
module.exports.builder = function() {
  return Request.builder()
      .withHost(DEFAULT_HOST)
      .withPort(DEFAULT_PORT)
      .withScheme(DEFAULT_SCHEME);
};
=======
module.exports.builder = function(accessToken) {
  return Request.builder()
      .withHost(DEFAULT_HOST)
      .withPort(DEFAULT_PORT)
      .withScheme(DEFAULT_SCHEME)
      .withAuth(accessToken);
};
>>>>>>> 9ccbbe21029b626d3f991d3795c43fd1ac045348
