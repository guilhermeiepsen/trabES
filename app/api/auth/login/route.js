import nextConnect from 'next-connect';
import session from 'express-session';
import passport from '@/lib/passport'; // certifique-se que a importação está correta
import connectMongoDB from "@/libs/mongodb";
import MongoStore from 'connect-mongo';

connectMongoDB();

const handler = nextConnect();

handler.use(
  session({
    name: 'humanlink',
    secret: 'humanlinksecret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    },
  })
);

handler.use(passport.initialize());
handler.use(passport.session());

handler.post('/api/auth/login', (req, res, next) => { // Corrigido a rota
    console.log('Recebendo uma requisição para login'); // Log para depuração
    passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Erro na autenticação', err); // Log para depuração
      return next(err);
    }
    if (!user) {
      console.warn('Usuário não encontrado', info.message); // Log para depuração
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Erro ao logar usuário', err); // Log para depuração
        return next(err);
      }
      return res.status(200).json({ message: 'Logged in successfully' });
    });
  })(req, res, next);
});

export default handler;
