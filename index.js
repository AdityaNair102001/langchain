import 'dotenv/config'
import { OpenAI } from "langchain/llms/openai";
import { loadSummarizationChain } from "langchain/chains";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

// insert your file path here
const loader = new PDFLoader("./dummy.pdf"); 
const docs = await loader.load();

const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0 });


// This convenience function creates a document chain prompted to summarize a set of documents.
const chain = loadSummarizationChain(model, { type: "map_reduce" });
const res = await chain.call({
    input_documents: docs,
});
console.log({ res });

