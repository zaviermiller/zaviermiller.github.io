const PRECISION = 0.001
export const BLOCK_SIZE = 10

export async function getElevationBlockAt(lat, long) {
  var reqUrl = "https://api.open-elevation.com/api/v1/lookup?locations="
  for (var i = 0; i < BLOCK_SIZE; i++) {
    for (var j = 0; j < BLOCK_SIZE; j++) {
      reqUrl += `${lat + i * PRECISION}, ${long + j * PRECISION}|`
    }
  }
  reqUrl = reqUrl.slice(0, -1)
  let resp = await fetch(reqUrl)
  const { results } = await resp.json()

  return results;
}
