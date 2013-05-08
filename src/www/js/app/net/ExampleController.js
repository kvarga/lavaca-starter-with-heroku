define(function(require) {

  var ExampleView = require('app/ui/views/ExampleView'),
      TestView = require('app/ui/views/TestView'),
      Controller = require('lavaca/mvc/Controller'),
      Translation = require('lavaca/util/Translation'),
      localStore = require('../cache/localStore'),
      state = require('../cache/models').get('state');

  /**
   * @class app.net.ExampleController
   * @super Lavaca.mvc.Controller
   * Example controller
   */
  var ExampleController = Controller.extend({
    /**
     * @method home
     * Home action, creates a history state and shows a view
     *
     * @param {Object} params  Action arguments
     * @param {Object} model  History state model
     * @return {Lavaca.util.Promise}  A promise
     */
    home: function(params, model) {
      if (!model) {
        model = {};
      }
      return this
        .view(null, ExampleView, model)
        .then(this.history(model, 'Home Page', params.url));
    },
    /**
     * @method lang
     * Switches the user to a specific language
     *
     * @param {Object} params  Action arguments
     * @param {Object} model  History state model
     * @return {Lavaca.util.Promise} A promise
     */
    lang: function(params) {
      var locale = params.locale || 'en_US';
      Translation.setDefault(locale);
      localStore.set('lang', locale);
      this.viewManager.flush();
      state.set('lang', locale);
      return this.redirect('/?lang={0}', [locale]);
    },
    test: function(params, model) {
      if (!model) {
        model = {};
      }
      return this
        .view(null, TestView, model)
        .then(this.history(model, 'Test Page', params.url));
    }
  });

  return ExampleController;

});
