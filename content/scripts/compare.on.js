function pad(input) {
  return Math.floor(input * 1000); 
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setProp(key, value) {
  document.documentElement.style.setProperty(key, value);
}


export default class {
  #paddedTarget = null;
  #adjustment = 0.1;
  #increment = 0.1;
  #direction = "up";

  bittyInit() {
    setProp("--load-hider", "1");
    setProp("--adjust-value", this.#adjustment)
  }

  initSize(_, el) {
    this.#paddedTarget = pad(el.getBoundingClientRect().height);
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
      console.log(`Final: ${this.#adjustment}`);
    }
  }

}

