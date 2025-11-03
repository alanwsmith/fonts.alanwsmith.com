const fonts = [@ json.data.fonts.fonts @]

const tmpl = `
<div>
  <button data-send="capture" data-key="NAME">Capture NAME</button>
  <div class="sample" data-receive="capture" data-key="NAME"> 
    <div class="font-NAME">NAME</div>
    <div>
      <div class="font-NAME">abcdefghijklmnopqrstuvwxyz</div>
      <div class="font-NAME">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
    </div>
  </div>
</div>
`;

function setProp(key, value) {
  document.documentElement.style.setProperty(key, value);
}

export default class {
  bittyInit() {
    setProp("--load-hider", "1");
    // this.addFontStyles();
  }

  initClick(_, el) {
    el.click();
  }

  baseline(event, el) {
    const value = event.target.getBoundingClientRect().height;
    el.innerHTML = value;
  }


  // addFontStyles() {
  //   const sheet = new CSSStyleSheet();
  //   const lines = fonts.map((font) => {
  //     return `@font-face {
  //       font-family: ${font[0]};
  //       src: url('/nerd-fonts/${font[0]}/${font[1]}');
  //     }
  //     .font-${font[0]} {
  //       font-family: ${font[0]};
  //       font-size: 5rem;
  //     }`
  //   });
  //    sheet.replaceSync(lines.join("\n"));
  //    document.adoptedStyleSheets.push(sheet);
  // }

  // capture(event, el) {
  //   if (this.api.match(event, el, "key")) {
  //     html2canvas(el).then(function(canvas) {
  //       let url = canvas.toDataURL();
  //       var a = document.createElement("a");
  //       document.body.appendChild(a);
  //       a.href = url;
  //       a.download = `${el.dataset.key}.png`;
  //       a.click();
  //     });
  //   }
  // }

  display(_event, el) {
    fonts.forEach((font) => {
      const subs = [["NAME", font[0]]];
      const fontDivs = this.api.makeElements(tmpl, subs);
      el.appendChild(fontDivs);
    });
  }

};


// from: https://stackoverflow.com/questions/16816071/calculate-exact-character-string-height-in-javascript/16823769#16823769
function measureTextHeight(fontSizeFace) {

    // create a temp canvas
    var width=300;
    var height=300;
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
