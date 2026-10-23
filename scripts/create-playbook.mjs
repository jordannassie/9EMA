import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "content/playbook");
fs.mkdirSync(out, { recursive: true });

const c = (o, h, l, close) => ({ o, h, l, c: close });

const patterns = [];

function add(pattern) {
  patterns.push(pattern);
}

function candles(pattern) {
  add({
    category: "candlestick",
    ...pattern,
    diagram: { kind: "candles", label: pattern.label, candles: pattern.candles },
  });
}

function chart(pattern) {
  add({
    ...pattern,
    diagram: {
      kind: "chart",
      label: pattern.label,
      path: pattern.path,
      lines: pattern.lines ?? [],
      marks: pattern.marks ?? [],
    },
  });
}

const plan = "This is an example of how traders often plan the pattern. It is not a promise that price will reach the target.";

candles({
  order: 1, slug: "doji", name: "Doji", direction: "neutral",
  summary: "Open and close are nearly the same, so the real body is a thin line.",
  description: "A doji shows that buyers and sellers finished the candle in balance. On its own it does not pick a direction.",
  label: "Doji with almost no real body and wicks on both sides",
  candles: [c(18, 20, 14, 16), c(16, 17, 12, 13), c(13, 16, 9, 13.05)],
  identification: ["Open and close are almost equal.", "Shadows can extend above and below the body.", "The candle does not, by itself, complete a reversal."],
  context: "A doji matters more after a strong push, where it can show that the push is stalling. In a quiet range it often means nothing.",
  entry: "Many traders wait for the next candle to close beyond the doji high or low before treating it as a directional clue.",
  stop: "An example stop sits beyond the opposite wick of the doji.",
  target: "An example target is the next nearby swing. There is no fixed distance.",
  mistakes: ["Calling every small body a reversal.", "Ignoring the candles that came before it."],
  related: ["spinning-top", "dragonfly-doji", "gravestone-doji"],
});

candles({
  order: 2, slug: "spinning-top", name: "Spinning Top", direction: "neutral",
  summary: "A small real body with shadows on both sides.",
  description: "A spinning top shows a pause. The body is small, but unlike a doji it still has a visible open-to-close range.",
  label: "Spinning top with a small body and shadows above and below",
  candles: [c(20, 22, 16, 17), c(17, 18, 13, 14), c(14, 17.5, 10.5, 15.2)],
  identification: ["The real body is small relative to the full range.", "Both the upper and lower shadows are noticeable.", "The close does not leave the candle near only one extreme."],
  context: "After a trend, a spinning top can mark hesitation. Inside a choppy range it is common noise.",
  entry: "An example is to wait for a later candle to close outside the spinning top's high or low.",
  stop: "An example stop is beyond the wick opposite the chosen direction.",
  target: "An example target is the prior swing in the direction of the later close.",
  mistakes: ["Treating the small body as a buy or sell by itself."],
  related: ["doji", "hammer", "shooting-star"],
});

candles({
  order: 3, slug: "bullish-marubozu", name: "Bullish Marubozu", direction: "bullish",
  summary: "A long bullish candle with little or no shadow.",
  description: "Price opened near the low and closed near the high. Buyers controlled the whole candle.",
  label: "Long bullish marubozu closing at the high",
  candles: [c(22, 23, 18, 19), c(19, 20, 16, 16.4), c(16.2, 24, 16, 23.8)],
  identification: ["The candle is bullish and unusually long for the recent range.", "The upper and lower shadows are tiny or absent.", "The close is at or next to the high."],
  context: "It shows strong buying during that candle. It can appear as a breakout or as an exhaustion candle, so the location matters.",
  entry: "An example entry is a later break of the marubozu high, or a pullback that holds above the candle's midpoint.",
  stop: "An example stop is back through the marubozu low.",
  target: "An example target is the next prior high.",
  mistakes: ["Buying the close of every long green candle without a level nearby."],
  related: ["bearish-marubozu", "three-white-soldiers"],
});

candles({
  order: 4, slug: "bearish-marubozu", name: "Bearish Marubozu", direction: "bearish",
  summary: "A long bearish candle with little or no shadow.",
  description: "Price opened near the high and closed near the low. Sellers controlled the whole candle.",
  label: "Long bearish marubozu closing at the low",
  candles: [c(12, 16, 11, 15), c(15, 18, 14, 17.6), c(17.8, 18, 10, 10.2)],
  identification: ["The candle is bearish and long.", "Shadows are tiny or absent.", "The close is at or next to the low."],
  context: "It shows strong selling during that candle. At the end of a long decline it can also be exhaustion.",
  entry: "An example entry is a later break of the marubozu low.",
  stop: "An example stop is back through the marubozu high.",
  target: "An example target is the next prior low.",
  mistakes: ["Selling a long red candle that has already run into a known support area."],
  related: ["bullish-marubozu", "three-black-crows"],
});

candles({
  order: 5, slug: "hammer", name: "Hammer", direction: "bullish",
  summary: "A small body near the high and a long lower shadow, after a decline.",
  description: "Sellers pushed price down during the candle, and buyers brought it back before the close. The hammer is a possible reversal only when it follows a decline.",
  label: "Hammer after a decline, with a long lower shadow",
  candles: [c(24, 25, 19, 20), c(20, 21, 15, 16), c(13.2, 15.8, 8, 15.2)],
  identification: ["The lower shadow is at least about twice the real body.", "The real body sits in the upper part of the range.", "The upper shadow is small.", "The candles before it were declining."],
  context: "The same shape after a rally is a hanging man, not a hammer.",
  entry: "An example entry is the next candle closing above the hammer high.",
  stop: "An example stop is below the hammer's low.",
  target: "An example target is the swing high that started the decline.",
  mistakes: ["Buying the hammer before the decline is clear.", "Using the shape alone with no nearby level."],
  related: ["hanging-man", "inverted-hammer", "dragonfly-doji"],
});

candles({
  order: 6, slug: "inverted-hammer", name: "Inverted Hammer", direction: "bullish",
  summary: "A small body near the low and a long upper shadow, after a decline.",
  description: "Buyers tested higher during the candle, but the close stayed near the open. It is only a possible bullish clue after a decline, and it needs the next candle to confirm.",
  label: "Inverted hammer after a decline, with a long upper shadow",
  candles: [c(22, 23, 17, 18), c(18, 19, 13, 14), c(13.2, 20, 13, 14.8)],
  identification: ["The upper shadow is long relative to the body.", "The body is small and near the low.", "It appears after a decline."],
  context: "The same shape after a rally is a shooting star.",
  entry: "An example entry is a later close above the inverted hammer high.",
  stop: "An example stop is below the inverted hammer low.",
  target: "An example target is the last lower high of the decline.",
  mistakes: ["Buying it only because the upper wick looks tall."],
  related: ["hammer", "shooting-star"],
});

