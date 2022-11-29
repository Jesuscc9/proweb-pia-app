export const redirect = (page) => {
  const newUrl = window.location.origin + '/pages/' + page + '/'
  window.location.href = newUrl
}
