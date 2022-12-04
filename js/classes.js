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
