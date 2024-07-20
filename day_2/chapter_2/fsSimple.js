const fs = require("fs").promises;

const readAndWriteCallbackHell = () => {
    fs.readFile('./files/fsSimple/file1.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error('Error reading file1.txt:', err);
    }
    fs.writeFile('./files/fsSimple/file2.txt', data, (err) => {
        if (err) {
            return console.error('Error writing to file2.txt:', err);
        }
        console.log('Data successfully written to file2.txt');
    });
});
};

const readAndWritePromises = () => {
    fs.readFile('./files/fsSimple/file1.txt', 'utf8')
        .then(data => {
            return fs.writeFile('./files/fsSimple/file2.txt', data);
        })
        .then(() => {
            console.log('Data successfully written to file2.txt');
        })
        .catch(err => {
            console.error('Error:', err);
        });
};

const readAndWriteAsyncAwait = async () => {
    try {
        const data = await fs.readFile('./files/fsSimple/file1.txt', 'utf8');
        await fs.writeFile('./files/fsSimple/file2.txt', data);
        console.log('Data successfully written to file2.txt');
    } catch (err) {
        console.error('Error:', err);
    }
};

// readAndWriteCallbackHell();
// readAndWritePromises();
readAndWriteAsyncAwait();