// ===== 导航：切换 section + 更新 URL + 处理回退 =====
$(function () {
  function activateFromHash() {
    var hash = location.hash && $(location.hash).length ? location.hash : '#about';
    $('section').removeClass('active');
    $(hash).addClass('active');
    $('.sidebar li').removeClass('selected');
    $('.navlink[href="' + hash + '"] li').addClass('selected');
  }

  $('.navlink').on('click', function (e) {
    // 兼容 href=" " 的 About，默认跳转 #about
    var hash = (this.hash && this.hash.trim()) ? this.hash.trim() : '#about';
    if (hash.charAt(0) !== '#') return; // 外链不拦截
    e.preventDefault();

    $('section').removeClass('active');
    $(hash).addClass('active');

    $('.sidebar li').removeClass('selected');
    $(this).children('li').addClass('selected');

    // 更新地址栏（支持刷新/分享）
    history.pushState(null, '', hash);
  });

  // 初次加载 & 浏览器回退/前进
  activateFromHash();
  window.addEventListener('popstate', activateFromHash);
});


// ===== 时间区间格式化：start + duration → "Oct 20, 2025 · 16:00–17:30" =====
function fmtRange(startISO, durationMin, opts) {
  opts = opts || {};
  var tz = opts.timeZone;            // 例如 'Asia/Shanghai'（固定北京时间）
  var showWeekday = !!opts.showWeekday;
  var tzLabel = opts.tzLabel || '';  // 例如 'UTC+08:00' 或 'Beijing Time'

  var start = new Date(startISO);
  var dur = Number.isFinite(durationMin) ? durationMin : 90; // 默认 90 分钟
  var end = new Date(start.getTime() + dur * 60000);

  var dateFmt = new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    weekday: showWeekday ? 'short' : undefined,
    timeZone: tz
  });
  var timeFmt = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit', minute: '2-digit',
    timeZone: tz
  });

  var out = dateFmt.format(start) + ' · ' + timeFmt.format(start) + '–' + timeFmt.format(end);
  if (tzLabel) out += ' (' + tzLabel + ')';
  return out;
}
