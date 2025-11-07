#!/usr/bin/env python3

import json
import os
import pathlib

class Maker:
    def __init__(self):
        self.source_path = "../../content/nerd-fonts"

    def source_files(self):
        file_list = []
        for root, dirs, files in os.walk(self.source_path):
            for file in files:
                file_path = pathlib.Path(os.path.join(root, file))
                ext = file_path.suffix
                if ext == ".ttf" or ext == ".otf":
                    file_list.append(file_path)
        file_list.sort()
        return file_list

    def data(self):
        items = []
        for item in self.source_files():
            items.append([item.parent.stem, item.name, "", ""])
        result = { "fonts": items }
        return result 

    def write_json_to_file(self, data, file):
        with open(file, 'w', encoding='utf-8') as _out:
            json.dump(data, _out, sort_keys=True, indent=4)

if __name__ == "__main__":
    m = Maker()
    m.write_json_to_file(m.data(), "../../content/data/nerdFontsInitialList.json")



