windowmock.open = function(url, target, settings){

    return {
        addEventListener: function(event, callback){
            if (event == 'compiled'){
                callback({
                    url: 'something.com or whatever youre expecting',
                    originalEvent:{},

                });
            }
        },
        close: function(){}
    }
}