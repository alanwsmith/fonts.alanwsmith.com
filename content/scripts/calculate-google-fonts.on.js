const fontObject = [@ json.data.googlefontstest @]
const fonts = [];

Object.entries(fontObject).forEach((item) => {
  Object.values(item[1]['files']).forEach((v) => {
    fonts.push([item[0], v]);
  });
});


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

  async rawFont(_, el) {
    this.#fontIndex += 1;
    if (this.#fontIndex < fonts.length) {
      this.resetVars();
      setProp("--adjust-value", this.#adjustment)
      const i = this.#fontIndex;
      const details = fonts[i];
      console.log(`Checking: ${details[0]} - ${details[1]}`);
      if (!this.#data[details[0]]) {
        this.#data[details[0]] = {};
      }
      if (!this.#data[details[0]][details[1]]) {
        const font = new FontFace(details[0], `url("${details[1]}")`);
        document.fonts.add(font);
        await font.load();
        setProp("--test-font", details[0]);
        await sleep(200);
        this.#paddedTarget = pad(el.getBoundingClientRect().height);
        this.api.forward(null, "checkSize");
       } else {
         this.api.forward(null, "rawFont");
       }
    }
  }

  async checkSize(_, el) {
    const currentPadded = pad(el.getBoundingClientRect().height);
    //console.log(this.#increment);
    if (currentPadded < this.#paddedTarget) {
      if (this.#direction === "down") {
        this.#direction = "up";
        this.#increment =  this.#increment / 10;
      }
      this.#adjustment += this.#increment;
      //console.log(`Update: ${this.#adjustment}`);
      setProp("--adjust-value", this.#adjustment);
      window.requestAnimationFrame((t) => { this.api.forward(null, "checkSize"); });
    } else if (currentPadded > this.#paddedTarget) {
      if (this.#direction === "up") {
        this.#direction = "down";
        this.#increment =  this.#increment / 10;
      }
      this.#adjustment -= this.#increment;
      setProp("--adjust-value", this.#adjustment);
      //console.log(`Update: ${this.#adjustment}`);
      window.requestAnimationFrame((t) => { this.api.forward(null, "checkSize"); });
    } else {
      const i = this.#fontIndex;
      const details = fonts[i];
      this.#data[details[0]][details[1]] = trimNum(this.#adjustment);
      this.api.forward(null, "display");
      this.api.forward(null, "rawFont");
    }
  }

  display(_, el) {
    el.innerHTML = JSON.stringify(this.#data, null, 2);
  }

  resetVars() {
    this.#adjustment = 0.1;
    this.#direction = "up";
    this.#increment = 0.1;
    this.#paddedTarget = null;
  }

}
