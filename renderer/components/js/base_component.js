org.ekstep.questionunit = org.ekstep.questionunit || {};
org.ekstep.questionunit.baseComponent = {
    playAudio: function (audioObj) {
        EkstepRendererAPI.dispatchEvent('org.ekstep.questionunit:playaudio', audioObj)
    },
    loadImageFromUrl: function (element, imgUrl) {
        EkstepRendererAPI.dispatchEvent('org.ekstep.questionunit:loadimagefromurl', { 'element': element, 'path': imgUrl });
    },
    generateModelTemplate: function () {
        return "<div class='popup' id='image-model-popup' onclick='org.ekstep.questionunit.questionComponent.hideImageModel()'><div class='popup-overlay' onclick='org.ekstep.questionunit.questionComponent.hideImageModel()'></div> \
        <div class='popup-full-body'> \
            <div class='font-lato assess-popup assess-goodjob-popup'> \
                <img class='qc-question-fullimage' src=<%= src %> /> \
                <div onclick='org.ekstep.questionunit.questionComponent.hideImageModel()' class='qc-popup-close-button'>&times;</div> \
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

//# sourceURL=org.ekstep.questionunit.baseComponent.js