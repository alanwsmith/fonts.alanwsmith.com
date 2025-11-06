#!/usr/bin/env python3

import json

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

    def get_macos_15(self):
        results = []
        fonts = self.input["macos_15"]
        for font_name in fonts:
            obj = {
                    "category": "macOS Fonts",
                    "name": font_name,
                    "key": font_name.replace(" ", "_"),
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

    def get_nerd_values(self):
        results = []
        for font_name in self.input["nerd_fonts"]:
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
                            "style": "default",
                            "path_type": "download",
                            "path_string": "https://www.nerdfonts.com/font-downloads",
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
                    "category": "Windows Fonts",
                    "name": font_name,
                    "key": font_name.replace(" ", "_"),
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

    def output(self):
        fonts = []
        fonts.extend(self.get_google_values())
        fonts.extend(self.get_nerd_values())
        fonts.extend(self.get_macos_15())
        fonts.extend(self.get_windows_10())

        return {
                "fonts": fonts 
            # "google": self.get_google_values(),
            # "nerd": self.get_nerd_values(),
            # "macos_15": self.get_macos_15(),
            # "window_10": self.get_windows_10(),
        }

if __name__ == "__main__":
    m = Maker()
    m.load_data("google_fonts", "../../content/data/aspect-values/google-fonts.json")
    m.load_data("nerd_fonts", "../../content/data/aspect-values/nerd-fonts.json")
    m.load_data("macos_15", "../../content/data/aspect-values/macos-15.json")
    m.load_data("windows_10", "../../content/data/aspect-values/windows-10.json")

    output_path = "../../content/data/font-size-adjustments.json"
    with open(output_path, "w") as _out:
        json.dump(m.output(), _out, sort_keys=True, indent=4)

