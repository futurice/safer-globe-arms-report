export default (bulletText, hasLink, storyId) =>
  hasLink && storyId > -1
    ? `
      <a href="/articles/${storyId}">
      ${bulletText}	→
      </a>
`
    : `
  <span>${bulletText}</span>
`;
