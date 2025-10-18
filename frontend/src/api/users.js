// Example: sending login form data
export async function login(email, pass) {
  const response = await fetch('http://127.0.0.1:8000/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: pass,
    }),
  });

  const data = await response.json();
  return data;
}
