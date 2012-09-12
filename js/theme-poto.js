$(function() {

  function check2Byte(str) { 
    for (var i = 0; i < str.length; i++) { 
      var c = str.charCodeAt(i);
      if ( !( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) )
        return true
    } 
    return false; 
  }
  
  $('.dropdown-toggle').dropdown();
  
  $('.alert p:not(:empty)').parent().show();

  $('.tape').each(function() {
	  var e = $(this);
    if (!e.data('tape')) {
      e.data('tape', true);
      e.wrap('<span class="img-tape"></span>');
    }
  });

  $('#pager').fc2().pager({'range':9});
  $('#articles > .post > .body').fc2().eyecatch();

  $('#header h1 a, #sidebar .plugin > h3').each(function() {
    e = $(this);
    str = e.text()
    if ( check2Byte(str) ) {
      e.css('font-family', '"\u30d2\u30e9\u30ae\u30ce\u89d2\u30b4 Pro W3", "Hiragino Kaku Gothic Pro", "\u30e1\u30a4\u30ea\u30aa", Meiryo, Osaka, "\uff2d\uff33 \uff30\u30b4\u30b7\u30c3\u30af", "MS PGothic", sans-serif');
    }
  });

});

$.fc2().scroll();
