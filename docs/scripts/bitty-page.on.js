const fonts = [["UbuntuMono", "UbuntuMonoNerdFontMono-Italic.ttf"], ["UbuntuMono", "UbuntuMonoNerdFontMono-BoldItalic.ttf"], ["UbuntuMono", "UbuntuMonoNerdFontMono-Bold.ttf"], ["UbuntuMono", "UbuntuMonoNerdFontMono-Regular.ttf"], ["EnvyCodeR", "EnvyCodeRNerdFontMono-Regular.ttf"], ["z_0xProto", "0xProtoNerdFontMono-Regular.ttf"], ["FantasqueSansMono", "FantasqueSansMNerdFontMono-Regular.ttf"], ["CascadiaCode", "CaskaydiaCoveNerdFontMono-Regular.ttf"], ["Monofur", "MonofurNerdFontMono-Regular.ttf"], ["DroidSansMono", "DroidSansMNerdFontMono-Regular.otf"], ["Monoid", "MonoidNerdFontMono-Regular.ttf"], ["Hasklig", "HasklugNerdFontMono-Regular.otf"], ["GeistMono", "GeistMonoNerdFontMono-Regular.otf"], ["Mononoki", "MononokiNerdFontMono-Regular.ttf"], ["InconsolataLGC", "InconsolataLGCNerdFontMono-Regular.ttf"], ["SourceCodePro", "SauceCodeProNerdFontMono-Regular.ttf"], ["FiraCode", "FiraCodeNerdFontMono-Regular.ttf"], ["ShareTechMono", "ShureTechMonoNerdFontMono-Regular.ttf"], ["Terminus", "TerminessNerdFontMono-Regular.ttf"], ["LiberationMono", "LiterationMonoNerdFontMono-Regular.ttf"], ["BitstreamVeraSansMono", "BitstromWeraNerdFontMono-Regular.ttf"], ["JetBrainsMono", "JetBrainsMonoNerdFontMono-Regular.ttf"], ["ComicShannsMono", "ComicShannsMonoNerdFontMono-Regular.otf"], ["Hermit", "HurmitNerdFontMono-Regular.otf"], ["VictorMono", "VictorMonoNerdFontMono-Regular.ttf"], ["Overpass", "OverpassMNerdFontMono-Regular.otf"], ["Recursive", "RecMonoLinearNerdFontMono-Regular.ttf"], ["AnonymousPro", "AnonymiceProNerdFontMono-Regular.ttf"], ["HeavyData", "HeavyDataNerdFont-Regular.ttf"], ["Hack", "HackNerdFontMono-Regular.ttf"], ["AdwaitaMono", "AdwaitaMonoNerdFontMono-Regular.ttf"], ["MartianMono", "MartianMonoNerdFontMono-Regular.ttf"], ["AtkinsonHyperlegibleMono", "AtkynsonMonoNerdFontMono-Regular.otf"], ["AurulentSansMono", "AurulentSansMNerdFontMono-Regular.otf"], ["ProFont", "ProFontWindowsNerdFontMono-Regular.ttf"], ["Cousine", "CousineNerdFontMono-Regular.ttf"], ["DejaVuSansMono", "DejaVuSansMNerdFontMono-Regular.ttf"], ["Gohu", "GohuFont11NerdFontMono-Regular.ttf"], ["Go-Mono", "GoMonoNerdFontMono-Regular.ttf"], ["MPlus", "MCodeLat60NerdFontMono-Regular.ttf"], ["Inconsolata", "InconsolataNerdFontMono-Regular.ttf"], ["Noto", "NotoSansMNerdFontMono-Regular.ttf"], ["CommitMono", "CommitMonoNerdFontMono-Regular.otf"], ["Meslo", "MesloLGSNerdFontMono-Regular.ttf"], ["IosevkaTermSlab", "IosevkaTermSlabNerdFontMono-Regular.ttf"], ["z_3270", "3270NerdFontMono-Regular.ttf"], ["Lekton", "LektonNerdFontMono-Regular.ttf"], ["ProggyClean", "ProggyCleanSZNerdFontMono-Regular.ttf"], ["InconsolataGo", "InconsolataGoNerdFontMono-Regular.ttf"], ["Iosevka", "IosevkaNerdFontMono-Regular.ttf"], ["DaddyTimeMono", "DaddyTimeMonoNerdFontMono-Regular.ttf"], ["IBMPlexMono", "BlexMonoNerdFontMono-Regular.ttf"], ["RobotoMono", "RobotoMonoNerdFontMono-Regular.ttf"], ["IntelOneMono", "IntoneMonoNerdFontMono-Regular.ttf"], ["BigBlueTerminal", "BigBlueTerm437NerdFontMono-Regular.ttf"], ["IosevkaTerm", "IosevkaTermNerdFontMono-Regular.ttf"], ["D2Coding", "D2CodingLigatureNerdFontMono-Regular.ttf"], ["SpaceMono", "SpaceMonoNerdFontMono-Regular.ttf"], ["CascadiaMono", "CaskaydiaMonoNerdFontMono-Regular.ttf"], ["ZedMono", "ZedMonoNerdFontMono-Regular.ttf"], ["Monaspace", "MonaspiceRnNerdFontMono-Regular.otf"], ["UbuntuSans", "UbuntuSansMonoNerdFontMono-Regular.ttf"], ["Agave", "AgaveNerdFontMono-Regular.ttf"], ["iA-Writer", "iMWritingMonoNerdFontMono-Regular.ttf"], ["FiraMono", "FiraMonoNerdFontMono-Regular.otf"], ["DepartureMono", "DepartureMonoNerdFontMono-Regular.otf"], ["Lilex", "LilexNerdFontMono-Regular.ttf"]]

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