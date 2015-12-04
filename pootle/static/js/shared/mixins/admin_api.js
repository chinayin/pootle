/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

var _ = require('underscore');


var AdminAPIMixin = {

  initialize: function () {
    this.count = 0;
    this.page = 0;
    this.keywords = '';

    this.on('add', this.incrCount);
    this.on('remove', this.decrCount);
  },

  parse: function (response) {
    this.count = response.count;

    return response.models;
  },

  comparator: '-id',


  /* Methods */

  incrCount: function () {
    this.count++;
  },

  decrCount: function () {
    this.count--;
  },

  fetchNextPage: function (opts) {
    var newPage = this.page + 1;
    var pageData = newPage === 1 ? {} : {p: newPage};
    var keywordsData = this.keywords === '' ? {} : {q: this.keywords};
    var reqData = _.extend({}, pageData, keywordsData);
    var fetchOpts = {remove: false, silent: true, data: reqData};

    _.defaults(fetchOpts, opts);

    return this.fetch(fetchOpts).done(function () {
      this.page = newPage;
    }.bind(this));
  },

  search: function (keywords) {
    var opts = {};
    if (keywords !== this.keywords) {
      this.setSearch(keywords);
      opts = {reset: true};
    }
    return this.fetchNextPage(opts);
  },

  setSearch: function (keywords) {
    this.keywords = keywords;
    this.page = 0;
  },

};


module.exports = AdminAPIMixin;
