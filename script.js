document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  let doodlerLeftSpace = 100;
  let doodlerBottomSpace = 100;
  let isGameOver = false;
  let platformCount = 5;

  start();

  function createDoodler(doodler) {
    doodler.classList.add('doodler');
    grid.appendChild(doodler);
    doodler.style.left = doodlerLeftSpace + 'px';
    doodler.style.bottom = doodlerBottomSpace + 'px';
  }

  function createPlatforms(count) {
    for (let i = 0; i < count; i++) {}
  }

  function start() {
    if (!isGameOver) {
      createDoodler(doodler);
      createPlatforms(platformCount);
    }
  }
});
