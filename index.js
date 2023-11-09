require('dotenv').config();

const jsonServer = require('json-server');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT ?? 8888;

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.post('/login', async (req, res) => {
    const resp = fs.readFileSync('db.json', 'utf8');
    const data = JSON.parse(resp);
    const users = data.users;

    const { username, password } = req.body;

    const user = users.find(
        (user) => user.username === username && password === user.password,
    );

    if (user) res.status(200).json(user);
    else
        res.status(401).json({
            message: 'Username or password is incorrect',
        });
});

server.use(router);

server.listen(PORT, () => {
    console.log('JSON Server is running on:', PORT);
});
