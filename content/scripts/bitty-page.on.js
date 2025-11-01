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


export default class {
  bittyInit() {
    this.api.fn.setProp("--load-hider", "1");
    this.addFontStyles();
  }

  addFontStyles() {
    const sheet = new CSSStyleSheet();
    const lines = fonts.map((font) => {
      return `@font-face {
        font-family: ${font[0]};
        src: url('/nerd-fonts/${font[0]}/${font[1]}');
      }
      .font-${font[0]} {
        font-family: ${font[0]};
        font-size: 3rem;
      }`
    });
     sheet.replaceSync(lines.join("\n"));
     document.adoptedStyleSheets.push(sheet);
  }

  capture(event, el) {
    if (this.api.match(event, el, "key")) {
      html2canvas(el).then(function(canvas) {
        let url = canvas.toDataURL();
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = `${el.dataset.key}.png`;
        a.click();
      });
    }
  }



  display(_event, el) {
    fonts.forEach((font) => {
      const subs = [["NAME", font[0]]];
      const fontDivs = this.api.makeFragment(tmpl, subs);
      el.appendChild(fontDivs);
    });
  }
};
