document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.lang-btn');
  if (!buttons.length) return;

  function setLang(lang) {
    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.hidden = lang !== 'en';
    });
    document.querySelectorAll('.lang-ja').forEach(function (el) {
      el.hidden = lang !== 'ja';
    });
    buttons.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-lang'));
    });
  });

  var saved = null;
  try { saved = localStorage.getItem('site-lang'); } catch (e) {}
  if (saved === 'ja') setLang('ja');
});
