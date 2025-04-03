const http = require('http');
const fs = require("fs");
const PORT = 8000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    if (req.method === 'GET') {
        if (req.url === '/elencoStudenti') {
            fs.readFile(__dirname + '/db.json', function (error, data) {
                if (error) {
                    res.writeHead(404);
                    res.write(error);
                    res.end();
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT',
                        'Access-Control-Allow-Headers': 'Content-Type'
                    });
                    res.write(JSON.stringify(JSON.parse(data).studenti));
                    res.end();
                }
            });
        }
    } else
        if (req.method === 'POST') {
            if (req.url === '/aggDati') {
                let datiAgg = ''
                req.on('data', function (data) {
                    datiAgg += data
                })
                req.on('end', function () {
                    fs.writeFile(__dirname + '/db.json', datiAgg, (err) => {
                        let riscritto = "";
                        if (err)
                            riscritto = "non riuscito";
                        else {
                            //console.log(fs.readFileSync(__dirname + '/db.json', "utf8"));
                            riscritto = "riuscito";
                        }
                        // invia al client l'esito dell'aggiornamento
                        res.writeHead(200, {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET, POST, PUT',
                            'Access-Control-Allow-Headers': 'Content-Type'
                        });
                        res.write(JSON.stringify({ esito: riscritto }));
                        res.end();
                    });
                })
            }
        }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;