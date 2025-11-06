import {matchSorter} from '/scripts/match-sorter.js'

const fonts = [@ json.data["font-size-adjustments"] @].fonts

const t = {
  font: `<div>NAME (CATEGORY)</div>`,
  noMatches: `<div>No Matches</div>`,
  googleFont: `@font-face { 
  font-family: "NAME-STYLE";
  src: url("URL");
  size-adjust: ADJUST%;
}
`,
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
    this.dev();
  }

  dev() {
    this.#currentMatch = "Roboto";
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
            this.#currentMatch = result.name;
          }
          const subs = [
            ["NAME", result.name],
            ["CATEGORY", result.category]
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
      const font = fonts.find((font) => font.name === this.#currentMatch);
      if (font.category === "Google Fonts") {
        el.replaceChildren(this.getGoogleFont(font));
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
}
