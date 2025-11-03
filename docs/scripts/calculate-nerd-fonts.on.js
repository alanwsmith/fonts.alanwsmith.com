const fonts = [["AdwaitaMono", "AdwaitaMonoNerdFontMono-Regular.ttf", 118, ""], ["Agave", "AgaveNerdFontMono-Regular.ttf", 101, ""], ["AnonymousPro", "AnonymiceProNerdFontMono-Regular.ttf", 103, ""], ["AtkinsonHyperlegibleMono", "AtkynsonMonoNerdFontMono-Regular.otf", 108, ""], ["AurulentSansMono", "AurulentSansMNerdFontMono-Regular.otf", 117, ""], ["BigBlueTerminal", "BigBlueTerm437NerdFontMono-Regular.ttf", 121, ""], ["BitstreamVeraSansMono", "BitstromWeraNerdFontMono-Regular.ttf", 118, ""], ["CascadiaCode", "CaskaydiaCoveNerdFontMono-Regular.ttf", 112, ""], ["CascadiaMono", "CaskaydiaMonoNerdFontMono-Regular.ttf", 112, ""], ["ComicShannsMono", "ComicShannsMonoNerdFontMono-Regular.otf", 108, ""], ["CommitMono", "CommitMonoNerdFontMono-Regular.otf", 113, ""], ["Cousine", "CousineNerdFontMono-Regular.ttf", 106, ""], ["D2Coding", "D2CodingLigatureNerdFontMono-Regular.ttf", 110, ""], ["DaddyTimeMono", "DaddyTimeMonoNerdFontMono-Regular.ttf", 119, ""], ["DejaVuSansMono", "DejaVuSansMNerdFontMono-Regular.ttf", 117, ""], ["DepartureMono", "DepartureMonoNerdFontMono-Regular.otf", 117, ""], ["DroidSansMono", "DroidSansMNerdFontMono-Regular.otf", 115, ""], ["EnvyCodeR", "EnvyCodeRNerdFontMono-Regular.ttf", 112, ""], ["FantasqueSansMono", "FantasqueSansMNerdFontMono-Regular.ttf", 103, ""], ["FiraCode", "FiraCodeNerdFontMono-Regular.ttf", 114, ""], ["FiraMono", "FiraMonoNerdFontMono-Regular.otf", 111, ""], ["GeistMono", "GeistMonoNerdFontMono-Regular.otf", 115, ""], ["Go-Mono", "GoMonoNerdFontMono-Regular.ttf", 116, ""], ["Gohu", "GohuFont11NerdFontMono-Regular.ttf", 117, ""], ["Hack", "HackNerdFontMono-Regular.ttf", 118, ""], ["Hasklig", "HasklugNerdFontMono-Regular.otf", 106, ""], ["HeavyData", "HeavyDataNerdFont-Regular.ttf", 95, ""], ["Hermit", "HurmitNerdFontMono-Regular.otf", 121, ""], ["iA-Writer", "iMWritingMonoNerdFontMono-Regular.ttf", 112, ""], ["IBMPlexMono", "BlexMonoNerdFontMono-Regular.ttf", 113, ""], ["Inconsolata", "InconsolataNerdFontMono-Regular.ttf", 101, ""], ["InconsolataGo", "InconsolataGoNerdFontMono-Regular.ttf", 101, ""], ["InconsolataLGC", "InconsolataLGCNerdFontMono-Regular.ttf", 116, ""], ["IntelOneMono", "IntoneMonoNerdFontMono-Regular.ttf", 106, ""], ["Iosevka", "IosevkaNerdFontMono-Regular.ttf", 118, ""], ["IosevkaTerm", "IosevkaTermNerdFontMono-Regular.ttf", 118, ""], ["IosevkaTermSlab", "IosevkaTermSlabNerdFontMono-Regular.ttf", 118, ""], ["JetBrainsMono", "JetBrainsMonoNerdFontMono-Regular.ttf", 118, ""], ["Lekton", "LektonNerdFontMono-Regular.ttf", 105, ""], ["LiberationMono", "LiterationMonoNerdFontMono-Regular.ttf", 106, ""], ["Lilex", "LilexNerdFontMono-Regular.ttf", 112, ""], ["MPlus", "MCodeLat60NerdFontMono-Regular.ttf", 117, ""], ["MartianMono", "MartianMonoNerdFontMono-Regular.ttf", 129, ""], ["Meslo", "MesloLGSNerdFontMono-Regular.ttf", 117, ""], ["Monaspace", "MonaspiceRnNerdFontMono-Regular.otf", 123, ""], ["Monofur", "MonofurNerdFontMono-Regular.ttf", 101, ""], ["Monoid", "MonoidNerdFontMono-Regular.ttf", 147, ""], ["Mononoki", "MononokiNerdFontMono-Regular.ttf", 111, ""], ["Noto", "NotoSansMNerdFontMono-Regular.ttf", 115, ""], ["Overpass", "OverpassMNerdFontMono-Regular.otf", 113, ""], ["ProFont", "ProFontWindowsNerdFontMono-Regular.ttf", 94, ""], ["ProggyClean", "ProggyCleanSZNerdFontMono-Regular.ttf", 80, ""], ["Recursive", "RecMonoLinearNerdFontMono-Regular.ttf", 113, ""], ["RobotoMono", "RobotoMonoNerdFontMono-Regular.ttf", 114, ""], ["ShareTechMono", "ShureTechMonoNerdFontMono-Regular.ttf", 112, ""], ["SourceCodePro", "SauceCodeProNerdFontMono-Regular.ttf", 105, ""], ["SpaceMono", "SpaceMonoNerdFontMono-Regular.ttf", 113, ""], ["Terminus", "TerminessNerdFontMono-Regular.ttf", 101, ""], ["UbuntuMono", "UbuntuMonoNerdFontMono-Regular.ttf", 100, ""], ["UbuntuSans", "UbuntuSansMonoNerdFontMono-Regular.ttf", 111, ""], ["VictorMono", "VictorMonoNerdFontMono-Regular.ttf", 117, ""], ["ZedMono", "ZedMonoNerdFontMono-Regular.ttf", 118, ""], ["z_0xProto", "0xProtoNerdFontMono-Regular.ttf", 114, ""], ["z_3270", "3270NerdFontMono-Regular.ttf", 88, ""]];

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
  return Math.floor(num * 1000) / 1000;
}

