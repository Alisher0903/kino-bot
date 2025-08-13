"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserSubscribed = isUserSubscribed;
exports.subscriptionKeyboard = subscriptionKeyboard;
const telegraf_1 = require("telegraf");
const constanta_1 = require("./constanta");
function isUserSubscribed(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const channel of constanta_1.REQUIRED_CHANNELS) {
            try {
                const member = yield constanta_1.bot.telegram.getChatMember(channel.username, userId);
                if (!["member", "administrator", "creator"].includes(member.status)) {
                    return false;
                }
            }
            catch (_a) {
                return false;
            }
        }
        return true;
    });
}
function subscriptionKeyboard() {
    const buttons = constanta_1.REQUIRED_CHANNELS.map((c) => [
        telegraf_1.Markup.button.url(`📢 ${c.name}`, `https://t.me/${c.username.replace("@", "")}`),
    ]);
    buttons.push([telegraf_1.Markup.button.callback("✅ Obuna bo‘ldim", "check_subs")]);
    return telegraf_1.Markup.inlineKeyboard(buttons);
}
