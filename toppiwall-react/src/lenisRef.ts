/** Singleton Lenis + flaga blokady snap podczas pauzy hero */
const lenisRef: { current: any; noSnapUntil: number } = {
  current: null,
  noSnapUntil: 0,
}
export default lenisRef
