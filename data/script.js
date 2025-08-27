const contentContainer = document.getElementById('content');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');

let allContent = [];

// جلب البيانات من content.json
fetch('data/content.json')
  .then(res => res.json())
  .then(data => {
    allContent = data;
    displayContent(allContent);
  });

// عرض المحتوى
function displayContent(items) {
  contentContainer.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a href="${item.link}" target="_blank">عرض المحتوى</a>
    `;
    contentContainer.appendChild(card);
  });
}

// البحث
searchInput.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const filtered = allContent.filter(item => item.title.toLowerCase().includes(term) || item.description.toLowerCase().includes(term));
  displayContent(filtered);
});

// التصفية حسب الفئة
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    if(category === 'all') {
      displayContent(allContent);
    } else {
      displayContent(allContent.filter(item => item.category === category));
    }
  });
});
