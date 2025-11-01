const fonts = [["AdwaitaMono", "AdwaitaMonoNerdFontMono-Regular.ttf", "", ""], ["Agave", "AgaveNerdFontMono-Regular.ttf", "", ""], ["AnonymousPro", "AnonymiceProNerdFontMono-Regular.ttf", "", ""], ["AtkinsonHyperlegibleMono", "AtkynsonMonoNerdFontMono-Regular.otf", "", ""], ["AurulentSansMono", "AurulentSansMNerdFontMono-Regular.otf", "", ""], ["BigBlueTerminal", "BigBlueTerm437NerdFontMono-Regular.ttf", "", ""], ["BitstreamVeraSansMono", "BitstromWeraNerdFontMono-Regular.ttf", "", ""], ["CascadiaCode", "CaskaydiaCoveNerdFontMono-Regular.ttf", "", ""], ["CascadiaMono", "CaskaydiaMonoNerdFontMono-Regular.ttf", "", ""], ["ComicShannsMono", "ComicShannsMonoNerdFontMono-Regular.otf", "", ""], ["CommitMono", "CommitMonoNerdFontMono-Regular.otf", "", ""], ["Cousine", "CousineNerdFontMono-Regular.ttf", "", ""], ["D2Coding", "D2CodingLigatureNerdFontMono-Regular.ttf", "", ""], ["DaddyTimeMono", "DaddyTimeMonoNerdFontMono-Regular.ttf", "", ""], ["DejaVuSansMono", "DejaVuSansMNerdFontMono-Regular.ttf", "", ""], ["DepartureMono", "DepartureMonoNerdFontMono-Regular.otf", "", ""], ["DroidSansMono", "DroidSansMNerdFontMono-Regular.otf", "", ""], ["EnvyCodeR", "EnvyCodeRNerdFontMono-Regular.ttf", "", ""], ["FantasqueSansMono", "FantasqueSansMNerdFontMono-Regular.ttf", "", ""], ["FiraCode", "FiraCodeNerdFontMono-Regular.ttf", "", ""], ["FiraMono", "FiraMonoNerdFontMono-Regular.otf", "", ""], ["GeistMono", "GeistMonoNerdFontMono-Regular.otf", "", ""], ["Go-Mono", "GoMonoNerdFontMono-Regular.ttf", "", ""], ["Gohu", "GohuFont11NerdFontMono-Regular.ttf", "", ""], ["Hack", "HackNerdFontMono-Regular.ttf", "", ""], ["Hasklig", "HasklugNerdFontMono-Regular.otf", "", ""], ["HeavyData", "HeavyDataNerdFont-Regular.ttf", "", ""], ["Hermit", "HurmitNerdFontMono-Regular.otf", "", ""], ["IBMPlexMono", "BlexMonoNerdFontMono-Regular.ttf", "", ""], ["Inconsolata", "InconsolataNerdFontMono-Regular.ttf", "", ""], ["InconsolataGo", "InconsolataGoNerdFontMono-Regular.ttf", "", ""], ["InconsolataLGC", "InconsolataLGCNerdFontMono-Regular.ttf", "", ""], ["IntelOneMono", "IntoneMonoNerdFontMono-Regular.ttf", "", ""], ["Iosevka", "IosevkaNerdFontMono-Regular.ttf", "", ""], ["IosevkaTerm", "IosevkaTermNerdFontMono-Regular.ttf", "", ""], ["IosevkaTermSlab", "IosevkaTermSlabNerdFontMono-Regular.ttf", "", ""], ["JetBrainsMono", "JetBrainsMonoNerdFontMono-Regular.ttf", "", ""], ["Lekton", "LektonNerdFontMono-Regular.ttf", "", ""], ["LiberationMono", "LiterationMonoNerdFontMono-Regular.ttf", "", ""], ["Lilex", "LilexNerdFontMono-Regular.ttf", "", ""], ["MPlus", "MCodeLat60NerdFontMono-Regular.ttf", "", ""], ["MartianMono", "MartianMonoNerdFontMono-Regular.ttf", "", ""], ["Meslo", "MesloLGSNerdFontMono-Regular.ttf", "", ""], ["Monaspace", "MonaspiceRnNerdFontMono-Regular.otf", "", ""], ["Monofur", "MonofurNerdFontMono-Regular.ttf", "", ""], ["Monoid", "MonoidNerdFontMono-Regular.ttf", "", ""], ["Mononoki", "MononokiNerdFontMono-Regular.ttf", "", ""], ["Noto", "NotoSansMNerdFontMono-Regular.ttf", "", ""], ["Overpass", "OverpassMNerdFontMono-Regular.otf", "", ""], ["ProFont", "ProFontWindowsNerdFontMono-Regular.ttf", "", ""], ["ProggyClean", "ProggyCleanSZNerdFontMono-Regular.ttf", "", ""], ["Recursive", "RecMonoLinearNerdFontMono-Regular.ttf", "", ""], ["RobotoMono", "RobotoMonoNerdFontMono-Regular.ttf", "", ""], ["ShareTechMono", "ShureTechMonoNerdFontMono-Regular.ttf", "", ""], ["SourceCodePro", "SauceCodeProNerdFontMono-Regular.ttf", "", ""], ["SpaceMono", "SpaceMonoNerdFontMono-Regular.ttf", "", ""], ["Terminus", "TerminessNerdFontMono-Regular.ttf", "", ""], ["UbuntuMono", "UbuntuMonoNerdFontMono-Regular.ttf", "", ""], ["UbuntuSans", "UbuntuSansMonoNerdFontMono-Regular.ttf", "", ""], ["VictorMono", "VictorMonoNerdFontMono-Regular.ttf", "", ""], ["ZedMono", "ZedMonoNerdFontMono-Regular.ttf", "", ""], ["iA-Writer", "iMWritingMonoNerdFontMono-Regular.ttf", "", ""], ["z_0xProto", "0xProtoNerdFontMono-Regular.ttf", "", ""], ["z_3270", "3270NerdFontMono-Regular.ttf", "", ""]]

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
        font-size: 5rem;
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