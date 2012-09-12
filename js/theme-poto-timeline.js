var listPager;

listPager = (function() {
  var _build, _change;

  function listPager(target, range) {
    this.target = target;
    this.range = range != null ? range : 10;
    if (this.target.length < 1) {
      return;
    }
    _build.apply(this);
  }

  _build = function() {
    var c, i, self, wrap, _i, _ref;
    self = this;
    wrap = $('<div class="pagination" />').insertAfter(this.target.parent());
    this.pager = $('<ul />').appendTo(wrap).off('click', 'a').on('click', 'a', function(event) {
      event.preventDefault();
      return _change.apply(self, [$(this).text() - 0]);
    });
    this.total = Math.ceil(this.target.length / this.range);
    this.current = -1;
    for (i = _i = 1, _ref = this.total; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
      c = i === 1 ? ' class="active"' : '';
      $('<li' + c + '><a href="javascript:;">' + i + '</a></li>').appendTo(this.pager);
    }
    return _change.apply(self, [1]);
  };

  _change = function(page) {
    var range;
    if (this.current === page) {
      return;
    }
    this.current = page;
    range = this.range;
    this.target.addClass('inv').fadeOut(200).filter(function(n) {
      if (n < page * range && n >= (page - 1) * range) {
        return true;
      }
      return false;
    }).removeClass('inv').fadeIn(200);
    this.pager.children('li.active').removeClass('active');
    this.pager.children('li').eq(page - 1).addClass('active');
    return this.target.parent().trigger('changed');
  };

  return listPager;

})();

$(function() {
  var articles, f, reaction, switchTimeline, timeline;
  reaction = $('.reaction .articles');
  articles = reaction.children('article');
  reaction.on('changed', function() {
    if (!timeline) {
      return;
    }
    $(this).masonry('reload');
    return articles.each(function() {
      var e;
      e = $(this);
      if (e.css('left') === '0px') {
        return e.addClass('left').removeClass('right');
      } else {
        return e.addClass('right').removeClass('left');
      }
    });
  });
  new listPager(articles);
  timeline = false;
  switchTimeline = function() {
    if ($(window).width() > 767) {
      if (timeline) {
        return;
      }
      timeline = true;
      reaction.addClass('timeline');
      articles.css('width', Math.floor(reaction.width() / 2) - 30);
      return reaction.masonry({
        'itemSelector': 'article:not(.inv)'
      }).trigger('changed');
    } else if (timeline) {
      articles.css('width', 'auto');
      reaction.removeClass('timeline').masonry('destroy');
      return timeline = false;
    }
  };
  $(window).on('resize', f = function() {
    f.i = f.i || 0;
    if (f.i++ % 2) {
      return;
    }
    return switchTimeline();
  });
  return switchTimeline();
});
