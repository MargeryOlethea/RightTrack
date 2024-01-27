const mindee = require("mindee");
const mindeeClient = new mindee.Client({
  apiKey: process.env.MINDEE_API_KEY,
});

async function parseReceipt(inputLink) {
  const inputSource = mindeeClient.docFromUrl(inputLink);

  try {
    const resp = await mindeeClient.parse(
      mindee.product.ReceiptV5,
      inputSource,
    );

    return { data: resp.document };
  } catch (error) {
    console.error("Error in parseReceipt:", error);
    throw { name: "ReceiptError", error };
  }
}

module.exports = parseReceipt;
