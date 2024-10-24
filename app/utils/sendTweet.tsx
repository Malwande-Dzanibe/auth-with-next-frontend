export const SendTweet = async (url: string, body: string, token: string) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + token,
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data.message) {
      message = data.message;
    } else {
      message = data;
    }

    return {
      error: true,
      status: response.status,
      message,
    };
  }

  return data;
};
