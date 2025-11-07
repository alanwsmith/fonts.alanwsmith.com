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
  #fontName = "";
  #fontURL = "";

  #adjustment = 0.1;
  #direction = "up";
  #increment = 0.01;
  #paddedTarget = null;
  #data = {};

  bittyInit() {
    setProp("--load-hider", "1");
  }

  calculate(_event, _el) {
    if (this.#fontName !== "" && this.#fontURL !== "") {
      this.api.forward(null, "rawFont");
    } else {
      this.api.forward(null, "newStyle");
    }
  }

  async checkSize(_, el) {
    console.log("here1");
    const currentPadded = pad(el.getBoundingClientRect().height);
    console.log(this.#increment);
    console.log(currentPadded);
    console.log(this.#paddedTarget);
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
      console.log(`Finalized: ${this.#adjustment}`);


      // this.#data[fonts[this.#fontIndex][0]] = trimNum(this.#adjustment);
      //this.api.forward(null, "display");
      // this.api.forward(null, "rawFont");
    }
  }

  // https://fonts.gstatic.com/s/abeezee/v23/esDT31xSG-6AGleN2tCklZUCGpG-GQ.ttf
  async rawFont(_event, el) {
    setProp("--adjust-value", this.#adjustment);
    try {
      await sleep(400);
      const font = new FontFace(`font-to-calculate`, `url("${this.#fontURL}")`);
      document.fonts.add(font);
      await font.load();
      await sleep(400);
      this.#paddedTarget = pad(el.getBoundingClientRect().height);
      console.log(this.#paddedTarget);
      this.api.forward(null, "checkSize");
    } catch (error) {
      console.log(error);
    }
  }

  fontName(event, _el) {
    this.#fontName = event.target.value;
  }

  fontURL(event, _el) {
    this.#fontURL = event.target.value;
  }

  newStyle(_event, el) {
    if (this.#fontName !== "" && this.#fontURL !== "") {
      el.innerHTML = "new style";
    } else {
      el.innerHTML = "Both Font Name and\nFont File URL\nmust be filled out";
    }
  }


  // async rawFont(_, el) {
  //   this.#fontIndex += 1;
  //   if (this.#fontIndex < fonts.length) {
  //     this.resetVars();
  //     setProp("--adjust-value", this.#adjustment)
  //     const i = this.#fontIndex;
  //     const details = fonts[i];
  //     console.log(`Checking: ${details[0]}`);
  //     const url = `/nerd-fonts/${details[0]}/${details[1]}`;
  //     const font = new FontFace(`font-${details[0]}`, `url("${url}")`);
  //     document.fonts.add(font);
  //     await font.load();
  //     setProp("--test-font", `font-${details[0]}`);
  //     await sleep(200);
  //     this.#paddedTarget = pad(el.getBoundingClientRect().height);
  //     this.api.forward(null, "checkSize");
  //   }
  // }

  // async checkSize(_, el) {
  //   const currentPadded = pad(el.getBoundingClientRect().height);
  //   console.log(this.#increment);
  //   if (currentPadded < this.#paddedTarget) {
  //     if (this.#direction === "down") {
  //       this.#direction = "up";
  //       this.#increment =  this.#increment / 10;
  //     }
  //     this.#adjustment += this.#increment;
  //     console.log(`Update: ${this.#adjustment}`);
  //     setProp("--adjust-value", this.#adjustment);
  //     window.requestAnimationFrame((t) => { this.api.forward(null, "checkSize"); });
  //   } else if (currentPadded > this.#paddedTarget) {
  //     if (this.#direction === "up") {
  //       this.#direction = "down";
  //       this.#increment =  this.#increment / 10;
  //     }
  //     this.#adjustment -= this.#increment;
  //     setProp("--adjust-value", this.#adjustment);
  //     console.log(`Update: ${this.#adjustment}`);
  //     window.requestAnimationFrame((t) => { this.api.forward(null, "checkSize"); });
  //   } else {
  //     this.#data[fonts[this.#fontIndex][0]] = trimNum(this.#adjustment);
  //     this.api.forward(null, "display");
  //     this.api.forward(null, "rawFont");
  //   }
  // }

  // display(_, el) {
  //   el.innerHTML = JSON.stringify(this.#data, null, 2);
  // }

}

