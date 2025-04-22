export const fetchLastFmRecentTracks = async () => {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=marsodev&api_key=5f3b9f3d81709209a03a8210d48cac5e&format=json&limit=10`
    );
    const data = await res.json();
    const tracks = data.recenttracks.track;

    const preloadImages = tracks.map((track) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = track.image[2]["#text"];
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    await Promise.all(preloadImages);

    return tracks;
  } catch (error) {
    console.error("Error fetching Last.fm data:", error);
    return [];
  }
};