candles({
  order: 7, slug: "hanging-man", name: "Hanging Man", direction: "bearish",
  summary: "A hammer-shaped candle after a rally.",
  description: "The long lower shadow shows that sellers were able to push price down during an uptrend. The pattern is not complete until a later candle confirms weakness.",
  label: "Hanging man after a rally",
  candles: [c(10, 14, 9, 13), c(13, 17, 12, 16), c(15.2, 16.8, 9, 16.2)],
  identification: ["The shape matches a hammer: small body near the high, long lower shadow.", "It prints after a rally, not after a decline."],
  context: "Location changes the name and the usual reading. After a rally this shape is a warning, not a buy signal.",
  entry: "An example entry is a later close below the hanging man low.",
  stop: "An example stop is above the hanging man high.",
  target: "An example target is the last higher low of the rally.",
  mistakes: ["Calling it a hammer because the shape matches, while ignoring the rally in front of it."],
  related: ["hammer", "shooting-star"],
});

candles({
  order: 8, slug: "shooting-star", name: "Shooting Star", direction: "bearish",
  summary: "A small body near the low and a long upper shadow, after a rally.",
  description: "Buyers pushed the candle higher and could not hold it. The close finishes near the low of that candle.",
  label: "Shooting star after a rally",
  candles: [c(11, 14, 10, 13), c(13, 17, 12, 16.5), c(16.4, 23, 16, 17.6)],
  identification: ["The upper shadow is long.", "The real body is small and near the low.", "It follows a rally."],
  context: "At resistance, the failed push higher is the point of the pattern.",
  entry: "An example entry is a later close below the shooting star low.",
  stop: "An example stop is above the shooting star high.",
  target: "An example target is the prior swing low.",
  mistakes: ["Shorting the upper wick before the candle has closed near its low."],
  related: ["inverted-hammer", "hanging-man", "gravestone-doji"],
});

candles({
  order: 9, slug: "dragonfly-doji", name: "Dragonfly Doji", direction: "bullish",
  summary: "Open and close sit at the high, with a long lower shadow.",
  description: "Price was sold down and came back to finish where it opened, at the top of the candle. After a decline, traders watch it as a possible reversal clue.",
  label: "Dragonfly doji with the close at the high and a long lower shadow",
  candles: [c(21, 22, 16, 17), c(17, 18, 12, 13), c(13, 13.1, 6, 13)],
  identification: ["Open and close are nearly equal and near the high.", "The lower shadow is long.", "There is little or no upper shadow."],
  context: "After a decline it resembles a hammer. In the middle of a range it is less meaningful.",
  entry: "An example entry is a later close above the dragonfly high.",
  stop: "An example stop is below the long lower shadow.",
  target: "An example target is the prior swing high.",
  mistakes: ["Treating the long wick as confirmation before the next candle agrees."],
  related: ["hammer", "doji", "gravestone-doji"],
});

candles({
  order: 10, slug: "gravestone-doji", name: "Gravestone Doji", direction: "bearish",
  summary: "Open and close sit at the low, with a long upper shadow.",
  description: "Price rallied during the candle and returned to the open by the close. After a rally, that failed high is the bearish clue.",
  label: "Gravestone doji with the close at the low and a long upper shadow",
  candles: [c(12, 15, 11, 14), c(14, 18, 13, 17), c(17, 24, 16.9, 17)],
  identification: ["Open and close are nearly equal and near the low.", "The upper shadow is long.", "There is little or no lower shadow."],
  context: "After a rally it resembles a shooting star. The doji body means the close gave back the whole push.",
  entry: "An example entry is a later close below the gravestone low.",
  stop: "An example stop is above the upper shadow.",
  target: "An example target is the prior swing low.",
  mistakes: ["Reading it as bullish only because the wick went up."],
  related: ["shooting-star", "doji", "dragonfly-doji"],
});

candles({
  order: 11, slug: "bullish-engulfing", name: "Bullish Engulfing", direction: "bullish",
  summary: "A bullish candle whose body covers the prior bearish body.",
  description: "The second candle opens at or below the prior close and finishes above the prior open. Buyers took back the whole previous body.",
  label: "Bullish candle engulfing the previous bearish body",
  candles: [c(20, 21, 16, 17), c(17, 18, 13, 14), c(13.6, 19, 13.2, 18.4)],
  identification: ["The first candle is bearish.", "The second candle is bullish.", "The second body fully covers the first body."],
  context: "The usual setting is a decline. In a flat market the same two candles are less informative.",
  entry: "An example entry is above the engulfing candle's high.",
  stop: "An example stop is below the engulfing candle's low.",
  target: "An example target is the start of the decline.",
  mistakes: ["Counting a candle that only covers the wick, not the real body."],
  related: ["bearish-engulfing", "piercing-line", "three-outside-up"],
});

candles({
  order: 12, slug: "bearish-engulfing", name: "Bearish Engulfing", direction: "bearish",
  summary: "A bearish candle whose body covers the prior bullish body.",
  description: "The second candle opens at or above the prior close and finishes below the prior open. Sellers took back the whole previous body.",
  label: "Bearish candle engulfing the previous bullish body",
  candles: [c(12, 15, 11, 14), c(14, 18, 13.5, 17.2), c(17.6, 18.2, 12.4, 13)],
  identification: ["The first candle is bullish.", "The second candle is bearish.", "The second body fully covers the first body."],
  context: "The usual setting is a rally.",
  entry: "An example entry is below the engulfing candle's low.",
  stop: "An example stop is above the engulfing candle's high.",
  target: "An example target is the start of the rally.",
  mistakes: ["Selling an engulfing candle that is still inside a larger uptrend with no level."],
  related: ["bullish-engulfing", "dark-cloud-cover", "three-outside-down"],
});

candles({
  order: 13, slug: "bullish-harami", name: "Bullish Harami", direction: "bullish",
  summary: "A small bullish body inside the prior large bearish body.",
  description: "The decline pauses. The second body is completely inside the first body, which shows less follow-through from sellers.",
  label: "Small bullish candle inside a prior bearish candle",
  candles: [c(22, 23, 18, 19), c(19, 20, 12, 13), c(14, 16.5, 13.2, 16)],
  identification: ["The first candle is a relatively large bearish candle.", "The second body is small and sits inside the first body.", "The second candle does not break the first candle's range by much."],
  context: "After a decline, the harami is a pause. It is weaker than an engulfing pattern because buyers have not taken the prior body back.",
  entry: "An example entry waits for a close above the first candle's high.",
  stop: "An example stop is below the first candle's low.",
  target: "An example target is the swing that began the decline.",
  mistakes: ["Treating the inside candle as a completed reversal."],
  related: ["bearish-harami", "bullish-engulfing", "three-inside-up"],
});

candles({
  order: 14, slug: "bearish-harami", name: "Bearish Harami", direction: "bearish",
  summary: "A small bearish body inside the prior large bullish body.",
  description: "The rally pauses. The second body is inside the first, so buyers did not get immediate follow-through.",
  label: "Small bearish candle inside a prior bullish candle",
  candles: [c(10, 13, 9, 12), c(12, 20, 11.5, 19), c(17.5, 18, 15, 15.6)],
  identification: ["The first candle is a relatively large bullish candle.", "The second body is small and inside the first body."],
  context: "After a rally, this is indecision rather than a finished reversal.",
  entry: "An example entry waits for a close below the first candle's low.",
  stop: "An example stop is above the first candle's high.",
  target: "An example target is the swing that began the rally.",
  mistakes: ["Shorting the small inside candle before the range breaks."],
  related: ["bullish-harami", "bearish-engulfing", "three-inside-down"],
});

