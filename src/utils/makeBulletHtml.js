export default (bulletText, hasLink, storyId) =>
  hasLink && storyId > -1
    ? //`
      //  <a href="/stories/${storyId}">
      //    ${bulletText}
      //  </a>
      `
  <span>${bulletText}</span>
`
    : `
  <span>${bulletText}</span>
`;
