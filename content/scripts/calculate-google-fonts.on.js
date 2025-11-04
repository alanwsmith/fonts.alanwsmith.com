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
      console.log(`Checking: ${details[0]}`);
      const font = new FontFace(details[0], `url("${details[1]}")`);
       document.fonts.add(font);
       await font.load();
       setProp("--test-font", details[0]);
       await sleep(200);
       this.#paddedTarget = pad(el.getBoundingClientRect().height);
       this.api.forward(null, "checkSize");
    }
  }

  resetVars() {
    this.#adjustment = 0.1;
    this.#direction = "up";
    this.#increment = 0.1;
    this.#paddedTarget = null;
  }

}
