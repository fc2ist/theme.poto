class Generator
  constructor:->
    _generate()

  _generate = ->
    $('[id^=output]').parent().parent().removeClass('in')
    html = _generate_html()
    _generate_css().then((css)->
      _display(html, css)
      $('[rel=generate]').trigger('complete')
    , ->
      $('[rel=generate]').trigger('complete')
      return
    )

  _generate_sns = ->
    output = {}
    input = $('[id^=input-sns]')
    input.each(->
      elem = $(this)
      val = $.trim( elem.val() )
      id = elem.attr('id').match(/\[([^\]]+)\]/)[1]
      output[id] = val
    )
    return output

  _generate_html = ->
    obj =
      'sns': _generate_sns()
      'plugin': _generate_plugin()
    input = $('[id^=input-html]').each(->
      elem = $(this)
      val = elem.val()
      id = elem.attr('id').match(/\[([^\]]+)\]/)[1]
      if id.indexOf('_check') != -1 then return
      if val != '' && $('[id="input-html[' + id + '_check]"]').attr('checked')
        val = '<!--permanent_area-->' + val + '<!--/permanent_area-->';
      obj[id] = val
    )
    template = $('#template-html').text()
    return _render(template, obj)

  _generate_css = ->
    dfd = new $.Deferred()
    template = $.trim( $('#template-css').text() )
    obj = {}
    add = ''
    cnt = 0
    input = $('[id^=input-css]')
    input.each(->
      elem = $(this)
      val = $.trim( elem.val() )
      id = elem.attr('id').match(/\[([^\]]+)\]/)[1]
      if _defaults[id]
        obj[id] = val || _defaults[id]
        if cnt++ >= input.length
          dfd.resolve(_render(template, obj) + add)
      else if id == 'backgroundImage'
        obj[id] = if val != '' then 'background-image: url(' + val + ');\n' else ''
        cnt++
      else if id == 'titleImage'
        if val
          partTemplate = $.trim( $('#template-titleImage').text() )
          _loadImage(val).then((data)->
            add += '\n\n' + _render(partTemplate,
              'url': val,
              'width': data.width,
              'height': data.height
            )
            if ++cnt >= input.length
              dfd.resolve(_render(template, obj) + add)
          , ->
            dfd.reject()
          )
        else
          cnt++
      else if id == 'layout'
        if val != '0'
          add += '\n\n' + $.trim( $('#template-layout-' + val).text() )
        cnt++
    )
    if cnt >= input.length
      dfd.resolve(_render(template, obj) + add)
    return dfd.promise()

  _generate_plugin = ->
    output = {}
    input = $('[id^=input-plugin]')
    input.each(->
      elem = $(this)
      val = $.trim( elem.val() )
      id = elem.attr('id').match(/\[([^\]]+)\]/)[1]
      output[id] = if !elem.attr('checked') then '' else $('#template-plugin-' + id).text()
    )
    return output

  _loadImage = (url)->
    dfd = new $.Deferred()
    img = new Image()
    $(img).on('load', ->
      dfd.resolve(
        'width': img.width,
        'height': img.height
      )
    ).on('error', ->
      dfd.reject()
    )
    img.src = url
    return dfd.promise()

  _render = (str, obj)->
    for k, v of obj
      if typeof v == 'object'
        for ck, cv of v
          regexp = new RegExp( '{{:' + k + '\.' + ck + '}}', 'g' )
          str = str.replace(regexp, cv)
      else
        regexp = new RegExp( '{{:' + k + '}}', 'g' )
        str = str.replace(regexp, v)
    return str

  _display = (html, css)->
    $('[id="output[html]"]').val($.trim(html)).parent().parent().addClass('in')
    $('[id="output[css]"]').val($.trim(css)).parent().parent().addClass('in')

  _defaults =
    'color': '#555555',
    'linkColor': '#FF60AD',
    'linkColorHover': '#55c3b6',
    'backgroundColor': '#fafaf5'

class Cookie
  load: ->
    params = _deparam($.cookie('generator-poto'))
    for k, v of params
      elem = $('[id="' + k + '"]')
      type = elem.attr('type')
      if type == 'checkbox' || type == 'radio'
        elem.attr('checked', 'checked')
      else
        elem.val(v)
        if elem.parent().attr('rel') == 'colorpicker'
          elem.parent().data('color', v)
          elem.next().find('i').css('background-color', v)
    return true

  set: ->
    params = _param( $('[id^=input]') )
    $.cookie('generator-poto', params)

  _param = (elem)->
    params = []
    elem.each(->
      e = $(this)
      id = e.attr('id')
      val = e.val()
      type = e.attr('type')
      if type == 'checkbox' || type == 'radio'
        val = !!e.attr('checked')
      if !val || val == '0' then return
      params.push( id + '=' + encodeURIComponent(val) )
    )
    return params.join('&')

  _deparam = (str)->
    if !str then return {}
    str = decodeURIComponent(str)
    params = {}
    for pair in str.split('&')
      kv = pair.split('=')
      params[kv[0]] = decodeURIComponent(kv[1])
    return params

$(->
  colorExp = new RegExp('^#([A-Za-z0-9]{3}|[A-Za-z0-9]{6})$')
  myCookie = new Cookie()
  myCookie.load()
  $('[rel=generate]').on('click', (event)->
    event.preventDefault()
    $(this).button('loading')
    new Generator()
  ).on('complete', ->
    elem = $(this)
    setTimeout(->
      elem.button('reset')
    , 500)
    myCookie.set()
  )
  $('[id^=output]').on('focus', ->
    $(this).select()
  ).on('mouseup', (event)->
    event.preventDefault()
  )
  $('[rel=colorpicker]').colorpicker()
  .find('input').on('keyup', ->
    elem = $(this)
    parent = elem.parent()
    preview = elem.next().find('i')
    color = elem.val()
    if !colorExp.test(color) then return
    parent.data('color', color)
    preview.css('background-color', color)
  )
)