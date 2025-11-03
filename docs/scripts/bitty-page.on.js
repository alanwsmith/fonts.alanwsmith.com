const fonts = [["AdwaitaMono", "AdwaitaMonoNerdFontMono-Regular.ttf", ""], ["Agave", "AgaveNerdFontMono-Regular.ttf", ""], ["AnonymousPro", "AnonymiceProNerdFontMono-Regular.ttf", ""], ["AtkinsonHyperlegibleMono", "AtkynsonMonoNerdFontMono-Regular.otf", ""], ["AurulentSansMono", "AurulentSansMNerdFontMono-Regular.otf", ""], ["BigBlueTerminal", "BigBlueTerm437NerdFontMono-Regular.ttf", ""], ["BitstreamVeraSansMono", "BitstromWeraNerdFontMono-Regular.ttf", ""], ["CascadiaCode", "CaskaydiaCoveNerdFontMono-Regular.ttf", ""], ["CascadiaMono", "CaskaydiaMonoNerdFontMono-Regular.ttf", ""], ["ComicShannsMono", "ComicShannsMonoNerdFontMono-Regular.otf", ""], ["CommitMono", "CommitMonoNerdFontMono-Regular.otf", ""], ["Cousine", "CousineNerdFontMono-Regular.ttf", ""], ["D2Coding", "D2CodingLigatureNerdFontMono-Regular.ttf", ""], ["DaddyTimeMono", "DaddyTimeMonoNerdFontMono-Regular.ttf", ""], ["DejaVuSansMono", "DejaVuSansMNerdFontMono-Regular.ttf", ""], ["DepartureMono", "DepartureMonoNerdFontMono-Regular.otf", ""], ["DroidSansMono", "DroidSansMNerdFontMono-Regular.otf", ""], ["EnvyCodeR", "EnvyCodeRNerdFontMono-Regular.ttf", ""], ["FantasqueSansMono", "FantasqueSansMNerdFontMono-Regular.ttf", ""], ["FiraCode", "FiraCodeNerdFontMono-Regular.ttf", ""], ["FiraMono", "FiraMonoNerdFontMono-Regular.otf", ""], ["GeistMono", "GeistMonoNerdFontMono-Regular.otf", ""], ["Go-Mono", "GoMonoNerdFontMono-Regular.ttf", ""], ["Gohu", "GohuFont11NerdFontMono-Regular.ttf", ""], ["Hack", "HackNerdFontMono-Regular.ttf", ""], ["Hasklig", "HasklugNerdFontMono-Regular.otf", ""], ["HeavyData", "HeavyDataNerdFont-Regular.ttf", ""], ["Hermit", "HurmitNerdFontMono-Regular.otf", ""], ["iA-Writer", "iMWritingMonoNerdFontMono-Regular.ttf", ""], ["IBMPlexMono", "BlexMonoNerdFontMono-Regular.ttf", ""], ["Inconsolata", "InconsolataNerdFontMono-Regular.ttf", ""], ["InconsolataGo", "InconsolataGoNerdFontMono-Regular.ttf", ""], ["InconsolataLGC", "InconsolataLGCNerdFontMono-Regular.ttf", ""], ["IntelOneMono", "IntoneMonoNerdFontMono-Regular.ttf", ""], ["Iosevka", "IosevkaNerdFontMono-Regular.ttf", ""], ["IosevkaTerm", "IosevkaTermNerdFontMono-Regular.ttf", ""], ["IosevkaTermSlab", "IosevkaTermSlabNerdFontMono-Regular.ttf", ""], ["JetBrainsMono", "JetBrainsMonoNerdFontMono-Regular.ttf", ""], ["Lekton", "LektonNerdFontMono-Regular.ttf", ""], ["LiberationMono", "LiterationMonoNerdFontMono-Regular.ttf", ""], ["Lilex", "LilexNerdFontMono-Regular.ttf", ""], ["MPlus", "MCodeLat60NerdFontMono-Regular.ttf", ""], ["MartianMono", "MartianMonoNerdFontMono-Regular.ttf", ""], ["Meslo", "MesloLGSNerdFontMono-Regular.ttf", ""], ["Monaspace", "MonaspiceRnNerdFontMono-Regular.otf", ""], ["Monofur", "MonofurNerdFontMono-Regular.ttf", ""], ["Monoid", "MonoidNerdFontMono-Regular.ttf", ""], ["Mononoki", "MononokiNerdFontMono-Regular.ttf", ""], ["Noto", "NotoSansMNerdFontMono-Regular.ttf", ""], ["Overpass", "OverpassMNerdFontMono-Regular.otf", ""], ["ProFont", "ProFontWindowsNerdFontMono-Regular.ttf", ""], ["ProggyClean", "ProggyCleanSZNerdFontMono-Regular.ttf", ""], ["Recursive", "RecMonoLinearNerdFontMono-Regular.ttf", ""], ["RobotoMono", "RobotoMonoNerdFontMono-Regular.ttf", ""], ["ShareTechMono", "ShureTechMonoNerdFontMono-Regular.ttf", ""], ["SourceCodePro", "SauceCodeProNerdFontMono-Regular.ttf", ""], ["SpaceMono", "SpaceMonoNerdFontMono-Regular.ttf", ""], ["Terminus", "TerminessNerdFontMono-Regular.ttf", ""], ["UbuntuMono", "UbuntuMonoNerdFontMono-Regular.ttf", ""], ["UbuntuSans", "UbuntuSansMonoNerdFontMono-Regular.ttf", ""], ["VictorMono", "VictorMonoNerdFontMono-Regular.ttf", ""], ["ZedMono", "ZedMonoNerdFontMono-Regular.ttf", ""], ["0xProto", "0xProtoNerdFontMono-Regular.ttf", ""], ["3270", "3270NerdFontMono-Regular.ttf", ""]]

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