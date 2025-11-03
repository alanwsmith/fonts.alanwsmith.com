const fonts = [["AdwaitaMono", "AdwaitaMonoNerdFontMono-Regular.ttf", ""], ["Agave", "AgaveNerdFontMono-Regular.ttf", ""], ["AnonymousPro", "AnonymiceProNerdFontMono-Regular.ttf", ""], ["AtkinsonHyperlegibleMono", "AtkynsonMonoNerdFontMono-Regular.otf", ""], ["AurulentSansMono", "AurulentSansMNerdFontMono-Regular.otf", ""], ["BigBlueTerminal", "BigBlueTerm437NerdFontMono-Regular.ttf", ""], ["BitstreamVeraSansMono", "BitstromWeraNerdFontMono-Regular.ttf", ""], ["CascadiaCode", "CaskaydiaCoveNerdFontMono-Regular.ttf", ""], ["CascadiaMono", "CaskaydiaMonoNerdFontMono-Regular.ttf", ""], ["ComicShannsMono", "ComicShannsMonoNerdFontMono-Regular.otf", ""], ["CommitMono", "CommitMonoNerdFontMono-Regular.otf", ""], ["Cousine", "CousineNerdFontMono-Regular.ttf", ""], ["D2Coding", "D2CodingLigatureNerdFontMono-Regular.ttf", ""], ["DaddyTimeMono", "DaddyTimeMonoNerdFontMono-Regular.ttf", ""], ["DejaVuSansMono", "DejaVuSansMNerdFontMono-Regular.ttf", ""], ["DepartureMono", "DepartureMonoNerdFontMono-Regular.otf", ""], ["DroidSansMono", "DroidSansMNerdFontMono-Regular.otf", ""], ["EnvyCodeR", "EnvyCodeRNerdFontMono-Regular.ttf", ""], ["FantasqueSansMono", "FantasqueSansMNerdFontMono-Regular.ttf", ""], ["FiraCode", "FiraCodeNerdFontMono-Regular.ttf", ""], ["FiraMono", "FiraMonoNerdFontMono-Regular.otf", ""], ["GeistMono", "GeistMonoNerdFontMono-Regular.otf", ""], ["Go-Mono", "GoMonoNerdFontMono-Regular.ttf", ""], ["Gohu", "GohuFont11NerdFontMono-Regular.ttf", ""], ["Hack", "HackNerdFontMono-Regular.ttf", ""], ["Hasklig", "HasklugNerdFontMono-Regular.otf", ""], ["HeavyData", "HeavyDataNerdFont-Regular.ttf", ""], ["Hermit", "HurmitNerdFontMono-Regular.otf", ""], ["iA-Writer", "iMWritingMonoNerdFontMono-Regular.ttf", ""], ["IBMPlexMono", "BlexMonoNerdFontMono-Regular.ttf", ""], ["Inconsolata", "InconsolataNerdFontMono-Regular.ttf", ""], ["InconsolataGo", "InconsolataGoNerdFontMono-Regular.ttf", ""], ["InconsolataLGC", "InconsolataLGCNerdFontMono-Regular.ttf", ""], ["IntelOneMono", "IntoneMonoNerdFontMono-Regular.ttf", ""], ["Iosevka", "IosevkaNerdFontMono-Regular.ttf", ""], ["IosevkaTerm", "IosevkaTermNerdFontMono-Regular.ttf", ""], ["IosevkaTermSlab", "IosevkaTermSlabNerdFontMono-Regular.ttf", ""], ["JetBrainsMono", "JetBrainsMonoNerdFontMono-Regular.ttf", ""], ["Lekton", "LektonNerdFontMono-Regular.ttf", ""], ["LiberationMono", "LiterationMonoNerdFontMono-Regular.ttf", ""], ["Lilex", "LilexNerdFontMono-Regular.ttf", ""], ["MPlus", "MCodeLat60NerdFontMono-Regular.ttf", ""], ["MartianMono", "MartianMonoNerdFontMono-Regular.ttf", ""], ["Meslo", "MesloLGSNerdFontMono-Regular.ttf", ""], ["Monaspace", "MonaspiceRnNerdFontMono-Regular.otf", ""], ["Monofur", "MonofurNerdFontMono-Regular.ttf", ""], ["Monoid", "MonoidNerdFontMono-Regular.ttf", ""], ["Mononoki", "MononokiNerdFontMono-Regular.ttf", ""], ["Noto", "NotoSansMNerdFontMono-Regular.ttf", ""], ["Overpass", "OverpassMNerdFontMono-Regular.otf", ""], ["ProFont", "ProFontWindowsNerdFontMono-Regular.ttf", ""], ["ProggyClean", "ProggyCleanSZNerdFontMono-Regular.ttf", ""], ["Recursive", "RecMonoLinearNerdFontMono-Regular.ttf", ""], ["RobotoMono", "RobotoMonoNerdFontMono-Regular.ttf", ""], ["ShareTechMono", "ShureTechMonoNerdFontMono-Regular.ttf", ""], ["SourceCodePro", "SauceCodeProNerdFontMono-Regular.ttf", ""], ["SpaceMono", "SpaceMonoNerdFontMono-Regular.ttf", ""], ["Terminus", "TerminessNerdFontMono-Regular.ttf", ""], ["UbuntuMono", "UbuntuMonoNerdFontMono-Regular.ttf", ""], ["UbuntuSans", "UbuntuSansMonoNerdFontMono-Regular.ttf", ""], ["VictorMono", "VictorMonoNerdFontMono-Regular.ttf", ""], ["ZedMono", "ZedMonoNerdFontMono-Regular.ttf", ""], ["0xProto", "0xProtoNerdFontMono-Regular.ttf", ""], ["3270", "3270NerdFontMono-Regular.ttf", ""]]

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

  check(_, el) {
    var ctx = el.getContext("2d");
    var text = "b";
    ctx.save();
//     ctx.font = "Arial Black";
    ctx.clearRect(0,0,300,300);
    ctx.fillText(text, 0, 20);
    ctx.restore();
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