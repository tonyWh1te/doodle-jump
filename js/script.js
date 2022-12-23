'use strict';

import { Platform, Doodler } from './classes.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const platforms = [];
  const duration = 1000;
  const iterations = 60;
  let doodler;
  let isGameOver = false;
  let platformCount = 5;
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;
  let score = 0;

  start();

  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platGap = 600 / platformCount; //расстояние между платформами
      let newPlatBottom = 100 + i * platGap; //координата платформы
      const newPlatform = new Platform(newPlatBottom);
      newPlatform.draw(grid);
      platforms.push(newPlatform);
    }
  }

  const doodlerCollidesWithPlat = (doodler, platform) => {
    return (
      doodler.position.bottom >= platform.bottom &&
      doodler.position.bottom <= platform.bottom + 15 &&
      doodler.position.left + 60 >= platform.left &&
      doodler.position.left <= platform.left + 85 &&
      !isJumping
    );
  };

  function fall(doodler) {
    isJumping = false;

    clearInterval(upTimerId);

    downTimerId = setInterval(() => {
      doodler.position.bottom -= doodler.velocity.y;
      doodler.visual.style.bottom = `${doodler.position.bottom}px`;

      if (doodler.position.bottom <= 0) {
        gameOver();
      }

      platforms.forEach((platform) => {
        if (doodlerCollidesWithPlat(doodler, platform)) {
          console.log('landed');
          jump(doodler);
        }
      });
    }, duration / iterations);
  }

  function jump(doodler) {
    clearInterval(downTimerId);

    isJumping = true;
    upTimerId = setInterval(() => {
      doodler.position.bottom += doodler.velocity.y;
      doodler.visual.style.bottom = `${doodler.position.bottom}px`;

      if (doodler.position.bottom > doodler.jumpHeight) {
        fall(doodler);
        isJumping = false;
      }
    }, duration / iterations);
  }

  function movePlatforms(platforms, doodler) {
    if (doodler.position.bottom > 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        platform.visual.style.bottom = `${platform.bottom}px`;

        //удаление  и добавление платформ
        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual;
          firstPlatform.remove();
          platforms.shift();

          score++;

          let newPlatform = new Platform(600);
          newPlatform.draw(grid);
          platforms.push(newPlatform);
        }
      });
    }
  }

  function moveLeft(doodler) {
    clearInterval(leftTimerId);

    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }

    isGoingLeft = true;

    leftTimerId = setInterval(() => {
      if (doodler.position.left >= 0) {
        doodler.position.left -= doodler.velocity.x;
        doodler.visual.style.left = `${doodler.position.left}px`;
      } else {
        moveRight(doodler);
      }
    }, duration / iterations);
  }

  function moveRight(doodler) {
    clearInterval(rightTimerId);

    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }

    isGoingRight = true;

    rightTimerId = setInterval(() => {
      if (doodler.position.left <= 313) {
        doodler.position.left += doodler.velocity.x;
        doodler.visual.style.left = `${doodler.position.left}px`;
      } else {
        moveLeft(doodler);
      }
    }, duration / iterations);
  }

  function control(e, doodler) {
    switch (e.key) {
      case 'ArrowLeft':
        moveLeft(doodler);
        break;
      case 'ArrowRight':
        moveRight(doodler);
        break;

      default:
        break;
    }
  }

  function gameOver() {
    console.log('game over');
    isGameOver = true;

    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    grid.innerHTML = score;

    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
  }

  function start() {
    if (!isGameOver) {
      createPlatforms();

      doodler = new Doodler({
        velocity: {
          x: 3,
          y: 4,
        },
        jumpHeight: 270,
        position: {
          left: platforms[0].left,
          bottom: 150,
        },
      });

      doodler.draw(grid);
      setInterval(movePlatforms, duration / iterations, platforms, doodler);
      jump(doodler);
      addEventListener('keyup', (e) => control(e, doodler));
    }
  }
});
