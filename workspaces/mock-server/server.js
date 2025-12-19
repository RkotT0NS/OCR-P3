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

    return {
        length: JSON.parse(header)[0],
        data: lines.reduce((lines, line, index) => {
            // console.log({ line, index })
            if (line !== '' && line !== "null") {
                lines.push(JSON.parse(line))
            }
            if (line === "null") {
                lines.push(null)
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
    res.json(tags.data.filter(item => item !== null));
});

app.post('/tags', async (req, res) => {
    const id = tags.length += 1;
    tags.data.push({ id, ...req.body });
    res.json(tags.data.filter(item => item !== null));
});

app.get('/notes', async (req, res) => {
    res.json(notes.data.filter(item => item !== null));
});

app.post('/notes', async (req, res) => {
    const id = notes.length += 1;
    notes.data.push({ id, ...req.body });
    res.json(notes.data.filter(item => item !== null));
});


app.delete('/note/:id', async (req, res) => {
    const note = notes.data.find(note => note.id === parseInt(req.params.id));
    if (!note) return res.status(404).json({ error: 'Note not found' });
    notes.data.splice(notes.data.indexOf(note), 1, null);
    res.json(204).end();
});

app.listen(8011, () => {
    console.log('MockServer is running on port 8011');
})
process.on('SIGINT', () => {
    if (process.env.PERSIST === "on") {
        const sessionEndUuid = randomUUID();
        console.log({ sessionEndUuid });
        saveTable(`./notes-${sessionEndUuid}.jsan`, notes);
        saveTable(`./tags-${sessionEndUuid}.jsan`, tags);
    }
    process.exit();
})

process.on('exit', () => {
    console.log('bye');
})
