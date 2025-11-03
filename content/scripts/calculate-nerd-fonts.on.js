const fonts = [@ json.data.fonts.fonts @];

function pad(input) {
  return Math.floor(input * 1000); 
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setProp(key, value) {
  document.documentElement.style.setProperty(key, value);
}

function trimNum(num) {
  return Math.floor(num * 10000) / 10000;
}

export default class {
  #adjustment = null;
  #direction = null;
  #increment = null;
  #paddedTarget = null;
  #fontIndex = -1;

  #data = {};


  bittyInit() {
    setProp("--load-hider", "1");
    this.resetVars();
  }

  resetVars() {
    this.#adjustment = 0.1;
    this.#direction = "up";
    this.#increment = 0.1;
    this.#paddedTarget = null;
  }

  async loadFont(_, el) {
    this.#fontIndex += 1;
    if (this.#fontIndex < fonts.length) {
      this.resetVars();
      setProp("--adjust-value", this.#adjustment)
      const i = this.#fontIndex;
      const details = fonts[i];
      console.log(`Checking: ${details[0]}`);
      const url = `/nerd-fonts/${details[0]}/${details[1]}`;
      const font = new FontFace(`font-${details[0]}`, `url("${url}")`);
      document.fonts.add(font);
      await font.load();
      setProp("--test-font", `font-${details[0]}`);
      await sleep(200);
      this.#paddedTarget = pad(el.getBoundingClientRect().height);
      this.api.forward(null, "checkSize");
    }
  }

  async checkSize(_, el) {
    const currentPadded = pad(el.getBoundingClientRect().height);
    console.log(this.#increment);
    if (currentPadded < this.#paddedTarget) {
      if (this.#direction === "down") {
        this.#direction = "up";
        this.#increment =  this.#increment / 10;
      }
      this.#adjustment += this.#increment;
      console.log(`Update: ${this.#adjustment}`);
      setProp("--adjust-value", this.#adjustment);
      window.requestAnimationFrame((t) => { this.api.forward(null, "checkSize"); });
    } else if (currentPadded > this.#paddedTarget) {
      if (this.#direction === "up") {
        this.#direction = "down";
        this.#increment =  this.#increment / 10;
      }
      this.#adjustment -= this.#increment;
      setProp("--adjust-value", this.#adjustment);
      console.log(`Update: ${this.#adjustment}`);
      window.requestAnimationFrame((t) => { this.api.forward(null, "checkSize"); });
    } else {
      this.#data[fonts[this.#fontIndex][0]] = trimNum(this.#adjustment);
      this.api.forward(null, "display");
      this.api.forward(null, "loadFont");
    }
  }

  display(_, el) {
    el.innerHTML = JSON.stringify(this.#data, null, 2);
  }

}
