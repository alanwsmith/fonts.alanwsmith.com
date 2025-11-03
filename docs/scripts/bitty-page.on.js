const fonts = [["AdwaitaMono", "AdwaitaMonoNerdFontMono-Regular.ttf", 118, ""], ["Agave", "AgaveNerdFontMono-Regular.ttf", 101, ""], ["AnonymousPro", "AnonymiceProNerdFontMono-Regular.ttf", 103, ""], ["AtkinsonHyperlegibleMono", "AtkynsonMonoNerdFontMono-Regular.otf", 108, ""], ["AurulentSansMono", "AurulentSansMNerdFontMono-Regular.otf", 117, ""], ["BigBlueTerminal", "BigBlueTerm437NerdFontMono-Regular.ttf", 121, ""], ["BitstreamVeraSansMono", "BitstromWeraNerdFontMono-Regular.ttf", 118, ""], ["CascadiaCode", "CaskaydiaCoveNerdFontMono-Regular.ttf", 112, ""], ["CascadiaMono", "CaskaydiaMonoNerdFontMono-Regular.ttf", 112, ""], ["ComicShannsMono", "ComicShannsMonoNerdFontMono-Regular.otf", 108, ""], ["CommitMono", "CommitMonoNerdFontMono-Regular.otf", 113, ""], ["Cousine", "CousineNerdFontMono-Regular.ttf", 106, ""], ["D2Coding", "D2CodingLigatureNerdFontMono-Regular.ttf", 110, ""], ["DaddyTimeMono", "DaddyTimeMonoNerdFontMono-Regular.ttf", 119, ""], ["DejaVuSansMono", "DejaVuSansMNerdFontMono-Regular.ttf", 117, ""], ["DepartureMono", "DepartureMonoNerdFontMono-Regular.otf", 117, ""], ["DroidSansMono", "DroidSansMNerdFontMono-Regular.otf", 115, ""], ["EnvyCodeR", "EnvyCodeRNerdFontMono-Regular.ttf", 112, ""], ["FantasqueSansMono", "FantasqueSansMNerdFontMono-Regular.ttf", 103, ""], ["FiraCode", "FiraCodeNerdFontMono-Regular.ttf", 114, ""], ["FiraMono", "FiraMonoNerdFontMono-Regular.otf", 111, ""], ["GeistMono", "GeistMonoNerdFontMono-Regular.otf", 115, ""], ["Go-Mono", "GoMonoNerdFontMono-Regular.ttf", 116, ""], ["Gohu", "GohuFont11NerdFontMono-Regular.ttf", 117, ""], ["Hack", "HackNerdFontMono-Regular.ttf", 118, ""], ["Hasklig", "HasklugNerdFontMono-Regular.otf", 106, ""], ["HeavyData", "HeavyDataNerdFont-Regular.ttf", 95, ""], ["Hermit", "HurmitNerdFontMono-Regular.otf", 121, ""], ["iA-Writer", "iMWritingMonoNerdFontMono-Regular.ttf", 112, ""], ["IBMPlexMono", "BlexMonoNerdFontMono-Regular.ttf", 113, ""], ["Inconsolata", "InconsolataNerdFontMono-Regular.ttf", 101, ""], ["InconsolataGo", "InconsolataGoNerdFontMono-Regular.ttf", 101, ""], ["InconsolataLGC", "InconsolataLGCNerdFontMono-Regular.ttf", 116, ""], ["IntelOneMono", "IntoneMonoNerdFontMono-Regular.ttf", 106, ""], ["Iosevka", "IosevkaNerdFontMono-Regular.ttf", 118, ""], ["IosevkaTerm", "IosevkaTermNerdFontMono-Regular.ttf", 118, ""], ["IosevkaTermSlab", "IosevkaTermSlabNerdFontMono-Regular.ttf", 118, ""], ["JetBrainsMono", "JetBrainsMonoNerdFontMono-Regular.ttf", 118, ""], ["Lekton", "LektonNerdFontMono-Regular.ttf", 105, ""], ["LiberationMono", "LiterationMonoNerdFontMono-Regular.ttf", 106, ""], ["Lilex", "LilexNerdFontMono-Regular.ttf", 112, ""], ["MPlus", "MCodeLat60NerdFontMono-Regular.ttf", 117, ""], ["MartianMono", "MartianMonoNerdFontMono-Regular.ttf", 129, ""], ["Meslo", "MesloLGSNerdFontMono-Regular.ttf", 117, ""], ["Monaspace", "MonaspiceRnNerdFontMono-Regular.otf", 123, ""], ["Monofur", "MonofurNerdFontMono-Regular.ttf", 101, ""], ["Monoid", "MonoidNerdFontMono-Regular.ttf", 147, ""], ["Mononoki", "MononokiNerdFontMono-Regular.ttf", 111, ""], ["Noto", "NotoSansMNerdFontMono-Regular.ttf", 115, ""], ["Overpass", "OverpassMNerdFontMono-Regular.otf", 113, ""], ["ProFont", "ProFontWindowsNerdFontMono-Regular.ttf", 94, ""], ["ProggyClean", "ProggyCleanSZNerdFontMono-Regular.ttf", 80, ""], ["Recursive", "RecMonoLinearNerdFontMono-Regular.ttf", 113, ""], ["RobotoMono", "RobotoMonoNerdFontMono-Regular.ttf", 114, ""], ["ShareTechMono", "ShureTechMonoNerdFontMono-Regular.ttf", 112, ""], ["SourceCodePro", "SauceCodeProNerdFontMono-Regular.ttf", 105, ""], ["SpaceMono", "SpaceMonoNerdFontMono-Regular.ttf", 113, ""], ["Terminus", "TerminessNerdFontMono-Regular.ttf", 101, ""], ["UbuntuMono", "UbuntuMonoNerdFontMono-Regular.ttf", 100, ""], ["UbuntuSans", "UbuntuSansMonoNerdFontMono-Regular.ttf", 111, ""], ["VictorMono", "VictorMonoNerdFontMono-Regular.ttf", 117, ""], ["ZedMono", "ZedMonoNerdFontMono-Regular.ttf", 118, ""], ["z_0xProto", "0xProtoNerdFontMono-Regular.ttf", 114, ""], ["z_3270", "3270NerdFontMono-Regular.ttf", 88, ""]]

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