class Cube {
  constructor(selector, settings = {
    openClass: 'is-open',
    closeClass: 'is-close',
    time: 1000
  }) {
    if (typeof selector === 'string') {
      this.el = document.querySelector(selector);
    } else {
      this.el = selector;
    }
    this.settings = settings;
    this.init();
  }

  init() {
    this.light     = this.el.querySelector('.cube-light');
    this.wrapper   = this.el.parentNode;
    this.currentX  = 0;
    this.currentY  = 0;
    this.rotateX   = 0;
    this.rotateY   = 0;
    this.callbacks = {};
    this.state     = false;

    this.el.style.transform = 'translate3d(0, 0, 0) rotateX(-20deg) rotateY(45deg)';
    if (this.light) this.light.style.transform = 'rotateX(20deg) rotateY(-45deg)';
    this.el.addEventListener('mousedown', () => {
      event.preventDefault();
      this.currentX = event.clientX;
      this.currentY = event.clientY;
      this.rotateX = parseInt(this.el.style.transform.match(/rotateX\(-?[0-9]+(\.[0-9]+)*deg\)/)[0].slice(8, -4));
      this.rotateY = parseInt(this.el.style.transform.match(/rotateY\(-?[0-9]+(\.[0-9]+)*deg\)/)[0].slice(8, -4));
      if (! this.state) {
        this.callbacks.onDrag = this.drag.bind(this);
        this.callbacks.onRelease = this.relase.bind(this);
        document.addEventListener('mousemove', this.callbacks.onDrag, false);
        document.addEventListener('mouseup', this.callbacks.onRelease, false);
      }
    });
    this.callbacks.dblClick = this.opening.bind(this);
    this.el.addEventListener('dblclick', this.callbacks.dblClick, false);
  }

  drag() {
    let dragX = (event.clientX - this.currentX);
    let dragY = (event.clientY - this.currentY);
    if (event.buttons === 1) {
      this.el.style.transform = `rotateX(${this.rotateX - (dragY / 2)}deg) rotateY(${this.rotateY + (dragX / 2)}deg)`;
    }
    if (event.buttons === 1 && this.light) {
      this.light.style.transform = `rotateX(${(this.rotateX - (dragY / 2)) * -1}deg) rotateY(${(this.rotateY + (dragX / 2)) * -1}deg)`;
    }
  }

  relase() {
    event.preventDefault();
    document.removeEventListener('mousemove', this.callbacks.onDrag);
    document.removeEventListener('mouseup',   this.callbacks.onRelease);
  }

  opening() {
    if (! this.state) {
      this.state = true;
      this.el.style.transition = '1s';
      this.el.classList.remove(this.settings.closeClass);
      this.el.classList.add(this.settings.openClass);
      this.wrapper.classList.add('is-open');
      return;
    }
    this.state = false;
    this.el.classList.remove(this.settings.openClass);
    setTimeout(() => {
      this.el.classList.add(this.settings.closeClass);
      this.wrapper.classList.remove('is-open');
    }, 1);
    setTimeout(() => {
      this.el.style.transition = '0s';
      this.el.classList.remove(this.settings.closeClass);
    }, this.settings.time);
  }
}
