export async function fixBrokenPosters(data) {
  return Promise.all(data.map(async item => {
    const ok = await checkImageWithoutCORS(item.Poster);
    return { ...item, Poster: ok ? item.Poster : 'N/A' };
  }));
}

function checkImageWithoutCORS(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
