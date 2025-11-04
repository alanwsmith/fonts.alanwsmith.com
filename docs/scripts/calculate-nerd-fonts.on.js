const fonts = [["AdwaitaMono", "AdwaitaMonoNerdFontMono-Regular.ttf", ""], ["Agave", "AgaveNerdFontMono-Regular.ttf", ""], ["AnonymousPro", "AnonymiceProNerdFontMono-Regular.ttf", ""], ["AtkinsonHyperlegibleMono", "AtkynsonMonoNerdFontMono-Regular.otf", ""], ["AurulentSansMono", "AurulentSansMNerdFontMono-Regular.otf", ""], ["BigBlueTerminal", "BigBlueTerm437NerdFontMono-Regular.ttf", ""], ["BitstreamVeraSansMono", "BitstromWeraNerdFontMono-Regular.ttf", ""], ["CascadiaCode", "CaskaydiaCoveNerdFontMono-Regular.ttf", ""], ["CascadiaMono", "CaskaydiaMonoNerdFontMono-Regular.ttf", ""], ["ComicShannsMono", "ComicShannsMonoNerdFontMono-Regular.otf", ""], ["CommitMono", "CommitMonoNerdFontMono-Regular.otf", ""], ["Cousine", "CousineNerdFontMono-Regular.ttf", ""], ["D2Coding", "D2CodingLigatureNerdFontMono-Regular.ttf", ""], ["DaddyTimeMono", "DaddyTimeMonoNerdFontMono-Regular.ttf", ""], ["DejaVuSansMono", "DejaVuSansMNerdFontMono-Regular.ttf", ""], ["DepartureMono", "DepartureMonoNerdFontMono-Regular.otf", ""], ["DroidSansMono", "DroidSansMNerdFontMono-Regular.otf", ""], ["EnvyCodeR", "EnvyCodeRNerdFontMono-Regular.ttf", ""], ["FantasqueSansMono", "FantasqueSansMNerdFontMono-Regular.ttf", ""], ["FiraCode", "FiraCodeNerdFontMono-Regular.ttf", ""], ["FiraMono", "FiraMonoNerdFontMono-Regular.otf", ""], ["GeistMono", "GeistMonoNerdFontMono-Regular.otf", ""], ["Go-Mono", "GoMonoNerdFontMono-Regular.ttf", ""], ["Gohu", "GohuFont11NerdFontMono-Regular.ttf", ""], ["Hack", "HackNerdFontMono-Regular.ttf", ""], ["Hasklig", "HasklugNerdFontMono-Regular.otf", ""], ["HeavyData", "HeavyDataNerdFont-Regular.ttf", ""], ["Hermit", "HurmitNerdFontMono-Regular.otf", ""], ["iA-Writer", "iMWritingMonoNerdFontMono-Regular.ttf", ""], ["IBMPlexMono", "BlexMonoNerdFontMono-Regular.ttf", ""], ["Inconsolata", "InconsolataNerdFontMono-Regular.ttf", ""], ["InconsolataGo", "InconsolataGoNerdFontMono-Regular.ttf", ""], ["InconsolataLGC", "InconsolataLGCNerdFontMono-Regular.ttf", ""], ["IntelOneMono", "IntoneMonoNerdFontMono-Regular.ttf", ""], ["Iosevka", "IosevkaNerdFontMono-Regular.ttf", ""], ["IosevkaTerm", "IosevkaTermNerdFontMono-Regular.ttf", ""], ["IosevkaTermSlab", "IosevkaTermSlabNerdFontMono-Regular.ttf", ""], ["JetBrainsMono", "JetBrainsMonoNerdFontMono-Regular.ttf", ""], ["Lekton", "LektonNerdFontMono-Regular.ttf", ""], ["LiberationMono", "LiterationMonoNerdFontMono-Regular.ttf", ""], ["Lilex", "LilexNerdFontMono-Regular.ttf", ""], ["MPlus", "MCodeLat60NerdFontMono-Regular.ttf", ""], ["MartianMono", "MartianMonoNerdFontMono-Regular.ttf", ""], ["Meslo", "MesloLGSNerdFontMono-Regular.ttf", ""], ["Monaspace", "MonaspiceRnNerdFontMono-Regular.otf", ""], ["Monofur", "MonofurNerdFontMono-Regular.ttf", ""], ["Monoid", "MonoidNerdFontMono-Regular.ttf", ""], ["Mononoki", "MononokiNerdFontMono-Regular.ttf", ""], ["Noto", "NotoSansMNerdFontMono-Regular.ttf", ""], ["Overpass", "OverpassMNerdFontMono-Regular.otf", ""], ["ProFont", "ProFontWindowsNerdFontMono-Regular.ttf", ""], ["ProggyClean", "ProggyCleanSZNerdFontMono-Regular.ttf", ""], ["Recursive", "RecMonoLinearNerdFontMono-Regular.ttf", ""], ["RobotoMono", "RobotoMonoNerdFontMono-Regular.ttf", ""], ["ShareTechMono", "ShureTechMonoNerdFontMono-Regular.ttf", ""], ["SourceCodePro", "SauceCodeProNerdFontMono-Regular.ttf", ""], ["SpaceMono", "SpaceMonoNerdFontMono-Regular.ttf", ""], ["Terminus", "TerminessNerdFontMono-Regular.ttf", ""], ["UbuntuMono", "UbuntuMonoNerdFontMono-Regular.ttf", ""], ["UbuntuSans", "UbuntuSansMonoNerdFontMono-Regular.ttf", ""], ["VictorMono", "VictorMonoNerdFontMono-Regular.ttf", ""], ["ZedMono", "ZedMonoNerdFontMono-Regular.ttf", ""], ["0xProto", "0xProtoNerdFontMono-Regular.ttf", ""], ["3270", "3270NerdFontMono-Regular.ttf", ""]];

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

  async rawFont(_, el) {
    this.#fontIndex += 1;
    if (this.#fontIndex < fonts.length) {
      this.resetVars();
      setProp("--adjust-value", this.#adjustment)
      const i = this.#fontIndex;
      const details = fonts[i];
      console.log(`Checking: ${details[0]}`);
      const url = `/nerd-fonts/${details[0]}/${details[1]}`;
      const font = new FontFace(`font-${details[0]}`, `url("${url}")`);
      document.fonts.add(font);
      await font.load();
      setProp("--test-font", `font-${details[0]}`);
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
      this.api.forward(null, "rawFont");
    }
  }

  display(_, el) {
    el.innerHTML = JSON.stringify(this.#data, null, 2);
  }

}