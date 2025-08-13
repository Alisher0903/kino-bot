import { Telegraf } from "telegraf";

export const BOT_TOKEN = "8472638602:AAHDQ580YbkGvlyC2oAKMd1Zm72rRWn3Sds";
export const CHANNEL_ID = -1002714768347;
export const FORWARD_CHAT_ID = 1369539689;

export const bot = new Telegraf(BOT_TOKEN);

export const MOVIE_CODES: Record<string | number, string | number> = {
  1: 13,
};

export const REQUIRED_CHANNELS = [
  { name: "Kanal 1", username: "@istalgan_kinolar_uz" },
  // { name: "Kanal 2", username: "@alisherdev_blog" },
];
