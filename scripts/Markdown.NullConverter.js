
; (function () {
  'use strict';

  function identity(x) { return x; }
  function returnFalse(x) { return false; }

  function HookCollection() { }

  HookCollection.prototype = {

    chain: function (hookname, func) {
      var original = this[hookname];
      if (!original)
        throw new Error("unknown hook " + hookname);

      if (original === identity)
        this[hookname] = func;
      else
        this[hookname] = function (text) {
          var args = Array.prototype.slice.call(arguments, 0);
          args[0] = original.apply(null, args);
          return func.apply(null, args);
        };
    },
    set: function (hookname, func) {
      if (!this[hookname])
        throw new Error("unknown hook " + hookname);
      this[hookname] = func;
    },
    addNoop: function (hookname) {
      this[hookname] = identity;
    },
    addFalse: function (hookname) {
      this[hookname] = returnFalse;
    }
  };

  Markdown.HookCollection = HookCollection;

  Markdown.NullConverter = function (options) {
    var pluginHooks = this.hooks = new HookCollection();

    // given a URL that was encountered by itself (without markup), should return the link text that's to be given to this link
    pluginHooks.addNoop("plainLinkText");

    // called with the orignal text as given to makeHtml. The result of this plugin hook is the actual markdown source that will be cooked
    pluginHooks.addNoop("preConversion");

    // called with the text once all normalizations have been completed (tabs to spaces, line endings, etc.), but before any conversions have
    pluginHooks.addNoop("postNormalization");

    // Called with the text before / after creating block elements like code blocks and lists. Note that this is called recursively
    // with inner content, e.g. it's called with the full text, and then only with the content of a blockquote. The inner
    // call will receive outdented text.
    pluginHooks.addNoop("preBlockGamut");
    pluginHooks.addNoop("postBlockGamut");

    // called with the text of a single block element before / after the span-level conversions (bold, code spans, etc.) have been made
    pluginHooks.addNoop("preSpanGamut");
    pluginHooks.addNoop("postSpanGamut");

    // called with the final cooked HTML code. The result of this plugin hook is the actual output of makeHtml
    pluginHooks.addNoop("postConversion");

    this.makeHtml = function (text, conversionCompleteCb) {
      var convertedText = text;
      setTimeout(function () {
        conversionCompleteCb(convertedText);
      }, 100);
    }
  }
})(window.Markdown = window.Markdown || {});
