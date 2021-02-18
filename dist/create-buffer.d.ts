/// <reference types="node" />
declare function createBuffer(): {
    addBit(bit: any): void;
    end(): Buffer[];
};
export default createBuffer;