candles({
  order: 15, slug: "piercing-line", name: "Piercing Line", direction: "bullish",
  summary: "A bullish candle that opens below the prior low and closes above the prior midpoint.",
  description: "Sellers still gapped the open down, then buyers closed back through at least half of the previous bearish body.",
  label: "Piercing line closing above the midpoint of the prior red candle",
  candles: [c(20, 21, 16, 17), c(17, 18, 12, 13), c(11.5, 16.2, 11.2, 15.4)],
  identification: ["The first candle is bearish.", "The second opens below the first candle's low.", "The second closes above the midpoint of the first body, but not above the first open."],
  context: "It is a softer version of a bullish engulfing pattern. The body does not cover the entire prior body.",
  entry: "An example entry is above the second candle's high.",
  stop: "An example stop is below the second candle's low.",
  target: "An example target is the open of the first candle, then the prior swing.",
  mistakes: ["Counting it when the close only barely enters the prior body."],
  related: ["bullish-engulfing", "dark-cloud-cover"],
});

candles({
  order: 16, slug: "dark-cloud-cover", name: "Dark Cloud Cover", direction: "bearish",
  summary: "A bearish candle that opens above the prior high and closes below the prior midpoint.",
  description: "Buyers gapped the open up, then sellers closed back through at least half of the previous bullish body.",
  label: "Dark cloud cover closing below the midpoint of the prior green candle",
  candles: [c(12, 15, 11, 14), c(14, 19, 13.5, 18.2), c(19.6, 20, 15.2, 15.8)],
  identification: ["The first candle is bullish.", "The second opens above the first candle's high.", "The second closes below the midpoint of the first body, but not below the first open."],
  context: "It is a softer version of a bearish engulfing pattern.",
  entry: "An example entry is below the second candle's low.",
  stop: "An example stop is above the second candle's high.",
  target: "An example target is the open of the first candle, then the prior swing.",
  mistakes: ["Using a red candle that never reached the midpoint of the prior body."],
  related: ["bearish-engulfing", "piercing-line"],
});

candles({
  order: 17, slug: "tweezer-bottom", name: "Tweezer Bottom", direction: "bullish",
  summary: "Two candles that share the same low after a decline.",
  description: "Price tests one low twice and does not continue down. The matching lows are the pattern. The second candle is often bullish.",
  label: "Two candles with a matching low after a decline",
  candles: [c(18, 19, 14, 15), c(15, 16, 10, 11), c(11, 15, 10, 14.5)],
  identification: ["Two adjacent lows are essentially equal.", "The pair comes after a decline.", "The second candle preferably closes off that low."],
  context: "The matching low shows a price the market rejected twice. It is stronger when that low lines up with an older level.",
  entry: "An example entry is above the higher high of the two candles.",
  stop: "An example stop is below the shared low.",
  target: "An example target is the swing high before the decline.",
  mistakes: ["Calling any two similar candles a tweezer when their lows do not match."],
  related: ["tweezer-top", "hammer"],
});

candles({
  order: 18, slug: "tweezer-top", name: "Tweezer Top", direction: "bearish",
  summary: "Two candles that share the same high after a rally.",
  description: "Price tests one high twice and does not continue up. The matching highs are the pattern.",
  label: "Two candles with a matching high after a rally",
  candles: [c(12, 16, 11, 15), c(15, 20, 14, 19), c(19, 20, 15, 15.6)],
  identification: ["Two adjacent highs are essentially equal.", "The pair comes after a rally.", "The second candle preferably closes off that high."],
  context: "A shared high is more useful at a prior resistance area than in open space.",
  entry: "An example entry is below the lower low of the two candles.",
  stop: "An example stop is above the shared high.",
  target: "An example target is the swing low before the rally.",
  mistakes: ["Shorting two green candles that merely look similar."],
  related: ["tweezer-bottom", "shooting-star"],
});

candles({
  order: 19, slug: "bullish-kicker", name: "Bullish Kicker", direction: "bullish",
  summary: "A bearish candle followed by a bullish candle that gaps up and does not overlap.",
  description: "The second candle opens above the prior candle's range and continues higher. The gap is the defining feature.",
  label: "Bullish kicker gapping above the prior bearish candle",
  candles: [c(18, 19, 12, 13), c(20.5, 26, 20.2, 25.4)],
  identification: ["The first candle is bearish.", "The second candle is bullish.", "The second candle gaps above the first candle and the ranges do not overlap."],
  context: "Kickers are rare. A small gap that still overlaps the prior wick is not this pattern.",
  entry: "An example entry is a hold above the gap, or a break of the second candle's high.",
  stop: "An example stop is back inside the gap, below the second candle's open.",
  target: "An example target is a measured move of the second candle added to the break.",
  mistakes: ["Labeling a normal gap-up that still overlaps the prior high."],
  related: ["bearish-kicker", "bullish-engulfing"],
});

candles({
  order: 20, slug: "bearish-kicker", name: "Bearish Kicker", direction: "bearish",
  summary: "A bullish candle followed by a bearish candle that gaps down and does not overlap.",
  description: "The second candle opens below the prior range and continues lower. The unfilled gap separates it from a normal bearish candle.",
  label: "Bearish kicker gapping below the prior bullish candle",
  candles: [c(14, 22, 13.5, 21), c(12, 12.2, 6, 6.6)],
  identification: ["The first candle is bullish.", "The second candle is bearish.", "The ranges do not overlap."],
  context: "Like the bullish version, this is uncommon. Most down candles are not kickers.",
  entry: "An example entry is a break of the second candle's low.",
  stop: "An example stop is back above the second candle's open, inside the gap.",
  target: "An example target is the next prior low.",
  mistakes: ["Ignoring that the gap must stay open for the pattern to remain intact."],
  related: ["bullish-kicker", "bearish-engulfing"],
});

candles({
  order: 21, slug: "morning-star", name: "Morning Star", direction: "bullish",
  summary: "A long bearish candle, a small candle, then a bullish candle closing into the first body.",
  description: "Selling slows on the middle candle. The third candle closes back up into the first candle's body.",
  label: "Morning star with a small middle candle after a decline",
  candles: [c(22, 23, 14, 15), c(14.2, 15.2, 12.8, 13.4), c(13.8, 20, 13.5, 19.2)],
  identification: ["Candle one is a long bearish candle.", "Candle two has a small body and can gap down.", "Candle three is bullish and closes above the midpoint of candle one."],
  context: "The middle candle is the stall. Without the third candle closing back up, there is no morning star.",
  entry: "An example entry is above the third candle's high.",
  stop: "An example stop is below the lowest low of the three candles.",
  target: "An example target is the open of the first candle.",
  mistakes: ["Counting two candles and skipping the confirming third close."],
  related: ["morning-doji-star", "bullish-abandoned-baby", "evening-star"],
});

candles({
  order: 22, slug: "evening-star", name: "Evening Star", direction: "bearish",
  summary: "A long bullish candle, a small candle, then a bearish candle closing into the first body.",
  description: "Buying slows on the middle candle. The third candle closes back down into the first candle's body.",
  label: "Evening star with a small middle candle after a rally",
  candles: [c(12, 20, 11.5, 19), c(19.4, 21, 18.6, 19.8), c(19.2, 19.5, 13, 14)],
  identification: ["Candle one is a long bullish candle.", "Candle two has a small body.", "Candle three is bearish and closes below the midpoint of candle one."],
  context: "The pattern is the bearish counterpart of the morning star.",
  entry: "An example entry is below the third candle's low.",
  stop: "An example stop is above the highest high of the three candles.",
  target: "An example target is the open of the first candle.",
  mistakes: ["Using a small middle candle that never stalls a real rally."],
  related: ["evening-doji-star", "bearish-abandoned-baby", "morning-star"],
});

