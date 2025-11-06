import {matchSorter} from '/scripts/match-sorter.js'

const fonts = [@ json.data["font-size-adjustments"] @].fonts

const t = {
  font: `<div><button data-send="pick" data-fontid="FONTID">NAME (CATEGORY)</button></div>`,
  noMatches: `<div>No Matches</div>`,
  googleFont: `@font-face { 
  font-family: "NAME-STYLE";
  src: url("URL");
  size-adjust: ADJUST%;
}`,

  macFont: `@font-face { 
  font-family: "NAME-STYLE";
  src: local("NAME");
  size-adjust: ADJUST%;
}`,

  nerdFont: `@font-face { 
  /* download from: 
  LINK 
  font-family: "NAME-STYLE";
  src: url("/YOUR_PATH");
  size-adjust: ADJUST%;
  */
}`,

  windowsFont: `@font-face { 
/* */
  font-family: "NAME-STYLE";
  src: local("NAME");
  size-adjust: ADJUST%;
}`,

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setProp(key, value) {
  document.documentElement.style.setProperty(key, value);
}

export default class {
  #currentMatch = "";

  bittyInit() {
    setProp("--load-hider", "1");
  }

  pick(event, el) {
    this.#currentMatch = event.target.dataset.fontid;
    this.api.forward(null, "styles");
  }

  search(event, el) {
    el.replaceChildren();
    const query = event.target.value;
    if (query !== "") {
      const matches = matchSorter(fonts, query, {
        keys: ["name"],
        threshold: matchSorter.rankings.CONTAINS
      });
      const results = matches.filter((match, index) => index < 7);
      if (results.length === 0) {
        el.appendChild(this.api.makeElement(t.noMatches));
        this.#currentMatch = "";
      } else {
        results.forEach((result, resultIndex) => {
          if (resultIndex === 0) {
            this.#currentMatch = result.fontid;
          }
          const subs = [
            ["NAME", result.name],
            ["CATEGORY", result.category],
            ["FONTID", result.fontid],
          ];
          el.appendChild(this.api.makeElement(t.font, subs));
        });
      }
    } else {
      this.#currentMatch = "";
    }
    this.api.forward(null, "styles");
  }

  styles(_event, el) {
    if (this.#currentMatch !== "") {
      const font = fonts.find((font) => font.fontid === this.#currentMatch);
      if (font.category === "Google Fonts") {
        el.replaceChildren(this.getGoogleFont(font));
      } else if (font.category === "Nerd Fonts") {
        el.replaceChildren(this.getNerdFont(font));
      } else if (font.category === "macOS Fonts") {
        el.replaceChildren(this.getMacFont(font));
      } else if (font.category === "Windows Fonts") {
        el.replaceChildren(this.getWindowsFont(font));
      }
    } else {
      el.replaceChildren();
    }
  }

  getGoogleFont(font) {
    return font.styles.map((style) => {
      return t.googleFont
        .replace("NAME", font.name)
        .replace("ADJUST", style.adjust)
        .replace("STYLE", style.style)
        .replace("URL", style.path_string)
        ;
    }).join("\n");
  }

  getNerdFont(font) {
    return font.styles.map((style) => {
      return t.nerdFont
        .replaceAll("NAME", font.name)
        .replaceAll("ADJUST", style.adjust)
        .replaceAll("STYLE", style.style)
        .replaceAll("LINK", style.path_string)
        ;
    }).join("\n");
  }

  getMacFont(font) {
    return font.styles.map((style) => {
      return t.macFont
        .replaceAll("NAME", font.name)
        .replaceAll("ADJUST", style.adjust)
        .replaceAll("STYLE", style.style)
        ;
    }).join("\n");
  }

  getWindowsFont(font) {
    return font.styles.map((style) => {
      return t.windowsFont
        .replaceAll("NAME", font.name)
        .replaceAll("ADJUST", style.adjust)
        .replaceAll("STYLE", style.style)
        ;
    }).join("\n");
  }
}
