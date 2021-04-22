var firepad = null, userList = null, codeMirror = null;

function joinFirepadForHash() {
    if (firepad) {
        // Clean up.
        firepad.dispose();
        userList.dispose();
        $('.CodeMirror').remove();
    }

    firebase.initializeApp({
        apiKey: 'RvagRBvQY0GOz1CI8sof4hBsCXJQSSRpQEkWS35X',
        authDomain: "firepad-leogopal-default-rtdb.firebaseio.com",
        databaseURL: "https://firepad-leogopal-default-rtdb.firebaseio.com"
    });

    var id = window.location.hash.replace(/#/g, '') || randomString(10);
    var url = window.location.toString().replace(/#.*/, '') + '#' + id;

    var firepadRef = firebase.database().ref('private-pads').child(id);

    var userId = firepadRef.push().key; // Just a random ID.

    // Define an extended mixed-mode that understands vbscript and
    // leaves mustache/handlebars embedded templates in html mode
    var mixedMode = {
        name: "htmlmixed",
        tags: {
            style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
                [null, null, "css"]],
            custom: [[null, null, "customMode"]]
        },
        scriptTypes: [{
            matches: /\/x-handlebars-template|\/x-mustache/i,
            mode: null
        },
            {
                matches: /(text|application)\/(x-)?vb(a|script)/i,
                mode: "vbscript"
            }]
    };

    codeMirror = CodeMirror(
        document.getElementById('firecode'),
        {
            lineNumbers: true,
            mode: mixedMode,
            selectionPointer: true,
            theme: 'material-darker'
        }
    );

    firepad = Firepad.fromCodeMirror(
        firepadRef,
        codeMirror,
        {
            userId: userId,
            defaultText: '<html></html>'
        }
    );

    userList = FirepadUserList.fromDiv(
        firepadRef.child('users'),
        document.getElementById('firepad-userlist'),
        userId
    );

    firepad.on('ready', function () {

        if (firepad.isHistoryEmpty()) {
            firepad.setHtml( '<html></html>');
        }

        ensurePadInList(id);
        buildPadList();
    });

    codeMirror.focus();

    window.location = url;

    $('#url').val(url);
    $("#url").on('click', function (e) {

        $(this).focus().select();
        e.preventDefault();
        return false;

    });
}

function padListEnabled() {

    return (
        typeof localStorage !== 'undefined'
        && typeof JSON !== 'undefined'
        && localStorage.setItem
        && localStorage.getItem
        && JSON.parse
        && JSON.stringify
    );

}

function ensurePadInList(id) {

    if (!padListEnabled()) {
        return;
    }

    var list = JSON.parse(localStorage.getItem('demo-pad-list') || "{ }");
    if (!(id in list)) {
        var now = new Date();
        var year = now.getFullYear(), month = now.getMonth() + 1, day = now.getDate();
        var hours = now.getHours(), minutes = now.getMinutes();
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        list[id] = [year, month, day].join('/') + ' ' + hours + ':' + minutes;

        localStorage.setItem('demo-pad-list', JSON.stringify(list));
        buildPadList();
    }
}

function buildPadList() {
    if (!padListEnabled()) {
        return;
    }
    $('#my-pads-list').empty();

    var list = JSON.parse(localStorage.getItem('demo-pad-list') || '{ }');
    for (var id in list) {
        $('#my-pads-list').append(
            $('<div></div>').addClass('my-pads-item').append(
                makePadLink(id, list[id])
            ));
    }
}

function makePadLink(id, name) {
    return $('<a></a>')
        .text(name)
        .on('click', function () {
            window.location = window.location.toString().replace(/#.*/, '') + '#' + id;
            $('#my-pads-list').hide();
            return false;
        });
}

function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

$(window).on('ready', function () {
    joinFirepadForHash();
    setTimeout(function () {
        $(window).on('hashchange', joinFirepadForHash);
    }, 0);
});
