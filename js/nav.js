/* Post navigation: contents rail, sticky strip with reading progress, mobile contents sheet,
   § links on headings and J/K keys for next/previous section. Built from the post's own <h2 id> headings. */
(function () {
  var article = document.querySelector('article.post');
  var rail = document.querySelector('nav.toc[data-toc]');
  if (!article || !rail) return;
  // A cached older site.css has no navigation styles; leave the post as it was rather than show an unstyled list.
  if (!getComputedStyle(document.documentElement).getPropertyValue('--nav-css').trim()) return;

  var postHead = article.querySelector('.post-head');
  var h2s = [].slice.call(article.querySelectorAll('h2[id]'));
  var targets = [postHead].concat(h2s);
  var names = ['Intro'].concat(h2s.map(function (h) { return h.textContent; }));
  var title = (postHead.querySelector('h1') || {}).textContent || document.title;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WPM = 230;

  function isEnd(el) {
    return !el || el.tagName === 'H2' || /\b(footnotes|sources|post-end)\b/.test(el.className);
  }
  var words = targets.map(function (t) {
    var n = 0, el = t.nextElementSibling;
    while (!isEnd(el)) { n += el.textContent.trim().split(/\s+/).length; el = el.nextElementSibling; }
    return n;
  });
  function mins(w) { return Math.max(1, Math.round(w / WPM)); }
  function num(i) { return '§' + (i < 10 ? '0' : '') + i; }
  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }
  function idOf(i) { return i === 0 ? 'top' : targets[i].id; }

  var items = targets.map(function (t, i) {
    return '<li><a href="#' + idOf(i) + '" data-i="' + i + '"><span class="n">' + num(i) + '</span><span class="t">' +
      esc(names[i]) + '</span><span class="m">' + mins(words[i]) + ' min</span></a></li>';
  }).join('');

  rail.innerHTML = '<p class="label">On this page</p><div class="toc-track"><span class="toc-fill"></span><ol>' + items + '</ol></div>' +
    '<div class="toc-foot"><p class="toc-stat"></p><div class="toc-actions"><a class="mini" href="#top">↑ Top</a>' +
    '<button class="mini" type="button" data-copy>Copy link</button></div>' +
    '<p class="keys"><kbd>J</kbd> <kbd>K</kbd> next / prev section</p></div>';

  var strip = document.createElement('div');
  strip.className = 'strip';
  strip.setAttribute('aria-hidden', 'true');
  strip.innerHTML = '<div class="strip-in"><a class="brand-mark" href="#top" tabindex="-1" aria-label="Back to top">K</a>' +
    '<p class="strip-title"><span class="post-t">' + esc(title) + '</span><span class="sec"></span></p>' +
    '<span class="strip-pct"></span><button class="mini toc-btn" type="button" aria-expanded="false" aria-controls="toc-sheet" tabindex="-1">Contents</button></div>' +
    '<div class="strip-bar"></div>';
  var sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.id = 'toc-sheet';
  sheet.hidden = true;
  sheet.innerHTML = '<nav class="toc" aria-label="Contents"><p class="label">Contents · ' + mins(words.reduce(function (a, b) { return a + b; }, 0)) +
    ' min</p><ol>' + items + '</ol></nav>';
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.hidden = true;
  document.body.appendChild(strip);
  document.body.appendChild(sheet);
  document.body.appendChild(toast);

  h2s.forEach(function (h) {
    var a = document.createElement('a');
    a.className = 'hlink';
    a.href = '#' + h.id;
    a.textContent = '§';
    a.setAttribute('aria-label', 'Copy link to section: ' + h.textContent);
    a.addEventListener('click', function () { copy(h.id); });
    h.insertBefore(a, h.firstChild);
  });

  var links = [].slice.call(document.querySelectorAll('.toc a[data-i]'));
  var list = rail.querySelector('ol');
  var fill = rail.querySelector('.toc-fill');
  var stat = rail.querySelector('.toc-stat');
  var sec = strip.querySelector('.sec');
  var pct = strip.querySelector('.strip-pct');
  var bar = strip.querySelector('.strip-bar');
  var btn = strip.querySelector('.toc-btn');
  var cur = 0, ticking = false;

  function update() {
    ticking = false;
    var vh = window.innerHeight;
    var r = article.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, (vh * 0.3 - r.top) / (r.height - vh * 0.6)));
    var line = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--strip-h'), 10) + 52;
    cur = 0;
    targets.forEach(function (t, i) { if (t.getBoundingClientRect().top <= line) cur = i; });
    if (p >= 0.995) cur = targets.length - 1;
    links.forEach(function (a) {
      var i = +a.getAttribute('data-i');
      a.classList.toggle('on', i === cur);
      a.classList.toggle('done', i < cur);
      if (i === cur) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
    var act = list.querySelector('a[data-i="' + cur + '"]');
    if (act) fill.style.height = (act.offsetTop + act.offsetHeight / 2) + 'px';
    var P = Math.round(p * 100);
    var left = Math.round(words.slice(cur).reduce(function (a, b) { return a + b; }, 0) / WPM);
    stat.innerHTML = '<b>' + P + '%</b> read · ' + (P >= 99 || !left ? 'done' : left + ' min left');
    pct.textContent = P + '%';
    bar.style.width = P + '%';
    sec.textContent = num(cur) + ' · ' + names[cur];
    var show = postHead.getBoundingClientRect().bottom < 0;
    strip.classList.toggle('show', show);
    strip.setAttribute('aria-hidden', String(!show));
    [].forEach.call(strip.querySelectorAll('a,button'), function (el) { el.tabIndex = show ? 0 : -1; });
    if (!show) closeSheet();
  }
  function schedule() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);

  function go(i) {
    i = Math.max(0, Math.min(targets.length - 1, i));
    if (i === 0) window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    else targets[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    if (history.replaceState) history.replaceState(null, '', '#' + idOf(i));
  }

  function openSheet(open) {
    sheet.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Contents';
  }
  function closeSheet() { if (!sheet.hidden) openSheet(false); }
  btn.addEventListener('click', function () { openSheet(sheet.hidden); });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.sheet a[data-i]')) closeSheet();
    if (e.target.closest('[data-copy]')) copy(cur === 0 ? '' : targets[cur].id);
  });
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
    if (e.key === 'j') go(cur + 1);
    else if (e.key === 'k') go(cur - 1);
    else if (e.key === 'Escape') closeSheet();
  });

  var timer;
  function say(text) {
    toast.textContent = text;
    toast.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(function () { toast.hidden = true; }, 1800);
  }
  function copy(id) {
    var url = location.origin + location.pathname + (id ? '#' + id : '');
    var p = navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject();
    p.then(function () { say('Link copied'); }, function () { say(url); });
  }

  update();
})();
