(function () {
  function initSlideshow(container) {
    var slides = container.querySelectorAll('.slideshow-slide');
    var counter = container.querySelector('.slideshow-current');
    var prevBtn = container.querySelector('.slideshow-prev');
    var nextBtn = container.querySelector('.slideshow-next');
    var current = 0;

    if (!slides.length) return;

    function show(index) {
      slides[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (counter) counter.textContent = current + 1;
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { show(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { show(current + 1); });

    container.setAttribute('tabindex', '0');
    container.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });

    if (slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    }
  }

  document.querySelectorAll('[data-slideshow]').forEach(initSlideshow);
})();
