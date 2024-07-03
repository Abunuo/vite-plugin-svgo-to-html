import { PluginOption } from "vite";
interface vitePluginSvgoOptions {
    includes: string;
    fileName?: string;
    perfix?: string;
}
declare const vitePluginSvgo: (options: vitePluginSvgoOptions) => PluginOption;
export default vitePluginSvgo;
