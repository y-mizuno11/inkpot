import { config } from "../config"
import { AppError } from "../lib/errors"
import { writeFile } from "node:fs/promises"

export async function uploadImage(name: string, data: Uint8Array) {
  if (data.byteLength > config.media.maxBytes) throw new AppError("E6001")
  await writeFile(`${config.media.dir}/${name}`, data)
  return `/uploads/${name}`
}
