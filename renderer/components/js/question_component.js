org.ekstep.questionunit = org.ekstep.questionunit || {};
org.ekstep.questionunit.questionComponent = {
    generateQuestionComponent: function () {
        return '\
        <div class="question-container">\
        <% if(question.data.question.image || question.data.question.audio){ %> \
            <div class="image-container">\
            <% if(question.data.question.image){ %> \
                <img onclick="org.ekstep.questionunit.questionComponent.showImageModel(event, \'<%= question.data.question.image %>\')" class="q-image" src="<%= question.data.question.image %>" />\
                <img onclick="org.ekstep.questionunit.questionComponent.playAudio({src:\'<%= question.data.question.audio %>\'})" class="audio" src=""  id="org-ekstep-contentrenderer-questionunit-questionComponent-AudioImg" />\
            <% }else { %>\
                <img onclick="org.ekstep.questionunit.questionComponent.playAudio({src:\'<%= question.data.question.audio %>\'})" class="audio no-q-image" src="" id="org-ekstep-contentrenderer-questionunit-questionComponent-AudioImg"/>\
            <% } %>\
            </div>\
        <% } %>\
            <div class="hiding-container">\
                <div class="expand-container <% if(question.data.question.image || question.data.question.audio){ %> with-media <% } %>">\
                <%= question.data.question.text %>\
                </div>\
            </div>\
            <div class="expand-button" onclick="org.ekstep.questionunit.questionComponent.toggleQuestionText()">\
                <img src="" id="org-ekstep-contentrenderer-questionunit-questionComponent-downArwImg"/>\
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
        org.ekstep.questionunit.questionComponent.loadImageFromUrl($('#org-ekstep-contentrenderer-questionunit-questionComponent-downArwImg'), 'renderer/assets/down_arrow.png');
        org.ekstep.questionunit.questionComponent.loadImageFromUrl($('#org-ekstep-contentrenderer-questionunit-questionComponent-AudioImg'), 'renderer/assets/audio-icon.png');
    }
}
jQuery.extend(org.ekstep.questionunit.questionComponent, org.ekstep.questionunit.baseComponent);
//# sourceURL=org.ekstep.questionunit.questionComponent.js