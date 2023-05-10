const fs = require("node:fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const fileName = "quotes.json";
const filePath = path.resolve(__dirname, fileName);

async function addQuote(quoteText) {
  const quotesJSON = await fs.readFile(filePath);
  const quotes = JSON.parse(quotesJSON);

  const newQuote = {
    id: uuidv4(),
    quoteText,
  };

  quotes.push(newQuote);
  await fs.writeFile(filePath, JSON.stringify(quotes));

  return newQuote;
}

async function getQuotes() {
  const quotesJSON = await fs.readFile(filePath);
  const quotes = JSON.parse(quotesJSON);
  return quotes;
}

async function getRandomQuote() {
  const quotesJSON = await fs.readFile(filePath);
  const quotes = JSON.parse(quotesJSON);
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  return randomQuote;
}

async function editQuote(id, quoteText) {
  const quotesJSON = await fs.readFile(filePath);
  const quotes = JSON.parse(quotesJSON);

  let quote = null;

  for (let i = 0; i < quotes.length; i++) {
    if (quotes[i].id === id) {
      quote = quotes[i];
      quotes[i].quoteText = quoteText;
      break;
    }
  }

  await fs.writeFile(filePath, JSON.stringify(quotes));

  return quote;
}

async function deleteQuote(id) {
  const quotesJSON = await fs.readFile(filePath);
  const quotes = JSON.parse(quotesJSON);

  let quoteIndex = null;

  for (let i = 0; i < quotes.length; i++) {
    if (quotes[i].id === id) {
      quoteIndex = i;
      break;
    }
  }

  if (quoteIndex !== null) {
    const deletedQuote = quotes.splice(quoteIndex, 1);
    await fs.writeFile(filePath, JSON.stringify(quotes));
    return deletedQuote[0];
  }
  return null;
}

module.exports = {
  addQuote,
  getQuotes,
  getRandomQuote,
  editQuote,
  deleteQuote,
};
