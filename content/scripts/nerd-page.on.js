const fonts = [@ json.data.fonts.fonts @]

const tmpl = `
<div>
  <div>NAME: <span data-receive="showSize" data-name="NAME">-</span></div>
  <div class="displayLine" style="font-size: 10rem; font-family: NAME;">
    <div class="regular">X</div>
    <div class="trimmed" data-receive="loadSize" data-name="NAME">M</div>
  </div>
</div>`


function setProp(key, value) {
  document.documentElement.style.setProperty(key, value);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class {
  #heights = {};

  bittyInit() {
    setProp("--load-hider", "1");
  }

  loadSize(_, el) {
    const height = el.getBoundingClientRect().height;
    this.#heights[el.dataset.name] = height ;
    const data = window.getComputedStyle(el);
    console.log(data);
  }

  async nerdInit(_, el) {
    let uiSubs = [["NAME", "system-ui"]]
    let sysEl = this.api.makeElement(tmpl, uiSubs);
    await el.appendChild(sysEl);


    for (let i = 0; i < fonts.length; i += 1) {
      const details = fonts[i];
      const url = `/nerd-fonts/${details[0]}/${details[1]}`;
      const font = new FontFace(`${details[0]}`, `url("${url}")`);
      document.fonts.add(font);
      await font.load();
      const subs = [["NAME", details[0]]];
      const newEl = this.api.makeElement(tmpl, subs);
      await el.appendChild(newEl);
    }
    this.api.forward(null, "loadSize");
    this.api.forward(null, "showSize");
    // this.api.forward(null, "output");
  }

  output(_, el) {
    el.innerHTML = "asdf";
  }

  showSize(_, el) {
    const name = el.dataset.name;
    console.log(name);
    el.innerHTML = this.#heights[name];
  }


};

// from: https://stackoverflow.com/questions/16816071/calculate-exact-character-string-height-in-javascript/16823769#16823769
function measureTextHeight(fontSizeFace) {

    // create a temp canvas
    var width=1000;
    var height=60;
    var canvas=document.createElement("canvas");
    canvas.width=width;
    canvas.height=height;
    var ctx=canvas.getContext("2d");

    // Draw the entire a-z/A-Z alphabet in the canvas
    var text="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    ctx.save();
    ctx.font=fontSizeFace;
    ctx.clearRect(0,0,width,height);
    ctx.fillText(text, 0, 40);
    ctx.restore();

    // Get the pixel data from the canvas
    var data = ctx.getImageData(0,0,width,height).data,
        first = false, 
        last = false,
        r = height,
        c = 0;

    // Find the last line with a non-transparent pixel
    while(!last && r) {
        r--;
        for(c = 0; c < width; c++) {
            if(data[r * width * 4 + c * 4 + 3]) {
                last = r;
                break;
            }
        }
    }

    // Find the first line with a non-transparent pixel
    while(r) {
        r--;
        for(c = 0; c < width; c++) {
            if(data[r * width * 4 + c * 4 + 3]) {
                first = r;
                break;
            }
        }

        // If we've got it then return the height
        if(first != r) return last - first;
    }

    // error condition if we get here
    return 0;
}
