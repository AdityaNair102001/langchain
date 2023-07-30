import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import PDFParser from "pdf2json";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
const loader = new PDFLoader("./resume.pdf");
const docs = await loader.load();

// const pdfParser = new PDFParser(this, 1);

// pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
// pdfParser.on("pdfParser_dataReady", pdfData => {
//     fs.writeFile("./content.txt", pdfParser.getRawTextContent(), () => { console.log("Done."); });
// });

// pdfParser.loadPDF("./resume.pdf");





// In this example, we use a `MapReduceDocumentsChain` specifically prompted to summarize a set of documents.
// const text = fs.readFileSync("./content.txt", "utf8");


const model = new OpenAI({ openAIApiKey: "", temperature: 0 });
// const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
// const docs = await textSplitter.createDocuments([text]);

// This convenience function creates a document chain prompted to summarize a set of documents.
const chain = loadSummarizationChain(model, { type: "map_reduce" });
const res = await chain.call({
    input_documents: docs,
});
console.log({ res });

