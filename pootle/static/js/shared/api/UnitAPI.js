/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import fetch from 'utils/fetch';


const UnitAPI = {

  apiRoot: '/xhr/units/',

  addTranslation(uId, body) {
    return fetch({
      body,
      method: 'POST',
      url: `${this.apiRoot}${uId}`,
    });
  },

  getContext(uId, body) {
    return fetch({
      body,
      url: `${this.apiRoot}${uId}/context/`,
    });
  },

  getTimeline(uId) {
    return fetch({
      url: `${this.apiRoot}${uId}/timeline/`,
    });
  },


  /* Unit suggestions */

  addSuggestion(uId, body) {
    return fetch({
      body,
      method: 'POST',
      url: `${this.apiRoot}${uId}/suggestions/`,
    });
  },

};


export default UnitAPI;
