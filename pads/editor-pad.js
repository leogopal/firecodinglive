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

    codeMirror = CodeMirror(
        document.getElementById('editor'),
        {
            lineNumbers: true,
            lineWrapping: true
        }
    );

    firepad = Firepad.fromCodeMirror(
        firepadRef,
        codeMirror,
        {
            userId: userId,
            richTextToolbar: true,
            richTextShortcuts: true,
            defaultText: '<?php $PHPQuestion = true; ?>'
        }
    );

    userList = FirepadUserList.fromDiv(
        firepadRef.child('users'),
        document.getElementById('firepad-userlist'),
        userId
    );

    firepad.on('ready', function () {

        if (firepad.isHistoryEmpty()) {
            firepad.setHtml(
                '<span style="font-size: 24px;">Rich-text editing!</span><br/>\n' +
                '<br/>' +
                '<div style="font-size: 18px">' +
                'Supports:<br/>' +
                '<ul>' +
                '<li>Different ' +
                '<span style="font-family: impact">fonts,</span>' +
                '<span style="font-size: 24px;"> sizes, </span>' +
                '<span style="color: blue">and colors.</span>' +
                '</li>' +
                '<li>' +
                '<b>Bold, </b>' +
                '<i>italic, </i>' +
                '<u>and underline.</u>' +
                '</li>' +
                '<li>Lists' +
                '<ol>' +
                '<li>One</li>' +
                '<li>Two</li>' +
                '</ol>' +
                '</li>' +
                '<li>Undo / redo</li>' +
                '<li>Cursor / selection synchronization.</li>' +
                '<li>And it\'s all fully collaborative!</li>' +
                '</ul>' +
                '</div>');
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