candles({
  order: 23, slug: "morning-doji-star", name: "Morning Doji Star", direction: "bullish",
  summary: "A morning star whose middle candle is a doji.",
  description: "The middle candle opens and closes in the same place after a gap down from a bearish candle. The third candle closes back into the first body.",
  label: "Morning doji star with a doji between a red and a green candle",
  candles: [c(22, 23, 14, 15), c(13.2, 14.4, 11.6, 13.2), c(13.6, 20.2, 13.3, 19.4)],
  identification: ["The first candle is bearish.", "The middle candle is a doji, often gapped below the first body.", "The third candle is bullish and closes into the first body."],
  context: "The doji makes the stall clearer than a small-bodied morning star, but it still needs the third candle.",
  entry: "An example entry is above the third candle.",
  stop: "An example stop is below the doji low.",
  target: "An example target is the open of the first candle.",
  mistakes: ["Calling a normal morning star a doji star when the middle candle has a real body."],
  related: ["morning-star", "doji", "bullish-abandoned-baby"],
});

candles({
  order: 24, slug: "evening-doji-star", name: "Evening Doji Star", direction: "bearish",
  summary: "An evening star whose middle candle is a doji.",
  description: "The middle candle is a doji after a bullish candle. The third candle closes back down into the first body.",
  label: "Evening doji star with a doji between a green and a red candle",
  candles: [c(12, 20, 11.6, 19), c(20.2, 21.4, 18.8, 20.2), c(19.6, 19.8, 13, 13.8)],
  identification: ["The first candle is bullish.", "The middle candle is a doji.", "The third candle is bearish and closes into the first body."],
  context: "Same structure as the evening star, with a doji as the stall.",
  entry: "An example entry is below the third candle.",
  stop: "An example stop is above the doji high.",
  target: "An example target is the open of the first candle.",
  mistakes: ["Skipping the requirement that the third candle closes into the first body."],
  related: ["evening-star", "doji", "bearish-abandoned-baby"],
});

candles({
  order: 25, slug: "three-white-soldiers", name: "Three White Soldiers", direction: "bullish",
  summary: "Three bullish candles in a row, each closing higher.",
  description: "Each candle opens inside the prior body and closes near its own high. The sequence shows persistent buying, usually after a decline.",
  label: "Three consecutive bullish candles closing higher",
  candles: [c(18, 19, 14, 15), c(15.2, 18.4, 14.8, 18), c(17.2, 21, 16.8, 20.6), c(19.8, 24, 19.4, 23.6)],
  identification: ["Three bullish candles.", "Each close is higher than the previous close.", "Each opens within or near the prior body and has a small upper shadow."],
  context: "The pattern is about follow-through. Three green candles with long upper wicks do not qualify.",
  entry: "An example entry is a pause that holds above the first soldier, or a break of the third high.",
  stop: "An example stop is below the first soldier's low.",
  target: "An example target is the swing high before the decline.",
  mistakes: ["Counting three ordinary green candles that open far above each other."],
  related: ["three-black-crows", "bullish-marubozu"],
});

candles({
  order: 26, slug: "three-black-crows", name: "Three Black Crows", direction: "bearish",
  summary: "Three bearish candles in a row, each closing lower.",
  description: "Each candle opens inside the prior body and closes near its own low. The sequence shows persistent selling, usually after a rally.",
  label: "Three consecutive bearish candles closing lower",
  candles: [c(14, 20, 13, 19), c(18.6, 19, 15.2, 15.6), c(16.2, 16.6, 12.4, 12.8), c(13.4, 13.8, 9.2, 9.6)],
  identification: ["Three bearish candles.", "Each close is lower.", "Each opens within or near the prior body and has a small lower shadow."],
  context: "It is the bearish counterpart of three white soldiers.",
  entry: "An example entry is a break of the third candle's low.",
  stop: "An example stop is above the first crow's high.",
  target: "An example target is the swing low before the rally.",
  mistakes: ["Counting a gap-down sequence that never opens inside the prior body."],
  related: ["three-white-soldiers", "bearish-marubozu"],
});

candles({
  order: 27, slug: "three-inside-up", name: "Three Inside Up", direction: "bullish",
  summary: "A bullish harami followed by a third candle that closes above the first high.",
  description: "The inside candle pauses the decline. The third candle confirms by closing above the first candle.",
  label: "Three inside up confirming a bullish harami",
  candles: [c(20, 21, 12, 13), c(14, 16.4, 13.2, 16), c(16.2, 22, 15.8, 21.4)],
  identification: ["Candles one and two form a bullish harami.", "Candle three closes above the high of candle one."],
  context: "The third close is what separates this from a harami that goes nowhere.",
  entry: "An example entry is above the third candle.",
  stop: "An example stop is below the lowest low of the three candles.",
  target: "An example target is the prior swing high.",
  mistakes: ["Stopping at the harami and calling the pattern complete."],
  related: ["bullish-harami", "three-outside-up"],
});

candles({
  order: 28, slug: "three-inside-down", name: "Three Inside Down", direction: "bearish",
  summary: "A bearish harami followed by a third candle that closes below the first low.",
  description: "The inside candle pauses the rally. The third candle confirms by closing below the first candle.",
  label: "Three inside down confirming a bearish harami",
  candles: [c(12, 21, 11.5, 20), c(18.2, 18.8, 16, 16.4), c(16.2, 16.6, 10, 10.6)],
  identification: ["Candles one and two form a bearish harami.", "Candle three closes below the low of candle one."],
  context: "Confirmation is the close below the first candle, not the inside candle itself.",
  entry: "An example entry is below the third candle.",
  stop: "An example stop is above the highest high of the three candles.",
  target: "An example target is the prior swing low.",
  mistakes: ["Shorting before the third candle clears the first low."],
  related: ["bearish-harami", "three-outside-down"],
});

candles({
  order: 29, slug: "three-outside-up", name: "Three Outside Up", direction: "bullish",
  summary: "A bullish engulfing pattern plus a third candle that closes higher.",
  description: "The engulfing candle takes back the prior bearish body. The next candle closes above that engulfing candle.",
  label: "Three outside up after a bullish engulfing candle",
  candles: [c(16, 17, 12, 12.6), c(12.2, 18.4, 12, 17.8), c(17.4, 21, 17, 20.6)],
  identification: ["Candles one and two form a bullish engulfing pattern.", "Candle three closes above candle two."],
  context: "The extra candle is confirmation that the engulfing candle got follow-through.",
  entry: "An example entry is above the third candle.",
  stop: "An example stop is below the engulfing candle's low.",
  target: "An example target is the swing high before the decline.",
  mistakes: ["Ignoring the requirement that candle two actually engulfs candle one."],
  related: ["bullish-engulfing", "three-inside-up"],
});

