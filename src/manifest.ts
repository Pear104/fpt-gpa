import { defineManifest } from "@crxjs/vite-plugin";
import packageData from "../package.json";

//@ts-ignore
const isDev = process.env.NODE_ENV == "development";

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ""}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: "img/logo.png",
    32: "img/logo.png",
    48: "img/logo.png",
    128: "img/logo.png",
  },
  action: {
    // default_popup: "popup.html",
    default_icon: "img/logo.png",
  },
  options_page: "options.html",
  devtools_page: "devtools.html",
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: [
        "https://fap.fpt.edu.vn/Grade/StudentTranscript.aspx",
        "http://fap.fpt.edu.vn/Grade/StudentTranscript.aspx",
      ],
      js: ["src/contentScript/index.ts"],
      run_at: "document_end",
    },
  ],
  web_accessible_resources: [
    {
      resources: ["img/logo.png"],
      matches: [],
    },
  ],
  permissions: ["storage", "tabs"],
  host_permissions: ["<all_urls>"],
});
