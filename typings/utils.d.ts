/**
 * @description: 输出svg目录
 * @param {string} rootPath
 * @param {string} idPerfix
 * @return {string[]} svg内容集合
 */
export declare const svgFind: (rootPath: string, idPerfix?: string) => string[];
/**
 * @description: 脚本文件
 * @param {string} svgDom
 * @return {string}
 */
export declare const generateScriptContent: (svgDom: string) => {
    hash: string;
    scriptContent: string;
};
/**
 * @description: 获取不同环境下资源路径
 * @param {any} config - vite config
 * @param {string} fileName
 * @return {*}
 */
export declare const generateFilePath: (config: any, fileName: string) => {
    path: string;
    src: string;
};
