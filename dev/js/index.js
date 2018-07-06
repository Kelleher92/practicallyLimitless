(function() {
    'use strict';
    const $ = require('jquery');

    $.ajax({
        method: 'POST',
        data: {
            token: token,
            action: '',
            data: null
        },
        url: 'process.php',
        success: function(res) {

        },
        error: function(res) {

        }
    });

})();