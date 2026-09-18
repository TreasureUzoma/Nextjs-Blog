"use server";

export const joinNewsletter = async (email) => {
  const res = await fetch(
    "https://api.penna.dev/api/v1/external/newsletters/subscriber/new",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-penna-public-key": process.env.PENNA_PUBLIC_KEY,
      },
      body: JSON.stringify({ email }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Unable to subscribe to newsletter");
  }

  return data;
};
