//stage 1
// import ollama from "ollama";

// async function runChat() {
//   try {
//     const response = await ollama.chat({
//       model: "llama3.2:3b ",
//       messages: [{ role: 'user', content: "Write product descriptions" }]
//     });

//     console.log("Chatbot Response:", response.message.content);
//   } catch (error) {
//     console.error("Error occurred:", error.message);
//   }
// }

// runChat();

//stage 2 
import ollama from "ollama"
import fs from "fs"

const getAnswer = (question) => {
  return ollama.chat({
    model: "llama3.2:3b",
    messages: [{ role: "user", content: question }]
  })
}

fs.readFile("./q.txt", "utf-8", (err, question) => {
  if (err) {
    return console.error("Error reading file:", err.message)
  }

  getAnswer(question)
    .then((response) => {
      fs.writeFile("./a.txt", response.message.content, (err) => {
        if (err) {
          console.error("Error writing file:", err.message)
        } else {
          console.log("Response saved to a.txt")
        }
      })
    })
    .catch((error) => {
      console.error("Error in LLM chat:", error.message)
    })
})



