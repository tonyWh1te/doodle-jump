import { Platform } from './classes.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  const platforms = [];
  let doodlerLeftSpace = 100;
  let doodlerBottomSpace = 100;
  let isGameOver = false;
  let platformCount = 5;

  start();

  function createDoodler(doodler, parent) {
    doodler.classList.add('doodler');
    parent.appendChild(doodler);
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
  }

  function createPlatforms(count) {
    for (let i = 0; i < count; i++) {
      let platGap = 600 / count; //расстояние между платформами
      let newPlatBottom = 100 + i * platGap; //координата платформы
      const newPlatform = new Platform(newPlatBottom);
      newPlatform.draw(grid);
      platforms.push(newPlatform);
    }
  }

  function movePlatforms(platforms) {
    if (doodlerBottomSpace > 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        const visual = platform.visual;
        visual.style.bottom = `${platform.bottom}px`;
      });
    }
  }

  function start() {
    if (!isGameOver) {
      createDoodler(doodler, grid);
      createPlatforms(platformCount);
      setInterval(movePlatforms, 30, platforms);
    }
  }
});
