(($)->

  $.fn.lettering = (len)->
    this.each(->
      elem = $(this)
      text = elem.text()
      div = $('<div/>')
      for i in [0..text.length]
        $('<span>').text( text.charAt(i) )
        .attr( 'class', 'char' + (i % len + 1) ).appendTo(div)
      elem.html( div.html() )
      div.remove()
    )

  $(->

    $('#header h1 a').lettering(7)

  )

)(jQuery)