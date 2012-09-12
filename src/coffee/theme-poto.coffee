$(->

  check2Byte = (str)->
    for (var i = 0; i < str.length; i++)
      c = str.charCodeAt(i)
      if !( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4))
        return true
    return false

  post = $('#articles > .post')
  post.children('.body').fc2().eyecatch()
  post.find('> footer a[title]').tooltip()

  $('.alert').alert()
  $('.collapse').collapse()
  $('.carousel').carousel()
  $('[rel=popover]').popover().on('blur', ->
    $(this).popover('hide')
  )
  $('a[rel=tooltip]').tooltip()
  $('a[rel=lightbox]').fc2().lightbox()

  $('#pager').fc2().pager({'range': 9})

  $('.dropdown-toggle').dropdown()

  $('.alert p:not(:empty)').parent().show()

  $('.tape').each(->
    e = $(this)
    if !e.data('tape')
      e.data('tape', true)
      e.wrap('<span class="img-tape"></span>')
  )

  $('#header h1 a, #sidebar .plugin > h3').each(->
    e = $(this)
    str = e.text()
    if check2Byte(str)
      e.css('font-family', $('body').css('font-family'))
  )

  (->
    elem = $('body.type-date #main > h1:eq(0)')
    if elem.length < 1 then return
    str = $.trim( elem.text() )
    year = str.substring(0, 4)
    mon = str.substring(4)
    fmt = year + '-' + mon
    elem.text(fmt)
    document.title = document.title.replace(str, fmt)
  )()
)

$.fc2().scroll()
