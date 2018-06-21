/**
 * Question Unit Base Plugin that declares the interfaces that Question Unit Plugins must define.
 * @class org.ekstep.contenteditor.questionUnitPlugin
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Manoj Chandrashekar <manoj.chandrashekar@tarento.com>
 */
org.ekstep.contenteditor.questionUnitPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.contenteditor.questionUnitPlugin",
  _data: {},
  initialize: function () {
    this.beforeInit();
    if(this.manifest.id == 'org.ekstep.questionunit') {
  	  CKEDITOR.basePath = ecEditor.resolvePluginResource(this.manifest.id, this.manifest.ver, "editor/libs/ck-editor/");
    }
    this.afterInit();
  },
  beforeInit: function() {

  },
  afterInit: function() {

  },
  renderForm: function(data) {
    this._data = data;
  },
  validateForm: function(callback) {
    var instance = this;
    ecEditor.dispatchEvent(this.manifest.id + ":validateform", function(isValid, data) {
      instance.__proto__.__proto__._data = data;
      if(_.isFunction(callback)) {
        callback(isValid);
      }
    });
  }
});
//# sourceURL=questionUnitPlugin.js