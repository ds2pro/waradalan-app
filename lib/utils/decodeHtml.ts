export function decodeHtmlEntities(str: string) {
  return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
}
