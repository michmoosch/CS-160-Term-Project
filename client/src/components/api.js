async function testConnection() {
  const resp = await fetch("/api/");
  const msg = await resp.json();
  console.log(msg);
}

async function registerUser(obj) {
  const resp = await fetch("/api/registerUser", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  const msg = await resp.json();
  return msg;
}

async function loginUser(obj) {
  const resp = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });
}

export { testConnection, registerUser, loginUser };
