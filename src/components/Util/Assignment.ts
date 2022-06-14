/**
 * Checks to see wether the provided markdown content has a portfolio assignment attached to it.
 * @param txtContent the video text content in markdown
 * @param partial wether the function should start searching from the middle of the text onwards
 * @returns true if txtContent contains a portfolio assignment, false otherwise
 */
export function hasHomework(txtContent: string, partial = true): boolean {
  return txtContent.indexOf("## Portfolio", partial ? txtContent.length / 2 : 0) !== -1;
}