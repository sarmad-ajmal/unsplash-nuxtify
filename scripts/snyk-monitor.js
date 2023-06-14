require('dotenv').config();
const { exec } = require('child_process');

const org = process.env.SNYK_ORG_KEY;
exec(`snyk monitor --all-projects --org=${org}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(stdout);
});