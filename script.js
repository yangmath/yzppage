$(document).ready(function() {
    $('.navlink').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            $('section').removeClass('active')
            $('li').removeClass('selected')
            $(this.hash).addClass('active')
            $(this).children().addClass('selected')
        }
    });
});


function fmtRange(startISO, durationMin){
  const start = new Date(startISO);
  const dur = Number.isFinite(durationMin) ? durationMin : 90; // 默认90分钟
  const end = new Date(start.getTime() + dur * 60000);

  const dateStr = start.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
  const tOpt = { hour:'2-digit', minute:'2-digit' };
  const sStr = start.toLocaleTimeString(undefined, tOpt);
  const eStr = end.toLocaleTimeString(undefined, tOpt);
  return `${dateStr} · ${sStr}–${eStr}`;
}
