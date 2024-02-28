import fs from "fs/promises";
import path from "path";

// Функция для сбора строк из файлов
const collectFilesContent = async (dirPath, relativeDirPath = "") => {
  let content = "";

  try {
    // Получаем список файлов в текущей директории
    const files = await fs.readdir(dirPath);

    // Проходим по каждому файлу
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);

      // Если это директория, рекурсивно вызываем эту же функцию
      if (stats.isDirectory()) {
        content += await collectFilesContent(
          filePath,
          path.join(relativeDirPath, file)
        );
      } else {
        // Если файл с расширением .ts или .tsx, добавляем его содержимое в переменную content
        if (file.endsWith(".ts") || file.endsWith(".tsx")) {
          content += `// File: ${path.join(relativeDirPath, file)}\n`;
          content += (await fs.readFile(filePath, "utf8")) + "\n\n";
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return content;
};

// Путь к директории проекта - текущая директория
const projectDir = "./src";

// Вызываем функцию для сбора содержимого файлов
collectFilesContent(projectDir)
  .then((collectedContent) => {
    // Путь к файлу, в который будем записывать результат
    const outputFile = "./output.ts";

    // Записываем собранное содержимое в файл
    fs.writeFile(outputFile, collectedContent, "utf8")
      .then(() => {
        console.log(
          `Содержимое всех файлов с расширениями .ts и .tsx в директории ${projectDir} было собрано в файл ${outputFile}`
        );
      })
      .catch((error) => {
        console.error("Error writing file:", error);
      });
  })
  .catch((error) => {
    console.error("Error collecting files content:", error);
  });
