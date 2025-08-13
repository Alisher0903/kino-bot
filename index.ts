import { bot, CHANNEL_ID, FORWARD_CHAT_ID, MOVIE_CODES } from "./constanta";
import { isUserSubscribed, subscriptionKeyboard } from "./method";

bot.start((ctx) => {
  ctx.reply(
    "📌 Kino olish uchun quyidagi kanallarga obuna bo‘ling:",
    subscriptionKeyboard()
  );
});

bot.action("check_subs", async (ctx) => {
  const subscribed = await isUserSubscribed(ctx.from!.id);
  if (subscribed) {
    await ctx.answerCbQuery("✅ Hamma kanallarga obuna bo‘lgansiz!");
    await ctx.reply("✅ Endi kino kodini yuboring.");
  } else {
    await ctx.answerCbQuery("❌ Hali hammasiga obuna bo‘lmadingiz.", {
      show_alert: true,
    });
    await ctx.reply(
      "❌ Iltimos, barcha kanallarga obuna bo‘ling:",
      subscriptionKeyboard()
    );
  }
});

bot.on("channel_post", async (ctx) => {
  const post: any = ctx.channelPost;
  if (!post || !post.caption) return;

  const match = post.caption.match(/KOD:\s*(\d+)/i);
  if (match) {
    const code = match[1];
    MOVIE_CODES[code] = post.message_id;

    try {
      await ctx.telegram.sendMessage(
        FORWARD_CHAT_ID,
        `📽 KOD: ${code}\n🆔 Message ID: ${post.message_id}`
      );
    } catch (error) {
      console.error("Xabar yuborishda xatolik:", error);
    }
  }
});

bot.on("text", async (ctx) => {
  const code = ctx.message.text.trim().toUpperCase();
  const subscribed = await isUserSubscribed(ctx.from!.id);

  if (!subscribed) {
    return ctx.reply(
      "❌ Kino olish uchun barcha kanallarga obuna bo‘ling:",
      subscriptionKeyboard()
    );
  }

  if (MOVIE_CODES[code]) {
    try {
      await ctx.telegram.copyMessage(
        ctx.chat.id,
        CHANNEL_ID,
        +MOVIE_CODES[code]
      );
    } catch {
      ctx.reply("Xatolik yuz berdi, keyinroq qayta urinib ko‘ring.");
    }
  } else {
    ctx.reply("❌ Bunday kodli kino topilmadi.");
  }
});

bot.launch().then(() => {
  console.log("🚀 Bot ishga tushdi");
});
