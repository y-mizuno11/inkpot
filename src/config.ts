export const config = {
  session: { ttlMinutes: 60 * 24 },
  media: { driver: "local", dir: "uploads", maxBytes: 5 * 1024 * 1024 },
  pageSize: 20,
}
