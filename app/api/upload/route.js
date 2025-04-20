import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get('file');

  if (!file) {
    return Response.json({ success: false, message: 'Kein Bild erhalten.' });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), 'public', 'upload.jpg');
  await writeFile(filePath, buffer);

  return Response.json({ success: true, message: 'Bild erfolgreich hochgeladen!' });
}
