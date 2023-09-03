var toggleBtn = document.getElementById('toggle-header-btn');
var headerContent = document.getElementById('header-content');
var BrighnessContent = document.getElementById('brightness-selector');
var PageSelectorContent = document.getElementById('page-selector');
var header = document.querySelector('header');

const isBrighnessNone = BrighnessContent === null;


toggleBtn.addEventListener('click', function() {
  if (headerContent.style.display === 'none') {
    headerContent.style.display = 'inline-block';

    if (!isBrighnessNone) {
        header.style.height = '20%';
        BrighnessContent.style.display = 'inline-block';
        PageSelectorContent.style.display = 'inline-block';
    }
    else{    header.style.height = '5%'; }

    toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
  } else {
    headerContent.style.display = 'none';
    header.style.height = '0';

    if (!isBrighnessNone) {
        BrighnessContent.style.display = 'none';
        PageSelectorContent.style.display = 'none';
    }

    toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  }
});
