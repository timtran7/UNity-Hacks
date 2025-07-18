const badWords = ["stupid", "dumb", "ugly", "hate", "loser", "shut up", "kill"]; // sample list

function checkMessage() {
  const msg = document.getElementById("message").value.toLowerCase();
  let count = 0;
  let foundWords = [];

  badWords.txt.forEach(word => {
    if (msg.includes(word)) {
      count++;
      foundWords.push(word);
    }
  });

  const resultDiv = document.getElementById("result");
  if (count === 0) {
    resultDiv.innerHTML = "✅ Your message looks respectful!";
    resultDiv.style.color = "green";
  } else if (count <= 2) {
    resultDiv.innerHTML = `⚠️ Warning: Found possibly harmful words: ${foundWords.join(", ")}`;
    resultDiv.style.color = "orange";
  } else {
    resultDiv.innerHTML = `❌ Please reword your message. These words may be hurtful: ${foundWords.join(", ")}`;
    resultDiv.style.color = "red";
  }
}
