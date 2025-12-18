import {
    readFileSync,
    writeFileSync
} from 'node:fs';
import {
    randomUUID,
} from 'node:crypto';
/**
 *
 * @param {string} path
 */
function loadTable(path) {
    const [header, ...lines] = readFileSync(path, 'utf-8').split('\n');
    console.log(lines)
    return {
        length: JSON.parse(header)[0],
        data: lines.reduce((lines, line, index) => {
            // console.log({ line, index })
            if (line !== '' && line !== "null") {
                lines.push(JSON.parse(line))
            }
            return lines;
        }, [])
    };
}
/**
 *
 * @param {string} path
 * @param {{length: number, data: (Record<string:string>|null)[]}} table
 */
function saveTable(path, table) {
    const header = [table.length];

    writeFileSync(path, table.data.reduce((output, line) => {
        return `${output}${JSON.stringify(line)}\n`;
    }, `${JSON.stringify(header)}\n`));
}

import express from 'express';
import bodyParser from 'body-parser';

const notes = loadTable('./notes.jsan');
const tags = loadTable('./tags.jsan');

const app = express()
app.use(bodyParser.json())

app.get('/tags', async (req, res) => {
    res.json(tags.data);
});

app.post('/tags', async (req, res) => {
    console.log({ tags: req.body });

    res.json(tags.data);
});

app.get('/notes', async (req, res) => {
    res.json(notes.data);
});

app.post('/notes', async (req, res) => {
    // oO
    const id = notes.length++;
    notes.data.push({ id, ...req.body });
    res.json(notes.data);
});


app.delete('/note/:id', async (req, res) => {
    const note = notes.data.find(note => note.id === parseInt(req.params.id));
    if (!note) return res.status(404).json({ error: 'Note not found' });
    notes.data.splice(notes.indexOf(note), 0, null);
    res.json(204).end();
});

app.listen(8011, () => {
    console.log('MockServer is running on port 8011');
})
process.on('SIGINT', () => {
    const sessionEndUuid = randomUUID();
    console.log({ sessionEndUuid });
    saveTable(`./notes-${sessionEndUuid}.jsan`, notes);
    saveTable(`./tags-${sessionEndUuid}.jsan`, tags);
    process.exit();
})

process.on('exit', () => {
    console.log('bye');
})
