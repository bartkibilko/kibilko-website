/* Google Analytics behind explicit consent. Nothing is loaded and no cookie is set until "Accept". */
(function () {
  var GA_ID = 'G-G78N7W8FN6';
  var KEY = 'cookie-consent';
  var banner = null;
  var returnFocus = null;

  function readChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function saveChoice(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  function gtag() { window.dataLayer.push(arguments); }

  function loadAnalytics() {
    window['ga-disable-' + GA_ID] = false;
    if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    window.dataLayer = window.dataLayer || [];
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
  }

  function stopAnalytics() {
    window['ga-disable-' + GA_ID] = true;
    if (window.dataLayer) gtag('consent', 'update', { analytics_storage: 'denied' });
    var parts = location.hostname.split('.');
    var domains = ['', location.hostname, '.' + parts.slice(-2).join('.')];
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name !== '_ga' && name.indexOf('_ga_') !== 0) return;
      domains.forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  function choose(value) {
    saveChoice(value);
    if (value === 'accepted') loadAnalytics(); else stopAnalytics();
    closeBanner();
  }

  function closeBanner() {
    if (!banner) return;
    var hadFocus = banner.contains(document.activeElement);
    banner.remove();
    banner = null;
    if (hadFocus && returnFocus) returnFocus.focus();
    returnFocus = null;
  }

  function button(text, value, primary) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = primary ? 'btn primary' : 'btn';
    b.textContent = text;
    b.addEventListener('click', function () { choose(value); });
    return b;
  }

  function openBanner(trigger) {
    if (!banner) {
      banner = document.createElement('section');
      banner.className = 'consent';
      banner.setAttribute('aria-labelledby', 'consent-title');
      banner.innerHTML =
        '<p class="label" id="consent-title">FIG.00 · COOKIES</p>' +
        '<p class="consent-text">This site sets one cookie, for Google Analytics, so I can see which posts get read. Decline and nothing loads. My ego will survive.</p>';
      var actions = document.createElement('p');
      actions.className = 'consent-actions';
      actions.appendChild(button('Accept', 'accepted', true));
      actions.appendChild(button('Decline', 'rejected', false));
      banner.appendChild(actions);
      banner.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && readChoice()) closeBanner();
      });
      document.body.appendChild(banner);
    }
    if (trigger) {
      returnFocus = trigger;
      banner.querySelector('button').focus();
    }
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-consent-open]'), function (el) {
      el.hidden = false;
      el.addEventListener('click', function () { openBanner(el); });
    });
    if (!readChoice()) openBanner(null);
  }

  if (readChoice() === 'accepted') loadAnalytics();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