candles({
  order: 30, slug: "three-outside-down", name: "Three Outside Down", direction: "bearish",
  summary: "A bearish engulfing pattern plus a third candle that closes lower.",
  description: "The engulfing candle takes back the prior bullish body. The next candle closes below that engulfing candle.",
  label: "Three outside down after a bearish engulfing candle",
  candles: [c(14, 18, 13.5, 17.4), c(17.8, 18.2, 12.2, 12.8), c(12.6, 13, 9, 9.4)],
  identification: ["Candles one and two form a bearish engulfing pattern.", "Candle three closes below candle two."],
  context: "The third candle is the follow-through.",
  entry: "An example entry is below the third candle.",
  stop: "An example stop is above the engulfing candle's high.",
  target: "An example target is the swing low before the rally.",
  mistakes: ["Calling it complete on the engulfing candle alone."],
  related: ["bearish-engulfing", "three-inside-down"],
});

candles({
  order: 31, slug: "bullish-abandoned-baby", name: "Bullish Abandoned Baby", direction: "bullish",
  summary: "A bearish candle, a gap-down doji, then a bullish candle that gaps up.",
  description: "The doji is isolated. Its range does not overlap either neighbor. That separation is what makes the pattern rare.",
  label: "Bullish abandoned baby with an isolated doji below the surrounding candles",
  candles: [c(22, 23, 16, 16.6), c(14.2, 15, 12.4, 14.2), c(17.2, 22, 17, 21.4)],
  identification: ["The middle candle is a doji.", "It gaps below the first candle.", "The third candle gaps above the doji and closes bullish."],
  context: "If any wick overlaps, it is a morning doji star or an ordinary three-candle pattern, not an abandoned baby.",
  entry: "An example entry is above the third candle.",
  stop: "An example stop is below the isolated doji.",
  target: "An example target is the open of the first candle.",
  mistakes: ["Using the name when the doji still overlaps a neighboring wick."],
  related: ["morning-doji-star", "bearish-abandoned-baby"],
});

candles({
  order: 32, slug: "bearish-abandoned-baby", name: "Bearish Abandoned Baby", direction: "bearish",
  summary: "A bullish candle, a gap-up doji, then a bearish candle that gaps down.",
  description: "The doji sits alone above the two neighbors. The third candle gaps away from it and closes down.",
  label: "Bearish abandoned baby with an isolated doji above the surrounding candles",
  candles: [c(12, 18, 11.6, 17.4), c(19.6, 20.8, 19.2, 19.6), c(17, 17.2, 12, 12.6)],
  identification: ["The middle candle is a doji gapped above the first candle.", "The third candle gaps below the doji and closes bearish.", "The doji does not overlap either neighbor."],
  context: "The isolation is the whole pattern. Overlap turns it into a different star pattern.",
  entry: "An example entry is below the third candle.",
  stop: "An example stop is above the isolated doji.",
  target: "An example target is the open of the first candle.",
  mistakes: ["Naming any evening doji star an abandoned baby."],
  related: ["evening-doji-star", "bullish-abandoned-baby"],
});

candles({
  order: 33, slug: "rising-three-methods", name: "Rising Three Methods", direction: "bullish",
  summary: "A long bullish candle, three small bearish candles inside it, then another bullish candle.",
  description: "The small candles drift down but stay inside the first candle's range. The last candle closes above the first candle's close.",
  label: "Rising three methods with three small candles inside a bullish range",
  candles: [c(12, 20, 11.6, 19.4), c(19, 19.4, 16.8, 17.2), c(17.4, 17.8, 15.6, 16), c(16.2, 16.6, 14.8, 15.2), c(15.6, 22, 15.2, 21.2)],
  identification: ["Candle one is a long bullish candle.", "The next three candles are small, mostly bearish, and stay inside candle one's range.", "The final candle is bullish and closes above candle one's close."],
  context: "This is a continuation pattern. The drift is a pause in an existing rise, not a reversal by itself.",
  entry: "An example entry is above the final candle.",
  stop: "An example stop is below the first candle's low.",
  target: "An example target is a measured move of the first candle added above the break.",
  mistakes: ["Treating the three small red candles as a reversal before the fifth candle prints."],
  related: ["falling-three-methods", "three-white-soldiers", "bull-flag"],
});

candles({
  order: 34, slug: "falling-three-methods", name: "Falling Three Methods", direction: "bearish",
  summary: "A long bearish candle, three small bullish candles inside it, then another bearish candle.",
  description: "The small candles drift up inside the first candle. The last candle closes below the first candle's close.",
  label: "Falling three methods with three small candles inside a bearish range",
  candles: [c(22, 22.4, 14, 14.6), c(14.8, 17, 14.4, 16.6), c(16.4, 18.2, 16, 17.8), c(17.6, 19, 17.2, 18.6), c(18.2, 18.4, 12, 12.6)],
  identification: ["Candle one is a long bearish candle.", "The middle candles are small and stay inside its range.", "The final candle is bearish and closes below candle one's close."],
  context: "This is the bearish continuation version of rising three methods.",
  entry: "An example entry is below the final candle.",
  stop: "An example stop is above the first candle's high.",
  target: "An example target is the next prior low.",
  mistakes: ["Buying the three small green candles as a reversal without the fifth candle."],
  related: ["rising-three-methods", "three-black-crows", "bear-flag"],
});

chart({
  category: "reversal", order: 40, slug: "double-bottom", name: "Double Bottom", direction: "bullish",
  summary: "Two similar lows with a rally between them, then a break of the middle high.",
  description: "Price fails to make a lower low on the second test. The pattern is confirmed when price closes through the high between the two lows, called the neckline.",
  label: "Double bottom with two similar lows and a neckline",
  path: "M16 40 L70 130 L130 58 L196 134 L250 46 L300 28",
  lines: [{ d: "M70 58 H250", color: "#A5AAA5" }],
  marks: [{ x: 248, y: 50, text: "ENTRY", color: "#A8FF00" }, { x: 176, y: 156, text: "STOP", color: "#ff5a5a" }],
  identification: ["Two lows form at a similar price.", "A rally between them creates a neckline.", "Confirmation is a close through that neckline, not the second low by itself."],
  context: "The second low can be slightly higher or slightly lower. What matters is that selling did not continue.",
  entry: "An example entry is the close through the neckline.",
  stop: "An example stop is below the lower of the two lows.",
  target: "A common teaching method projects the height from the lows to the neckline upward from the break. That is a plan, not a forecast.",
  mistakes: ["Buying the second low before the neckline breaks."],
  related: ["double-top", "inverse-head-and-shoulders", "double-top-bottom"],
});

chart({
  category: "reversal", order: 41, slug: "double-top", name: "Double Top", direction: "bearish",
  summary: "Two similar highs with a dip between them, then a break of the middle low.",
  description: "Price fails to make a higher high on the second test. Confirmation is a close through the low between the two highs.",
  label: "Double top with two similar highs and a neckline",
  path: "M16 140 L70 42 L130 112 L196 40 L260 124 L304 150",
  lines: [{ d: "M70 112 H260", color: "#A5AAA5" }],
  marks: [{ x: 250, y: 136, text: "ENTRY", color: "#A8FF00" }, { x: 176, y: 28, text: "STOP", color: "#ff5a5a" }],
  identification: ["Two highs form at a similar price.", "A dip between them creates a neckline.", "Confirmation is a close below that neckline."],
  context: "This is the bearish mirror of the double bottom.",
  entry: "An example entry is the close through the neckline.",
  stop: "An example stop is above the higher of the two highs.",
  target: "A common teaching method projects the pattern height down from the neckline. That measurement can fail.",
  mistakes: ["Shorting the second high before the neckline breaks."],
  related: ["double-bottom", "head-and-shoulders", "double-top-bottom"],
});

