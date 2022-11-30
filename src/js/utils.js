export const redirect = (page) => {
  const newUrl = window.location.origin + '/src/pages/' + page + '/index.html'
  window.location.href = newUrl
}
