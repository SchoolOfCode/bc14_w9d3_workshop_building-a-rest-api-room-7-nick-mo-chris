import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "quotes.json";

export async function addQuote(quoteText) {
  const quotesJSON = await fs.readFile(fileName);
  const quotes = JSON.parse(quotesJSON);

  const newQuote = {
    id: uuidv4(),
    quoteText,
  };

  quotes.push(newQuote);
  await fs.writeFile(fileName, JSON.stringify(quotes));

  return newQuote;
}

export async function getQuotes() {
  const quotesJSON = await fs.readFile(fileName);
  const quotes = JSON.parse(quotesJSON);
  return quotes;
}

export async function getRandomQuote() {
  const quotesJSON = await fs.readFile(fileName);
  const quotes = JSON.parse(quotesJSON);
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  return randomQuote;
}

export async function editQuote(id, quoteText) {
  const quotesJSON = await fs.readFile(fileName);
  const quotes = JSON.parse(quotesJSON);

  let quote = null;

  for (let i = 0; i < quotes.length; i++) {
    if (quotes[i].id === id) {
      quote = quotes[i];
      quotes[i].quoteText = quoteText;
      break;
    }
  }

  await fs.writeFile(fileName, JSON.stringify(quotes));

  return quote;
}

export async function deleteQuote(id) {
  const quotesJSON = await fs.readFile(fileName);
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
    await fs.writeFile(fileName, JSON.stringify(quotes));
    return deletedQuote[0];
  }
  return null;
}
