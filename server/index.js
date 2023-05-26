const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const ironSession = require('iron-session');
const cors = require('cors');

const jwtSecret = 'BuBirJWTGizliAnahtaridir';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000', // Front-end server'ınızın adresi
    credentials: true,
  })
);

const users = [
  {
    id: 1,
    username: 'testuser',
    password: 'password',
  },
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res
      .status(401)
      .json({ message: 'Kullanıcı adı veya parola hatalı!' });
  }

  const token = jwt.sign({ sub: user.id }, jwtSecret);

  res.status(200).json({ message: 'Başarılı giriş!', access_token: token });
});

app.get('/api/user', (req, res) => {
  //sending token from headers
  console.log(req.headers.authorization);

  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, jwtSecret);
  const user = users.find((user) => user.id === decoded.sub);
  res.status(200).json(user);
});

const movies = [
  {
    id: 1,
    title: 'Heat',
    year: '1995',
    runtime: '170',
    genres: ['Action', 'Crime', 'Drama'],
    director: 'Michael Mann',
  },
  {
    id: 2,
    title: 'L.A. Confidential',
    year: '1997',
    runtime: '138',
    genres: ['Crime', 'Drama', 'Mystery'],
    director: 'Curtis Hanson',
  },
  {
    id: 3,
    title: 'Blood Diamond',
    year: '2006',
    runtime: '143',
    genres: ['Adventure', 'Drama', 'Thriller'],
    director: 'Edward Zwick',
  },
];

app.get('/api/posts', (req, res) => {
  res.status(200).json(movies);
});

app.get('/api/posts/:id', (req, res) => {
  console.log(req.headers);
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ message: 'Film bulunamadı!' });
  }
  res.status(200).json(movie);
});

app.listen(4000, () => {
  console.log('Server başlatıldı: http://localhost:4000');
});
