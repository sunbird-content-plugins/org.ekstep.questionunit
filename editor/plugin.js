/**
 * Question Unit Base Plugin that declares the interfaces that Question Unit Plugins must define.
 * @class org.ekstep.contenteditor.questionUnitPlugin
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Manoj Chandrashekar <manoj.chandrashekar@tarento.com>
 */
org.ekstep.contenteditor.questionUnitPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.contenteditor.questionUnitPlugin",
  _data: {},
  /**
   * Initialize the plugin
   * Load CKEditor, call beforeInit and beforeInit
   */
  initialize: function () {
    this.beforeInit();
    
    this.afterInit();
  },
  /**
   * Actions to be performed before the question form is rendered.
   * This method may be overridden if HTML actions needs to be binded
   */
  beforeInit: function() {

  },
  /**
   * Actions to be performed after the question form is rendered.
   * This method may be overridden if HTML actions needs to be binded
   */
  afterInit: function() {

  },
  /**
   * Set the question data
   * While editing existing question
   * @param {object} data - question data
   */
  renderForm: function(data) {
    this._data = data;
    var instance = this;
    ecEditor.addEventListener("org.ekstep.questionunit:ready",function(){
      ecEditor.dispatchEvent(instance.manifest.id + ":editquestion",data); 
    });
  },
  /**
   * Set the question to _data.
   * Dispatch event to particular question unit plugin(MCQ/FTB/MTF)
   * @param {function} callback - question plugin validation
   */
  validateForm: function(callback) {
    var instance = this;
    ecEditor.dispatchEvent(this.manifest.id + ":validateform", function(isValid, data) {
      instance._data = data;
      if(_.isFunction(callback)) {
        callback(isValid,data);
      }
    });
  },

  setMedia: function(media, oldMedia){
    var instance = this;
    var mediaObject = {};
    if(media.type == 'default') {
      mediaObject = media.value;
    }
    else if(media.type == 'q' || media.type == 'op' || media.type == 'LHS' || media.type == 'RHS'){
      var mediaObj = {
        "id": Math.floor(Math.random() * 1000000000), // Unique identifier
        "src": org.ekstep.contenteditor.mediaManager.getMediaOriginURL(media.value.assetMedia.src), // Media URL
        "assetId": media.value.assetMedia.id, // Asset identifier
        "type": media.value.assetMedia.type, // Type of asset (image, audio, etc)
        "preload": false // true or false
      };
      mediaObject = mediaObj; 
    }
    else{
      mediaObject = media;
    }
    this._media = mediaObject;
    instance.setAllMedia(mediaObject, oldMedia);
  },

  getMedia: function(key, value){
    var media = {};
    media = _.find(this._allMedia, function(mediaObj) { return mediaObj[key] == value; });
    return media;
  },

  setAllMedia: function(media, oldMedia){
    var instance = this;
    if(_.isUndefined(oldMedia)){
      this._allMedia.push(media);
    }
    else {
      var mediaToBeUpdated = _.find(this._allMedia, function(mediaObj) { return mediaObj.id == oldMedia.id; });
      var updateMediaIndex = _.indexOf(this._allMedia, mediaToBeUpdated);
      if (updateMediaIndex) this._allMedia.splice(updateMediaIndex, 1, media);
    }
    this._allMedia = _.unionBy(this._allMedia, 'assetId');
  },

  getAllMedia: function(){
    return this._allMedia;
  },

  removeMedia: function(key, mediaValue){
    var mediaToBeDeleted = _.find(this._allMedia, function(mediaObj) { return mediaObj[key] == mediaValue; });
    var deleteMediaIndex = _.indexOf(this._allMedia, mediaToBeDeleted);
    if (deleteMediaIndex) this._allMedia.splice(deleteMediaIndex, 1);
  }
});
//# sourceURL=questionUnitPlugin.js