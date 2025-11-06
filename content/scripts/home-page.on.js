import {matchSorter} from '/scripts/match-sorter.js'

const adjustmentData = [@ json.data["font-size-adjustments"] @].fonts

const t = {
  font: `<div>
NAME
</div>`
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setProp(key, value) {
  document.documentElement.style.setProperty(key, value);
}

export default class {

  bittyInit() {
    setProp("--load-hider", "1");
  }

  search(event, el) {
    el.replaceChildren();
    const query = event.target.value;
    if (query !== "") {
      const matches = matchSorter(adjustmentData, query, {
        keys: ["name"],
        threshold: matchSorter.rankings.CONTAINS
      });
      const results = matches.filter((match, index) => index < 7).forEach((match) => {
        const subs = [["NAME", match.name]];
        el.appendChild(this.api.makeElement(t.font, subs));
      });
    }
  }

}
