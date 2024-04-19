import { files } from "@/types/files";

function findObjectByName(files: files[], name: string): files[] | null {
  for (const obj of files) {
    if (obj.name === name) {
      return [obj];
    }

    if (obj.type === "folder" && obj.children) {
      const result = findObjectByName(obj.children, name);
      if (result) {
        return result;
      }
    }
  }

  return null;
}

const icons = [
  { fileType: "js", iconKey: "vscode-icons:file-type-js-official" },
  { fileType: "ts", iconKey: "vscode-icons:file-type-typescript-official" },
  { fileType: "jsx", iconKey: "ph:file-jsx-light" },
  { fileType: "tsx", iconKey: "ph:file-tsx-fill" },
  { fileType: "html", iconKey: "ri:html5-fill" },
  { fileType: "css", iconKey: "ri:css3-fill" },
  { fileType: "scss", iconKey: "vscode-icons:file-type-scss2" },
  { fileType: "less", iconKey: "vscode-icons:folder-type-less-opened" },
  { fileType: "jpg", iconKey: "teenyicons:jpg-solid" },
  { fileType: "png", iconKey: "teenyicons:png-solid" },

  { fileType: "json", iconKey: "mdi:code-json" },

  { fileType: "php", iconKey: "akar-icons:php-fill" },
  { fileType: "py", iconKey: "fluent:code-py-16-regular" },

  { fileType: "go", iconKey: "vscode-icons:file-type-go" },
  { fileType: "java", iconKey: "fluent:document-java-20-regular" },

  { fileType: "zip", iconKey: "formkit:zip" },

  { fileType: "psd", iconKey: "bi:filetype-psd" },
  { fileType: "folder", iconKey: "marketeq:multi-folder" },
];

const setIcon = (fileType: string): string => {
  let key: string = "";

  icons.find((icon) => {
    if (icon.fileType === fileType) {
      key = icon.iconKey;
    }
  });

  if (key === "") {
    key = "carbon:unknown";
  }

  return key;
};

export { findObjectByName, setIcon };
