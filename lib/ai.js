const { DARMA_API_KEY, DARMA_DEFAULT_USER } = process.env;

const getDarmaResponse = async (text, user = DARMA_DEFAULT_USER) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${DARMA_API_KEY}`);

  const raw = JSON.stringify({
    query: text,
    email: user,
  });

  const response = await fetch(
    "https://darma-api-test.fly.dev/api/agent/assist",
    {
      method: "POST",
      headers: myHeaders,
      body: raw,
    }
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));

  console.log("Full darma response", response);
  return response.results;
};

export { getDarmaResponse };
