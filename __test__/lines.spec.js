const createEnvFile = require('./create-env-file');

function getEnvCount() {
  return Object.keys(process.env).length;
}

const answers = {
  HOST: 'localhost',
  PORT: '4444',
  PROTOCOL: 'https',
  MAIN_PATH: '/',
};

const env4Lines = `
HOST=${answers.HOST}
PORT=${answers.PORT}
PROTOCOL=${answers.PROTOCOL}
MAIN_PATH=${answers.MAIN_PATH}
`
  .trimStart()
  .trimEnd();

beforeAll(() => {
  process.env.NODE_ENV = 'development';
});

describe('Test simple lines', () => {
  it('Should add new 4 env', () => {
    const file = createEnvFile('development.env', env4Lines);
    const startEnvCount = getEnvCount();

    require('../dist/index');
    const endEnvCount = getEnvCount();

    file.removeFile();
    expect(endEnvCount - startEnvCount).toBe(4);
  });
  it('New line values should match', () => {
    expect(process.env.HOST).toBe(answers.HOST);
    expect(process.env.PORT).toBe(answers.PORT);
    expect(process.env.PROTOCOL).toBe(answers.PROTOCOL);
    expect(process.env.MAIN_PATH).toBe(answers.MAIN_PATH);
  });
});
