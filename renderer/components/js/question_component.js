org.ekstep.contentrenderer.questionunitComponents = org.ekstep.contentrenderer.questionunitComponents || {};
org.ekstep.contentrenderer.questionunitComponents.questionComponent = {
    generateQuestionComponent: function () {
        return '\
        <div class="question-container">\
        <% if(question.data.question.image || question.data.question.audio){ %> \
            <div class="image-container">\
            <% if(question.data.question.image){ %> \
                <img onclick="org.ekstep.contentrenderer.questionunitComponents.questionComponent.showImageModel(event, \'<%= question.data.question.image %>\')" class="q-image" src="<%= question.data.question.image %>" />\
                <img onclick=QuestionUnitRendererController.pluginInstance.playAudio({src:"<%= question.data.question.audio %>"}) class="audio" src="<%= QuestionUnitRendererController.pluginInstance.getAudioIcon("renderer/assets/audio-icon.png") %>" />\
            <% }else { %>\
              <img onclick=QuestionUnitRendererController.pluginInstance.playAudio({src:"<%= question.data.question.audio %>"}) class="audio no-q-image" src="<%= QuestionUnitRendererController.pluginInstance.getAudioIcon("renderer/assets/audio-icon.png") %>" />\
            <% } %>\
            </div>\
        <% } %>\
            <div class="hiding-container">\
                <div class="expand-container <% if(question.data.question.image || question.data.question.audio){ %> with-media <% } %>">\
                <%= question.data.question.text %>\
                </div>\
            </div>\
            <div class="expand-button" onclick="org.ekstep.contentrenderer.questionunitComponents.questionComponent.toggleQuestionText()">\
                <img src="<%= QuestionUnitRendererController.pluginInstance.getAudioIcon("renderer/assets/down_arrow.png") %>" />\
            </div>\
        </div>\
        ';
    },
    isQuestionTextOverflow: function () {
        setTimeout(function () {
            if ($('.hiding-container').height() > $('.expand-container').height()) {
                $('.expand-button').css('display', 'none');
            } else {
                $('.expand-button').css('display', 'block');
            }
        }, 1000)
    },
    toggleQuestionText: function () {
        if ($('.hiding-container').hasClass('expanded')) {
            $('.hiding-container').css('height', '50%');
            $('.hiding-container').removeClass('expanded')
            $(".expand-button img").toggleClass('flip');
            $('.hiding-container').css('padding-bottom', '0px');
            $('.expand-button').css('bottom', '5%');
        } else {
            var expandButtonBottom = parseFloat($('.expand-button').css('bottom'));
            $('.hiding-container').addClass('expanded')
            $('.hiding-container').css('height', 'auto');
            $(".expand-button img").toggleClass('flip');
            $('.hiding-container').css('padding-bottom', $(".expand-button").height() + 'px');
            expandButtonBottom = expandButtonBottom - ($('.hiding-container').height() - $('.question-container').height());
            $('.expand-button').css('bottom', expandButtonBottom + 'px')
        }
    },
    onDomReady: function () {
        this.isQuestionTextOverflow();
    },
    generateModelTemplate: function(){
        return "<div class='popup' id='image-model-popup' onclick='org.ekstep.contentrenderer.questionunitComponents.questionComponent.hideImageModel()'><div class='popup-overlay' onclick='org.ekstep.contentrenderer.questionunitComponents.questionComponent.hideImageModel()'></div> \
        <div class='popup-full-body'> \
            <div class='font-lato assess-popup assess-goodjob-popup'> \
                <img class='qc-question-fullimage' src=<%= src %> /> \
                <div onclick='org.ekstep.contentrenderer.questionunitComponents.questionComponent.hideImageModel()' class='qc-popup-close-button'>&times;</div> \
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
            $(QuestionUnitRendererController.constant.qContainerElement).append(templateData);
        }
    },
    hideImageModel: function () {
        $("#image-model-popup").remove();
    }
}