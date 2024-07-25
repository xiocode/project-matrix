import fs from "fs";
import path from "path";

export function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    const parentDirPath = path.dirname(dirPath);
    ensureDirectoryExists(parentDirPath);

    fs.mkdirSync(dirPath);
  }
}

export function enumFileBaseNamesInDirectory(dirPath: string) {
  const fileNames = [];

  let resolvedDirPath = dirPath;
  const isRelative = dirPath.startsWith(".") || dirPath.startsWith("..");
  if (isRelative) {
    resolvedDirPath = path.join(process.cwd(), dirPath);
  }

  if (!fs.existsSync(resolvedDirPath)) {
    console.warn(`Directory '${resolvedDirPath}' not found.`);
    return [];
  }

  const files = fs.readdirSync(resolvedDirPath);
  for (const fileName of files) {
    const filePathName = path.join(resolvedDirPath, fileName);
    const fileStat = fs.statSync(filePathName);
    if (!fileStat.isFile()) {
      continue;
    }

    fileNames.push(path.parse(fileName).name);
  }

  return fileNames;
}

export async function selectFiles(options: { accept?: string; multiple?: boolean }) {
  return new Promise<File[]>((res) => {
    const input = document.createElement("input");

    input.type = "file";
    input.multiple = options.multiple || false;
    if (options.accept) {
      input.accept = options.accept;
    }

    input.onchange = (e) => {
      const files = (e.target as any)?.files || [];

      document.body.removeChild(input);
      res(files);
    };

    input.oncancel = (e) => {
      document.body.removeChild(input);
      res([]);
    };

    document.body.appendChild(input);
    input.click();
  });
}