export default class {
  #adjustment = null;
  #direction = null;
  #increment = null;
  #paddedTarget = null;
  #fontIndex = -1;

  #data = {};


  bittyInit() {
    setProp("--load-hider", "1");
    this.resetVars();
  }

  resetVars() {
    this.#adjustment = 0.1;
    this.#direction = "up";
    this.#increment = 0.1;
    this.#paddedTarget = null;
  }

  async loadFont(_, el) {
    this.#fontIndex += 1;
    if (this.#fontIndex < (fonts.length - 1)) {
      this.resetVars();
      setProp("--adjust-value", this.#adjustment)
      const i = this.#fontIndex;
      const details = fonts[i];
      console.log(`Checking: ${details[0]}`);
      const url = `/nerd-fonts/${details[0]}/${details[1]}`;
      const font = new FontFace(`${details[0]}`, `url("${url}")`);
      document.fonts.add(font);
      await font.load();
      setProp("--test-font", details[0]);
      await sleep(200);
      this.#paddedTarget = pad(el.getBoundingClientRect().height);
      this.api.forward(null, "checkSize");
    }
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
      this.#data[fonts[this.#fontIndex][0]] = trimNum(this.#adjustment);
      this.api.forward(null, "display");
    }
  }

  display(_, el) {
    el.innerHTML = JSON.stringify(this.#data, null, 2);
  }

}