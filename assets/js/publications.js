document.addEventListener('DOMContentLoaded', function () {
  var byCategory = document.getElementById('pubs-by-category');
  var byYear = document.getElementById('pubs-by-year');
  var buttons = document.querySelectorAll('.pub-sort-btn');

  var typeOrder = [
    'Journal',
    'International Conference (Paper)',
    'International Conference (Demo/Poster)',
    'Domestic Conference'
  ];
  var typeLabels = {
    'Journal': 'Journal',
    'International Conference (Paper)': 'Conference',
    'International Conference (Demo/Poster)': 'Demo/Poster',
    'Domestic Conference': 'Domestic'
  };
  // Categorical palette slots 1-4 (validated for adjacent-pair CVD separation
  // and lightness/chroma band; see the dataviz skill's palette.md).
  var typeColors = {
    'Journal': '#2a78d6',
    'International Conference (Paper)': '#eb6834',
    'International Conference (Demo/Poster)': '#1baf7a',
    'Domestic Conference': '#eda100'
  };
  // Text color placed *inside* a colored segment: picked per-hue so it always
  // clears contrast against that specific fill (marks-and-anatomy.md).
  var typeLabelInk = {
    'Journal': '#ffffff',
    'International Conference (Paper)': '#ffffff',
    'International Conference (Demo/Poster)': '#ffffff',
    'Domestic Conference': '#0b0b0b'
  };

  if (byCategory && byYear && buttons.length) {
    initSortToggle();
  }
  initChart();

  function initSortToggle() {
    var yearBuilt = false;

    function buildByYear() {
      if (yearBuilt) return;
      yearBuilt = true;

      var items = byCategory.querySelectorAll('.pub-item');
      var years = {};
      items.forEach(function (item) {
        var year = item.getAttribute('data-year') || 'Unknown';
        var type = item.getAttribute('data-type') || 'Other';
        if (!years[year]) years[year] = { items: [], counts: {} };
        years[year].items.push(item.cloneNode(true));
        years[year].counts[type] = (years[year].counts[type] || 0) + 1;
      });

      var sortedYears = Object.keys(years).sort(function (a, b) {
        return b.localeCompare(a, undefined, { numeric: true });
      });

      sortedYears.forEach(function (year) {
        var data = years[year];
        var breakdown = typeOrder
          .filter(function (t) { return data.counts[t]; })
          .map(function (t) { return (typeLabels[t] || t) + ' x' + data.counts[t]; })
          .join(', ');

        var heading = document.createElement('h3');
        heading.className = 'section-title';
        heading.style.fontSize = '1.1rem';
        heading.textContent = year + ' — ' + breakdown;
        byYear.appendChild(heading);

        var list = document.createElement('ul');
        list.className = 'pub-list';
        data.items.forEach(function (li) { list.appendChild(li); });
        byYear.appendChild(list);
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        if (btn.getAttribute('data-sort') === 'year') {
          buildByYear();
          byCategory.style.display = 'none';
          byYear.style.display = '';
        } else {
          byCategory.style.display = '';
          byYear.style.display = 'none';
        }
      });
    });
  }

  function initChart() {
    var container = document.getElementById('pub-chart');
    var legendEl = document.getElementById('pub-chart-legend');
    var source = byCategory || document;
    if (!container) return;

    var items = source.querySelectorAll('.pub-item');
    if (!items.length) return;

    // Aggregate counts per year x category from the already-rendered list —
    // one source of truth, no numbers duplicated into this script.
    var byYearType = {};
    items.forEach(function (item) {
      var year = item.getAttribute('data-year');
      var type = item.getAttribute('data-type');
      if (!year || !type) return;
      if (!byYearType[year]) byYearType[year] = {};
      byYearType[year][type] = (byYearType[year][type] || 0) + 1;
    });

    var years = Object.keys(byYearType).sort(function (a, b) { return a - b; });
    if (!years.length) return;

    var totals = years.map(function (y) {
      return typeOrder.reduce(function (sum, t) { return sum + (byYearType[y][t] || 0); }, 0);
    });
    var maxTotal = Math.max.apply(null, totals);
    var niceMax = Math.ceil(maxTotal / 5) * 5 || 5;

    // --- Geometry ---
    var svgNS = 'http://www.w3.org/2000/svg';
    var marginLeft = 30, marginRight = 12, marginTop = 26, marginBottom = 26;
    var slotWidth = 64;
    var barWidth = 24; // capped per mark spec
    var plotHeight = 200;
    var innerWidth = years.length * slotWidth;
    var width = marginLeft + innerWidth + marginRight;
    var height = marginTop + plotHeight + marginBottom;

    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Gridlines + y-axis ticks (0, half, max — rounded to a clean number).
    var ticks = [0, niceMax / 2, niceMax];
    ticks.forEach(function (tickVal) {
      var y = marginTop + plotHeight - (tickVal / niceMax) * plotHeight;
      var line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', marginLeft);
      line.setAttribute('x2', marginLeft + innerWidth);
      line.setAttribute('y1', y);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', '#e2e8f0');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);

      var label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', marginLeft - 8);
      label.setAttribute('y', y + 3);
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('font-size', '9');
      label.setAttribute('fill', '#718096');
      label.textContent = tickVal;
      svg.appendChild(label);
    });

    var tooltip = getTooltip();

    years.forEach(function (year, yi) {
      var slotX = marginLeft + yi * slotWidth;
      var barX = slotX + (slotWidth - barWidth) / 2;
      var baseline = marginTop + plotHeight;

      var counts = byYearType[year];
      var present = typeOrder.filter(function (t) { return counts[t] > 0; });
      var cumulative = 0;

      present.forEach(function (type, si) {
        var count = counts[type];
        var segHeight = (count / niceMax) * plotHeight;
        var yBottom = baseline - cumulative;
        var yTop = yBottom - segHeight;
        var isTop = si === present.length - 1;
        var isBottom = si === 0;

        var drawTop = yTop + (isTop ? 0 : 1);
        var drawBottom = yBottom - (isBottom ? 0 : 1);
        var drawHeight = Math.max(drawBottom - drawTop, 0);

        var el;
        if (isTop) {
          el = document.createElementNS(svgNS, 'path');
          el.setAttribute('d', roundedTopRectPath(barX, drawTop, barWidth, drawHeight, 4));
        } else {
          el = document.createElementNS(svgNS, 'rect');
          el.setAttribute('x', barX);
          el.setAttribute('y', drawTop);
          el.setAttribute('width', barWidth);
          el.setAttribute('height', drawHeight);
        }
        el.setAttribute('fill', typeColors[type]);
        el.setAttribute('class', 'pub-chart-seg');
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'img');
        var label = (typeLabels[type] || type) + ': ' + count + ' in ' + year;
        el.setAttribute('aria-label', label);

        // Direct label inside the segment when there's comfortable room;
        // otherwise the value stays reachable via tooltip + table view.
        if (drawHeight >= 16) {
          var text = document.createElementNS(svgNS, 'text');
          text.setAttribute('x', barX + barWidth / 2);
          text.setAttribute('y', drawTop + drawHeight / 2 + 3);
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('font-size', '9');
          text.setAttribute('fill', typeLabelInk[type]);
          text.setAttribute('pointer-events', 'none');
          text.textContent = count;
          svg.appendChild(el);
          svg.appendChild(text);
        } else {
          svg.appendChild(el);
        }

        el.addEventListener('mouseenter', function () { showTooltip(tooltip, label); });
        el.addEventListener('mousemove', function (e) { moveTooltip(tooltip, e.clientX, e.clientY); });
        el.addEventListener('mouseleave', function () { hideTooltip(tooltip); });
        el.addEventListener('focus', function () {
          var rect = el.getBoundingClientRect();
          showTooltip(tooltip, label);
          moveTooltip(tooltip, rect.left + rect.width / 2, rect.top);
        });
        el.addEventListener('blur', function () { hideTooltip(tooltip); });

        cumulative += segHeight;
      });

      // Total above the bar — the one number worth labeling unconditionally.
      var total = totals[yi];
      if (total > 0) {
        var totalLabel = document.createElementNS(svgNS, 'text');
        totalLabel.setAttribute('x', barX + barWidth / 2);
        totalLabel.setAttribute('y', baseline - (total / niceMax) * plotHeight - 8);
        totalLabel.setAttribute('text-anchor', 'middle');
        totalLabel.setAttribute('font-size', '10');
        totalLabel.setAttribute('font-weight', '600');
        totalLabel.setAttribute('fill', '#2d3748');
        totalLabel.textContent = total;
        svg.appendChild(totalLabel);
      }

      // X-axis year label.
      var yearLabel = document.createElementNS(svgNS, 'text');
      yearLabel.setAttribute('x', barX + barWidth / 2);
      yearLabel.setAttribute('y', baseline + 16);
      yearLabel.setAttribute('text-anchor', 'middle');
      yearLabel.setAttribute('font-size', '10');
      yearLabel.setAttribute('fill', '#718096');
      yearLabel.textContent = year;
      svg.appendChild(yearLabel);
    });

    container.appendChild(svg);

    if (legendEl) {
      typeOrder.forEach(function (type) {
        var item = document.createElement('span');
        item.className = 'pub-chart-legend-item';

        var swatch = document.createElement('span');
        swatch.className = 'pub-chart-swatch';
        swatch.style.background = typeColors[type];

        var text = document.createElement('span');
        text.textContent = typeLabels[type] || type;

        item.appendChild(swatch);
        item.appendChild(text);
        legendEl.appendChild(item);
      });
    }
  }

  function roundedTopRectPath(x, y, w, h, r) {
    r = Math.min(r, h, w / 2);
    return 'M' + x + ',' + (y + r) +
      ' A' + r + ',' + r + ' 0 0 1 ' + (x + r) + ',' + y +
      ' H' + (x + w - r) +
      ' A' + r + ',' + r + ' 0 0 1 ' + (x + w) + ',' + (y + r) +
      ' V' + (y + h) +
      ' H' + x +
      ' Z';
  }

  function getTooltip() {
    var tooltip = document.getElementById('pub-chart-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'pub-chart-tooltip';
      tooltip.className = 'pub-chart-tooltip';
      document.body.appendChild(tooltip);
    }
    return tooltip;
  }

  function showTooltip(tooltip, text) {
    tooltip.textContent = text;
    tooltip.classList.add('visible');
  }

  function moveTooltip(tooltip, x, y) {
    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 10) + 'px';
  }

  function hideTooltip(tooltip) {
    tooltip.classList.remove('visible');
  }
});
