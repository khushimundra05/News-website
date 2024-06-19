//base_url="https://newsapi.org/v2/everything?q=";
//country=us&apiKey=fb483f8af2f24c699f3af817163279a6
//api_key="fb483f8af2f24c699f3af817163279a6";
//const query=document.querySelector(".search-bar input");




const apiKey = 'fb483f8af2f24c699f3af817163279a6';
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything';
const flashCardContainer = document.getElementById('flash-card-container');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-button');
const navLinks = document.querySelectorAll('.hover-link');

// Fetch news articles
async function fetchNews(query) {
  const url = `${baseUrl}?q=${query}&apiKey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.articles;
}

// Display news articles in cards
function displayNews(articles) {
  flashCardContainer.innerHTML = '';
  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const card = document.createElement('div');
    card.classList.add('news-card');

    const header = document.createElement('div');
    header.classList.add('card-header');

    const img = document.createElement('img');
    img.src = article.urlToImage;
    img.alt = 'news-img';
    img.style.width = '100%'; // set image width to 100% to fit in the box
    img.style.height = '100%'; // set image height to 100% to fit in the box
    img.style.objectFit = 'cover'; // set object-fit to cover to maintain aspect ratio
    header.appendChild(img);

    const content = document.createElement('div');
    content.classList.add('card-content');

    const headline = document.createElement('h3');
    headline.textContent = article.title;
    content.appendChild(headline);

    const lastLine = document.createElement('div');
    lastLine.classList.add('last-line');

    const source = document.createElement('h6');
    source.textContent = article.source.name;
    lastLine.appendChild(source);

    const date = document.createElement('h6');
    date.textContent = new Date(article.publishedAt).toLocaleDateString();
    lastLine.appendChild(date);

    content.appendChild(lastLine);
    card.appendChild(header);
    card.appendChild(content);
    flashCardContainer.appendChild(card);

    // Add click event listener to news card
    card.addEventListener('click', () => {
      window.open(article.url, '_blank');
    });
  });
}

// Fetch international news when the page loads
fetchNews('international').then(displayNews);
document.querySelector('.news-heading').textContent = 'Top Stories International';

// Fetch news articles when the user submits a search query
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (!query) return;
  fetchNews(query).then(displayNews);
  document.querySelector('.news-heading').textContent = `Top Stories for ${query.charAt(0).toUpperCase() + query.slice(1)}`;
});

// Fetch news articles when the user clicks on a category
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const query = link.textContent.toLowerCase();
    fetchNews(query).then(displayNews);
    document.querySelector('.news-heading').textContent = `Top Stories for ${query.charAt(0).toUpperCase() + query.slice(1)}`;
  });
});
