import { message } from "antd";
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

export function previewPdf(options: { url: string }) {
  const { url } = options;
  if (!url) {
    message.error("PDF 链接不合法");
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.allow = "fullscreen";
  iframe.width = "100%";
  iframe.height = "100%";

  document.body.appendChild(iframe);
  iframe.requestFullscreen();
  iframe.onfullscreenchange = () => {
    if (!document.fullscreenElement) {
      document.body.removeChild(iframe);
    }
  };

  iframe.onfullscreenerror = () => {
    document.body.removeChild(iframe);
  };
}
