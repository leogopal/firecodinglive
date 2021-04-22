var pads = {
    'editor': {
        create: function (div, ref) {
            var codeMirror = CodeMirror(
                div, {
                    lineWrapping: true,
                    mode: ''
                }
            );

            var userId = Math.floor(Math.random() * 9999999999).toString();
            this.firepadUserList = FirepadUserList.fromDiv(ref.child('users'), div, userId);

            this.firepad = Firepad.fromCodeMirror(
                ref,
                codeMirror, {
                    richTextToolbar: true,
                    richTextShortcuts: true,
                    userId: userId
                }
            );

            var self = this;
            this.firepad.on('ready', function () {
                if (self.firepad.isHistoryEmpty()) {
                    self.firepad.setHtml(
                        '<span style="font-size: 24px;">Rich-text editing     with <span style="color: red">Firepad!</span></span><br/>\n' +
                        '<div style="font-size: 14px">' +
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
            });
        },
        dispose: function () {
            this.firepad.dispose();
            this.firepadUserList.dispose();
        }
    },
    'php': {
        create: function (div, ref) {
            var codeMirror = CodeMirror(
                div, {
                    lineNumbers: true,
                    matchBrackets: true,
                    mode: "application/x-httpd-php",
                    indentUnit: 4,
                    indentWithTabs: true,
                    theme: 'material-darker'
                }
            );

            var userId = Math.floor(Math.random() * 9999999999).toString();
            this.firepadUserList = FirepadUserList.fromDiv(ref.child('users'), div, userId);

            this.firepad = Firepad.fromCodeMirror(
                ref,
                codeMirror, {
                    userId: userId
                }
            );

            var self = this;
            this.firepad.on('ready', function () {
                if (self.firepad.isHistoryEmpty()) {
                    self.firepad.setHtml(
                        '<span style="font-size: 24px;">Rich-text editing     with <span style="color: red">Firepad!</span></span><br/>\n' +
                        '<div style="font-size: 14px">' +
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
            });
        },
        dispose: function () {
            this.firepad.dispose();
            this.firepadUserList.dispose();
        }
    },
    'javascript': {
        create: function (div, ref) {

            var codeMirror = CodeMirror(div,
                {
                    lineWrapping: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    mode: "javascript",
                    indentUnit: 4,
                    indentWithTabs: true,
                    theme: 'material-darker'
                });

            var userId = Math.floor(Math.random() * 9999999999).toString();
            this.firepadUserList = FirepadUserList.fromDiv(ref.child('users'), div, userId);

            this.firepad = Firepad.fromCodeMirror(
                ref,
                codeMirror, {
                    userId: userId,
                }
            );

            var self = this;
            this.firepad.on('ready', function () {
                if (self.firepad.isHistoryEmpty()) {
                    self.firepad.setText('// JavaScript Editing with Firepad!\nfunction go() {\n  var message = "Hello, world.";\n  console.log(message);\n}');
                }
            });
        },
        dispose: function () {
            this.firepad.dispose();
            this.firepadUserList.dispose();
        }
    },
    'css': {
        create: function (div, ref) {
            var codeMirror = CodeMirror(
                div,
                {
                    lineNumbers: true,
                    matchBrackets: true,
                    mode: "text/css",
                    indentUnit: 4,
                    indentWithTabs: true,
                    extraKeys: {"Ctrl-Space": "autocomplete"},
                    theme: 'material-darker'
                }
            );

            var userId = Math.floor(Math.random() * 9999999999).toString();
            this.firepadUserList = FirepadUserList.fromDiv(ref.child('users'), div, userId);

            this.firepad = Firepad.fromCodeMirror(
                ref,
                codeMirror, {
                    userId: userId
                }
            );

            var self = this;
            this.firepad.on('ready', function () {
                if (self.firepad.isHistoryEmpty()) {
                    self.firepad.setText('body {}');
                }
            });
        },
        dispose: function () {
            this.firepad.dispose();
            this.firepadUserList.dispose();
        }
    },
    'markdown': {
        create: function (div, ref) {
            var codeMirror = CodeMirror(
                div,
                {
                    mode: {
                        name: "gfm",
                        tokenTypeOverrides: {
                            emoji: "emoji"
                        }
                    },
                    lineNumbers: true,
                    theme: 'material-darker'
                }
            );

            var userId = Math.floor(Math.random() * 9999999999).toString();
            this.firepadUserList = FirepadUserList.fromDiv(ref.child('users'), div, userId);

            this.firepad = Firepad.fromCodeMirror(
                ref,
                codeMirror, {
                    userId: userId
                }
            );

            var self = this;
            this.firepad.on('ready', function () {
                if (self.firepad.isHistoryEmpty()) {
                    self.firepad.setHtml();
                }
            });
        },
        dispose: function () {
            this.firepad.dispose();
            this.firepadUserList.dispose();
        }
    },
    'html': {
        create: function (div, ref) {
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

            var codeMirror = CodeMirror(
                div, {
                    lineWrapping: true,
                    mode: mixedMode,
                    theme: 'material-darker',
                }
            );

            var userId = Math.floor(Math.random() * 9999999999).toString();
            this.firepadUserList = FirepadUserList.fromDiv(ref.child('users'), div, userId);

            this.firepad = Firepad.fromCodeMirror(
                ref,
                codeMirror, {
                    selectionPointer: true,
                    userId: userId
                }
            );

            var self = this;
            this.firepad.on('ready', function () {
                if (self.firepad.isHistoryEmpty()) {
                    self.firepad.setHtml(
                        '<span style="font-size: 24px;">Rich-text editing     with <span style="color: red">Firepad!</span></span><br/>\n' +
                        '<div style="font-size: 14px">' +
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
            });
        },
        dispose: function () {
            this.firepad.dispose();
            this.firepadUserList.dispose();
        }
    },
    'userlist': {
        create: function (div, ref) {
            var codeMirror = CodeMirror(
                div, {
                    lineWrapping: true,
                    mode: '',
                    theme: 'monokai'
                }
            );

            var userId = Math.floor(Math.random() * 9999999999).toString();

            this.firepadUserList = FirepadUserList.fromDiv(
                ref.child('users'),
                div,
                userId
            );

            this.firepad = Firepad.fromCodeMirror(
                ref,
                codeMirror, {
                    richTextToolbar: true,
                    richTextShortcuts: true,
                    userId: userId
                }
            );


            var self = this;
            this.firepad.on('ready', function () {
                if (self.firepad.isHistoryEmpty()) {
                    self.firepad.setText('Check out the user list to the left!');
                }
            });
        },
        dispose: function () {
            this.firepad.dispose();
            this.firepadUserList.dispose();
        }
    }
};

var currentId;

$(window).on('ready', function () {

    var firebaseConfig = {
        apiKey: "AIzaSyAaA7QkqCKBlmT-cU3DyVXYAp5t-Pkfggk",
        authDomain: "firecodelive.firebaseapp.com",
        databaseURL: "https://firecodelive-default-rtdb.firebaseio.com",
        projectId: "firecodelive",
        storageBucket: "firecodelive.appspot.com",
        messagingSenderId: "694520542067",
        appId: "1:694520542067:web:fd0780aae5aa24b7558b06",
        measurementId: "G-4DKK2YPLF6"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    for (var pad in pads) {
        addClickHandler(pad);
    }

    initializePadsFromUrl();

    setTimeout(function () {
        $(window).on('hashchange', initializePadsFromUrl);
    }, 0);
});


function initializePadsFromUrl() {
    var info = getPadAndIdFromUrl();

    var newId = info.id || randomString(10);

    if (newId !== currentId) {
        currentId = newId;
        initializePads(currentId);
    }

    var pad = (pads[info.pad] != null) ? info.pad : '';
    scrollToExample(pad);

    window.location = './#' + pad + '-' + currentId;

}

function getPadAndIdFromUrl() {
    var hash = window.location.hash.replace(/#/g, '') || '';
    var parts = hash.split('-');
    return {pad: parts[0], id: parts[1]};
}

var initialized = false;

function initializePads(id) {
    var ref = firebase.database().ref('pads').child(id);

    for (var pad in pads) {
        var $div = $('#' + pad + ' .pad-container');
        if (initialized) {
            pads[pad].dispose();
            $div.empty();
        }

        pads[pad].create($div.get(0), ref.child(pad));
    }
    initialized = true;
}

function addClickHandler(pad) {
    $('#' + pad + '-link').on('click', function () {
        window.location = './#' + pad + '-' + currentId;
        return false;
    });
}

function scrollToPad(pad) {
    if (pad) {
        var scrollTo = pad ? ($('#' + pad).offset().top - 20) : 0;
        $('html, body').scrollTop(scrollTo);
    }
}

function randomString(length) {
    var text = "firelg";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
