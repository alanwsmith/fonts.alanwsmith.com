const fontObject = {"ABeeZee": {"files": {"italic": "https://fonts.gstatic.com/s/abeezee/v23/esDT31xSG-6AGleN2tCklZUCGpG-GQ.ttf", "regular": "https://fonts.gstatic.com/s/abeezee/v23/esDR31xSG-6AGleN6tKukbcHCpE.ttf"}}, "ADLaM Display": {"files": {"regular": "https://fonts.gstatic.com/s/adlamdisplay/v1/KFOhCnGXkPOLlhx6jD8_b1ZECsHYkYBPY3o.ttf"}}, "AR One Sans": {"files": {"500": "https://fonts.gstatic.com/s/aronesans/v6/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWk39DW03no5mBF4.ttf", "600": "https://fonts.gstatic.com/s/aronesans/v6/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWqH6DW03no5mBF4.ttf", "700": "https://fonts.gstatic.com/s/aronesans/v6/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWpj6DW03no5mBF4.ttf", "regular": "https://fonts.gstatic.com/s/aronesans/v6/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWn_9DW03no5mBF4.ttf"}}, "Abel": {"files": {"regular": "https://fonts.gstatic.com/s/abel/v18/MwQ5bhbm2POE6VhLPJp6qGI.ttf"}}}
const fonts = [];

Object.entries(fontObject).forEach((item) => {
  Object.entries(item[1]['files']).forEach((data) => {
    fonts.push({ name: item[0], key: data[0], url: data[1]});
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
   localStorage.setItem("googleFonts", "{}");
    const savedData = localStorage.getItem("googleFonts");
    if (savedData) {
      this.#data = JSON.parse(savedData);
    }
     console.log(this.#data);
    this.resetVars();
  }

  async rawFont(_, el) {
    this.#fontIndex += 1;
    if (this.#fontIndex < fonts.length) {
      this.resetVars();
      setProp("--adjust-value", this.#adjustment)
      const i = this.#fontIndex;
      const details = fonts[i];
      console.log(`Checking: ${details.name} - ${details.key}`);
      if (!this.#data[details.name]) {
        this.#data[details.name] = {};
      }
      if (!this.#data[details.name][details.key]) {
        const font = new FontFace(details.name, `url("${details.url}")`);
        document.fonts.add(font);
        await font.load();
        setProp("--test-font", details.name);
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
      this.#data[details.name][details.key] = 
        {
          url: details.url,
          value: trimNum(this.#adjustment)
        };
      localStorage.setItem("googleFonts", JSON.stringify(this.#data));
      this.api.forward(null, "display");
      this.api.forward(null, "rawFont");
    }
  }

  display(_, el) {
    const i = this.#fontIndex;
    const details = fonts[i];
    el.innerHTML = `${trimNum(this.#adjustment)} - ${details.name}`;
  }

  resetVars() {
    this.#adjustment = 0.1;
    this.#direction = "up";
    this.#increment = 0.1;
    this.#paddedTarget = null;
  }

}