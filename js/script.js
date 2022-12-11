'use strict';

import { Platform } from './classes.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  const platforms = [];
  let doodlerLeftSpace = 100;
  let startPoint = 100;
  let doodlerBottomSpace = startPoint;
  let isGameOver = false;
  let platformCount = 5;
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;

  start();

  function createDoodler(doodler, parent) {
    doodler.classList.add('doodler');
    parent.appendChild(doodler);
    doodlerLeftSpace = platforms[0].left;
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

    isJumping = false;
    downTimerId = setInterval(() => {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = `${doodlerBottomSpace}px`;

      if (doodlerBottomSpace <= 0) {
        gameOver();
      }

      platforms.forEach((platform) => {
        if (doodlerBottomSpace >= platform.bottom && doodlerBottomSpace <= platform.bottom + 15 && doodlerLeftSpace + 60 >= platform.left && doodlerLeftSpace <= platform.left + 85 && !isJumping) {
          console.log('landed');
          startPoint = doodlerBottomSpace;
          jump(doodler);
        }
      });
    }, 30);
  }

  function jump(doodler) {
    clearInterval(downTimerId);

    isJumping = true;
    upTimerId = setInterval(() => {
      doodlerBottomSpace += 20;
      doodler.style.bottom = `${doodlerBottomSpace}px`;

      if (doodlerBottomSpace > startPoint + 200) {
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

  function gameOver() {
    console.log('game over');
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
  }

  function control(e) {
    switch (e.key) {
      case 'ArrowLeft':
        break;
      case 'ArrowRight':
        break;
      case 'ArrowUp':
        break;

      default:
        break;
    }
  }

  function start() {
    if (!isGameOver) {
      createPlatforms(platformCount);
      createDoodler(doodler, grid);
      setInterval(movePlatforms, 30, platforms);
      jump(doodler);
    }
  }
});
