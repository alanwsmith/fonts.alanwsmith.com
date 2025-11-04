const fonts = {"ABeeZee": {"files": {"italic": "https://fonts.gstatic.com/s/abeezee/v23/esDT31xSG-6AGleN2tCklZUCGpG-GQ.ttf", "regular": "https://fonts.gstatic.com/s/abeezee/v23/esDR31xSG-6AGleN6tKukbcHCpE.ttf"}}, "ADLaM Display": {"files": {"regular": "https://fonts.gstatic.com/s/adlamdisplay/v1/KFOhCnGXkPOLlhx6jD8_b1ZECsHYkYBPY3o.ttf"}}, "AR One Sans": {"files": {"500": "https://fonts.gstatic.com/s/aronesans/v6/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWk39DW03no5mBF4.ttf", "600": "https://fonts.gstatic.com/s/aronesans/v6/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWqH6DW03no5mBF4.ttf", "700": "https://fonts.gstatic.com/s/aronesans/v6/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWpj6DW03no5mBF4.ttf", "regular": "https://fonts.gstatic.com/s/aronesans/v6/TUZezwhrmbFp0Srr_tH6fv6RcUejHO_u7GF5aXfv-U2QzBLF6gslWn_9DW03no5mBF4.ttf"}}, "Abel": {"files": {"regular": "https://fonts.gstatic.com/s/abel/v18/MwQ5bhbm2POE6VhLPJp6qGI.ttf"}}};

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
  #fontURL = null;
  #adjustment = null;
  #direction = null;
  #increment = null;
  #paddedTarget = null;
  #status = "asdf";

  bittyInit() {
    setProp("--load-hider", "1");
  }

  async calculate(_event, _el) {
    // console.log("Calculating");
    if (this.#fontURL !== null) {
      const name = `font-${self.crypto.randomUUID()}`;
      this.resetVars();
      setProp("--adjust-value", this.#adjustment)
      const font = new FontFace(name, `url("${this.#fontURL}")`);
      document.fonts.add(font);
      await font.load();
      setProp("--test-font", name);
      await sleep(200);
      this.api.forward(null, "rawFont");
      this.api.forward(null, "checkSize");
    } else {
      this.#status = "must have a name and a URL";
    }
    this.api.forward(null, "status");
  }

  async checkSize(_, el) {
    const currentPadded = pad(el.getBoundingClientRect().height);
    if (currentPadded < this.#paddedTarget) {
      if (this.#direction === "down") {
        this.#direction = "up";
        this.#increment =  this.#increment / 10;
      }
      this.#adjustment += this.#increment;
      setProp("--adjust-value", this.#adjustment);
      this.api.forward(null, "status");
      window.requestAnimationFrame((t) => { this.api.forward(null, "checkSize"); });
    } else if (currentPadded > this.#paddedTarget) {
      if (this.#direction === "up") {
        this.#direction = "down";
        this.#increment =  this.#increment / 10;
      }
      this.#adjustment -= this.#increment;
      setProp("--adjust-value", this.#adjustment);
      this.api.forward(null, "status");
      window.requestAnimationFrame((t) => { this.api.forward(null, "checkSize"); });
    } else {
      this.api.forward(null, "status");
    }
  }

  fontURL(event, _) {
    this.#fontURL = event.target.value;
  }

  rawFont(_, el) {
    this.#paddedTarget = pad(el.getBoundingClientRect().height);
  }

  resetVars() {
    this.#adjustment = 0.01;
    this.#direction = "up";
    this.#increment = 0.01;
    this.#paddedTarget = null;
  }

  status(_, el) {
    el.innerHTML = trimNum(this.#adjustment);
  }

}