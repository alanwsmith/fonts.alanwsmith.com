#!/usr/bin/env python3

import json
import uuid

class Maker:
    def __init__(self):
        self.input = {}

    def calc_adjust(self, input):
        initial = 0.5 / input * 100
        return float("{:.4f}".format(initial))

    def get_google_values(self):
        results = []
        for font_name in self.input["google_fonts"]:
            obj = {
                    "fontid": str(uuid.uuid4()),
                    "category": "Google Fonts",
                    "name": font_name,
                    "key": font_name.replace(" ", "-"),
                    "styles": []
                    }
            for style in self.input["google_fonts"][font_name]:
                obj["styles"].append(
                        {
                            "style": style,
                            "aspect": self.input["google_fonts"][font_name][style]["value"],
                            "path_type": "url",
                            "path_string": self.input["google_fonts"][font_name][style]["url"],
                            "adjust": self.calc_adjust(
                                self.input["google_fonts"][font_name][style]["value"]
                            ),
                            }
                        )
            results.append(obj)
        return results

    def get_macos_15(self):
        results = []
        fonts = self.input["macos_15"]
        for font_name in fonts:
            obj = {
                    "fontid": str(uuid.uuid4()),
                    "category": "System Fonts",
                    "name": font_name,
                    "key": font_name.replace(" ", "-"),
                    "styles": [
                        {
                            "adjust": self.calc_adjust(
                                fonts[font_name]["value"]
                            ),
                            "aspect": fonts[font_name]["value"],
                            "style": "default",
                            "path_type": "local",
                            "path_string": font_name,
                            }
                        ]
                    }
            results.append(obj)
        return results

    def get_nerd_font_file(self, font_name):
        for font in self.nerd_font_list["fonts"]:
            if font[0] == font_name:
                return font[1]

    def get_nerd_values(self):
        results = []
        for font_name in self.input["nerd_fonts"]:
            obj = {
                    "fontid": str(uuid.uuid4()),
                    "category": "Nerd Fonts",
                    "name": font_name,
                    "key": font_name.replace(" ", "-"),
                    "styles": [
                        {
                            "adjust": self.calc_adjust(
                                self.input["nerd_fonts"][font_name]
                            ),
                            "aspect": self.input["nerd_fonts"][font_name],
                            "style": "default",
                            "path_type": "download",
                            "path_string": self.get_nerd_font_file(font_name),
                            }
                        ]
                    }
            results.append(obj)
        return results

    def get_windows_10(self):
        results = []
        fonts = self.input["windows_10"]
        for font_name in fonts:
            obj = {
                    "fontid": str(uuid.uuid4()),
                    "category": "System Fonts",
                    "name": font_name,
                    "key": font_name.replace(" ", "-"),
                    "styles": [
                        {
                            "adjust": self.calc_adjust(
                                fonts[font_name]["value"]
                            ),
                            "aspect": fonts[font_name]["value"],
                            "style": "default",
                            "path_type": "local",
                            "path_string": font_name,
                            }
                        ]
                    }
            results.append(obj)
        return results

    def load_data(self, key, path):
        with open(path) as _in:
            self.input[key] = json.load(_in) 

    def load_nerd_font_files(self, path):
        with open(path) as _in:
            self.nerd_font_list = json.load(_in) 

    def local_fonts(self): 
        results = []
        tmp_windows_fonts = self.get_windows_10()
        tmp_mac_fonts = self.get_macos_15()
        check = {}
        for tw in tmp_windows_fonts:
            check[tw["name"]] = tw["styles"][0]["adjust"]
            results.append(tw)
        for tm in tmp_mac_fonts:
            if tm["name"] in check:
                mac_adjust = tm["styles"][0]["adjust"] 
                win_adjust = check[tm["name"]]
                if mac_adjust != win_adjust:
                    print(f"ERROR: {tm["name"]} is different size between mac and windows")
            else:
                check[tm["name"]] = tm["styles"][0]["adjust"]
                results.append(tm)
        return results

    def output(self):
        fonts = []
        fonts.extend(self.get_google_values())
        fonts.extend(self.get_nerd_values())
        fonts.extend(self.local_fonts())
        return {
                "fonts": fonts 
        }

if __name__ == "__main__":
    m = Maker()
    m.load_data("google_fonts", "../../content/data/aspect-values/google-fonts.json")
    m.load_data("nerd_fonts", "../../content/data/aspect-values/nerd-fonts.json")
    m.load_data("macos_15", "../../content/data/aspect-values/macos-15.json")
    m.load_data("windows_10", "../../content/data/aspect-values/windows-10.json")
    m.load_nerd_font_files("../../content/data/lists/nerd-fonts-initial-list.json")

    output_path = "../../content/data/font-size-adjustments.json"
    with open(output_path, "w") as _out:
        json.dump(m.output(), _out, sort_keys=True, indent=4)

