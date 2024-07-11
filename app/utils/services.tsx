export const PostRequest = async (url: string, body: string) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
