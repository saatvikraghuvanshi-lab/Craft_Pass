export default function handler(_req: unknown, res: any) {
  res.status(404).json({ error: 'API route not found' });
}
