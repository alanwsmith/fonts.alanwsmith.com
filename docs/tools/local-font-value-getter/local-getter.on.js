const fonts = [
"Arial",
"Arial Black",
"Arial Rounded MT",
"Arial Rounded MT Bold",
"Avenir",
"Bahnschrift",
"Bitstream Charter",
"Bodoni MT",
"Bookman Old Style",
"Bradley Hand",
"Calibri",
"Cambria",
"Candara",
"Cascadia Code",
"Charter",
"Chilanka",
"Comfortaa",
"Consolas",
"Corbel",
"Courier New",
"DejaVu Sans",
"DejaVu Sans Mono",
"DejaVu Serif",
"Didot",
"DIN Alternate",
"Franklin Gothic Medium",
"Georgia",
"Georgia Pro",
"Gill Sans Nova",
"Helvetica Neue",
"Hiragino Maru Gothic ProN",
"Inter",
"Iowan Old Style",
"Manjari",
"Menlo",
"Montserrat",
"Nimbus Mono PS",
"Nimbus Sans",
"Nimbus Sans Narrow",
"Noto Sans",
"Noto Serif Display",
"Optima",
"P052",
"Palatino Linotype",
"Quicksand",
"Roboto",
"Roboto Slab",
"Rockwell",
"Rockwell Nova",
"Segoe Print",
"Seravek",
"Sitka Small",
"Sitka Text",
"Source Code Pro",
"Superclarendon",
"Sylfaen",
"Tahoma",
"Times New Roman",
"Trebuchet MS",
"TSCu_Comic",
"Ubuntu",
"URW Bookman",
"URW Bookman L",
"URW Gothic",
"URW Palladio L",
"Verdana"
];

async function isFontAvailable(fontName) {
  try {
    const base = `position:absolute;top:0;left:0;opacity:0;`;
    const checker = document.createElement("div");
    const s = new Set();
    checker.style = `${base}font-family:cursive;`;
    checker.innerHTML = self.crypto.randomUUID();
    await document.body.appendChild(checker);
    s.add(checker.getBoundingClientRect().width);
    checker.style = `${base}font-family:"${fontName}", cursive;`;
    await document.fonts.ready;
    s.add(checker.getBoundingClientRect().width);
    checker.remove();
    return { value: s.size === 2 };
  } catch (error) {
    return { error: error };
  }
}

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
  #localStorageName = "localFontsV1";

  bittyInit() {
    const savedData = localStorage.getItem(this.#localStorageName);
    if (savedData) {
      this.#data = JSON.parse(savedData);
    }
    console.log(this.#data);
    this.resetVars();
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
      window.requestAnimationFrame((t) => { this.api.forward(null, "checkSize"); });
    } else if (currentPadded > this.#paddedTarget) {
      if (this.#direction === "up") {
        this.#direction = "down";
        this.#increment =  this.#increment / 10;
      }
      this.#adjustment -= this.#increment;
      setProp("--adjust-value", this.#adjustment);
      window.requestAnimationFrame((t) => { this.api.forward(null, "checkSize"); });
    } else {
      const i = this.#fontIndex;
      const fontName = fonts[i];
      this.#data[fontName] = 
        {
          value: trimNum(this.#adjustment)
        };
      localStorage.setItem(this.#localStorageName, JSON.stringify(this.#data));
      this.api.forward(null, "display");
      this.api.forward(null, "rawFont");
    }
  }

  async copyData(_, el) {
    const jsonString =  JSON.stringify(this.#data, null, 2);
    try {
      await navigator.clipboard.writeText(
        jsonString
      )
    } catch (err) {
      console.error("Could not copy to clipboard")
    }
    el.innerHTML = "copied to clipboard";
  }

  async rawFont(_, el) {
    this.#fontIndex += 1;
    if (this.#fontIndex < fonts.length) {
      this.resetVars();
      const fontName = fonts[this.#fontIndex];
      setProp("--adjust-value", this.#adjustment)
      console.log(`Checking: ${fontName}`);
      const isAvailable = await isFontAvailable(fontName);
      if (isAvailable.value && !this.#data[fontName])  {
        console.log(`Found: ${fontName}`);
        setProp("--test-font", fontName);
        await sleep(200);
        this.#paddedTarget = pad(el.getBoundingClientRect().height);
        this.api.forward(null, "checkSize");
      } else {
        this.api.forward(null, "rawFont");
      }
    }
  }


  resetVars() {
    this.#adjustment = 0.1;
    this.#direction = "up";
    this.#increment = 0.1;
    this.#paddedTarget = null;
  }

}