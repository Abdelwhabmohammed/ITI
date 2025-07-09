function changeColor() {
  const card = document.querySelector('.card');
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  card.style.backgroundColor = randomColor;
}

function toggleFunFact() {
  const fact = document.getElementById('fun-fact');
  fact.style.display = (fact.style.display === 'none') ? 'block' : 'none';
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('light-theme');
  body.classList.toggle('dark-theme');
}
