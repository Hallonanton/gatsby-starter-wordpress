
/*
 * Get and set global vaiables
 */
var _server = {

}
export function setServer(server) {
  _server = server
}
export function getServer() {
  return _server
}


/*
 * Shuffle array
 */
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}