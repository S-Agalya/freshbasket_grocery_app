const API_BASE = import.meta.env.VITE_API_URL;

export const chatWithAI = async (message) => {
  const res = await fetch(`${API_BASE}/api/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "AI Error");
  }

  return data.reply;
};