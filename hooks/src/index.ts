import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 8081;


app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 1. create zap -> api
// 2. trigger zap -> userId, zapId -> hooks -> db save -> queue process -> execute zap
// 3. swepper -> clean old hooks from db
// 4. create outbox table to append in the queue
app.post("/hook/:userId/:zapId", (req, res)=>{
  const { userId, zapId } = req.params;
  console.log(`Received hook for userId: ${userId}, zapId: ${zapId}`);
  res.status(200).send(`Hook received for userId: ${userId}, zapId: ${zapId}`);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});