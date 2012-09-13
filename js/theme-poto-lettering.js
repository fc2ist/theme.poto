
(function($) {
  $.fn.lettering = function(len) {
    return this.each(function() {
      var div, elem, i, text, _i, _ref;
      elem = $(this);
      text = elem.text();
      div = $('<div/>');
      for (i = _i = 0, _ref = text.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        $('<span>').text(text.charAt(i)).attr('class', 'char' + (i % len + 1)).appendTo(div);
      }
      elem.html(div.html());
      return div.remove();
    });
  };
  return $(function() {
    return $('#header h1 a').lettering(7);
  });
})(jQuery);