chart({
  category: "reversal", order: 42, slug: "inverse-head-and-shoulders", name: "Inverse Head and Shoulders", direction: "bullish",
  summary: "A low, a lower low, and a higher low, then a break of the neckline.",
  description: "The middle trough is the head. The two side troughs are the shoulders. The neckline connects the rally peaks between them.",
  label: "Inverse head and shoulders with a lower middle trough",
  path: "M16 36 L58 100 L100 62 L160 142 L214 64 L268 96 L310 30",
  lines: [{ d: "M100 62 L214 64", color: "#A5AAA5" }],
  marks: [{ x: 268, y: 52, text: "ENTRY", color: "#A8FF00" }, { x: 150, y: 166, text: "STOP", color: "#ff5a5a" }],
  identification: ["The head is lower than both shoulders.", "The shoulders are roughly comparable, not identical.", "Confirmation is a close through the neckline."],
  context: "It is usually studied after a decline. A sloppy version with no neckline break is just three swings.",
  entry: "An example entry is the neckline break.",
  stop: "An example stop is below the head, or below the right shoulder for a tighter example.",
  target: "A common teaching method projects the head-to-neckline distance upward. It is not guaranteed.",
  mistakes: ["Drawing a neckline that does not touch the two rally peaks."],
  related: ["head-and-shoulders", "double-bottom"],
});

chart({
  category: "reversal", order: 43, slug: "head-and-shoulders", name: "Head and Shoulders", direction: "bearish",
  summary: "A high, a higher high, and a lower high, then a break of the neckline.",
  description: "The middle peak is the head. The neckline connects the two dips between the peaks.",
  label: "Head and shoulders with a higher middle peak",
  path: "M16 146 L58 78 L104 118 L162 36 L220 116 L274 84 L312 150",
  lines: [{ d: "M104 118 L220 116", color: "#A5AAA5" }],
  marks: [{ x: 262, y: 146, text: "ENTRY", color: "#A8FF00" }, { x: 150, y: 28, text: "STOP", color: "#ff5a5a" }],
  identification: ["The head is higher than both shoulders.", "The right shoulder fails to reach the head.", "Confirmation is a close below the neckline."],
  context: "It is usually studied after a rally.",
  entry: "An example entry is the neckline break.",
  stop: "An example stop is above the right shoulder, or above the head for a wider example.",
  target: "A common teaching method projects the head-to-neckline distance downward.",
  mistakes: ["Labeling three ordinary peaks a head and shoulders when the middle peak is not the highest."],
  related: ["inverse-head-and-shoulders", "double-top"],
});

chart({
  category: "reversal", order: 44, slug: "falling-wedge", name: "Falling Wedge", direction: "bullish",
  summary: "Price makes lower highs and lower lows inside two descending lines that converge.",
  description: "Both boundaries slope down, and the lower line is less steep, so the range tightens. A bullish reading waits for a close above the upper line.",
  label: "Falling wedge tightening downward and breaking up",
  path: "M20 30 L70 78 L110 50 L160 100 L200 78 L250 118 L290 40",
  lines: [
    { d: "M20 24 L250 70", color: "#A5AAA5" },
    { d: "M70 90 L250 130", color: "#A5AAA5" },
  ],
  marks: [{ x: 268, y: 36, text: "ENTRY", color: "#A8FF00" }, { x: 230, y: 150, text: "STOP", color: "#ff5a5a" }],
  identification: ["Highs and lows are both falling.", "The two trendlines converge.", "The break used for a bullish example is a close above the upper line."],
  context: "A falling wedge can appear as a reversal after a decline or as a pause inside a larger rise. The break direction is what traders wait for.",
  entry: "An example entry is the close above the upper boundary.",
  stop: "An example stop is back below the last swing inside the wedge.",
  target: "An example target is the start of the wedge. There is no guaranteed measured move.",
  mistakes: ["Calling a descending channel a wedge when the lines do not converge."],
  related: ["rising-wedge", "bull-flag", "descending-triangle"],
});

chart({
  category: "reversal", order: 45, slug: "rising-wedge", name: "Rising Wedge", direction: "bearish",
  summary: "Price makes higher highs and higher lows inside two rising lines that converge.",
  description: "The range tightens as price rises. A bearish reading waits for a close below the lower line.",
  label: "Rising wedge tightening upward and breaking down",
  path: "M20 150 L70 100 L120 124 L170 70 L214 92 L260 48 L300 130",
  lines: [
    { d: "M20 138 L270 40", color: "#A5AAA5" },
    { d: "M70 112 L270 70", color: "#A5AAA5" },
  ],
  marks: [{ x: 274, y: 150, text: "ENTRY", color: "#A8FF00" }, { x: 236, y: 36, text: "STOP", color: "#ff5a5a" }],
  identification: ["Highs and lows are both rising.", "The trendlines converge.", "The bearish example uses a close below the lower line."],
  context: "A rising wedge can be a rally that is losing push, or a pause in a larger decline. The close through the boundary is the event.",
  entry: "An example entry is the close below the lower boundary.",
  stop: "An example stop is above the last high inside the wedge.",
  target: "An example target is the start of the wedge.",
  mistakes: ["Shorting while price is still respecting the lower line."],
  related: ["falling-wedge", "bear-flag", "ascending-triangle"],
});

chart({
  category: "continuation", order: 50, slug: "bull-flag", name: "Bull Flag", direction: "bullish",
  summary: "A sharp rise, then a small downward-sloping channel, then a break higher.",
  description: "The sharp rise is the pole. The flag is a brief drift against that rise. The continuation example is a close above the flag.",
  label: "Bull flag with a rising pole and a short downward drift",
  path: "M24 150 L90 40 L130 62 L170 50 L210 72 L250 58 L300 24",
  lines: [
    { d: "M90 36 L230 58", color: "#A5AAA5" },
    { d: "M100 70 L240 88", color: "#A5AAA5" },
  ],
  marks: [{ x: 268, y: 30, text: "ENTRY", color: "#A8FF00" }, { x: 200, y: 100, text: "STOP", color: "#ff5a5a" }],
  identification: ["A near-vertical move creates the pole.", "The next swings drift slightly down or sideways in a tight channel.", "The example continuation is a close above the channel."],
  context: "The flag should be small relative to the pole. A large retracement is a different pattern.",
  entry: "An example entry is the break of the flag high.",
  stop: "An example stop is below the flag.",
  target: "A common teaching method adds the pole height to the break. That is an example, not a result.",
  mistakes: ["Drawing a flag around a retracement that gives back most of the pole."],
  related: ["bear-flag", "bullish-pennant", "rising-three-methods"],
});

