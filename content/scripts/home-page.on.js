import {matchSorter} from '/scripts/match-sorter.js'

const fonts = [@ json.data["font-size-adjustments"] @].fonts

const t = {
  font: `<div>
  <button 
    class="NAME-button"
    data-send="pick" 
    data-fontid="FONTID">NAME (CATEGORY)</button>
</div>`,

  noMatches: `<div>No Matches</div>`,

  googleButton: `@font-face { 
  font-family: "NAME-button";
  src: url("URL");
  size-adjust: ADJUST%;
}

.NAME-button {
  font-family: "NAME-button";
}`,

  googleFont: `@font-face { 
  font-family: "NAME-STYLE";
  src: url("URL");
  size-adjust: ADJUST%;
}`,

  nerdFont: `@font-face { 
  /* download from: 
  LINK 
  font-family: "KEY-STYLE";
  src: url("/YOUR_PATH");
  size-adjust: ADJUST%;
  */
}`,

  systemFont: `@font-face { 
  font-family: "KEY-regular";
  src: local("KEY");
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
  #copyTimeout = null;
  #addFontTimeout = null;
  #addedFonts = [];

  bittyInit() {
    setProp("--load-hider", "1");
  }

  async addFonts(fonts) {
    if (this.#copyTimeout !== null) {
      clearTimeout(this.#copyTimeout);
    }
    this.#copyTimeout = setTimeout( () => {
      fonts.forEach((font) => {
        if (!this.#addedFonts.includes(font.name)) {
          console.log(`Adding: ${font.name}`);
          let styleToAdd = "";
          if (font.category === "Google Fonts") {
            styleToAdd = this.addGoogleFontString(font);
          }
          const sheet = new CSSStyleSheet();
          sheet.replaceSync(styleToAdd);
          document.adoptedStyleSheets.push(sheet);
          this.#addedFonts.push(font.name);
        }
      });
    }, 350);
  }

  addGoogleFontString(font) {
    const style = font.styles.find((style) => style.style === "regular");
    const result = t.googleButton
      .replaceAll("NAME", font.name)
      .replaceAll("URL", style.path_string)
      .replaceAll("ADJUST", style.adjust)
    console.log(result);
    return result;
  }

  async copyStyles(event, el) {
    try {
      await navigator.clipboard.writeText(el.innerText);
      event.target.innerHTML = "Copied";
      if (this.#copyTimeout !== null) {
        clearTimeout(this.#copyTimeout);
      } 
      this.#copyTimeout = setTimeout(() => {
        event.target.innerHTML = "Copy";
      }, 1500);
    } catch (error) {
      event.target.innerHTML = "Could not copy";
      console.error(`Could not copy selection to clipboard: ${error}`)
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

  getSystemFont(font) {
    return font.styles.map((style) => {
      return t.systemFont
        .replaceAll("NAME", font.name)
        .replaceAll("ADJUST", style.adjust)
        ;
    }).join("\n");
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
      this.addFonts(results);
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
      } else if (font.category === "System Fonts") {
        el.replaceChildren(this.getSystemFont(font));
      }
    } else {
      el.replaceChildren();
    }
  }
}
