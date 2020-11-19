import crypto from "crypto";

export const generateId = (length: number) => crypto.randomBytes(length).toString("hex");
