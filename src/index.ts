import { PluginOption } from "vite";
import nodePath from "path";
import { generateFilePath, generateScriptContent, svgFind } from "./utils";

interface vitePluginSvgoOptions {
  includes: string; // 匹配 svg 文件目录
  fileName?: string; // 生成文件名
  perfix?: string; // svg id 前缀
}

// 生成svg
const vitePluginSvgo: (options: vitePluginSvgoOptions) => PluginOption = ({ includes, fileName: fName, perfix = "" }) => {
  if (!includes) {
    return new Error(`[ERROR: vitePluginSvgo]: includes is required!`)
  }
  let config: any;
  try {
    const svgDom = svgFind(includes, perfix).reduce((insertHtml, svghtml) => insertHtml + svghtml, "");
    const { hash, scriptContent } = generateScriptContent(svgDom);
    const fileName = fName || `svg-script-${hash}.js`;
    return {
      name: "vite-plugin-svgo",
      load(id) {
        if (id.endsWith(fileName)) {
          return scriptContent;
        }
      },
      configResolved(cfg) {
        config = cfg;
      },
      generateBundle(options, bundle) {
        const { path: scriptSrc } = generateFilePath(config, fileName);
        // 构建时输出文件到资源目录
        bundle[scriptSrc] = {
          name: fileName,
          needsCodeReference: false,
          fileName: scriptSrc,
          source: scriptContent,
          type: "asset",
        };
      },
      // writeBundle() {
      //   if (config.command === "build") {
      //     const writePath = nodePath.resolve(config.build.outDir, config.build.assetsDir, fileName);
      //     writeFileSync(writePath, scriptContent, "utf-8");
      //   }
      // },
      transformIndexHtml(dom) {
        const { src } = generateFilePath(config, fileName);
        return {
          html: dom,
          tags: [
            {
              tag: "script",
              attrs: {
                type: "text/javascript",
                src,
              },
              injectTo: "body",
            },
          ],
        };
      },
    };
  } catch (error) {
    return new Error(`[ERROR: vitePluginSvgo compile]: ${error}`);
  }

};

export default vitePluginSvgo;
