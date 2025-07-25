function removeOuterPunctuation(word) {
  const punct = "!.,:;?\"'()[]{}";

  while (word.length > 0 && punct.includes(word.charAt(0))) {
    word = word.substring(1);
  }

  while (word.length > 0 && punct.includes(word.charAt(word.length - 1))) {
    word = word.slice(0, -1);
  }

  return word;
}
function clearMessage() {
  document.getElementById("message").value = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("score").innerHTML = "";
  document.getElementById("toneMeter").value = 100;
  document
    .getElementById("toneMeter")
    .style.setProperty("accent-color", "green");
  document.getElementById("preview").innerHTML = "";
}
function checkMessage() {
  const msgField = document.getElementById("message");
  const rawMsg = msgField.value.toLowerCase();

  const wordList = rawMsg.split(" ");

  let flagged = [];
  let scoredWords = [];

  wordList.forEach(function (word) {
    const trimmed = removeOuterPunctuation(word);

    // If the word is bad and not already flagged, add it
    if (badwords.includes(trimmed) && !flagged.includes(trimmed)) {
      flagged.push(trimmed);
    }

    // Highlight in preview if it's bad
    if (badwords.includes(trimmed)) {
      scoredWords.push(`<span class="highlight">${word}</span>`);
    } else {
      scoredWords.push(word);
    }
  });

  //reduces score by 20 points per flagged word
  let safeScore = Math.max(0, 100 - flagged.length * 20);

  const resultEl = document.getElementById("result");
  const scoreEl = document.getElementById("score");
  const toneEl = document.getElementById("toneMeter");
  const previewEl = document.getElementById("preview");

  // custom message and color based on number of flagged words
  if (flagged.length === 0) {
    resultEl.innerHTML = "✅ Your message looks respectful!";
    resultEl.style.backgroundColor = "#e7fce9";
    resultEl.style.color = "green";
  } else if (flagged.length <= 2) {
    resultEl.innerHTML = `⚠️ Warning: Found questionable words: ${flagged.join(
      ", "
    )}`;
    resultEl.style.backgroundColor = "#fff9e6";
    resultEl.style.color = "#b95e00";
  } else {
    resultEl.innerHTML = `❌ Message might be hurtful. Please use different words: ${flagged.join(
      ", "
    )}`;
    resultEl.style.backgroundColor = "#fde8e8";
    resultEl.style.color = "#c0392b";
  }

  scoreEl.innerHTML = `🛡️ Safety Score: ${safeScore}%`;
  toneEl.value = safeScore;

  // Visual tone meter color
  if (safeScore >= 80) {
    toneEl.style.setProperty("accent-color", "green");
  } else if (safeScore >= 40) {
    toneEl.style.setProperty("accent-color", "orange");
  } else {
    toneEl.style.setProperty("accent-color", "red");
  }

  previewEl.innerHTML = `<strong>Preview:</strong> ${scoredWords.join(" ")}`;
}
