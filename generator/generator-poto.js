(function() {
  var Cookie, Generator;

  Generator = (function() {
    var _defaults, _display, _generate, _generate_css, _generate_html, _generate_plugin, _generate_sns, _loadImage, _render;

    function Generator() {
      _generate();
    }

    _generate = function() {
      var html;
      $('[id^=output]').parent().parent().removeClass('in');
      html = _generate_html();
      return _generate_css().then(function(css) {
        _display(html, css);
        return $('[rel=generate]').trigger('complete');
      }, function() {
        $('[rel=generate]').trigger('complete');
      });
    };

    _generate_sns = function() {
      var input, list, loopEnd, loopPos, output, template;
      output = '';
      input = $('[id^=input-sns]').not('[value=""]');
      if (input.length < 1) return '';
      template = $.trim($('#template-sns').text());
      loopPos = template.indexOf('{{loop}}');
      loopEnd = template.indexOf('{{/loop}}', loopPos);
      list = template.substring(loopPos, loopEnd).replace('{{loop}}', '').replace('{{/loop}}', '');
      input.each(function() {
        var elem, id, val;
        elem = $(this);
        val = $.trim(elem.val());
        id = elem.attr('id').match(/\[([^\]]+)\]/)[1];
        return output += _render(list, {
          'icon': id,
          'url': _defaults.sns[id].url.replace('{{:id}}', val),
          'name': _defaults.sns[id].name
        });
      });
      return template.replace('{{loop}}' + list + '{{/loop}}', output);
    };

    _generate_html = function() {
      var input, obj, template;
      obj = {
        'sns': _generate_sns(),
        'plugin': _generate_plugin()
      };
      input = $('[id^=input-html]').each(function() {
        var elem, id, val;
        elem = $(this);
        val = elem.val();
        id = elem.attr('id').match(/\[([^\]]+)\]/)[1];
        if (id.indexOf('_check') !== -1) return;
        if (val !== '' && $('[id="input-html[' + id + '_check]"]').attr('checked')) {
          val = '<!--permanent_area-->' + val + '<!--/permanent_area-->';
        }
        return obj[id] = val;
      });
      template = $('#template-html').text();
      return _render(template, obj);
    };

    _generate_css = function() {
      var add, cnt, dfd, input, obj, template;
      dfd = new $.Deferred();
      template = $.trim($('#template-css').text());
      obj = {};
      add = '';
      cnt = 0;
      input = $('[id^=input-css]');
      input.each(function() {
        var elem, id, partTemplate, val;
        elem = $(this);
        val = $.trim(elem.val());
        id = elem.attr('id').match(/\[([^\]]+)\]/)[1];
        if (_defaults[id]) {
          obj[id] = val || _defaults[id];
          if (cnt++ >= input.length) {
            return dfd.resolve(_render(template, obj) + add);
          }
        } else if (id === 'backgroundImage') {
          obj[id] = val !== '' ? 'background-image: url(' + val + ');\n' : '';
          return cnt++;
        } else if (id === 'titleImage') {
          if (val) {
            partTemplate = $.trim($('#template-titleImage').text());
            return _loadImage(val).then(function(data) {
              add += '\n\n' + _render(partTemplate, {
                'url': val,
                'width': data.width,
                'height': data.height
              });
              if (++cnt >= input.length) {
                return dfd.resolve(_render(template, obj) + add);
              }
            }, function() {
              return dfd.reject();
            });
          } else {
            return cnt++;
          }
        } else if (id === 'layout') {
          if (val !== '0') {
            add += '\n\n' + $.trim($('#template-layout-' + val).text());
          }
          return cnt++;
        }
      });
      if (cnt >= input.length) dfd.resolve(_render(template, obj) + add);
      return dfd.promise();
    };

    _generate_plugin = function() {
      var input, output;
      output = {};
      input = $('[id^=input-plugin]');
      input.each(function() {
        var elem, id, val;
        elem = $(this);
        val = $.trim(elem.val());
        id = elem.attr('id').match(/\[([^\]]+)\]/)[1];
        return output[id] = !elem.attr('checked') ? '' : $('#template-plugin-' + id).text();
      });
      return output;
    };

    _loadImage = function(url) {
      var dfd, img;
      dfd = new $.Deferred();
      img = new Image();
      $(img).on('load', function() {
        return dfd.resolve({
          'width': img.width,
          'height': img.height
        });
      }).on('error', function() {
        return dfd.reject();
      });
      img.src = url;
      return dfd.promise();
    };

    _render = function(str, obj) {
      var ck, cv, k, regexp, v;
      for (k in obj) {
        v = obj[k];
        console.log(typeof v);
        if (typeof v === 'object') {
          for (ck in v) {
            cv = v[ck];
            regexp = new RegExp('{{:' + k + '\.' + ck + '}}', 'g');
            str = str.replace(regexp, cv);
          }
        } else {
          regexp = new RegExp('{{:' + k + '}}', 'g');
          str = str.replace(regexp, v);
        }
      }
      return str;
    };

    _display = function(html, css) {
      $('[id="output[html]"]').val($.trim(html)).parent().parent().addClass('in');
      return $('[id="output[css]"]').val($.trim(css)).parent().parent().addClass('in');
    };

    _defaults = {
      'color': '#555555',
      'linkColor': '#f89406',
      'linkColorHover': '#555555',
      'backgroundColor': 'white',
      'sns': {
        'twitter': {
          'name': 'Twitter',
          'url': 'https://twitter.com/{{:id}}'
        },
        'facebook': {
          'name': 'Facebook',
          'url': 'http://www.facebook.com/{{:id}}'
        },
        'google_plus': {
          'name': 'Google+',
          'url': 'https://plus.google.com/{{:id}}'
        },
        'flickr': {
          'name': 'Flickr',
          'url': 'http://www.flickr.com/{{:id}}'
        },
        'instagram': {
          'name': 'Instagram',
          'url': 'http://web.stagram.com/n/{{:id}}'
        },
        'youtube': {
          'name': 'YouTube',
          'url': 'http://www.youtube.com/{{:id}}'
        },
        'pinterest': {
          'name': 'Pinterest',
          'url': 'http://pinterest.com/{{:id}}'
        },
        'github': {
          'name': 'Github',
          'url': 'https://github.com/{{:id}}'
        }
      }
    };

    return Generator;

  })();

  Cookie = (function() {
    var _deparam, _param;

    function Cookie() {}

    Cookie.prototype.load = function() {
      var elem, k, params, type, v;
      params = _deparam($.cookie('generator-doti'));
      for (k in params) {
        v = params[k];
        elem = $('[id="' + k + '"]');
        type = elem.attr('type');
        if (type === 'checkbox' || type === 'radio') {
          elem.attr('checked', 'checked');
        } else {
          elem.val(v);
          if (elem.parent().attr('rel') === 'colorpicker') {
            elem.parent().data('color', v);
            elem.next().find('i').css('background-color', v);
          }
        }
      }
      return true;
    };

    Cookie.prototype.set = function() {
      var params;
      params = _param($('[id^=input]'));
      return $.cookie('generator-doti', params);
    };

    _param = function(elem) {
      var params;
      params = [];
      elem.each(function() {
        var e, id, type, val;
        e = $(this);
        id = e.attr('id');
        val = e.val();
        type = e.attr('type');
        if (type === 'checkbox' || type === 'radio') val = !!e.attr('checked');
        if (!val || val === '0') return;
        return params.push(id + '=' + encodeURIComponent(val));
      });
      return params.join('&');
    };

    _deparam = function(str) {
      var kv, pair, params, _i, _len, _ref;
      if (!str) return {};
      str = decodeURIComponent(str);
      params = {};
      _ref = str.split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pair = _ref[_i];
        kv = pair.split('=');
        params[kv[0]] = decodeURIComponent(kv[1]);
      }
      return params;
    };

    return Cookie;

  })();

  $(function() {
    var colorExp, myCookie;
    colorExp = new RegExp('^#([A-Za-z0-9]{3}|[A-Za-z0-9]{6})$');
    myCookie = new Cookie();
    myCookie.load();
    $('[rel=generate]').on('click', function(event) {
      event.preventDefault();
      $(this).button('loading');
      return new Generator();
    }).on('complete', function() {
      var elem;
      elem = $(this);
      setTimeout(function() {
        return elem.button('reset');
      }, 500);
      return myCookie.set();
    });
    $('[id^=output]').on('focus', function() {
      return $(this).select();
    }).on('mouseup', function(event) {
      return event.preventDefault();
    });
    return $('[rel=colorpicker]').colorpicker().find('input').on('keyup', function() {
      var color, elem, parent, preview;
      elem = $(this);
      parent = elem.parent();
      preview = elem.next().find('i');
      color = elem.val();
      if (!colorExp.test(color)) return;
      parent.data('color', color);
      return preview.css('background-color', color);
    });
  });

}).call(this);
