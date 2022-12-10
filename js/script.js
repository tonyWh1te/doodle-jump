import { Platform } from './classes.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  const platforms = [];
  let doodlerLeftSpace = 100;
  let doodlerBottomSpace = 100;
  let isGameOver = false;
  let platformCount = 5;
  let upTimerId;
  let downTimerId;

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

  function fall(doodler) {
    clearInterval(upTimerId);

    downTimerId = setInterval(() => {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = `${doodlerBottomSpace}px`;

      if (doodlerBottomSpace <= 0) {
        gameOver();
      }
    }, 30);
  }

  function jump(doodler) {
    clearInterval(downTimerId);

    upTimerId = setInterval(() => {
      doodlerBottomSpace += 20;
      doodler.style.bottom = `${doodlerBottomSpace}px`;

      if (doodlerBottomSpace > 350) {
        fall(doodler);
      }
    }, 30);
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

  function gameOver(params) {
    console.log('game over');
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
  }

  function start() {
    if (!isGameOver) {
      createDoodler(doodler, grid);
      createPlatforms(platformCount);
      setInterval(movePlatforms, 30, platforms);
      jump(doodler);
    }
  }
});
