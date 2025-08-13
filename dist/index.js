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
const constanta_1 = require("./constanta");
const method_1 = require("./method");
constanta_1.bot.start((ctx) => {
    ctx.reply("📌 Kino olish uchun quyidagi kanallarga obuna bo‘ling:", (0, method_1.subscriptionKeyboard)());
});
constanta_1.bot.action("check_subs", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const subscribed = yield (0, method_1.isUserSubscribed)(ctx.from.id);
    if (subscribed) {
        yield ctx.answerCbQuery("✅ Hamma kanallarga obuna bo‘lgansiz!");
        yield ctx.reply("✅ Endi kino kodini yuboring.");
    }
    else {
        yield ctx.answerCbQuery("❌ Hali hammasiga obuna bo‘lmadingiz.", {
            show_alert: true,
        });
        yield ctx.reply("❌ Iltimos, barcha kanallarga obuna bo‘ling:", (0, method_1.subscriptionKeyboard)());
    }
}));
constanta_1.bot.on("channel_post", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const post = ctx.channelPost;
    if (!post || !post.caption)
        return;
    const match = post.caption.match(/KOD:\s*(\d+)/i);
    if (match) {
        const code = match[1];
        constanta_1.MOVIE_CODES[code] = post.message_id;
        try {
            yield ctx.telegram.sendMessage(constanta_1.FORWARD_CHAT_ID, `📽 KOD: ${code}\n🆔 Message ID: ${post.message_id}`);
        }
        catch (error) {
            console.error("Xabar yuborishda xatolik:", error);
        }
    }
}));
constanta_1.bot.on("text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const code = ctx.message.text.trim().toUpperCase();
    const subscribed = yield (0, method_1.isUserSubscribed)(ctx.from.id);
    if (!subscribed) {
        return ctx.reply("❌ Kino olish uchun barcha kanallarga obuna bo‘ling:", (0, method_1.subscriptionKeyboard)());
    }
    if (constanta_1.MOVIE_CODES[code]) {
        try {
            yield ctx.telegram.copyMessage(ctx.chat.id, constanta_1.CHANNEL_ID, +constanta_1.MOVIE_CODES[code]);
        }
        catch (_a) {
            ctx.reply("Xatolik yuz berdi, keyinroq qayta urinib ko‘ring.");
        }
    }
    else {
        ctx.reply("❌ Bunday kodli kino topilmadi.");
    }
}));
constanta_1.bot.launch().then(() => {
    console.log("🚀 Bot ishga tushdi");
});
