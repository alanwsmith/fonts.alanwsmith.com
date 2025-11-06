import {matchSorter} from '/scripts/match-sorter.js'

const adjustmentData = [@ json.data["font-size-adjustments"] @]

const t = {
  font: `
<div class="fontFamily">
  <div>NAME</div>
</div>
`
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

  }

}
