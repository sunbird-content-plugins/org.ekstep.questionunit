org.ekstep.questionunit = org.ekstep.questionunit || {};
org.ekstep.questionunit.backgroundComponent = {
    settings: {
        bgColors: ["#5DC4F5", "#FF7474", "#F9A817", "#48DCB6", "#5B6066"],
        bgColor: "#5DC4F5"
    },
    getBackgroundGraphics: function () {
        org.ekstep.questionunit.backgroundComponent.settings.bgColor = org.ekstep.questionunit.backgroundComponent.settings.bgColors[_.random(0, org.ekstep.questionunit.backgroundComponent.settings.bgColors.length - 1)];
        return '\
            <div class="bg-graphics" style="background-color:<%= org.ekstep.questionunit.backgroundComponent.settings.bgColor %>">\
                <div class="bg-circle circle-left" style="top:<%= _.random(-6, 6)*10%>vh" ></div ><div class="bg-circle circle-right" style="top:<%= _.random(-6, 6)*10%>vh"></div>\
            </div >'
    }
};
