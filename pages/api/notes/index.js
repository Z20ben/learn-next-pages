export default async function handler(req, res) {
  try {
    const response = await (
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes`)
    ).json();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error API" });
  }
}