chart({
  category: "continuation", order: 51, slug: "bear-flag", name: "Bear Flag", direction: "bearish",
  summary: "A sharp drop, then a small upward-sloping channel, then a break lower.",
  description: "The pole is the drop. The flag drifts up against that drop. The continuation example is a close below the flag.",
  label: "Bear flag with a falling pole and a short upward drift",
  path: "M24 30 L90 140 L130 116 L174 128 L214 108 L258 120 L304 156",
  lines: [
    { d: "M90 146 L240 122", color: "#A5AAA5" },
    { d: "M104 112 L250 90", color: "#A5AAA5" },
  ],
  marks: [{ x: 270, y: 168, text: "ENTRY", color: "#A8FF00" }, { x: 200, y: 84, text: "STOP", color: "#ff5a5a" }],
  identification: ["A sharp decline creates the pole.", "Price then drifts up in a tight channel.", "The example continuation is a close below the channel."],
  context: "The drift should be corrective and smaller than the pole.",
  entry: "An example entry is the break of the flag low.",
  stop: "An example stop is above the flag.",
  target: "A common teaching method projects the pole downward from the break.",
  mistakes: ["Treating a full reversal back through the pole as a flag."],
  related: ["bull-flag", "bearish-pennant", "falling-three-methods"],
});

chart({
  category: "continuation", order: 52, slug: "bullish-rectangle", name: "Bullish Rectangle", direction: "bullish",
  summary: "Price pauses between two horizontal lines after a rise, then breaks the top.",
  description: "Highs stall at one price and lows stall at another. The bullish continuation example is a close above the top line.",
  label: "Bullish rectangle between two flat boundaries",
  path: "M16 140 L60 70 L100 110 L150 68 L200 112 L250 66 L304 36",
  lines: [
    { d: "M60 66 H270", color: "#A5AAA5" },
    { d: "M60 112 H250", color: "#A5AAA5" },
  ],
  marks: [{ x: 274, y: 40, text: "ENTRY", color: "#A8FF00" }, { x: 180, y: 132, text: "STOP", color: "#ff5a5a" }],
  identification: ["At least two highs meet a flat ceiling.", "At least two lows meet a flat floor.", "The ceiling and floor are roughly parallel."],
  context: "After a rise, a break of the ceiling is the continuation example. A break of the floor invalidates that example.",
  entry: "An example entry is the close above the ceiling.",
  stop: "An example stop is back inside the rectangle, below the last low.",
  target: "A common teaching method adds the rectangle height to the break.",
  mistakes: ["Forcing flat lines onto swings that are clearly sloping."],
  related: ["bearish-rectangle", "ascending-triangle", "bull-flag"],
});

chart({
  category: "continuation", order: 53, slug: "bearish-rectangle", name: "Bearish Rectangle", direction: "bearish",
  summary: "Price pauses between two horizontal lines after a drop, then breaks the floor.",
  description: "The range is flat. The bearish continuation example is a close below the floor.",
  label: "Bearish rectangle breaking below a flat floor",
  path: "M16 36 L60 110 L110 70 L160 112 L210 68 L260 114 L304 150",
  lines: [
    { d: "M60 68 H250", color: "#A5AAA5" },
    { d: "M60 114 H270", color: "#A5AAA5" },
  ],
  marks: [{ x: 270, y: 166, text: "ENTRY", color: "#A8FF00" }, { x: 190, y: 56, text: "STOP", color: "#ff5a5a" }],
  identification: ["Highs respect one horizontal line.", "Lows respect a lower horizontal line.", "The example trigger is a close below the lower line after a decline."],
  context: "The same shape after a rally can break either way. Direction comes from the break, not from the rectangle name alone.",
  entry: "An example entry is the close below the floor.",
  stop: "An example stop is back above the last high inside the range.",
  target: "A common teaching method subtracts the rectangle height from the break.",
  mistakes: ["Assuming every sideways box continues the prior trend."],
  related: ["bullish-rectangle", "descending-triangle", "bear-flag"],
});

chart({
  category: "continuation", order: 54, slug: "bullish-pennant", name: "Bullish Pennant", direction: "bullish",
  summary: "A sharp rise followed by a small symmetrical triangle.",
  description: "The pennant is tighter than a flag. Highs and lows converge quickly after the pole, and the continuation example breaks upward.",
  label: "Bullish pennant, a small triangle after a sharp rise",
  path: "M20 150 L80 46 L120 78 L160 58 L196 72 L230 62 L300 28",
  lines: [
    { d: "M90 42 L230 64", color: "#A5AAA5" },
    { d: "M100 86 L230 66", color: "#A5AAA5" },
  ],
  marks: [{ x: 262, y: 32, text: "ENTRY", color: "#A8FF00" }, { x: 188, y: 98, text: "STOP", color: "#ff5a5a" }],
  identification: ["A sharp pole comes first.", "The next swings form a small triangle, not a channel.", "The example continuation closes above the triangle."],
  context: "Pennants are short. A triangle that takes as long as the pole is better studied as a triangle.",
  entry: "An example entry is the upward break.",
  stop: "An example stop is below the pennant.",
  target: "A common teaching method projects the pole from the break.",
  mistakes: ["Drawing the pennant so wide that it is no longer a brief pause."],
  related: ["bull-flag", "symmetrical-triangle", "bearish-pennant"],
});

chart({
  category: "continuation", order: 55, slug: "bearish-pennant", name: "Bearish Pennant", direction: "bearish",
  summary: "A sharp drop followed by a small symmetrical triangle.",
  description: "After the drop, swings converge into a small triangle. The continuation example breaks downward.",
  label: "Bearish pennant, a small triangle after a sharp drop",
  path: "M20 28 L84 136 L124 104 L164 122 L204 108 L236 118 L304 158",
  lines: [
    { d: "M96 96 L236 116", color: "#A5AAA5" },
    { d: "M90 140 L236 120", color: "#A5AAA5" },
  ],
  marks: [{ x: 268, y: 170, text: "ENTRY", color: "#A8FF00" }, { x: 190, y: 88, text: "STOP", color: "#ff5a5a" }],
  identification: ["A sharp downward pole comes first.", "Price then compresses into a small triangle.", "The example continuation closes below it."],
  context: "The triangle should be brief compared with the drop.",
  entry: "An example entry is the downward break.",
  stop: "An example stop is above the pennant.",
  target: "A common teaching method projects the pole downward.",
  mistakes: ["Confusing a bear pennant with a large symmetrical triangle."],
  related: ["bear-flag", "symmetrical-triangle", "bullish-pennant"],
});

chart({
  category: "continuation", order: 56, slug: "ascending-triangle", name: "Ascending Triangle", direction: "bullish",
  summary: "Flat highs with rising lows.",
  description: "Sellers defend one price while buyers step in at higher lows. The bullish example is a close through the flat high.",
  label: "Ascending triangle with a flat top and rising lows",
  path: "M20 150 L70 70 L120 130 L170 72 L220 110 L270 70 L310 36",
  lines: [
    { d: "M70 68 H290", color: "#A5AAA5" },
    { d: "M20 156 L240 108", color: "#A5AAA5" },
  ],
  marks: [{ x: 274, y: 40, text: "ENTRY", color: "#A8FF00" }, { x: 200, y: 132, text: "STOP", color: "#ff5a5a" }],
  identification: ["Highs line up horizontally.", "Lows rise toward that line.", "The example trigger is a close above the flat highs."],
  context: "This shape often shows up as a continuation, but the flat high can also reject price. The break is the evidence.",
  entry: "An example entry is the close above the flat resistance.",
  stop: "An example stop is below the last higher low.",
  target: "A common teaching method adds the triangle height to the break.",
  mistakes: ["Buying inside the triangle before resistance actually breaks."],
  related: ["descending-triangle", "symmetrical-triangle", "rising-wedge"],
});

