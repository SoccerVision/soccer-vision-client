const BASE_URL = process.env.REACT_APP_BASE_URL;

function checkResponse(response: Response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(response);
}

// Auth API
export const login = async (email: string, password: string) => {
  return await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data) {
        return data;
      }
    });
};
