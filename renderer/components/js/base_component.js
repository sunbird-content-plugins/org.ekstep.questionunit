org.ekstep.contentrenderer.questionunit = org.ekstep.contentrenderer.questionunit || {};
org.ekstep.contentrenderer.questionunit.baseComponent = {
    playAudio: function (audioObj) {
        EkstepRendererAPI.dispatchEvent('org.ekstep.contentrenderer.questionunit:playaudio', audioObj)
    },
    getIcon: function (elementId, iconUrl) {
        EkstepRendererAPI.dispatchEvent('org.ekstep.contentrenderer.questionunit:geticon', { 'elementId': elementId, 'path': iconUrl });
    },
    generateModelTemplate: function(){
        return "<div class='popup' id='image-model-popup' onclick='org.ekstep.contentrenderer.questionunit.questionComponent.hideImageModel()'><div class='popup-overlay' onclick='org.ekstep.contentrenderer.questionunit.questionComponent.hideImageModel()'></div> \
        <div class='popup-full-body'> \
            <div class='font-lato assess-popup assess-goodjob-popup'> \
                <img class='qc-question-fullimage' src=<%= src %> /> \
                <div onclick='org.ekstep.contentrenderer.questionunit.questionComponent.hideImageModel()' class='qc-popup-close-button'>&times;</div> \
            </div>\
        </div>"
    },
    showImageModel: function (event, imageSrc) {
        if (imageSrc) {
            var modelTemplate = this.generateModelTemplate();
            var template = _.template(modelTemplate);
            var templateData = template({
                src: imageSrc
            })
            $('.question-content-container').append(templateData);
        }
    },
    hideImageModel: function () {
        $("#image-model-popup").remove();
    }

}

//# sourceURL=org.ekstep.contentrenderer.questionunit.baseComponent.js