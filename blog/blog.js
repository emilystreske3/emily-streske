// Blog search and category filter
(function () {
  var searchInput = document.getElementById('blogSearch');
  var filterButtons = document.querySelectorAll('.blog-filter-btn');
  var postCards = document.querySelectorAll('[data-post-card]');
  var noResults = document.getElementById('noResults');

  var activeCategory = 'all';
  var searchQuery = '';

  function applyFilters() {
    var visibleCount = 0;

    postCards.forEach(function (card) {
      var categoryList = (card.dataset.category || '')
        .toLowerCase()
        .split(',')
        .map(function (item) { return item.trim(); })
        .filter(Boolean);
      var text = card.textContent.toLowerCase();

      var matchesCategory = activeCategory === 'all' || categoryList.includes(activeCategory);
      var matchesSearch = searchQuery === '' || text.includes(searchQuery);

      var visible = matchesCategory && matchesSearch;
      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      applyFilters();
    });
  });
})();
