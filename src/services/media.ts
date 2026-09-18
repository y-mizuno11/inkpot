// SPDX-License-Identifier: MIT
// Copyright 2026 Inkpot contributors

import { config } from "../config";
import { AppError } from "../lib/errors";
import { putObject } from "../lib/s3";

export async function uploadImage(name: string, data: Uint8Array) {
  if (data.byteLength > config.media.maxBytes) throw new AppError("E6001");
  return putObject(config.media.bucket, `images/${Date.now()}-${name}`, data);
}
