import axios from "axios";

const { GRAPH_API_TOKEN } = process.env;

const sendReply = async (message, response, business_phone_number_id) => {
  let from = message.from;
  if (from === "5491138300348") from = "54111538300348";

  // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
  return axios({
    method: "POST",
    url: `https://graph.facebook.com/v19.0/${business_phone_number_id}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: "whatsapp",
      to: from,
      text: { body: response },
      // context: {
      //   message_id: message.id, // shows the message as a reply to the original user message
      // },
    },
  });
};

const markAsRead = async (message, business_phone_number_id) => {
  await axios({
    method: "POST",
    url: `https://graph.facebook.com/v19.0/${business_phone_number_id}/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: {
      messaging_product: "whatsapp",
      status: "read",
      message_id: message.id,
    },
  });
};

export { sendReply, markAsRead };
