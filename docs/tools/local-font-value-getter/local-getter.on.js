const fonts = [
"Arial",
"Arial Nova",
"Arial Rounded MT",
"Arial Rounded MT Bold",
"Avenir",
"Bahnschrift",
"Bitstream Charter",
"Bodoni MT",
"Bookman Old Style",
"Bradley Hand",
"Calibri",
"Cambria",
"Candara",
"Cascadia Code",
"casual",
"Charter",
"Chilanka",
"Comfortaa",
"Consolas",
"Corbel",
"Courier New",
"cursive",
"DejaVu Sans",
"DejaVu Sans Mono",
"DejaVu Serif",
"Didot",
"DIN Alternate",
"Franklin Gothic Medium",
"Georgia",
"Georgia Pro",
"Gill Sans Nova",
"Helvetica Neue",
"Hiragino Maru Gothic ProN",
"Inter",
"Iowan Old Style",
"Manjari",
"Menlo",
"monospace",
"Montserrat",
"Nimbus Mono PS",
"Nimbus Sans",
"Nimbus Sans Narrow",
"Noto Sans",
"Noto Serif Display",
"Optima",
"P052",
"Palatino Linotype",
"Quicksand",
"Roboto",
"Roboto Slab",
"Rockwell",
"Rockwell Nova",
"sans-serif",
"sans-serif-condensed",
"Segoe Print",
"Seravek",
"serif",
"Sitka Small",
"Sitka Text",
"Source Code Pro",
"source-sans-pro",
"Superclarendon",
"Sylfaen",
"system-ui",
"TSCu_Comic",
"Ubuntu",
"ui-monospace",
"ui-rounded",
"URW Bookman",
"URW Bookman L",
"URW Gothic",
"URW Palladio L"
];

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


}