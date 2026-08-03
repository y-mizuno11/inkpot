export const config = {
  session: { ttlMinutes: 60 * 24 },
  media: { driver: "s3", bucket: process.env.MEDIA_BUCKET ?? "inkpot-media", maxBytes: 5 * 1024 * 1024 },
  pageSize: 20,
};
