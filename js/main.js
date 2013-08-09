(function () {
    'use strict';

    $(document).ready(function (e) {
        new Editor($('#document'));
    });

    function Editor(doc) {
        this.down = [];
        this.doc = doc;
        this.setBindings();
    }

    Editor.prototype.setBindings = function () {
        // 16: SHIFT, 17: CTRL, 18: ALT, 91: SUPER
        $(document).keydown(function (e) {
            this.down[e.keyCode] = true;
        }.bind(this));

        $(document).keyup(function (e) {
            if (this.down[17] && this.down[18]) {
                if      (this.down[66]) this.doCommand('bold');                // B
                else if (this.down[73]) this.doCommand('italic');              // I
                else if (this.down[49]) this.doCommand('formatBlock', '<H1>'); // 1
                else if (this.down[50]) this.doCommand('formatBlock', '<H2>'); // 2
                else if (this.down[51]) this.doCommand('formatBlock', '<H3>'); // 3
                else if (this.down[52]) this.doCommand('formatBlock', '<H4>'); // 4
                else if (this.down[53]) this.doCommand('formatBlock', '<H5>'); // 5
                else if (this.down[54]) this.doCommand('formatBlock', '<H6>'); // 6
                else if (this.down[75]) this.doCommand('removeFormat');        // K
                else if (this.down[90]) this.doCommand('undo');                // R
                else if (this.down[82]) this.doCommand('redo');                // Z
                else if (this.down[83]) this.save(this.doc.html());            // S
            }

            this.down[e.keyCode] = false;
        }.bind(this));
    };

    Editor.prototype.doCommand = function (command, argument) {
      document.execCommand(command, false, argument);
    };

    Editor.prototype.save = function (text) {
        window.open().document.write(text);
    };
})();