import ollama from 'ollama';
import fs from 'fs';
import path from 'path';

async function askollama(question) {
  try {
    const response = await ollama.chat({
      model: 'llama3.2:3b',
      messages: [{ role: 'user', content: question }],
    });
    return response.message.content;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function processBatchQuestions() {
  const questionsDir = './questions';
  const answersDir = './answers';

  if (!fs.existsSync(answersDir)) fs.mkdirSync(answersDir);

  const files = fs.readdirSync(questionsDir)
    .filter(file => /^q\d+\.txt$/.test(file))
    .sort();

  for (const file of files) {
    const number = file.match(/\d+/)[0];
    const question = fs.readFileSync(path.join(questionsDir, file), 'utf8');
    console.log(`Processing question ${number}...`);

    const answer = await askollama(question);
    if (answer) {
      fs.writeFileSync(path.join(answersDir, `a${number}.txt`), answer);
      console.log(`Answer ${number} saved.`);
    } else {
      console.log(`Failed to process question ${number}.`);
    }
  }
}

processBatchQuestions()
  .then(() => console.log('Batch processing completed.'))
  .catch(error => console.error('Batch processing failed:', error));
