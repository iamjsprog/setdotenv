const createEnvFile = require('./create-env-file');

function getEnvCount() {
  return Object.keys(process.env).length;
}

const answers = {
  LOVE: 'everyone',
  LIFE: 'forever',
  FREE: 'dom',
  LOREM: 'ipsum',
  SIMPLY: 'dummy',
};

const envLinesWithComments = `
LOVE=${answers.LOVE}
LIFE=${answers.LIFE}
FREE=${answers.FREE}

# Some comments here with space
#Some comments here without space
LOREM=${answers.LOREM}

# Some comments =  here with space
#Some comments here without space

SIMPLY=${answers.SIMPLY}
`;

beforeAll(() => {
  process.env.NODE_ENV = 'development';
});

describe('Test lines with comments', () => {
  it('Should add new 5 env and ignore comments', () => {
    const file = createEnvFile('development.env', envLinesWithComments);
    const startEnvCount = getEnvCount();

    require('../dist/index');
    file.removeFile();

    const endEnvCount = getEnvCount();
    expect(endEnvCount - startEnvCount).toBe(5);
  });
  it('New line values should match', () => {
    expect(process.env.LOVE).toBe(answers.LOVE);
    expect(process.env.LIFE).toBe(answers.LIFE);
    expect(process.env.FREE).toBe(answers.FREE);
    expect(process.env.LOREM).toBe(answers.LOREM);
    expect(process.env.SIMPLY).toBe(answers.SIMPLY);
  });
});
