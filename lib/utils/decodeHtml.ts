const htmlEntitiesMap: Record<string, string> = {
  nbsp: "\u00A0",
  amp: "&",
  quot: '"',
  lt: "<",
  gt: ">",
  apos: "'",
  // Add more as needed
};

export function decodeHtmlEntities(str: string): string {
  return (
    str
      // Decode numeric entities
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
      // Decode named entities
      .replace(
        /&([a-zA-Z]+);/g,
        (match, entity) => htmlEntitiesMap[entity] ?? match
      )
  );
}
