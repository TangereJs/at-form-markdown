
// *ij* markdown is namespace for markdown functions and objects
// window.markdown object/namespace is initialized in this file

(function (Markdown) {
  'use strict';

  // autogrow function adjusts the size of the text area to match the size of the content
  Markdown.autoGrow = function (textarea) {
    textarea.oninput = function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
      window.scrollTo(window.scrollLeft, (this.scrollTop + this.scrollHeight));
    };

    var inputEvent = document.createEvent('Event');
    inputEvent.initEvent('input', true, true);
    textarea.dispatchEvent(inputEvent);
  };

})(window.Markdown = window.Markdown || {});
