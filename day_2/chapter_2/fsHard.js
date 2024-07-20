const fs = require("fs");
const path = require("path");

const progressbar = async () => {
    const folderPath = './files/fsHard'; // Путь к папке с файлами

    // Получаем список файлов в папке
    const files = fs.readdirSync(folderPath);

    // Функция для получения размера файла
    const getFileSize = (filePath) => {
        return new Promise((resolve, reject) => {
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(stats.size);
                }
            });
        });
    };

    // Получаем размеры всех файлов
    const fileSizes = await Promise.all(files.map(file => getFileSize(path.join(folderPath, file))));
    const totalSize = fileSizes.reduce((acc, size) => acc + size, 0);

    // Инициализация прогресс-бара
    let loadedSize = 0;

    const updateProgressBar = (fileSize) => {
        loadedSize += fileSize;
        const percentage = (loadedSize / totalSize) * 100;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Progress: [${"#".repeat(Math.round(percentage / 2))}${" ".repeat(50 - Math.round(percentage / 2))}] ${percentage.toFixed(2)}%`);
    };

    // Асинхронная загрузка файлов
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const fileSize = await getFileSize(filePath);

        // Симуляция асинхронной загрузки файла
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

        // Обновляем прогресс-бар
        updateProgressBar(fileSize);
    }

    console.log('\nAll files loaded.');
};

progressbar();
