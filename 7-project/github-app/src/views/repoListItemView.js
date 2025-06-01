/**
 * Creates a view for a single repository list item.
 * @param {*} viewProps
 * @returns
 */
export function createRepoListItemView(viewProps) {
  const root = document.createElement('li');
  root.className = 'list-item whiteframe';

  root.innerHTML = String.raw`
    <h4>${viewProps.repo.name}</h4>
    <p>${viewProps.repo.description || 'No description available.'}</p>
  `;

  return { root };
}
