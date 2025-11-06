#!/usr/bin/env python3

import json

class Maker:
    def __init__(self):
        self.input = {}

    def calc_adjust(self, input):
        initial = 0.5 / input * 100
        return float("{:.4f}".format(initial))

    def google_values(self):
        results = []
        for font_name in self.input["google_fonts"]:
            obj = {
                    "category": "Google Fonts",
                    "name": font_name,
                    "key": font_name.replace(" ", "_"),
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

    def load_data(self, key, path):
        with open(path) as _in:
            self.input[key] = json.load(_in) 
    
    def nerd_values(self):
        results = []
        for font_name in self.input["nerd_fonts"]:
            print(font_name)
            obj = {
                    "category": "Nerd Fonts",
                    "name": font_name,
                    "key": font_name.replace(" ", "_"),
                    "styles": [
                        {
                            "adjust": self.calc_adjust(
                                self.input["nerd_fonts"][font_name]
                            ),
                            "aspect": self.input["nerd_fonts"][font_name],
                            "style": "regular",
                            "path_type": "download",
                            "path_string": "https://www.nerdfonts.com/font-downloads",
                            }
                        ]
                    }
            results.append(obj)

        return results


    def output(self):
        return {
            "google": self.google_values(),
            "nerd": self.nerd_values(),
            "macos_15": {},
            "window_10": {},
        }

if __name__ == "__main__":
    m = Maker()
    m.load_data("google_fonts", "../../content/data/aspect-values/google-fonts.json")
    m.load_data("nerd_fonts", "../../content/data/aspect-values/nerd-fonts.json")
    m.load_data("macos_15", "../../content/data/aspect-values/macos-15.json")
    m.load_data("window_10", "../../content/data/aspect-values/windows-10.json")

    output_path = "../../content/data/font-size-adjustments.json"
    with open(output_path, "w") as _out:
        json.dump(m.output(), _out, sort_keys=True, indent=4)

