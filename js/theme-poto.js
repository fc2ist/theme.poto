/*! theme-poto - v1.0.0 - 2012-09-14
* Copyright (c) 2012 moi; Licensed MIT */


$(function() {
  var check2Byte, post;
  check2Byte = function(str) {
    var c, i, _i, _ref;
    for (i = _i = i, _ref = str.length; i <= _ref ? _i <= _ref : _i >= _ref; i = i <= _ref ? ++_i : --_i) {
      c = str.charCodeAt(i);
      if (!((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4))) {
        return true;
      }
    }
    return false;
  };
  post = $('#articles > .post');
  post.children('.body').fc2().eyecatch();
  post.find('> footer a[title]').tooltip();
  $('.alert').alert();
  $('.collapse').collapse();
  $('.carousel').carousel();
  $('[rel=popover]').popover().on('blur', function() {
    return $(this).popover('hide');
  });
  $('a[rel=tooltip]').tooltip();
  $('a[rel=lightbox]').fc2().lightbox();
  $('#pager').fc2().pager({
    'range': 9
  });
  $('.dropdown-toggle').dropdown();
  $('.alert p:not(:empty)').parent().show();
  $('.tape').each(function() {
    var e;
    e = $(this);
    if (!e.data('tape')) {
      e.data('tape', true);
      return e.wrap('<span class="img-tape"></span>');
    }
  });
  $('#header h1 a, #sidebar .plugin > h3').each(function() {
    var e, str;
    e = $(this);
    str = e.text();
    if (check2Byte(str)) {
      return e.css('font-family', $('body').css('font-family'));
    }
  });
  return (function() {
    var elem, fmt, mon, str, year;
    elem = $('body.type-date #main > h1:eq(0)');
    if (elem.length < 1) {
      return;
    }
    str = $.trim(elem.text());
    year = str.substring(0, 4);
    mon = str.substring(4);
    fmt = year + '-' + mon;
    elem.text(fmt);
    return document.title = document.title.replace(str, fmt);
  })();
});

$.fc2().scroll();
