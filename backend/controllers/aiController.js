import openai from "../services/openaiService.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.responses.create({
      model: "gpt-5.5",
      input: `
You are FreshBasket AI.

Reply politely.

Customer message:

${message}
`
    });

    res.json({
      reply: response.output_text
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "AI Error",
      error: err.message
    });
  }
};