chart({
  category: "continuation", order: 57, slug: "descending-triangle", name: "Descending Triangle", direction: "bearish",
  summary: "Flat lows with falling highs.",
  description: "Buyers defend one price while sellers cap each rally lower. The bearish example is a close through the flat low.",
  label: "Descending triangle with a flat floor and falling highs",
  path: "M20 30 L70 112 L130 60 L180 114 L230 80 L280 116 L312 150",
  lines: [
    { d: "M70 116 H300", color: "#A5AAA5" },
    { d: "M20 24 L250 78", color: "#A5AAA5" },
  ],
  marks: [{ x: 274, y: 166, text: "ENTRY", color: "#A8FF00" }, { x: 210, y: 52, text: "STOP", color: "#ff5a5a" }],
  identification: ["Lows line up horizontally.", "Highs step down toward that line.", "The example trigger is a close below the flat lows."],
  context: "Support can hold and the pattern can fail upward. The close through the floor is the bearish example.",
  entry: "An example entry is the close below the flat support.",
  stop: "An example stop is above the last lower high.",
  target: "A common teaching method subtracts the triangle height from the break.",
  mistakes: ["Shorting the falling highs while support is still intact."],
  related: ["ascending-triangle", "symmetrical-triangle", "falling-wedge"],
});

chart({
  category: "continuation", order: 58, slug: "symmetrical-triangle", name: "Symmetrical Triangle", direction: "neutral",
  summary: "Lower highs and higher lows converge. The break can go either way.",
  description: "The two lines slope toward each other. Because neither side is flat, the pattern does not lean bullish or bearish until price leaves it.",
  label: "Symmetrical triangle with converging highs and lows",
  path: "M16 30 L70 130 L120 58 L170 118 L214 74 L258 108 L304 48",
  lines: [
    { d: "M16 26 L270 86", color: "#A5AAA5" },
    { d: "M70 136 L270 96", color: "#A5AAA5" },
  ],
  marks: [{ x: 274, y: 40, text: "BREAK", color: "#A8FF00" }],
  identification: ["Highs are falling.", "Lows are rising.", "The two boundaries converge.", "There is no directional bias until a close leaves the triangle."],
  context: "Traders often look at the trend that led into the triangle, then still wait for the break.",
  entry: "An example entry is the close outside either boundary, in the direction of that close.",
  stop: "An example stop is back inside the triangle, beyond the last swing against the break.",
  target: "A common teaching method uses the widest part of the triangle as the distance. It can fail.",
  mistakes: ["Deciding the direction before the boundary breaks."],
  related: ["ascending-triangle", "descending-triangle", "bullish-pennant", "bearish-pennant"],
});

const nine = [
  {
    order: 70, slug: "9-ema-pullback", name: "9 EMA Pullback", direction: "bullish", chart: "pullback",
    summary: "Trade with the trend using clean 9 EMA pullback entries.",
    description: "This is one of the setups already documented for 9. It uses a trend and a pullback to the 9-period exponential moving average. No performance statistic is attached to it here.",
    identification: ["A trend is already underway.", "Price pulls back to the 9 EMA.", "A candle closes back in the direction of that trend."],
    context: "The setup belongs to an existing trend. A pullback in a directionless market is not this setup.",
    entry: "A trend is already underway. Price pulls back to the 9-period exponential moving average, then a candle closes back in the direction of that trend.",
    stop: "Beyond the pullback swing, on the far side of the 9 EMA. This page does not set a fixed tick distance.",
    target: "The prior swing in the direction of the trend. A target is a plan, not a promised result.",
    mistakes: ["Entering while price is still moving against the trend and has not closed back with it.", "Inventing a fixed tick target that this project does not document."],
    related: ["liquidity-sweep", "bull-flag", "hammer"],
  },
  {
    order: 71, slug: "liquidity-sweep", name: "Liquidity Sweep", direction: "neutral", chart: "sweep",
    summary: "Identify liquidity grabs and potential reversals.",
    description: "This is the liquidity-sweep setup already documented for 9. Price trades beyond a prior high or low and then closes back inside the range.",
    identification: ["A prior high or low is visible.", "Price trades beyond that level.", "Price then closes back inside the prior range."],
    context: "The educational entry is after the reclaim, in the opposite direction of the sweep. The sweep can be above a high or below a low, so the direction is not fixed.",
    entry: "Price trades beyond a prior high or low, then closes back inside the range. The educational entry is after that reclaim, in the opposite direction of the sweep.",
    stop: "Beyond the wick that swept the level.",
    target: "The opposite side of the range, or the middle of the range. Neither outcome is guaranteed.",
    mistakes: ["Entering while price is still outside the range.", "Treating every wick through a level as a completed sweep."],
    related: ["9-ema-pullback", "double-top-bottom", "tweezer-bottom"],
  },
  {
    order: 72, slug: "double-top-bottom", name: "Double Top / Bottom", direction: "neutral", chart: "double",
    summary: "Learn to identify potential reversals at key levels.",
    description: "This is the double-test setup already documented for 9. It is the project's educational version of a double top or double bottom, not a separate performance claim.",
    identification: ["Price tests a similar high or low twice.", "A neckline sits between those tests.", "The educational entry is after price breaks that neckline."],
    context: "The same structure is bullish at a low and bearish at a high. The page does not assign one direction.",
    entry: "Price tests a similar high or low twice, then breaks the neckline between those tests. The educational entry is after that break, not while the second test is still forming.",
    stop: "Beyond the extreme of the two tests.",
    target: "A common teaching method measures the height of the pattern and projects it from the neckline. That measurement is a plan, not a forecast.",
    mistakes: ["Entering during the second test before the neckline breaks.", "Treating the measured move as a forecast."],
    related: ["double-top", "double-bottom", "liquidity-sweep"],
  },
];

for (const setup of nine) {
  add({
    category: "setups",
    order: setup.order,
    slug: setup.slug,
    name: setup.name,
    direction: setup.direction,
    summary: setup.summary,
    description: setup.description,
    identification: setup.identification,
    context: setup.context,
    entry: setup.entry,
    stop: setup.stop,
    target: setup.target,
    mistakes: setup.mistakes,
    related: setup.related,
    diagram: { kind: "setup", chart: setup.chart, label: setup.summary },
    body: `${setup.description}\n\n${plan}`,
  });
}

for (const pattern of patterns) {
  if (!pattern.body) pattern.body = `${pattern.description}\n\n${plan}`;
}

const slugs = new Set(patterns.map((pattern) => pattern.slug));
if (slugs.size !== patterns.length) throw new Error("Duplicate playbook slug");
for (const pattern of patterns) {
  for (const related of pattern.related) {
    if (!slugs.has(related)) throw new Error(`${pattern.slug} -> missing ${related}`);
  }
}

for (const file of fs.readdirSync(out)) {
  if (file.endsWith(".mdx")) fs.unlinkSync(path.join(out, file));
}

for (const pattern of patterns) {
  const { body, ...data } = pattern;
  const file = `---\n${JSON.stringify(data, null, 2)}\n---\n\n${body.trim()}\n`;
  fs.writeFileSync(path.join(out, `${pattern.slug}.mdx`), file);
}

console.log(`Wrote ${patterns.length} playbook patterns`);
