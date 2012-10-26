メニューの部分の末尾に
~~~~~
<li><a href="ここに記事のアドレス">記事タイトル</a></li>
~~~~~
こんな感じのコードを追加してやると出来ると思います。
次のコードは具体例です。

~~~~~
<ul class="nav">
  <li<!--index_area--> class="active"<!--/index_area-->><a href="/">Home</a></li>
  <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
      Latest Entries
      <b class="caret"></b>
    </a>
    <ul class="dropdown-menu">
      <!--recent-->
      <li>
        <a href="<%recent_link>" title="<%recent_title>"><%recent_title><span class="badge badge-inverse"><%recent_month>-<%recent_day></span></a>
      </li>
      <!--/recent-->
    </ul>
  </li>
  <li class="dropdown<!--category_area--> active<!--/category_area-->">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
      Categories
      <b class="caret"></b>
    </a>
    <ul class="dropdown-menu">
      <!--category-->
      <!--category_sub_begin--><ul class="dropdown-menu"><!--/category_sub_begin-->
      <!--category_nosub-->
      <li>
      <!--/category_nosub-->
      <!--category_parent-->
      <li class="dropdown-submenu">
      <!--/category_parent-->
      <!--category_sub_hasnext-->
        <li>
      <!--/category_sub_hasnext-->
      <!--category_sub_end-->
        <li>
      <!--/category_sub_end-->
        <a href="<%category_link>" title="<%category_name>"><%category_name><span class="badge badge-inverse"><%category_count></span></a>
      <!--category_nosub-->
      </li>
      <!--/category_nosub-->
      <!--category_sub_hasnext-->
        </li>
      <!--/category_sub_hasnext-->
      <!--category_sub_end-->
          </li>
        </ul>
      </li>
      <!--/category_sub_end-->
      <!--/category-->
    </ul>
  </li>
  <li class="dropdown<!--date_area--> active<!--/date_area-->">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
      Archives
      <b class="caret"></b>
    </a>
    <ul class="dropdown-menu">
      <!--archive-->
      <li><a href="<%archive_link>" title="<%archive_year>.<%archive_month>"><%archive_year>.<%archive_month><span class="badge badge-inverse"><%archive_count></span></a></li>
      <!--/archive-->
    </ul>
  </li>
  <li><a href="ここに記事のアドレス">記事タイトル</a></li>
</ul>
~~~~~

*Latest Entries*などのようにクリックするとメニューが展開するようなことをやりたい場合は、
~~~~~
<li class="dropdown">
  <a href="#" class="dropdown-toggle" data-toggle="dropdown">
    グループ名
    <b class="caret"></b>
  </a>
  <ul class="dropdown-menu">
    <li><a href="アドレス">メニュー1</a></li>
    <li><a href="アドレス">メニュー2</a></li>
    <li><a href="アドレス">メニュー3</a></li>
  </ul>
</li>
~~~~~
こんな感じのを同じように記述してやれば出来ます。

##追記(2012-10-26)
*Archives*を普通のリンクにしたい場合は、  
↓みたいな感じにします。（ここでは全記事一覧に飛ぶようにしています）

~~~~~
<ul class="nav">
  <li<!--index_area--> class="active"<!--/index_area-->><a href="/">Home</a></li>
  <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
      Latest Entries
      <b class="caret"></b>
    </a>
    <ul class="dropdown-menu">
      <!--recent-->
      <li>
        <a href="<%recent_link>" title="<%recent_title>"><%recent_title><span class="badge badge-inverse"><%recent_month>-<%recent_day></span></a>
      </li>
      <!--/recent-->
    </ul>
  </li>
  <li class="dropdown<!--category_area--> active<!--/category_area-->">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
      Categories
      <b class="caret"></b>
    </a>
    <ul class="dropdown-menu">
      <!--category-->
      <!--category_sub_begin--><ul class="dropdown-menu"><!--/category_sub_begin-->
      <!--category_nosub-->
      <li>
      <!--/category_nosub-->
      <!--category_parent-->
      <li class="dropdown-submenu">
      <!--/category_parent-->
      <!--category_sub_hasnext-->
        <li>
      <!--/category_sub_hasnext-->
      <!--category_sub_end-->
        <li>
      <!--/category_sub_end-->
        <a href="<%category_link>" title="<%category_name>"><%category_name><span class="badge badge-inverse"><%category_count></span></a>
      <!--category_nosub-->
      </li>
      <!--/category_nosub-->
      <!--category_sub_hasnext-->
        </li>
      <!--/category_sub_hasnext-->
      <!--category_sub_end-->
          </li>
        </ul>
      </li>
      <!--/category_sub_end-->
      <!--/category-->
    </ul>
  </li>
  <li><a href="/archives.html">Archives</a></li>
  <li><a href="ここに記事のアドレス">記事タイトル</a></li>
</ul>
~~~~~
