"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REQUIRED_CHANNELS = exports.MOVIE_CODES = exports.bot = exports.FORWARD_CHAT_ID = exports.CHANNEL_ID = exports.BOT_TOKEN = void 0;
const telegraf_1 = require("telegraf");
exports.BOT_TOKEN = "8472638602:AAHDQ580YbkGvlyC2oAKMd1Zm72rRWn3Sds";
exports.CHANNEL_ID = -1002714768347;
exports.FORWARD_CHAT_ID = 1369539689;
exports.bot = new telegraf_1.Telegraf(exports.BOT_TOKEN);
exports.MOVIE_CODES = {
    1: 13,
};
exports.REQUIRED_CHANNELS = [
    { name: "Kanal 1", username: "@istalgan_kinolar_uz" },
    // { name: "Kanal 2", username: "@alisherdev_blog" },
];
