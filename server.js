const { createServer } = require('http');
const { Server } = require('socket.io');
const { questions } = require('./questions');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const players = new Map();
let currentQuestion = null;
let questionTimer = null;
let currentQuestionIndex = 0;

function broadcastPlayers() {
  const playersList = Array.from(players.values()).map(({ id, name, score }) => ({
    id,
    name,
    score
  }));
  io.emit('players', playersList);
}

function startNewQuestion() {
  currentQuestion = questions[currentQuestionIndex];
  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
  
  const questionForClients = {
    id: currentQuestion.id,
    question: currentQuestion.question,
    options: currentQuestion.options
  };
  
  io.emit('question', questionForClients);
  
  let timeLeft = 15;
  questionTimer = setInterval(() => {
    timeLeft--;
    io.emit('timeUpdate', timeLeft);
    
    if (timeLeft <= 0) {
      clearInterval(questionTimer);
      setTimeout(startNewQuestion, 3000);
    }
  }, 1000);
}

io.on('connection', (socket) => {
  socket.on('join', ({ name }) => {
    players.set(socket.id, {
      id: socket.id,
      name,
      score: 0
    });
    broadcastPlayers();
    
    if (players.size === 1) {
      startNewQuestion();
    }
  });

  socket.on('answer', ({ questionId, answer }) => {
    const player = players.get(socket.id);
    if (player && currentQuestion && questionId === currentQuestion.id) {
      if (answer === currentQuestion.correctAnswer) {
        player.score += Math.ceil(timeLeft * 100);
        broadcastPlayers();
      }
    }
  });

  socket.on('disconnect', () => {
    players.delete(socket.id);
    broadcastPlayers();
    
    if (players.size === 0) {
      clearInterval(questionTimer);
      currentQuestionIndex = 0;
    }
  });
});

httpServer.listen(3001);