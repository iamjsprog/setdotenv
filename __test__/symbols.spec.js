const createEnvFile = require('./create-env-file');

function getEnvCount() {
  return Object.keys(process.env).length;
}

const answers = {
  __LOVE: 'everyone',
  LI_FE: 'forever',
  FR__EE: 'dom',
  LOREM: 'ipsum @ some = symbols # for http:// test',
  SIMPLY: 'dummy',
};

const envLinesWithComments = `
__LOVE=${answers.__LOVE}
LI_FE=${answers.LI_FE}
FR__EE=${answers.FR__EE}

# Some comments here with space
#Some comments here without space
@LOREM=${answers.LOREM}

# Some comments =  here with space
#Some comments here without space

SI#MPLY=${answers.SIMPLY}
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
    expect(process.env.__LOVE).toBe(answers.__LOVE);
    expect(process.env.LI_FE).toBe(answers.LI_FE);
    expect(process.env.FR__EE).toBe(answers.FR__EE);
    expect(process.env.LOREM).toBe(answers.LOREM);
    expect(process.env.SIMPLY).toBe(answers.SIMPLY);
  });
});
