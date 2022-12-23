export class Platform {
  constructor(newPlatBottom) {
    this.bottom = newPlatBottom;
    this.left = Math.random() * 315;
    this.visual = document.createElement('div');
  }

  draw(parent) {
    const visual = this.visual;
    visual.classList.add('platform');
    visual.style.left = `${this.left}px`;
    visual.style.bottom = `${this.bottom}px`;

    parent.appendChild(visual);
  }
}

export class Doodler {
  constructor({ velocity, jumpHeight, position }) {
    this.velocity = velocity;
    this.jumpHeight = jumpHeight;
    this.position = position;
    this.visual = document.createElement('div');
  }

  draw(parent) {
    const doodler = this.visual;
    doodler.classList.add('doodler');
    doodler.style.left = `${this.position.left}px`;
    doodler.style.bottom = `${this.position.bottom}px`;

    parent.appendChild(doodler);
  }
}
