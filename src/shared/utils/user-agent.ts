import {UAParser} from "ua-parser-js";

export const formatUserAgent = (userAgent: string) => {
    const parser = new UAParser(userAgent); 
    const result = parser.getResult();
    return `Session activa en: ${result.browser.name} ${result.browser.version} en ${result.os.name} ${result.os.version}`
}