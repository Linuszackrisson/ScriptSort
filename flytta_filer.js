const fs = require('fs');
const path = require('path');
const sourceFolder = 'C:\\Users\\Linus\\Downloads';
const targetFolders = {
  'Bilder': 'C:\\Users\\Linus\\OneDrive\\Bilder',
  'Dokument': 'C:\\Users\\Linus\\OneDrive\\Dokument',
  'PDF': 'C:\\Users\\Linus\\OneDrive\\Dokument'
};

function moveFiles() {
  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.error(`Misslyckades med att läsa källmappen: ${err}`);
      return;
    }

    files.forEach((file) => {
      const sourcePath = path.join(sourceFolder, file);
      const fileExtension = path.extname(file);
      const targetFolder = getTargetFolder(fileExtension);

      if (!targetFolder) {
        console.log(`Ingen målmapp hittad för filen: ${file}`);
        return;
      }

      const targetPath = path.join(targetFolder, file);

      fs.rename(sourcePath, targetPath, (err) => {
        if (err) {
          console.error(`Misslyckades med att flytta '${file}': ${err}`);
        } else {
          console.log(`Flyttade '${file}' till '${targetPath}'`);
        }
      });
    });
  });
}

function getTargetFolder(extension) {
  switch (extension.toLowerCase()) {
    case '.jpg':
    case '.png':
      return targetFolders['Bilder'];
    case '.pdf':
    case '.doc':
    case '.docx':
      return targetFolders['Dokument']; // Använd 'Dokument' för .doc och .docx
    default:
      return null;
  }
}

moveFiles();
