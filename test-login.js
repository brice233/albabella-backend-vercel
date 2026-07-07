

async function test() {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "admin@albabella.com", password: "Admin123!" }),
    });
    const data = await res.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}
test();
