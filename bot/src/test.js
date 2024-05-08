// test.js
import startBot from './index.js';

async function test() {
  try {
    await startBot();
    console.log("Teste executado com sucesso e sem BUGS");
  } catch (err) {
    console.error("Ocorreu um erro durante a execução do teste:", err.message);
  } finally {
    process.exit();
  }
}

test();