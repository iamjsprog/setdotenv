const symbols = {
  newLine: Buffer.from('\n', 'utf8').readInt8(),
  '=': Buffer.from('=', 'utf8').readInt8(),
  '#': Buffer.from('#', 'utf8').readInt8(),
  a: Buffer.from('a', 'utf8').readInt8(),
  A: Buffer.from('A', 'utf8').readInt8(),
  z: Buffer.from('z', 'utf8').readInt8(),
  Z: Buffer.from('Z_', 'utf8').readInt8(),
  _: Buffer.from('_', 'utf8').readInt8(),
};

const isAllowedSymbol = (bit) => {
  return (
    (bit >= symbols['A'] && bit <= symbols['Z']) ||
    (bit >= symbols['a'] && bit <= symbols['z']) ||
    bit === symbols['_']
  );
};

function createBuffer() {
  const arrBuffer = [];
  let lastBuffer = [];
  let ignoreWrite = false;
  let passedEqualSign = false;

  return {
    addBit(bit) {
      if (bit !== symbols.newLine) {
        if (!ignoreWrite) {
          if (isAllowedSymbol(bit)) {
            lastBuffer.push(bit);
          } else if (lastBuffer.length) {
            if (bit === symbols['='] && passedEqualSign === false) {
              passedEqualSign = true;
            }

            if (passedEqualSign === true) {
              lastBuffer.push(bit);
            }
          } else if (bit === symbols['#']) {
            ignoreWrite = true;
          }
        }
      } else {
        this.end();
      }
    },
    end(): Buffer[] {
      ignoreWrite = false;
      passedEqualSign = false;
      if (lastBuffer.length) {
        if (~lastBuffer.indexOf(symbols['='])) {
          arrBuffer.push(Buffer.from(lastBuffer));
        }

        lastBuffer = [];
      }

      return arrBuffer;
    },
  };
}

export default createBuffer;
