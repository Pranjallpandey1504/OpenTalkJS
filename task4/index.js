import fs from 'fs'
import ollama from 'ollama'

let category = process.argv[2]
let num = Math.floor(Math.random() * 3 + 1)
let q

console.log(category)

async function queryLLM(questionPath) {
    try {
        const question = fs.readFileSync(questionPath, 'utf8')
        const response = await ollama.chat({
            model: "llama3.2:3b",
            messages: [{ role: "user", content: question }]
        })
        let answer = response.message.content
        fs.writeFile(`Answers.txt`, answer, (err) => {
            if (err) {
                throw err
            }
        })
        console.log(`THE QUESTION IS: ${question}`)
        console.log(`THE ANSWER IS: ${answer}`)
    } catch (err) {
        console.error("Error processing the request", err.message)
    }
}

switch (category) {
    case "ProfessionalWriting":
        q = `./category/c1/q${num}.txt`
        queryLLM(q)
        break
    case "CreativeWriting":
        q = `./category/c2/q${num}.txt`
        queryLLM(q)
        break
    case "TechnicalContent":
        q = `./category/c3/q${num}.txt`
        queryLLM(q)
        break
    case "AcademicWriting":
        q = `./category/c4/q${num}.txt`
        queryLLM(q)
        break
    case "MarketingContent":
        q = `./category/c5/q${num}.txt`
        queryLLM(q)
        break
    default:
        console.log("Invalid category")
}

