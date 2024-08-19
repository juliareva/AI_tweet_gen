const form = document.getElementById("whoamAI-form");
const sarcasmInput = document.getElementById("sarcasm");
const sarcasmValue = document.getElementById("sarcasm-value");
const openai_key = "";

sarcasmInput.addEventListener("input", () => {
  sarcasmValue.textContent = sarcasmInput.value;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const persona = document.getElementById("persona").value;
  const age = document.getElementById("age").value;
  const mood = document.getElementById("mood").value;
  const adjective = document.getElementById("adjective").value;
  const sarcasm = sarcasmInput.value;
  const prompt = `You are ${persona}, age ${age}, feeling ${mood}. Create a tweet-sized insight using the word ${adjective} with a sarcasm level of ${sarcasm}. Your response should be light-hearted and humorous, reflecting the specified level of sarcasm, and should offer a playful perspective on an existential thought.
        `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openai_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();
    const aiText = data.choices[0].message.content;

    const aiInsight = document.getElementById("ai-insight");

    aiInsight.textContent = aiText;
  } catch (error) {
    console.log(error);
  }

  const avatar = document.getElementById("avatar");
  const avatarUrl = `https://api.dicebear.com/9.x/fun-emoji/svg`;
  avatar.src = avatarUrl;

  document.getElementById("result-section").style.display = "block";
});
