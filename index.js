import fs from 'fs';
import { webcrack } from 'webcrack';
import readline from 'readline';

// Fungsi untuk membaca input teks atau file dari terminal
async function getInput(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => rl.question(prompt, (input) => {
    rl.close();
    resolve(input);
  }));
}

// Fungsi utama untuk melakukan dekripsi
async function decryptTool() {
  const usage = `Usage:
1. Input text directly for decryption
2. Type 'doc' to decrypt a document file`;

  try {
    console.log(usage);

    // Mendapatkan input dari pengguna
    const input = await getInput("Enter text or type 'doc' for document: ");

    let decryptedMessage;
    if (input === 'doc') {
      // Mendapatkan nama file dari pengguna untuk dekripsi dokumen
      const filePath = await getInput("Enter the file path: ");

      if (fs.existsSync(filePath)) {
        const docBuffer = fs.readFileSync(filePath, 'utf-8');
        decryptedMessage = await webcrack(docBuffer);
      } else {
        console.error('File not found.');
        return;
      }
    } else {
      // Melakukan dekripsi teks langsung
      decryptedMessage = await webcrack(input);
    }

    // Simpan hasil dekripsi ke file
    const outputFilePath = './@decrypt.js';
    fs.writeFileSync(outputFilePath, decryptedMessage.code);
    console.log(`Decrypted content saved to ${outputFilePath}`);

  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

// Memulai tools
decryptTool();
