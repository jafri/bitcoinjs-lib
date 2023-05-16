"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ts_src/index.ts
var ts_src_exports = {};
__export(ts_src_exports, {
  Block: () => Block,
  Psbt: () => Psbt,
  Transaction: () => Transaction,
  address: () => address_exports,
  crypto: () => crypto_exports,
  getAllTaprootHashesForSig: () => getAllTaprootHashesForSig,
  getTaprootHashesForSigCustom: () => getTaprootHashesForSigCustom,
  initEccLib: () => initEccLib,
  networks: () => networks_exports,
  opcodes: () => OPS,
  payments: () => payments_exports,
  script: () => script_exports,
  tapTreeToList: () => tapTreeToList,
  witnessStackToScriptWitness: () => witnessStackToScriptWitness
});
module.exports = __toCommonJS(ts_src_exports);

// ts_src/address.ts
var address_exports = {};
__export(address_exports, {
  fromBase58Check: () => fromBase58Check,
  fromBech32: () => fromBech32,
  fromOutputScript: () => fromOutputScript,
  toBase58Check: () => toBase58Check,
  toBech32: () => toBech32,
  toOutputScript: () => toOutputScript
});

// ts_src/networks.ts
var networks_exports = {};
__export(networks_exports, {
  bitcoin: () => bitcoin,
  regtest: () => regtest,
  testnet: () => testnet
});
var bitcoin = {
  messagePrefix: "Bitcoin Signed Message:\n",
  bech32: "bc",
  bip32: {
    public: 76067358,
    private: 76066276
  },
  pubKeyHash: 0,
  scriptHash: 5,
  wif: 128
};
var regtest = {
  messagePrefix: "Bitcoin Signed Message:\n",
  bech32: "bcrt",
  bip32: {
    public: 70617039,
    private: 70615956
  },
  pubKeyHash: 111,
  scriptHash: 196,
  wif: 239
};
var testnet = {
  messagePrefix: "Bitcoin Signed Message:\n",
  bech32: "tb",
  bip32: {
    public: 70617039,
    private: 70615956
  },
  pubKeyHash: 111,
  scriptHash: 196,
  wif: 239
};

// ts_src/payments/index.ts
var payments_exports = {};
__export(payments_exports, {
  embed: () => p2data,
  p2ms: () => p2ms,
  p2pk: () => p2pk,
  p2pkh: () => p2pkh,
  p2sh: () => p2sh,
  p2tr: () => p2tr,
  p2wpkh: () => p2wpkh,
  p2wsh: () => p2wsh
});

// ts_src/script.ts
var script_exports = {};
__export(script_exports, {
  OPS: () => OPS,
  compile: () => compile,
  countNonPushOnlyOPs: () => countNonPushOnlyOPs,
  decompile: () => decompile,
  fromASM: () => fromASM,
  isCanonicalPubKey: () => isCanonicalPubKey,
  isCanonicalScriptSignature: () => isCanonicalScriptSignature,
  isDefinedHashType: () => isDefinedHashType,
  isPushOnly: () => isPushOnly,
  number: () => number,
  signature: () => signature,
  toASM: () => toASM,
  toStack: () => toStack
});

// ts_src/bip66.ts
function check(buffer) {
  if (buffer.length < 8)
    return false;
  if (buffer.length > 72)
    return false;
  if (buffer[0] !== 48)
    return false;
  if (buffer[1] !== buffer.length - 2)
    return false;
  if (buffer[2] !== 2)
    return false;
  const lenR = buffer[3];
  if (lenR === 0)
    return false;
  if (5 + lenR >= buffer.length)
    return false;
  if (buffer[4 + lenR] !== 2)
    return false;
  const lenS = buffer[5 + lenR];
  if (lenS === 0)
    return false;
  if (6 + lenR + lenS !== buffer.length)
    return false;
  if (buffer[4] & 128)
    return false;
  if (lenR > 1 && buffer[4] === 0 && !(buffer[5] & 128))
    return false;
  if (buffer[lenR + 6] & 128)
    return false;
  if (lenS > 1 && buffer[lenR + 6] === 0 && !(buffer[lenR + 7] & 128))
    return false;
  return true;
}
function decode(buffer) {
  if (buffer.length < 8)
    throw new Error("DER sequence length is too short");
  if (buffer.length > 72)
    throw new Error("DER sequence length is too long");
  if (buffer[0] !== 48)
    throw new Error("Expected DER sequence");
  if (buffer[1] !== buffer.length - 2)
    throw new Error("DER sequence length is invalid");
  if (buffer[2] !== 2)
    throw new Error("Expected DER integer");
  const lenR = buffer[3];
  if (lenR === 0)
    throw new Error("R length is zero");
  if (5 + lenR >= buffer.length)
    throw new Error("R length is too long");
  if (buffer[4 + lenR] !== 2)
    throw new Error("Expected DER integer (2)");
  const lenS = buffer[5 + lenR];
  if (lenS === 0)
    throw new Error("S length is zero");
  if (6 + lenR + lenS !== buffer.length)
    throw new Error("S length is invalid");
  if (buffer[4] & 128)
    throw new Error("R value is negative");
  if (lenR > 1 && buffer[4] === 0 && !(buffer[5] & 128))
    throw new Error("R value excessively padded");
  if (buffer[lenR + 6] & 128)
    throw new Error("S value is negative");
  if (lenS > 1 && buffer[lenR + 6] === 0 && !(buffer[lenR + 7] & 128))
    throw new Error("S value excessively padded");
  return {
    r: buffer.slice(4, 4 + lenR),
    s: buffer.slice(6 + lenR)
  };
}
function encode(r, s) {
  const lenR = r.length;
  const lenS = s.length;
  if (lenR === 0)
    throw new Error("R length is zero");
  if (lenS === 0)
    throw new Error("S length is zero");
  if (lenR > 33)
    throw new Error("R length is too long");
  if (lenS > 33)
    throw new Error("S length is too long");
  if (r[0] & 128)
    throw new Error("R value is negative");
  if (s[0] & 128)
    throw new Error("S value is negative");
  if (lenR > 1 && r[0] === 0 && !(r[1] & 128))
    throw new Error("R value excessively padded");
  if (lenS > 1 && s[0] === 0 && !(s[1] & 128))
    throw new Error("S value excessively padded");
  const signature2 = Buffer.allocUnsafe(6 + lenR + lenS);
  signature2[0] = 48;
  signature2[1] = signature2.length - 2;
  signature2[2] = 2;
  signature2[3] = r.length;
  r.copy(signature2, 4);
  signature2[4 + lenR] = 2;
  signature2[5 + lenR] = s.length;
  s.copy(signature2, 6 + lenR);
  return signature2;
}

// ts_src/ops.ts
var OPS = {
  OP_FALSE: 0,
  OP_0: 0,
  OP_PUSHDATA1: 76,
  OP_PUSHDATA2: 77,
  OP_PUSHDATA4: 78,
  OP_1NEGATE: 79,
  OP_RESERVED: 80,
  OP_TRUE: 81,
  OP_1: 81,
  OP_2: 82,
  OP_3: 83,
  OP_4: 84,
  OP_5: 85,
  OP_6: 86,
  OP_7: 87,
  OP_8: 88,
  OP_9: 89,
  OP_10: 90,
  OP_11: 91,
  OP_12: 92,
  OP_13: 93,
  OP_14: 94,
  OP_15: 95,
  OP_16: 96,
  OP_NOP: 97,
  OP_VER: 98,
  OP_IF: 99,
  OP_NOTIF: 100,
  OP_VERIF: 101,
  OP_VERNOTIF: 102,
  OP_ELSE: 103,
  OP_ENDIF: 104,
  OP_VERIFY: 105,
  OP_RETURN: 106,
  OP_TOALTSTACK: 107,
  OP_FROMALTSTACK: 108,
  OP_2DROP: 109,
  OP_2DUP: 110,
  OP_3DUP: 111,
  OP_2OVER: 112,
  OP_2ROT: 113,
  OP_2SWAP: 114,
  OP_IFDUP: 115,
  OP_DEPTH: 116,
  OP_DROP: 117,
  OP_DUP: 118,
  OP_NIP: 119,
  OP_OVER: 120,
  OP_PICK: 121,
  OP_ROLL: 122,
  OP_ROT: 123,
  OP_SWAP: 124,
  OP_TUCK: 125,
  OP_CAT: 126,
  OP_SUBSTR: 127,
  OP_LEFT: 128,
  OP_RIGHT: 129,
  OP_SIZE: 130,
  OP_INVERT: 131,
  OP_AND: 132,
  OP_OR: 133,
  OP_XOR: 134,
  OP_EQUAL: 135,
  OP_EQUALVERIFY: 136,
  OP_RESERVED1: 137,
  OP_RESERVED2: 138,
  OP_1ADD: 139,
  OP_1SUB: 140,
  OP_2MUL: 141,
  OP_2DIV: 142,
  OP_NEGATE: 143,
  OP_ABS: 144,
  OP_NOT: 145,
  OP_0NOTEQUAL: 146,
  OP_ADD: 147,
  OP_SUB: 148,
  OP_MUL: 149,
  OP_DIV: 150,
  OP_MOD: 151,
  OP_LSHIFT: 152,
  OP_RSHIFT: 153,
  OP_BOOLAND: 154,
  OP_BOOLOR: 155,
  OP_NUMEQUAL: 156,
  OP_NUMEQUALVERIFY: 157,
  OP_NUMNOTEQUAL: 158,
  OP_LESSTHAN: 159,
  OP_GREATERTHAN: 160,
  OP_LESSTHANOREQUAL: 161,
  OP_GREATERTHANOREQUAL: 162,
  OP_MIN: 163,
  OP_MAX: 164,
  OP_WITHIN: 165,
  OP_RIPEMD160: 166,
  OP_SHA1: 167,
  OP_SHA256: 168,
  OP_HASH160: 169,
  OP_HASH256: 170,
  OP_CODESEPARATOR: 171,
  OP_CHECKSIG: 172,
  OP_CHECKSIGVERIFY: 173,
  OP_CHECKMULTISIG: 174,
  OP_CHECKMULTISIGVERIFY: 175,
  OP_NOP1: 176,
  OP_NOP2: 177,
  OP_CHECKLOCKTIMEVERIFY: 177,
  OP_NOP3: 178,
  OP_CHECKSEQUENCEVERIFY: 178,
  OP_NOP4: 179,
  OP_NOP5: 180,
  OP_NOP6: 181,
  OP_NOP7: 182,
  OP_NOP8: 183,
  OP_NOP9: 184,
  OP_NOP10: 185,
  OP_CHECKSIGADD: 186,
  OP_PUBKEYHASH: 253,
  OP_PUBKEY: 254,
  OP_INVALIDOPCODE: 255
};
var REVERSE_OPS = {};
for (const op of Object.keys(OPS)) {
  const code = OPS[op];
  REVERSE_OPS[code] = op;
}

// ts_src/push_data.ts
function encodingLength(i) {
  return i < OPS.OP_PUSHDATA1 ? 1 : i <= 255 ? 2 : i <= 65535 ? 3 : 5;
}
function encode2(buffer, num, offset) {
  const size = encodingLength(num);
  if (size === 1) {
    buffer.writeUInt8(num, offset);
  } else if (size === 2) {
    buffer.writeUInt8(OPS.OP_PUSHDATA1, offset);
    buffer.writeUInt8(num, offset + 1);
  } else if (size === 3) {
    buffer.writeUInt8(OPS.OP_PUSHDATA2, offset);
    buffer.writeUInt16LE(num, offset + 1);
  } else {
    buffer.writeUInt8(OPS.OP_PUSHDATA4, offset);
    buffer.writeUInt32LE(num, offset + 1);
  }
  return size;
}
function decode2(buffer, offset) {
  const opcode = buffer.readUInt8(offset);
  let num;
  let size;
  if (opcode < OPS.OP_PUSHDATA1) {
    num = opcode;
    size = 1;
  } else if (opcode === OPS.OP_PUSHDATA1) {
    if (offset + 2 > buffer.length)
      return null;
    num = buffer.readUInt8(offset + 1);
    size = 2;
  } else if (opcode === OPS.OP_PUSHDATA2) {
    if (offset + 3 > buffer.length)
      return null;
    num = buffer.readUInt16LE(offset + 1);
    size = 3;
  } else {
    if (offset + 5 > buffer.length)
      return null;
    if (opcode !== OPS.OP_PUSHDATA4)
      throw new Error("Unexpected opcode");
    num = buffer.readUInt32LE(offset + 1);
    size = 5;
  }
  return {
    opcode,
    number: num,
    size
  };
}

// ts_src/script_number.ts
var script_number_exports = {};
__export(script_number_exports, {
  decode: () => decode3,
  encode: () => encode3
});
function decode3(buffer, maxLength, minimal) {
  maxLength = maxLength || 4;
  minimal = minimal === void 0 ? true : minimal;
  const length = buffer.length;
  if (length === 0)
    return 0;
  if (length > maxLength)
    throw new TypeError("Script number overflow");
  if (minimal) {
    if ((buffer[length - 1] & 127) === 0) {
      if (length <= 1 || (buffer[length - 2] & 128) === 0)
        throw new Error("Non-minimally encoded script number");
    }
  }
  if (length === 5) {
    const a = buffer.readUInt32LE(0);
    const b = buffer.readUInt8(4);
    if (b & 128)
      return -((b & ~128) * 4294967296 + a);
    return b * 4294967296 + a;
  }
  let result = 0;
  for (let i = 0; i < length; ++i) {
    result |= buffer[i] << 8 * i;
  }
  if (buffer[length - 1] & 128)
    return -(result & ~(128 << 8 * (length - 1)));
  return result;
}
function scriptNumSize(i) {
  return i > 2147483647 ? 5 : i > 8388607 ? 4 : i > 32767 ? 3 : i > 127 ? 2 : i > 0 ? 1 : 0;
}
function encode3(_number) {
  let value2 = Math.abs(_number);
  const size = scriptNumSize(value2);
  const buffer = Buffer.allocUnsafe(size);
  const negative = _number < 0;
  for (let i = 0; i < size; ++i) {
    buffer.writeUInt8(value2 & 255, i);
    value2 >>= 8;
  }
  if (buffer[size - 1] & 128) {
    buffer.writeUInt8(negative ? 128 : 0, size - 1);
  } else if (negative) {
    buffer[size - 1] |= 128;
  }
  return buffer;
}

// ts_src/script_signature.ts
var script_signature_exports = {};
__export(script_signature_exports, {
  decode: () => decode4,
  encode: () => encode4
});

// ts_src/types.ts
var types_exports = {};
__export(types_exports, {
  Array: () => Array2,
  BIP32Path: () => BIP32Path,
  Boolean: () => Boolean,
  Buffer: () => Buffer2,
  Buffer256bit: () => Buffer256bit,
  BufferN: () => BufferN,
  ECPoint: () => ECPoint,
  Function: () => Function,
  Hash160bit: () => Hash160bit,
  Hash256bit: () => Hash256bit,
  Hex: () => Hex,
  Network: () => Network,
  Null: () => Null,
  Number: () => Number,
  Satoshi: () => Satoshi,
  Signer: () => Signer,
  String: () => String,
  TAPLEAF_VERSION_MASK: () => TAPLEAF_VERSION_MASK,
  UInt31: () => UInt31,
  UInt32: () => UInt32,
  UInt8: () => UInt8,
  isPoint: () => isPoint,
  isTapleaf: () => isTapleaf,
  isTaptree: () => isTaptree,
  maybe: () => maybe,
  oneOf: () => oneOf,
  tuple: () => tuple,
  typeforce: () => typeforce
});
var import_buffer = require("buffer");
var import_typeforce = __toESM(require("typeforce"));
var typeforce = import_typeforce.default;
var ZERO32 = import_buffer.Buffer.alloc(32, 0);
var EC_P = import_buffer.Buffer.from(
  "fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f",
  "hex"
);
function isPoint(p) {
  if (!import_buffer.Buffer.isBuffer(p))
    return false;
  if (p.length < 33)
    return false;
  const t = p[0];
  const x = p.slice(1, 33);
  if (x.compare(ZERO32) === 0)
    return false;
  if (x.compare(EC_P) >= 0)
    return false;
  if ((t === 2 || t === 3) && p.length === 33) {
    return true;
  }
  const y = p.slice(33);
  if (y.compare(ZERO32) === 0)
    return false;
  if (y.compare(EC_P) >= 0)
    return false;
  if (t === 4 && p.length === 65)
    return true;
  return false;
}
var UINT31_MAX = Math.pow(2, 31) - 1;
function UInt31(value2) {
  return typeforce.UInt32(value2) && value2 <= UINT31_MAX;
}
function BIP32Path(value2) {
  return typeforce.String(value2) && !!value2.match(/^(m\/)?(\d+'?\/)*\d+'?$/);
}
BIP32Path.toJSON = () => {
  return "BIP32 derivation path";
};
function Signer(obj) {
  return (typeforce.Buffer(obj.publicKey) || typeof obj.getPublicKey === "function") && typeof obj.sign === "function";
}
var SATOSHI_MAX = 21 * 1e14;
function Satoshi(value2) {
  return typeforce.UInt53(value2) && value2 <= SATOSHI_MAX;
}
var ECPoint = typeforce.quacksLike("Point");
var Network = typeforce.compile({
  messagePrefix: typeforce.oneOf(typeforce.Buffer, typeforce.String),
  bip32: {
    public: typeforce.UInt32,
    private: typeforce.UInt32
  },
  pubKeyHash: typeforce.UInt8,
  scriptHash: typeforce.UInt8,
  wif: typeforce.UInt8
});
var TAPLEAF_VERSION_MASK = 254;
function isTapleaf(o) {
  if (!o || !("output" in o))
    return false;
  if (!import_buffer.Buffer.isBuffer(o.output))
    return false;
  if (o.version !== void 0)
    return (o.version & TAPLEAF_VERSION_MASK) === o.version;
  return true;
}
function isTaptree(scriptTree) {
  if (!Array2(scriptTree))
    return isTapleaf(scriptTree);
  if (scriptTree.length !== 2)
    return false;
  return scriptTree.every((t) => isTaptree(t));
}
var Buffer256bit = typeforce.BufferN(32);
var Hash160bit = typeforce.BufferN(20);
var Hash256bit = typeforce.BufferN(32);
var Number = typeforce.Number;
var Array2 = typeforce.Array;
var Boolean = typeforce.Boolean;
var String = typeforce.String;
var Buffer2 = typeforce.Buffer;
var Hex = typeforce.Hex;
var maybe = typeforce.maybe;
var tuple = typeforce.tuple;
var UInt8 = typeforce.UInt8;
var UInt32 = typeforce.UInt32;
var Function = typeforce.Function;
var BufferN = typeforce.BufferN;
var Null = typeforce.Null;
var oneOf = typeforce.oneOf;

// ts_src/script_signature.ts
var { typeforce: typeforce2 } = types_exports;
var ZERO = Buffer.alloc(1, 0);
function toDER(x) {
  let i = 0;
  while (x[i] === 0)
    ++i;
  if (i === x.length)
    return ZERO;
  x = x.slice(i);
  if (x[0] & 128)
    return Buffer.concat([ZERO, x], 1 + x.length);
  return x;
}
function fromDER(x) {
  if (x[0] === 0)
    x = x.slice(1);
  const buffer = Buffer.alloc(32, 0);
  const bstart = Math.max(0, 32 - x.length);
  x.copy(buffer, bstart);
  return buffer;
}
function decode4(buffer) {
  const hashType = buffer.readUInt8(buffer.length - 1);
  const hashTypeMod = hashType & ~128;
  if (hashTypeMod <= 0 || hashTypeMod >= 4)
    throw new Error("Invalid hashType " + hashType);
  const decoded = decode(buffer.slice(0, -1));
  const r = fromDER(decoded.r);
  const s = fromDER(decoded.s);
  const signature2 = Buffer.concat([r, s], 64);
  return { signature: signature2, hashType };
}
function encode4(signature2, hashType) {
  typeforce2(
    {
      signature: BufferN(64),
      hashType: UInt8
    },
    { signature: signature2, hashType }
  );
  const hashTypeMod = hashType & ~128;
  if (hashTypeMod <= 0 || hashTypeMod >= 4)
    throw new Error("Invalid hashType " + hashType);
  const hashTypeBuffer = Buffer.allocUnsafe(1);
  hashTypeBuffer.writeUInt8(hashType, 0);
  const r = toDER(signature2.slice(0, 32));
  const s = toDER(signature2.slice(32, 64));
  return Buffer.concat([encode(r, s), hashTypeBuffer]);
}

// ts_src/script.ts
var { typeforce: typeforce3 } = types_exports;
var OP_INT_BASE = OPS.OP_RESERVED;
function isOPInt(value2) {
  return Number(value2) && (value2 === OPS.OP_0 || value2 >= OPS.OP_1 && value2 <= OPS.OP_16 || value2 === OPS.OP_1NEGATE);
}
function isPushOnlyChunk(value2) {
  return Buffer2(value2) || isOPInt(value2);
}
function isPushOnly(value2) {
  return Array2(value2) && value2.every(isPushOnlyChunk);
}
function countNonPushOnlyOPs(value2) {
  return value2.length - value2.filter(isPushOnlyChunk).length;
}
function asMinimalOP(buffer) {
  if (buffer.length === 0)
    return OPS.OP_0;
  if (buffer.length !== 1)
    return;
  if (buffer[0] > 1 && buffer[0] <= 16)
    return OP_INT_BASE + buffer[0];
  if (buffer[0] === 129)
    return OPS.OP_1NEGATE;
}
function chunksIsBuffer(buf) {
  return Buffer.isBuffer(buf);
}
function chunksIsArray(buf) {
  return Array2(buf);
}
function singleChunkIsBuffer(buf) {
  return Buffer.isBuffer(buf);
}
function compile(chunks) {
  if (chunksIsBuffer(chunks))
    return chunks;
  typeforce3(Array2, chunks);
  const bufferSize = chunks.reduce((accum, chunk) => {
    if (singleChunkIsBuffer(chunk)) {
      if (chunk.length === 1 && asMinimalOP(chunk) !== void 0) {
        return accum + 1;
      }
      return accum + encodingLength(chunk.length) + chunk.length;
    }
    return accum + 1;
  }, 0);
  const buffer = Buffer.allocUnsafe(bufferSize);
  let offset = 0;
  chunks.forEach((chunk) => {
    if (singleChunkIsBuffer(chunk)) {
      const opcode = asMinimalOP(chunk);
      if (opcode !== void 0) {
        buffer.writeUInt8(opcode, offset);
        offset += 1;
        return;
      }
      offset += encode2(buffer, chunk.length, offset);
      chunk.copy(buffer, offset);
      offset += chunk.length;
    } else {
      buffer.writeUInt8(chunk, offset);
      offset += 1;
    }
  });
  if (offset !== buffer.length)
    throw new Error("Could not decode chunks");
  return buffer;
}
function decompile(buffer) {
  if (chunksIsArray(buffer))
    return buffer;
  typeforce3(Buffer2, buffer);
  const chunks = [];
  let i = 0;
  while (i < buffer.length) {
    const opcode = buffer[i];
    if (opcode > OPS.OP_0 && opcode <= OPS.OP_PUSHDATA4) {
      const d = decode2(buffer, i);
      if (d === null)
        return null;
      i += d.size;
      if (i + d.number > buffer.length)
        return null;
      const data = buffer.slice(i, i + d.number);
      i += d.number;
      const op = asMinimalOP(data);
      if (op !== void 0) {
        chunks.push(op);
      } else {
        chunks.push(data);
      }
    } else {
      chunks.push(opcode);
      i += 1;
    }
  }
  return chunks;
}
function toASM(chunks) {
  if (chunksIsBuffer(chunks)) {
    chunks = decompile(chunks);
  }
  return chunks.map((chunk) => {
    if (singleChunkIsBuffer(chunk)) {
      const op = asMinimalOP(chunk);
      if (op === void 0)
        return chunk.toString("hex");
      chunk = op;
    }
    return REVERSE_OPS[chunk];
  }).join(" ");
}
function fromASM(asm) {
  typeforce3(String, asm);
  return compile(
    asm.split(" ").map((chunkStr) => {
      if (OPS[chunkStr] !== void 0)
        return OPS[chunkStr];
      typeforce3(Hex, chunkStr);
      return Buffer.from(chunkStr, "hex");
    })
  );
}
function toStack(chunks) {
  chunks = decompile(chunks);
  typeforce3(isPushOnly, chunks);
  return chunks.map((op) => {
    if (singleChunkIsBuffer(op))
      return op;
    if (op === OPS.OP_0)
      return Buffer.allocUnsafe(0);
    return encode3(op - OP_INT_BASE);
  });
}
function isCanonicalPubKey(buffer) {
  return isPoint(buffer);
}
function isDefinedHashType(hashType) {
  const hashTypeMod = hashType & ~128;
  return hashTypeMod > 0 && hashTypeMod < 4;
}
function isCanonicalScriptSignature(buffer) {
  if (!Buffer.isBuffer(buffer))
    return false;
  if (!isDefinedHashType(buffer[buffer.length - 1]))
    return false;
  return check(buffer.slice(0, -1));
}
var number = script_number_exports;
var signature = script_signature_exports;

// ts_src/payments/lazy.ts
function prop(object, name, f) {
  Object.defineProperty(object, name, {
    configurable: true,
    enumerable: true,
    get() {
      const _value = f.call(this);
      this[name] = _value;
      return _value;
    },
    set(_value) {
      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: true,
        value: _value,
        writable: true
      });
    }
  });
}
function value(f) {
  let _value;
  return () => {
    if (_value !== void 0)
      return _value;
    _value = f();
    return _value;
  };
}

// ts_src/payments/embed.ts
var OPS2 = OPS;
function stacksEqual(a, b) {
  if (a.length !== b.length)
    return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
function p2data(a, opts) {
  if (!a.data && !a.output)
    throw new TypeError("Not enough data");
  opts = Object.assign({ validate: true }, opts || {});
  typeforce(
    {
      network: typeforce.maybe(typeforce.Object),
      output: typeforce.maybe(typeforce.Buffer),
      data: typeforce.maybe(typeforce.arrayOf(typeforce.Buffer))
    },
    a
  );
  const network = a.network || bitcoin;
  const o = { name: "embed", network };
  prop(o, "output", () => {
    if (!a.data)
      return;
    return compile([OPS2.OP_RETURN].concat(a.data));
  });
  prop(o, "data", () => {
    if (!a.output)
      return;
    return decompile(a.output).slice(1);
  });
  if (opts.validate) {
    if (a.output) {
      const chunks = decompile(a.output);
      if (chunks[0] !== OPS2.OP_RETURN)
        throw new TypeError("Output is invalid");
      if (!chunks.slice(1).every(typeforce.Buffer))
        throw new TypeError("Output is invalid");
      if (a.data && !stacksEqual(a.data, o.data))
        throw new TypeError("Data mismatch");
    }
  }
  return Object.assign(o, a);
}

// ts_src/payments/p2ms.ts
var OPS3 = OPS;
var OP_INT_BASE2 = OPS3.OP_RESERVED;
function stacksEqual2(a, b) {
  if (a.length !== b.length)
    return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
function p2ms(a, opts) {
  if (!a.input && !a.output && !(a.pubkeys && a.m !== void 0) && !a.signatures)
    throw new TypeError("Not enough data");
  opts = Object.assign({ validate: true }, opts || {});
  function isAcceptableSignature(x) {
    return isCanonicalScriptSignature(x) || (opts.allowIncomplete && x === OPS3.OP_0) !== void 0;
  }
  typeforce(
    {
      network: typeforce.maybe(typeforce.Object),
      m: typeforce.maybe(typeforce.Number),
      n: typeforce.maybe(typeforce.Number),
      output: typeforce.maybe(typeforce.Buffer),
      pubkeys: typeforce.maybe(typeforce.arrayOf(isPoint)),
      signatures: typeforce.maybe(typeforce.arrayOf(isAcceptableSignature)),
      input: typeforce.maybe(typeforce.Buffer)
    },
    a
  );
  const network = a.network || bitcoin;
  const o = { network };
  let chunks = [];
  let decoded = false;
  function decode10(output) {
    if (decoded)
      return;
    decoded = true;
    chunks = decompile(output);
    o.m = chunks[0] - OP_INT_BASE2;
    o.n = chunks[chunks.length - 2] - OP_INT_BASE2;
    o.pubkeys = chunks.slice(1, -2);
  }
  prop(o, "output", () => {
    if (!a.m)
      return;
    if (!o.n)
      return;
    if (!a.pubkeys)
      return;
    return compile(
      [].concat(
        OP_INT_BASE2 + a.m,
        a.pubkeys,
        OP_INT_BASE2 + o.n,
        OPS3.OP_CHECKMULTISIG
      )
    );
  });
  prop(o, "m", () => {
    if (!o.output)
      return;
    decode10(o.output);
    return o.m;
  });
  prop(o, "n", () => {
    if (!o.pubkeys)
      return;
    return o.pubkeys.length;
  });
  prop(o, "pubkeys", () => {
    if (!a.output)
      return;
    decode10(a.output);
    return o.pubkeys;
  });
  prop(o, "signatures", () => {
    if (!a.input)
      return;
    return decompile(a.input).slice(1);
  });
  prop(o, "input", () => {
    if (!a.signatures)
      return;
    return compile([OPS3.OP_0].concat(a.signatures));
  });
  prop(o, "witness", () => {
    if (!o.input)
      return;
    return [];
  });
  prop(o, "name", () => {
    if (!o.m || !o.n)
      return;
    return `p2ms(${o.m} of ${o.n})`;
  });
  if (opts.validate) {
    if (a.output) {
      decode10(a.output);
      if (!typeforce.Number(chunks[0]))
        throw new TypeError("Output is invalid");
      if (!typeforce.Number(chunks[chunks.length - 2]))
        throw new TypeError("Output is invalid");
      if (chunks[chunks.length - 1] !== OPS3.OP_CHECKMULTISIG)
        throw new TypeError("Output is invalid");
      if (o.m <= 0 || o.n > 16 || o.m > o.n || o.n !== chunks.length - 3)
        throw new TypeError("Output is invalid");
      if (!o.pubkeys.every((x) => isPoint(x)))
        throw new TypeError("Output is invalid");
      if (a.m !== void 0 && a.m !== o.m)
        throw new TypeError("m mismatch");
      if (a.n !== void 0 && a.n !== o.n)
        throw new TypeError("n mismatch");
      if (a.pubkeys && !stacksEqual2(a.pubkeys, o.pubkeys))
        throw new TypeError("Pubkeys mismatch");
    }
    if (a.pubkeys) {
      if (a.n !== void 0 && a.n !== a.pubkeys.length)
        throw new TypeError("Pubkey count mismatch");
      o.n = a.pubkeys.length;
      if (o.n < o.m)
        throw new TypeError("Pubkey count cannot be less than m");
    }
    if (a.signatures) {
      if (a.signatures.length < o.m)
        throw new TypeError("Not enough signatures provided");
      if (a.signatures.length > o.m)
        throw new TypeError("Too many signatures provided");
    }
    if (a.input) {
      if (a.input[0] !== OPS3.OP_0)
        throw new TypeError("Input is invalid");
      if (o.signatures.length === 0 || !o.signatures.every(isAcceptableSignature))
        throw new TypeError("Input has invalid signature(s)");
      if (a.signatures && !stacksEqual2(a.signatures, o.signatures))
        throw new TypeError("Signature mismatch");
      if (a.m !== void 0 && a.m !== a.signatures.length)
        throw new TypeError("Signature count mismatch");
    }
  }
  return Object.assign(o, a);
}

// ts_src/payments/p2pk.ts
var OPS4 = OPS;
function p2pk(a, opts) {
  if (!a.input && !a.output && !a.pubkey && !a.input && !a.signature)
    throw new TypeError("Not enough data");
  opts = Object.assign({ validate: true }, opts || {});
  typeforce(
    {
      network: typeforce.maybe(typeforce.Object),
      output: typeforce.maybe(typeforce.Buffer),
      pubkey: typeforce.maybe(isPoint),
      signature: typeforce.maybe(isCanonicalScriptSignature),
      input: typeforce.maybe(typeforce.Buffer)
    },
    a
  );
  const _chunks = value(() => {
    return decompile(a.input);
  });
  const network = a.network || bitcoin;
  const o = { name: "p2pk", network };
  prop(o, "output", () => {
    if (!a.pubkey)
      return;
    return compile([a.pubkey, OPS4.OP_CHECKSIG]);
  });
  prop(o, "pubkey", () => {
    if (!a.output)
      return;
    return a.output.slice(1, -1);
  });
  prop(o, "signature", () => {
    if (!a.input)
      return;
    return _chunks()[0];
  });
  prop(o, "input", () => {
    if (!a.signature)
      return;
    return compile([a.signature]);
  });
  prop(o, "witness", () => {
    if (!o.input)
      return;
    return [];
  });
  if (opts.validate) {
    if (a.output) {
      if (a.output[a.output.length - 1] !== OPS4.OP_CHECKSIG)
        throw new TypeError("Output is invalid");
      if (!isPoint(o.pubkey))
        throw new TypeError("Output pubkey is invalid");
      if (a.pubkey && !a.pubkey.equals(o.pubkey))
        throw new TypeError("Pubkey mismatch");
    }
    if (a.signature) {
      if (a.input && !a.input.equals(o.input))
        throw new TypeError("Signature mismatch");
    }
    if (a.input) {
      if (_chunks().length !== 1)
        throw new TypeError("Input is invalid");
      if (!isCanonicalScriptSignature(o.signature))
        throw new TypeError("Input has invalid signature");
    }
  }
  return Object.assign(o, a);
}

// ts_src/crypto.ts
var crypto_exports = {};
__export(crypto_exports, {
  TAGGED_HASH_PREFIXES: () => TAGGED_HASH_PREFIXES,
  TAGS: () => TAGS,
  hash160: () => hash160,
  hash256: () => hash256,
  ripemd160: () => ripemd160,
  sha1: () => sha1,
  sha256: () => sha256,
  taggedHash: () => taggedHash
});
var import_create_hash = __toESM(require("create-hash"));
var import_ripemd160 = __toESM(require("ripemd160"));
function ripemd160(buffer) {
  try {
    return (0, import_create_hash.default)("rmd160").update(buffer).digest();
  } catch (err) {
    try {
      return (0, import_create_hash.default)("ripemd160").update(buffer).digest();
    } catch (err2) {
      return new import_ripemd160.default().update(buffer).digest();
    }
  }
}
function sha1(buffer) {
  return (0, import_create_hash.default)("sha1").update(buffer).digest();
}
function sha256(buffer) {
  return (0, import_create_hash.default)("sha256").update(buffer).digest();
}
function hash160(buffer) {
  return ripemd160(sha256(buffer));
}
function hash256(buffer) {
  return sha256(sha256(buffer));
}
var TAGS = [
  "BIP0340/challenge",
  "BIP0340/aux",
  "BIP0340/nonce",
  "TapLeaf",
  "TapBranch",
  "TapSighash",
  "TapTweak",
  "KeyAgg list",
  "KeyAgg coefficient"
];
var TAGGED_HASH_PREFIXES = {
  "BIP0340/challenge": Buffer.from([
    123,
    181,
    45,
    122,
    159,
    239,
    88,
    50,
    62,
    177,
    191,
    122,
    64,
    125,
    179,
    130,
    210,
    243,
    242,
    216,
    27,
    177,
    34,
    79,
    73,
    254,
    81,
    143,
    109,
    72,
    211,
    124,
    123,
    181,
    45,
    122,
    159,
    239,
    88,
    50,
    62,
    177,
    191,
    122,
    64,
    125,
    179,
    130,
    210,
    243,
    242,
    216,
    27,
    177,
    34,
    79,
    73,
    254,
    81,
    143,
    109,
    72,
    211,
    124
  ]),
  "BIP0340/aux": Buffer.from([
    241,
    239,
    78,
    94,
    192,
    99,
    202,
    218,
    109,
    148,
    202,
    250,
    157,
    152,
    126,
    160,
    105,
    38,
    88,
    57,
    236,
    193,
    31,
    151,
    45,
    119,
    165,
    46,
    216,
    193,
    204,
    144,
    241,
    239,
    78,
    94,
    192,
    99,
    202,
    218,
    109,
    148,
    202,
    250,
    157,
    152,
    126,
    160,
    105,
    38,
    88,
    57,
    236,
    193,
    31,
    151,
    45,
    119,
    165,
    46,
    216,
    193,
    204,
    144
  ]),
  "BIP0340/nonce": Buffer.from([
    7,
    73,
    119,
    52,
    167,
    155,
    203,
    53,
    91,
    155,
    140,
    125,
    3,
    79,
    18,
    28,
    244,
    52,
    215,
    62,
    247,
    45,
    218,
    25,
    135,
    0,
    97,
    251,
    82,
    191,
    235,
    47,
    7,
    73,
    119,
    52,
    167,
    155,
    203,
    53,
    91,
    155,
    140,
    125,
    3,
    79,
    18,
    28,
    244,
    52,
    215,
    62,
    247,
    45,
    218,
    25,
    135,
    0,
    97,
    251,
    82,
    191,
    235,
    47
  ]),
  TapLeaf: Buffer.from([
    174,
    234,
    143,
    220,
    66,
    8,
    152,
    49,
    5,
    115,
    75,
    88,
    8,
    29,
    30,
    38,
    56,
    211,
    95,
    28,
    181,
    64,
    8,
    212,
    211,
    87,
    202,
    3,
    190,
    120,
    233,
    238,
    174,
    234,
    143,
    220,
    66,
    8,
    152,
    49,
    5,
    115,
    75,
    88,
    8,
    29,
    30,
    38,
    56,
    211,
    95,
    28,
    181,
    64,
    8,
    212,
    211,
    87,
    202,
    3,
    190,
    120,
    233,
    238
  ]),
  TapBranch: Buffer.from([
    25,
    65,
    161,
    242,
    229,
    110,
    185,
    95,
    162,
    169,
    241,
    148,
    190,
    92,
    1,
    247,
    33,
    111,
    51,
    237,
    130,
    176,
    145,
    70,
    52,
    144,
    208,
    91,
    245,
    22,
    160,
    21,
    25,
    65,
    161,
    242,
    229,
    110,
    185,
    95,
    162,
    169,
    241,
    148,
    190,
    92,
    1,
    247,
    33,
    111,
    51,
    237,
    130,
    176,
    145,
    70,
    52,
    144,
    208,
    91,
    245,
    22,
    160,
    21
  ]),
  TapSighash: Buffer.from([
    244,
    10,
    72,
    223,
    75,
    42,
    112,
    200,
    180,
    146,
    75,
    242,
    101,
    70,
    97,
    237,
    61,
    149,
    253,
    102,
    163,
    19,
    235,
    135,
    35,
    117,
    151,
    198,
    40,
    228,
    160,
    49,
    244,
    10,
    72,
    223,
    75,
    42,
    112,
    200,
    180,
    146,
    75,
    242,
    101,
    70,
    97,
    237,
    61,
    149,
    253,
    102,
    163,
    19,
    235,
    135,
    35,
    117,
    151,
    198,
    40,
    228,
    160,
    49
  ]),
  TapTweak: Buffer.from([
    232,
    15,
    225,
    99,
    156,
    156,
    160,
    80,
    227,
    175,
    27,
    57,
    193,
    67,
    198,
    62,
    66,
    156,
    188,
    235,
    21,
    217,
    64,
    251,
    181,
    197,
    161,
    244,
    175,
    87,
    197,
    233,
    232,
    15,
    225,
    99,
    156,
    156,
    160,
    80,
    227,
    175,
    27,
    57,
    193,
    67,
    198,
    62,
    66,
    156,
    188,
    235,
    21,
    217,
    64,
    251,
    181,
    197,
    161,
    244,
    175,
    87,
    197,
    233
  ]),
  "KeyAgg list": Buffer.from([
    72,
    28,
    151,
    28,
    60,
    11,
    70,
    215,
    240,
    178,
    117,
    174,
    89,
    141,
    78,
    44,
    126,
    215,
    49,
    156,
    89,
    74,
    92,
    110,
    199,
    158,
    160,
    212,
    153,
    2,
    148,
    240,
    72,
    28,
    151,
    28,
    60,
    11,
    70,
    215,
    240,
    178,
    117,
    174,
    89,
    141,
    78,
    44,
    126,
    215,
    49,
    156,
    89,
    74,
    92,
    110,
    199,
    158,
    160,
    212,
    153,
    2,
    148,
    240
  ]),
  "KeyAgg coefficient": Buffer.from([
    191,
    201,
    4,
    3,
    77,
    28,
    136,
    232,
    200,
    14,
    34,
    229,
    61,
    36,
    86,
    109,
    100,
    130,
    78,
    214,
    66,
    114,
    129,
    192,
    145,
    0,
    249,
    77,
    205,
    82,
    201,
    129,
    191,
    201,
    4,
    3,
    77,
    28,
    136,
    232,
    200,
    14,
    34,
    229,
    61,
    36,
    86,
    109,
    100,
    130,
    78,
    214,
    66,
    114,
    129,
    192,
    145,
    0,
    249,
    77,
    205,
    82,
    201,
    129
  ])
};
function taggedHash(prefix, data) {
  return sha256(Buffer.concat([TAGGED_HASH_PREFIXES[prefix], data]));
}

// ts_src/payments/p2pkh.ts
var bs58check = __toESM(require("bs58check"));
var OPS5 = OPS;
function p2pkh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.pubkey && !a.input)
    throw new TypeError("Not enough data");
  opts = Object.assign({ validate: true }, opts || {});
  typeforce(
    {
      network: typeforce.maybe(typeforce.Object),
      address: typeforce.maybe(typeforce.String),
      hash: typeforce.maybe(typeforce.BufferN(20)),
      output: typeforce.maybe(typeforce.BufferN(25)),
      pubkey: typeforce.maybe(isPoint),
      signature: typeforce.maybe(isCanonicalScriptSignature),
      input: typeforce.maybe(typeforce.Buffer)
    },
    a
  );
  const _address = value(() => {
    const payload = bs58check.decode(a.address);
    const version = payload.readUInt8(0);
    const hash = payload.slice(1);
    return { version, hash };
  });
  const _chunks = value(() => {
    return decompile(a.input);
  });
  const network = a.network || bitcoin;
  const o = { name: "p2pkh", network };
  prop(o, "address", () => {
    if (!o.hash)
      return;
    const payload = Buffer.allocUnsafe(21);
    payload.writeUInt8(network.pubKeyHash, 0);
    o.hash.copy(payload, 1);
    return bs58check.encode(payload);
  });
  prop(o, "hash", () => {
    if (a.output)
      return a.output.slice(3, 23);
    if (a.address)
      return _address().hash;
    if (a.pubkey || o.pubkey)
      return hash160(a.pubkey || o.pubkey);
  });
  prop(o, "output", () => {
    if (!o.hash)
      return;
    return compile([
      OPS5.OP_DUP,
      OPS5.OP_HASH160,
      o.hash,
      OPS5.OP_EQUALVERIFY,
      OPS5.OP_CHECKSIG
    ]);
  });
  prop(o, "pubkey", () => {
    if (!a.input)
      return;
    return _chunks()[1];
  });
  prop(o, "signature", () => {
    if (!a.input)
      return;
    return _chunks()[0];
  });
  prop(o, "input", () => {
    if (!a.pubkey)
      return;
    if (!a.signature)
      return;
    return compile([a.signature, a.pubkey]);
  });
  prop(o, "witness", () => {
    if (!o.input)
      return;
    return [];
  });
  if (opts.validate) {
    let hash = Buffer.from([]);
    if (a.address) {
      if (_address().version !== network.pubKeyHash)
        throw new TypeError("Invalid version or Network mismatch");
      if (_address().hash.length !== 20)
        throw new TypeError("Invalid address");
      hash = _address().hash;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError("Hash mismatch");
      else
        hash = a.hash;
    }
    if (a.output) {
      if (a.output.length !== 25 || a.output[0] !== OPS5.OP_DUP || a.output[1] !== OPS5.OP_HASH160 || a.output[2] !== 20 || a.output[23] !== OPS5.OP_EQUALVERIFY || a.output[24] !== OPS5.OP_CHECKSIG)
        throw new TypeError("Output is invalid");
      const hash2 = a.output.slice(3, 23);
      if (hash.length > 0 && !hash.equals(hash2))
        throw new TypeError("Hash mismatch");
      else
        hash = hash2;
    }
    if (a.pubkey) {
      const pkh = hash160(a.pubkey);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError("Hash mismatch");
      else
        hash = pkh;
    }
    if (a.input) {
      const chunks = _chunks();
      if (chunks.length !== 2)
        throw new TypeError("Input is invalid");
      if (!isCanonicalScriptSignature(chunks[0]))
        throw new TypeError("Input has invalid signature");
      if (!isPoint(chunks[1]))
        throw new TypeError("Input has invalid pubkey");
      if (a.signature && !a.signature.equals(chunks[0]))
        throw new TypeError("Signature mismatch");
      if (a.pubkey && !a.pubkey.equals(chunks[1]))
        throw new TypeError("Pubkey mismatch");
      const pkh = hash160(chunks[1]);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError("Hash mismatch");
    }
  }
  return Object.assign(o, a);
}

// ts_src/payments/p2sh.ts
var bs58check2 = __toESM(require("bs58check"));
var OPS6 = OPS;
function stacksEqual3(a, b) {
  if (a.length !== b.length)
    return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
function p2sh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.redeem && !a.input)
    throw new TypeError("Not enough data");
  opts = Object.assign({ validate: true }, opts || {});
  typeforce(
    {
      network: typeforce.maybe(typeforce.Object),
      address: typeforce.maybe(typeforce.String),
      hash: typeforce.maybe(typeforce.BufferN(20)),
      output: typeforce.maybe(typeforce.BufferN(23)),
      redeem: typeforce.maybe({
        network: typeforce.maybe(typeforce.Object),
        output: typeforce.maybe(typeforce.Buffer),
        input: typeforce.maybe(typeforce.Buffer),
        witness: typeforce.maybe(typeforce.arrayOf(typeforce.Buffer))
      }),
      input: typeforce.maybe(typeforce.Buffer),
      witness: typeforce.maybe(typeforce.arrayOf(typeforce.Buffer))
    },
    a
  );
  let network = a.network;
  if (!network) {
    network = a.redeem && a.redeem.network || bitcoin;
  }
  const o = { network };
  const _address = value(() => {
    const payload = bs58check2.decode(a.address);
    const version = payload.readUInt8(0);
    const hash = payload.slice(1);
    return { version, hash };
  });
  const _chunks = value(() => {
    return decompile(a.input);
  });
  const _redeem = value(() => {
    const chunks = _chunks();
    const lastChunk = chunks[chunks.length - 1];
    return {
      network,
      output: lastChunk === OPS6.OP_FALSE ? Buffer.from([]) : lastChunk,
      input: compile(chunks.slice(0, -1)),
      witness: a.witness || []
    };
  });
  prop(o, "address", () => {
    if (!o.hash)
      return;
    const payload = Buffer.allocUnsafe(21);
    payload.writeUInt8(o.network.scriptHash, 0);
    o.hash.copy(payload, 1);
    return bs58check2.encode(payload);
  });
  prop(o, "hash", () => {
    if (a.output)
      return a.output.slice(2, 22);
    if (a.address)
      return _address().hash;
    if (o.redeem && o.redeem.output)
      return hash160(o.redeem.output);
  });
  prop(o, "output", () => {
    if (!o.hash)
      return;
    return compile([OPS6.OP_HASH160, o.hash, OPS6.OP_EQUAL]);
  });
  prop(o, "redeem", () => {
    if (!a.input)
      return;
    return _redeem();
  });
  prop(o, "input", () => {
    if (!a.redeem || !a.redeem.input || !a.redeem.output)
      return;
    return compile(
      [].concat(
        decompile(a.redeem.input),
        a.redeem.output
      )
    );
  });
  prop(o, "witness", () => {
    if (o.redeem && o.redeem.witness)
      return o.redeem.witness;
    if (o.input)
      return [];
  });
  prop(o, "name", () => {
    const nameParts = ["p2sh"];
    if (o.redeem !== void 0 && o.redeem.name !== void 0)
      nameParts.push(o.redeem.name);
    return nameParts.join("-");
  });
  if (opts.validate) {
    let hash = Buffer.from([]);
    if (a.address) {
      if (_address().version !== network.scriptHash)
        throw new TypeError("Invalid version or Network mismatch");
      if (_address().hash.length !== 20)
        throw new TypeError("Invalid address");
      hash = _address().hash;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError("Hash mismatch");
      else
        hash = a.hash;
    }
    if (a.output) {
      if (a.output.length !== 23 || a.output[0] !== OPS6.OP_HASH160 || a.output[1] !== 20 || a.output[22] !== OPS6.OP_EQUAL)
        throw new TypeError("Output is invalid");
      const hash2 = a.output.slice(2, 22);
      if (hash.length > 0 && !hash.equals(hash2))
        throw new TypeError("Hash mismatch");
      else
        hash = hash2;
    }
    const checkRedeem = (redeem) => {
      if (redeem.output) {
        const decompile2 = decompile(redeem.output);
        if (!decompile2 || decompile2.length < 1)
          throw new TypeError("Redeem.output too short");
        if (redeem.output.byteLength > 520)
          throw new TypeError(
            "Redeem.output unspendable if larger than 520 bytes"
          );
        if (countNonPushOnlyOPs(decompile2) > 201)
          throw new TypeError(
            "Redeem.output unspendable with more than 201 non-push ops"
          );
        const hash2 = hash160(redeem.output);
        if (hash.length > 0 && !hash.equals(hash2))
          throw new TypeError("Hash mismatch");
        else
          hash = hash2;
      }
      if (redeem.input) {
        const hasInput = redeem.input.length > 0;
        const hasWitness = redeem.witness && redeem.witness.length > 0;
        if (!hasInput && !hasWitness)
          throw new TypeError("Empty input");
        if (hasInput && hasWitness)
          throw new TypeError("Input and witness provided");
        if (hasInput) {
          const richunks = decompile(redeem.input);
          if (!isPushOnly(richunks))
            throw new TypeError("Non push-only scriptSig");
        }
      }
    };
    if (a.input) {
      const chunks = _chunks();
      if (!chunks || chunks.length < 1)
        throw new TypeError("Input too short");
      if (!Buffer.isBuffer(_redeem().output))
        throw new TypeError("Input is invalid");
      checkRedeem(_redeem());
    }
    if (a.redeem) {
      if (a.redeem.network && a.redeem.network !== network)
        throw new TypeError("Network mismatch");
      if (a.input) {
        const redeem = _redeem();
        if (a.redeem.output && !a.redeem.output.equals(redeem.output))
          throw new TypeError("Redeem.output mismatch");
        if (a.redeem.input && !a.redeem.input.equals(redeem.input))
          throw new TypeError("Redeem.input mismatch");
      }
      checkRedeem(a.redeem);
    }
    if (a.witness) {
      if (a.redeem && a.redeem.witness && !stacksEqual3(a.redeem.witness, a.witness))
        throw new TypeError("Witness and redeem.witness mismatch");
    }
  }
  return Object.assign(o, a);
}

// ts_src/payments/p2wpkh.ts
var import_bech32 = require("bech32");
var OPS7 = OPS;
var EMPTY_BUFFER = Buffer.alloc(0);
function p2wpkh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.pubkey && !a.witness)
    throw new TypeError("Not enough data");
  opts = Object.assign({ validate: true }, opts || {});
  typeforce(
    {
      address: typeforce.maybe(typeforce.String),
      hash: typeforce.maybe(typeforce.BufferN(20)),
      input: typeforce.maybe(typeforce.BufferN(0)),
      network: typeforce.maybe(typeforce.Object),
      output: typeforce.maybe(typeforce.BufferN(22)),
      pubkey: typeforce.maybe(isPoint),
      signature: typeforce.maybe(isCanonicalScriptSignature),
      witness: typeforce.maybe(typeforce.arrayOf(typeforce.Buffer))
    },
    a
  );
  const _address = value(() => {
    const result = import_bech32.bech32.decode(a.address);
    const version = result.words.shift();
    const data = import_bech32.bech32.fromWords(result.words);
    return {
      version,
      prefix: result.prefix,
      data: Buffer.from(data)
    };
  });
  const network = a.network || bitcoin;
  const o = { name: "p2wpkh", network };
  prop(o, "address", () => {
    if (!o.hash)
      return;
    const words = import_bech32.bech32.toWords(o.hash);
    words.unshift(0);
    return import_bech32.bech32.encode(network.bech32, words);
  });
  prop(o, "hash", () => {
    if (a.output)
      return a.output.slice(2, 22);
    if (a.address)
      return _address().data;
    if (a.pubkey || o.pubkey)
      return hash160(a.pubkey || o.pubkey);
  });
  prop(o, "output", () => {
    if (!o.hash)
      return;
    return compile([OPS7.OP_0, o.hash]);
  });
  prop(o, "pubkey", () => {
    if (a.pubkey)
      return a.pubkey;
    if (!a.witness)
      return;
    return a.witness[1];
  });
  prop(o, "signature", () => {
    if (!a.witness)
      return;
    return a.witness[0];
  });
  prop(o, "input", () => {
    if (!o.witness)
      return;
    return EMPTY_BUFFER;
  });
  prop(o, "witness", () => {
    if (!a.pubkey)
      return;
    if (!a.signature)
      return;
    return [a.signature, a.pubkey];
  });
  if (opts.validate) {
    let hash = Buffer.from([]);
    if (a.address) {
      if (network && network.bech32 !== _address().prefix)
        throw new TypeError("Invalid prefix or Network mismatch");
      if (_address().version !== 0)
        throw new TypeError("Invalid address version");
      if (_address().data.length !== 20)
        throw new TypeError("Invalid address data");
      hash = _address().data;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError("Hash mismatch");
      else
        hash = a.hash;
    }
    if (a.output) {
      if (a.output.length !== 22 || a.output[0] !== OPS7.OP_0 || a.output[1] !== 20)
        throw new TypeError("Output is invalid");
      if (hash.length > 0 && !hash.equals(a.output.slice(2)))
        throw new TypeError("Hash mismatch");
      else
        hash = a.output.slice(2);
    }
    if (a.pubkey) {
      const pkh = hash160(a.pubkey);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError("Hash mismatch");
      else
        hash = pkh;
      if (!isPoint(a.pubkey) || a.pubkey.length !== 33)
        throw new TypeError("Invalid pubkey for p2wpkh");
    }
    if (a.witness) {
      if (a.witness.length !== 2)
        throw new TypeError("Witness is invalid");
      if (!isCanonicalScriptSignature(a.witness[0]))
        throw new TypeError("Witness has invalid signature");
      if (!isPoint(a.witness[1]) || a.witness[1].length !== 33)
        throw new TypeError("Witness has invalid pubkey");
      if (a.signature && !a.signature.equals(a.witness[0]))
        throw new TypeError("Signature mismatch");
      if (a.pubkey && !a.pubkey.equals(a.witness[1]))
        throw new TypeError("Pubkey mismatch");
      const pkh = hash160(a.witness[1]);
      if (hash.length > 0 && !hash.equals(pkh))
        throw new TypeError("Hash mismatch");
    }
  }
  return Object.assign(o, a);
}

// ts_src/payments/p2wsh.ts
var import_bech322 = require("bech32");
var OPS8 = OPS;
var EMPTY_BUFFER2 = Buffer.alloc(0);
function stacksEqual4(a, b) {
  if (a.length !== b.length)
    return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}
function chunkHasUncompressedPubkey(chunk) {
  if (Buffer.isBuffer(chunk) && chunk.length === 65 && chunk[0] === 4 && isPoint(chunk)) {
    return true;
  } else {
    return false;
  }
}
function p2wsh(a, opts) {
  if (!a.address && !a.hash && !a.output && !a.redeem && !a.witness)
    throw new TypeError("Not enough data");
  opts = Object.assign({ validate: true }, opts || {});
  typeforce(
    {
      network: typeforce.maybe(typeforce.Object),
      address: typeforce.maybe(typeforce.String),
      hash: typeforce.maybe(typeforce.BufferN(32)),
      output: typeforce.maybe(typeforce.BufferN(34)),
      redeem: typeforce.maybe({
        input: typeforce.maybe(typeforce.Buffer),
        network: typeforce.maybe(typeforce.Object),
        output: typeforce.maybe(typeforce.Buffer),
        witness: typeforce.maybe(typeforce.arrayOf(typeforce.Buffer))
      }),
      input: typeforce.maybe(typeforce.BufferN(0)),
      witness: typeforce.maybe(typeforce.arrayOf(typeforce.Buffer))
    },
    a
  );
  const _address = value(() => {
    const result = import_bech322.bech32.decode(a.address);
    const version = result.words.shift();
    const data = import_bech322.bech32.fromWords(result.words);
    return {
      version,
      prefix: result.prefix,
      data: Buffer.from(data)
    };
  });
  const _rchunks = value(() => {
    return decompile(a.redeem.input);
  });
  let network = a.network;
  if (!network) {
    network = a.redeem && a.redeem.network || bitcoin;
  }
  const o = { network };
  prop(o, "address", () => {
    if (!o.hash)
      return;
    const words = import_bech322.bech32.toWords(o.hash);
    words.unshift(0);
    return import_bech322.bech32.encode(network.bech32, words);
  });
  prop(o, "hash", () => {
    if (a.output)
      return a.output.slice(2);
    if (a.address)
      return _address().data;
    if (o.redeem && o.redeem.output)
      return sha256(o.redeem.output);
  });
  prop(o, "output", () => {
    if (!o.hash)
      return;
    return compile([OPS8.OP_0, o.hash]);
  });
  prop(o, "redeem", () => {
    if (!a.witness)
      return;
    return {
      output: a.witness[a.witness.length - 1],
      input: EMPTY_BUFFER2,
      witness: a.witness.slice(0, -1)
    };
  });
  prop(o, "input", () => {
    if (!o.witness)
      return;
    return EMPTY_BUFFER2;
  });
  prop(o, "witness", () => {
    if (a.redeem && a.redeem.input && a.redeem.input.length > 0 && a.redeem.output && a.redeem.output.length > 0) {
      const stack = toStack(_rchunks());
      o.redeem = Object.assign({ witness: stack }, a.redeem);
      o.redeem.input = EMPTY_BUFFER2;
      return [].concat(stack, a.redeem.output);
    }
    if (!a.redeem)
      return;
    if (!a.redeem.output)
      return;
    if (!a.redeem.witness)
      return;
    return [].concat(a.redeem.witness, a.redeem.output);
  });
  prop(o, "name", () => {
    const nameParts = ["p2wsh"];
    if (o.redeem !== void 0 && o.redeem.name !== void 0)
      nameParts.push(o.redeem.name);
    return nameParts.join("-");
  });
  if (opts.validate) {
    let hash = Buffer.from([]);
    if (a.address) {
      if (_address().prefix !== network.bech32)
        throw new TypeError("Invalid prefix or Network mismatch");
      if (_address().version !== 0)
        throw new TypeError("Invalid address version");
      if (_address().data.length !== 32)
        throw new TypeError("Invalid address data");
      hash = _address().data;
    }
    if (a.hash) {
      if (hash.length > 0 && !hash.equals(a.hash))
        throw new TypeError("Hash mismatch");
      else
        hash = a.hash;
    }
    if (a.output) {
      if (a.output.length !== 34 || a.output[0] !== OPS8.OP_0 || a.output[1] !== 32)
        throw new TypeError("Output is invalid");
      const hash2 = a.output.slice(2);
      if (hash.length > 0 && !hash.equals(hash2))
        throw new TypeError("Hash mismatch");
      else
        hash = hash2;
    }
    if (a.redeem) {
      if (a.redeem.network && a.redeem.network !== network)
        throw new TypeError("Network mismatch");
      if (a.redeem.input && a.redeem.input.length > 0 && a.redeem.witness && a.redeem.witness.length > 0)
        throw new TypeError("Ambiguous witness source");
      if (a.redeem.output) {
        const decompile2 = decompile(a.redeem.output);
        if (!decompile2 || decompile2.length < 1)
          throw new TypeError("Redeem.output is invalid");
        if (a.redeem.output.byteLength > 3600)
          throw new TypeError(
            "Redeem.output unspendable if larger than 3600 bytes"
          );
        if (countNonPushOnlyOPs(decompile2) > 201)
          throw new TypeError(
            "Redeem.output unspendable with more than 201 non-push ops"
          );
        const hash2 = sha256(a.redeem.output);
        if (hash.length > 0 && !hash.equals(hash2))
          throw new TypeError("Hash mismatch");
        else
          hash = hash2;
      }
      if (a.redeem.input && !isPushOnly(_rchunks()))
        throw new TypeError("Non push-only scriptSig");
      if (a.witness && a.redeem.witness && !stacksEqual4(a.witness, a.redeem.witness))
        throw new TypeError("Witness and redeem.witness mismatch");
      if (a.redeem.input && _rchunks().some(chunkHasUncompressedPubkey) || a.redeem.output && (decompile(a.redeem.output) || []).some(
        chunkHasUncompressedPubkey
      )) {
        throw new TypeError(
          "redeem.input or redeem.output contains uncompressed pubkey"
        );
      }
    }
    if (a.witness && a.witness.length > 0) {
      const wScript = a.witness[a.witness.length - 1];
      if (a.redeem && a.redeem.output && !a.redeem.output.equals(wScript))
        throw new TypeError("Witness and redeem.output mismatch");
      if (a.witness.some(chunkHasUncompressedPubkey) || (decompile(wScript) || []).some(chunkHasUncompressedPubkey))
        throw new TypeError("Witness contains uncompressed pubkey");
    }
  }
  return Object.assign(o, a);
}

// ts_src/payments/p2tr.ts
var import_buffer3 = require("buffer");

// ts_src/ecc_lib.ts
var _ECCLIB_CACHE = {};
function initEccLib(eccLib) {
  if (!eccLib) {
    _ECCLIB_CACHE.eccLib = eccLib;
  } else if (eccLib !== _ECCLIB_CACHE.eccLib) {
    verifyEcc(eccLib);
    _ECCLIB_CACHE.eccLib = eccLib;
  }
}
function getEccLib() {
  if (!_ECCLIB_CACHE.eccLib)
    throw new Error(
      "No ECC Library provided. You must call initEccLib() with a valid TinySecp256k1Interface instance"
    );
  return _ECCLIB_CACHE.eccLib;
}
var h = (hex) => Buffer.from(hex, "hex");
function verifyEcc(ecc) {
  assert(typeof ecc.isXOnlyPoint === "function");
  assert(
    ecc.isXOnlyPoint(
      h("79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798")
    )
  );
  assert(
    ecc.isXOnlyPoint(
      h("fffffffffffffffffffffffffffffffffffffffffffffffffffffffeeffffc2e")
    )
  );
  assert(
    ecc.isXOnlyPoint(
      h("f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9")
    )
  );
  assert(
    ecc.isXOnlyPoint(
      h("0000000000000000000000000000000000000000000000000000000000000001")
    )
  );
  assert(
    !ecc.isXOnlyPoint(
      h("0000000000000000000000000000000000000000000000000000000000000000")
    )
  );
  assert(
    !ecc.isXOnlyPoint(
      h("fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f")
    )
  );
  assert(typeof ecc.xOnlyPointAddTweak === "function");
  tweakAddVectors.forEach((t) => {
    const r = ecc.xOnlyPointAddTweak(h(t.pubkey), h(t.tweak));
    if (t.result === null) {
      assert(r === null);
    } else {
      assert(r !== null);
      assert(r.parity === t.parity);
      assert(Buffer.from(r.xOnlyPubkey).equals(h(t.result)));
    }
  });
}
function assert(bool) {
  if (!bool)
    throw new Error("ecc library invalid");
}
var tweakAddVectors = [
  {
    pubkey: "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
    tweak: "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140",
    parity: -1,
    result: null
  },
  {
    pubkey: "1617d38ed8d8657da4d4761e8057bc396ea9e4b9d29776d4be096016dbd2509b",
    tweak: "a8397a935f0dfceba6ba9618f6451ef4d80637abf4e6af2669fbc9de6a8fd2ac",
    parity: 1,
    result: "e478f99dab91052ab39a33ea35fd5e6e4933f4d28023cd597c9a1f6760346adf"
  },
  {
    pubkey: "2c0b7cf95324a07d05398b240174dc0c2be444d96b159aa6c7f7b1e668680991",
    tweak: "823c3cd2142744b075a87eade7e1b8678ba308d566226a0056ca2b7a76f86b47",
    parity: 0,
    result: "9534f8dc8c6deda2dc007655981c78b49c5d96c778fbf363462a11ec9dfd948c"
  }
];

// ts_src/payments/bip341.ts
var import_buffer2 = require("buffer");

// ts_src/bufferutils.ts
var varuint = __toESM(require("varuint-bitcoin"));
var { typeforce: typeforce4 } = types_exports;
function verifuint(value2, max) {
  if (typeof value2 !== "number")
    throw new Error("cannot write a non-number as a number");
  if (value2 < 0)
    throw new Error("specified a negative value for writing an unsigned value");
  if (value2 > max)
    throw new Error("RangeError: value out of range");
  if (Math.floor(value2) !== value2)
    throw new Error("value has a fractional component");
}
function readUInt64LE(buffer, offset) {
  const a = buffer.readUInt32LE(offset);
  let b = buffer.readUInt32LE(offset + 4);
  b *= 4294967296;
  verifuint(b + a, 9007199254740991);
  return b + a;
}
function writeUInt64LE(buffer, value2, offset) {
  verifuint(value2, 9007199254740991);
  buffer.writeInt32LE(value2 & -1, offset);
  buffer.writeUInt32LE(Math.floor(value2 / 4294967296), offset + 4);
  return offset + 8;
}
function reverseBuffer(buffer) {
  if (buffer.length < 1)
    return buffer;
  let j = buffer.length - 1;
  let tmp = 0;
  for (let i = 0; i < buffer.length / 2; i++) {
    tmp = buffer[i];
    buffer[i] = buffer[j];
    buffer[j] = tmp;
    j--;
  }
  return buffer;
}
function cloneBuffer(buffer) {
  const clone = Buffer.allocUnsafe(buffer.length);
  buffer.copy(clone);
  return clone;
}
var BufferWriter = class {
  constructor(buffer, offset = 0) {
    this.buffer = buffer;
    this.offset = offset;
    typeforce4(tuple(Buffer2, UInt32), [buffer, offset]);
  }
  static withCapacity(size) {
    return new BufferWriter(Buffer.alloc(size));
  }
  writeUInt8(i) {
    this.offset = this.buffer.writeUInt8(i, this.offset);
  }
  writeInt32(i) {
    this.offset = this.buffer.writeInt32LE(i, this.offset);
  }
  writeUInt32(i) {
    this.offset = this.buffer.writeUInt32LE(i, this.offset);
  }
  writeUInt64(i) {
    this.offset = writeUInt64LE(this.buffer, i, this.offset);
  }
  writeVarInt(i) {
    varuint.encode(i, this.buffer, this.offset);
    this.offset += varuint.encode.bytes;
  }
  writeSlice(slice) {
    if (this.buffer.length < this.offset + slice.length) {
      throw new Error("Cannot write slice out of bounds");
    }
    this.offset += slice.copy(this.buffer, this.offset);
  }
  writeVarSlice(slice) {
    this.writeVarInt(slice.length);
    this.writeSlice(slice);
  }
  writeVector(vector) {
    this.writeVarInt(vector.length);
    vector.forEach((buf) => this.writeVarSlice(buf));
  }
  end() {
    if (this.buffer.length === this.offset) {
      return this.buffer;
    }
    throw new Error(`buffer size ${this.buffer.length}, offset ${this.offset}`);
  }
};
var BufferReader = class {
  constructor(buffer, offset = 0) {
    this.buffer = buffer;
    this.offset = offset;
    typeforce4(tuple(Buffer2, UInt32), [buffer, offset]);
  }
  readUInt8() {
    const result = this.buffer.readUInt8(this.offset);
    this.offset++;
    return result;
  }
  readInt32() {
    const result = this.buffer.readInt32LE(this.offset);
    this.offset += 4;
    return result;
  }
  readUInt32() {
    const result = this.buffer.readUInt32LE(this.offset);
    this.offset += 4;
    return result;
  }
  readUInt64() {
    const result = readUInt64LE(this.buffer, this.offset);
    this.offset += 8;
    return result;
  }
  readVarInt() {
    const vi = varuint.decode(this.buffer, this.offset);
    this.offset += varuint.decode.bytes;
    return vi;
  }
  readSlice(n) {
    if (this.buffer.length < this.offset + n) {
      throw new Error("Cannot read slice out of bounds");
    }
    const result = this.buffer.slice(this.offset, this.offset + n);
    this.offset += n;
    return result;
  }
  readVarSlice() {
    return this.readSlice(this.readVarInt());
  }
  readVector() {
    const count = this.readVarInt();
    const vector = [];
    for (let i = 0; i < count; i++)
      vector.push(this.readVarSlice());
    return vector;
  }
};

// ts_src/payments/bip341.ts
var LEAF_VERSION_TAPSCRIPT = 192;
var MAX_TAPTREE_DEPTH = 128;
var isHashBranch = (ht) => "left" in ht && "right" in ht;
function rootHashFromPath(controlBlock, leafHash) {
  if (controlBlock.length < 33)
    throw new TypeError(
      `The control-block length is too small. Got ${controlBlock.length}, expected min 33.`
    );
  const m = (controlBlock.length - 33) / 32;
  let kj = leafHash;
  for (let j = 0; j < m; j++) {
    const ej = controlBlock.slice(33 + 32 * j, 65 + 32 * j);
    if (kj.compare(ej) < 0) {
      kj = tapBranchHash(kj, ej);
    } else {
      kj = tapBranchHash(ej, kj);
    }
  }
  return kj;
}
function toHashTree(scriptTree) {
  if (isTapleaf(scriptTree))
    return { hash: tapleafHash(scriptTree) };
  const hashes = [toHashTree(scriptTree[0]), toHashTree(scriptTree[1])];
  hashes.sort((a, b) => a.hash.compare(b.hash));
  const [left, right] = hashes;
  return {
    hash: tapBranchHash(left.hash, right.hash),
    left,
    right
  };
}
function findScriptPath(node, hash) {
  if (isHashBranch(node)) {
    const leftPath = findScriptPath(node.left, hash);
    if (leftPath !== void 0)
      return [...leftPath, node.right.hash];
    const rightPath = findScriptPath(node.right, hash);
    if (rightPath !== void 0)
      return [...rightPath, node.left.hash];
  } else if (node.hash.equals(hash)) {
    return [];
  }
  return void 0;
}
function tapleafHash(leaf) {
  const version = leaf.version || LEAF_VERSION_TAPSCRIPT;
  return taggedHash(
    "TapLeaf",
    import_buffer2.Buffer.concat([import_buffer2.Buffer.from([version]), serializeScript(leaf.output)])
  );
}
function tapTweakHash(pubKey, h2) {
  return taggedHash(
    "TapTweak",
    import_buffer2.Buffer.concat(h2 ? [pubKey, h2] : [pubKey])
  );
}
function tweakKey(pubKey, h2) {
  if (!import_buffer2.Buffer.isBuffer(pubKey))
    return null;
  if (pubKey.length !== 32)
    return null;
  if (h2 && h2.length !== 32)
    return null;
  const tweakHash = tapTweakHash(pubKey, h2);
  const res = getEccLib().xOnlyPointAddTweak(pubKey, tweakHash);
  if (!res || res.xOnlyPubkey === null)
    return null;
  return {
    parity: res.parity,
    x: import_buffer2.Buffer.from(res.xOnlyPubkey)
  };
}
function tapBranchHash(a, b) {
  return taggedHash("TapBranch", import_buffer2.Buffer.concat([a, b]));
}
function serializeScript(s) {
  const varintLen = varuint.encodingLength(s.length);
  const buffer = import_buffer2.Buffer.allocUnsafe(varintLen);
  varuint.encode(s.length, buffer);
  return import_buffer2.Buffer.concat([buffer, s]);
}

// ts_src/payments/p2tr.ts
var import_bech323 = require("bech32");
var OPS9 = OPS;
var TAPROOT_WITNESS_VERSION = 1;
var ANNEX_PREFIX = 80;
function p2tr(a, opts) {
  if (!a.address && !a.output && !a.pubkey && !a.internalPubkey && !(a.witness && a.witness.length > 1))
    throw new TypeError("Not enough data");
  opts = Object.assign({ validate: true }, opts || {});
  typeforce(
    {
      address: typeforce.maybe(typeforce.String),
      input: typeforce.maybe(typeforce.BufferN(0)),
      network: typeforce.maybe(typeforce.Object),
      output: typeforce.maybe(typeforce.BufferN(34)),
      internalPubkey: typeforce.maybe(typeforce.BufferN(32)),
      hash: typeforce.maybe(typeforce.BufferN(32)),
      // merkle root hash, the tweak
      pubkey: typeforce.maybe(typeforce.BufferN(32)),
      // tweaked with `hash` from `internalPubkey`
      signature: typeforce.maybe(typeforce.anyOf(typeforce.BufferN(64), typeforce.BufferN(65))),
      witness: typeforce.maybe(typeforce.arrayOf(typeforce.Buffer)),
      scriptTree: typeforce.maybe(isTaptree),
      redeem: typeforce.maybe({
        output: typeforce.maybe(typeforce.Buffer),
        // tapleaf script
        redeemVersion: typeforce.maybe(typeforce.Number),
        // tapleaf version
        witness: typeforce.maybe(typeforce.arrayOf(typeforce.Buffer))
      }),
      redeemVersion: typeforce.maybe(typeforce.Number)
    },
    a
  );
  const _address = value(() => {
    const result = import_bech323.bech32m.decode(a.address);
    const version = result.words.shift();
    const data = import_bech323.bech32m.fromWords(result.words);
    return {
      version,
      prefix: result.prefix,
      data: import_buffer3.Buffer.from(data)
    };
  });
  const _witness = value(() => {
    if (!a.witness || !a.witness.length)
      return;
    if (a.witness.length >= 2 && a.witness[a.witness.length - 1][0] === ANNEX_PREFIX) {
      return a.witness.slice(0, -1);
    }
    return a.witness.slice();
  });
  const _hashTree = value(() => {
    if (a.scriptTree)
      return toHashTree(a.scriptTree);
    if (a.hash)
      return { hash: a.hash };
    return;
  });
  const network = a.network || bitcoin;
  const o = { name: "p2tr", network };
  prop(o, "address", () => {
    if (!o.pubkey)
      return;
    const words = import_bech323.bech32m.toWords(o.pubkey);
    words.unshift(TAPROOT_WITNESS_VERSION);
    return import_bech323.bech32m.encode(network.bech32, words);
  });
  prop(o, "hash", () => {
    const hashTree = _hashTree();
    if (hashTree)
      return hashTree.hash;
    const w = _witness();
    if (w && w.length > 1) {
      const controlBlock = w[w.length - 1];
      const leafVersion = controlBlock[0] & TAPLEAF_VERSION_MASK;
      const script = w[w.length - 2];
      const leafHash = tapleafHash({ output: script, version: leafVersion });
      return rootHashFromPath(controlBlock, leafHash);
    }
    return null;
  });
  prop(o, "output", () => {
    if (!o.pubkey)
      return;
    return compile([OPS9.OP_1, o.pubkey]);
  });
  prop(o, "redeemVersion", () => {
    if (a.redeemVersion)
      return a.redeemVersion;
    if (a.redeem && a.redeem.redeemVersion !== void 0 && a.redeem.redeemVersion !== null) {
      return a.redeem.redeemVersion;
    }
    return LEAF_VERSION_TAPSCRIPT;
  });
  prop(o, "redeem", () => {
    const witness = _witness();
    if (!witness || witness.length < 2)
      return;
    return {
      output: witness[witness.length - 2],
      witness: witness.slice(0, -2),
      redeemVersion: witness[witness.length - 1][0] & TAPLEAF_VERSION_MASK
    };
  });
  prop(o, "pubkey", () => {
    if (a.pubkey)
      return a.pubkey;
    if (a.output)
      return a.output.slice(2);
    if (a.address)
      return _address().data;
    if (o.internalPubkey) {
      const tweakedKey = tweakKey(o.internalPubkey, o.hash);
      if (tweakedKey)
        return tweakedKey.x;
    }
  });
  prop(o, "internalPubkey", () => {
    if (a.internalPubkey)
      return a.internalPubkey;
    const witness = _witness();
    if (witness && witness.length > 1)
      return witness[witness.length - 1].slice(1, 33);
  });
  prop(o, "signature", () => {
    if (a.signature)
      return a.signature;
    const witness = _witness();
    if (!witness || witness.length !== 1)
      return;
    return witness[0];
  });
  prop(o, "witness", () => {
    if (a.witness)
      return a.witness;
    const hashTree = _hashTree();
    if (hashTree && a.redeem && a.redeem.output && a.internalPubkey) {
      const leafHash = tapleafHash({
        output: a.redeem.output,
        version: o.redeemVersion
      });
      const path = findScriptPath(hashTree, leafHash);
      if (!path)
        return;
      const outputKey = tweakKey(a.internalPubkey, hashTree.hash);
      if (!outputKey)
        return;
      const controlBock = import_buffer3.Buffer.concat(
        [
          import_buffer3.Buffer.from([o.redeemVersion | outputKey.parity]),
          a.internalPubkey
        ].concat(path)
      );
      return [a.redeem.output, controlBock];
    }
    if (a.signature)
      return [a.signature];
  });
  if (opts.validate) {
    let pubkey = import_buffer3.Buffer.from([]);
    if (a.address) {
      if (network && network.bech32 !== _address().prefix)
        throw new TypeError("Invalid prefix or Network mismatch");
      if (_address().version !== TAPROOT_WITNESS_VERSION)
        throw new TypeError("Invalid address version");
      if (_address().data.length !== 32)
        throw new TypeError("Invalid address data");
      pubkey = _address().data;
    }
    if (a.pubkey) {
      if (pubkey.length > 0 && !pubkey.equals(a.pubkey))
        throw new TypeError("Pubkey mismatch");
      else
        pubkey = a.pubkey;
    }
    if (a.output) {
      if (a.output.length !== 34 || a.output[0] !== OPS9.OP_1 || a.output[1] !== 32)
        throw new TypeError("Output is invalid");
      if (pubkey.length > 0 && !pubkey.equals(a.output.slice(2)))
        throw new TypeError("Pubkey mismatch");
      else
        pubkey = a.output.slice(2);
    }
    if (a.internalPubkey) {
      const tweakedKey = tweakKey(a.internalPubkey, o.hash);
      if (pubkey.length > 0 && !pubkey.equals(tweakedKey.x))
        throw new TypeError("Pubkey mismatch");
      else
        pubkey = tweakedKey.x;
    }
    if (pubkey && pubkey.length) {
      if (!getEccLib().isXOnlyPoint(pubkey))
        throw new TypeError("Invalid pubkey for p2tr");
    }
    const hashTree = _hashTree();
    if (a.hash && hashTree) {
      if (!a.hash.equals(hashTree.hash))
        throw new TypeError("Hash mismatch");
    }
    if (a.redeem && a.redeem.output && hashTree) {
      const leafHash = tapleafHash({
        output: a.redeem.output,
        version: o.redeemVersion
      });
      if (!findScriptPath(hashTree, leafHash))
        throw new TypeError("Redeem script not in tree");
    }
    const witness = _witness();
    if (a.redeem && o.redeem) {
      if (a.redeem.redeemVersion) {
        if (a.redeem.redeemVersion !== o.redeem.redeemVersion)
          throw new TypeError("Redeem.redeemVersion and witness mismatch");
      }
      if (a.redeem.output) {
        if (decompile(a.redeem.output).length === 0)
          throw new TypeError("Redeem.output is invalid");
        if (o.redeem.output && !a.redeem.output.equals(o.redeem.output))
          throw new TypeError("Redeem.output and witness mismatch");
      }
      if (a.redeem.witness) {
        if (o.redeem.witness && !stacksEqual5(a.redeem.witness, o.redeem.witness))
          throw new TypeError("Redeem.witness and witness mismatch");
      }
    }
    if (witness && witness.length) {
      if (witness.length === 1) {
        if (a.signature && !a.signature.equals(witness[0]))
          throw new TypeError("Signature mismatch");
      } else {
        const controlBlock = witness[witness.length - 1];
        if (controlBlock.length < 33)
          throw new TypeError(
            `The control-block length is too small. Got ${controlBlock.length}, expected min 33.`
          );
        if ((controlBlock.length - 33) % 32 !== 0)
          throw new TypeError(
            `The control-block length of ${controlBlock.length} is incorrect!`
          );
        const m = (controlBlock.length - 33) / 32;
        if (m > 128)
          throw new TypeError(
            `The script path is too long. Got ${m}, expected max 128.`
          );
        const internalPubkey = controlBlock.slice(1, 33);
        if (a.internalPubkey && !a.internalPubkey.equals(internalPubkey))
          throw new TypeError("Internal pubkey mismatch");
        if (!getEccLib().isXOnlyPoint(internalPubkey))
          throw new TypeError("Invalid internalPubkey for p2tr witness");
        const leafVersion = controlBlock[0] & TAPLEAF_VERSION_MASK;
        const script = witness[witness.length - 2];
        const leafHash = tapleafHash({ output: script, version: leafVersion });
        const hash = rootHashFromPath(controlBlock, leafHash);
        const outputKey = tweakKey(internalPubkey, hash);
        if (!outputKey)
          throw new TypeError("Invalid outputKey for p2tr witness");
        if (pubkey.length && !pubkey.equals(outputKey.x))
          throw new TypeError("Pubkey mismatch for p2tr witness");
        if (outputKey.parity !== (controlBlock[0] & 1))
          throw new Error("Incorrect parity");
      }
    }
  }
  return Object.assign(o, a);
}
function stacksEqual5(a, b) {
  if (a.length !== b.length)
    return false;
  return a.every((x, i) => {
    return x.equals(b[i]);
  });
}

// ts_src/address.ts
var import_bech324 = require("bech32");
var bs58check3 = __toESM(require("bs58check"));
var FUTURE_SEGWIT_MAX_SIZE = 40;
var FUTURE_SEGWIT_MIN_SIZE = 2;
var FUTURE_SEGWIT_MAX_VERSION = 16;
var FUTURE_SEGWIT_MIN_VERSION = 2;
var FUTURE_SEGWIT_VERSION_DIFF = 80;
var FUTURE_SEGWIT_VERSION_WARNING = "WARNING: Sending to a future segwit version address can lead to loss of funds. End users MUST be warned carefully in the GUI and asked if they wish to proceed with caution. Wallets should verify the segwit version from the output of fromBech32, then decide when it is safe to use which version of segwit.";
function _toFutureSegwitAddress(output, network) {
  const data = output.slice(2);
  if (data.length < FUTURE_SEGWIT_MIN_SIZE || data.length > FUTURE_SEGWIT_MAX_SIZE)
    throw new TypeError("Invalid program length for segwit address");
  const version = output[0] - FUTURE_SEGWIT_VERSION_DIFF;
  if (version < FUTURE_SEGWIT_MIN_VERSION || version > FUTURE_SEGWIT_MAX_VERSION)
    throw new TypeError("Invalid version for segwit address");
  if (output[1] !== data.length)
    throw new TypeError("Invalid script for segwit address");
  console.warn(FUTURE_SEGWIT_VERSION_WARNING);
  return toBech32(data, version, network.bech32);
}
function fromBase58Check(address) {
  const payload = bs58check3.decode(address);
  if (payload.length < 21)
    throw new TypeError(address + " is too short");
  if (payload.length > 21)
    throw new TypeError(address + " is too long");
  const version = payload.readUInt8(0);
  const hash = payload.slice(1);
  return { version, hash };
}
function fromBech32(address) {
  let result;
  let version;
  try {
    result = import_bech324.bech32.decode(address);
  } catch (e) {
  }
  if (result) {
    version = result.words[0];
    if (version !== 0)
      throw new TypeError(address + " uses wrong encoding");
  } else {
    result = import_bech324.bech32m.decode(address);
    version = result.words[0];
    if (version === 0)
      throw new TypeError(address + " uses wrong encoding");
  }
  const data = import_bech324.bech32.fromWords(result.words.slice(1));
  return {
    version,
    prefix: result.prefix,
    data: Buffer.from(data)
  };
}
function toBase58Check(hash, version) {
  typeforce(tuple(Hash160bit, UInt8), arguments);
  const payload = Buffer.allocUnsafe(21);
  payload.writeUInt8(version, 0);
  hash.copy(payload, 1);
  return bs58check3.encode(payload);
}
function toBech32(data, version, prefix) {
  const words = import_bech324.bech32.toWords(data);
  words.unshift(version);
  return version === 0 ? import_bech324.bech32.encode(prefix, words) : import_bech324.bech32m.encode(prefix, words);
}
function fromOutputScript(output, network) {
  network = network || bitcoin;
  try {
    return p2pkh({ output, network }).address;
  } catch (e) {
  }
  try {
    return p2sh({ output, network }).address;
  } catch (e) {
  }
  try {
    return p2wpkh({ output, network }).address;
  } catch (e) {
  }
  try {
    return p2wsh({ output, network }).address;
  } catch (e) {
  }
  try {
    return p2tr({ output, network }).address;
  } catch (e) {
  }
  try {
    return _toFutureSegwitAddress(output, network);
  } catch (e) {
  }
  throw new Error(toASM(output) + " has no matching Address");
}
function toOutputScript(address, network) {
  network = network || bitcoin;
  let decodeBase58;
  let decodeBech32;
  try {
    decodeBase58 = fromBase58Check(address);
  } catch (e) {
  }
  if (decodeBase58) {
    if (decodeBase58.version === network.pubKeyHash)
      return p2pkh({ hash: decodeBase58.hash }).output;
    if (decodeBase58.version === network.scriptHash)
      return p2sh({ hash: decodeBase58.hash }).output;
  } else {
    try {
      decodeBech32 = fromBech32(address);
    } catch (e) {
    }
    if (decodeBech32) {
      if (decodeBech32.prefix !== network.bech32)
        throw new Error(address + " has an invalid prefix");
      if (decodeBech32.version === 0) {
        if (decodeBech32.data.length === 20)
          return p2wpkh({ hash: decodeBech32.data }).output;
        if (decodeBech32.data.length === 32)
          return p2wsh({ hash: decodeBech32.data }).output;
      } else if (decodeBech32.version === 1) {
        if (decodeBech32.data.length === 32)
          return p2tr({ pubkey: decodeBech32.data }).output;
      } else if (decodeBech32.version >= FUTURE_SEGWIT_MIN_VERSION && decodeBech32.version <= FUTURE_SEGWIT_MAX_VERSION && decodeBech32.data.length >= FUTURE_SEGWIT_MIN_SIZE && decodeBech32.data.length <= FUTURE_SEGWIT_MAX_SIZE) {
        console.warn(FUTURE_SEGWIT_VERSION_WARNING);
        return compile([
          decodeBech32.version + FUTURE_SEGWIT_VERSION_DIFF,
          decodeBech32.data
        ]);
      }
    }
  }
  throw new Error(address + " has no matching Script");
}

// ts_src/merkle.ts
function fastMerkleRoot(values, digestFn) {
  if (!Array.isArray(values))
    throw TypeError("Expected values Array");
  if (typeof digestFn !== "function")
    throw TypeError("Expected digest Function");
  let length = values.length;
  const results = values.concat();
  while (length > 1) {
    let j = 0;
    for (let i = 0; i < length; i += 2, ++j) {
      const left = results[i];
      const right = i + 1 === length ? left : results[i + 1];
      const data = Buffer.concat([left, right]);
      results[j] = digestFn(data);
    }
    length = j;
  }
  return results[0];
}

// ts_src/transaction.ts
var { typeforce: typeforce5 } = types_exports;
function varSliceSize(someScript) {
  const length = someScript.length;
  return varuint.encodingLength(length) + length;
}
function vectorSize(someVector) {
  const length = someVector.length;
  return varuint.encodingLength(length) + someVector.reduce((sum, witness) => {
    return sum + varSliceSize(witness);
  }, 0);
}
var EMPTY_BUFFER3 = Buffer.allocUnsafe(0);
var EMPTY_WITNESS = [];
var ZERO2 = Buffer.from(
  "0000000000000000000000000000000000000000000000000000000000000000",
  "hex"
);
var ONE = Buffer.from(
  "0000000000000000000000000000000000000000000000000000000000000001",
  "hex"
);
var VALUE_UINT64_MAX = Buffer.from("ffffffffffffffff", "hex");
var BLANK_OUTPUT = {
  script: EMPTY_BUFFER3,
  valueBuffer: VALUE_UINT64_MAX
};
function isOutput(out) {
  return out.value !== void 0;
}
var _Transaction = class {
  constructor() {
    this.version = 1;
    this.locktime = 0;
    this.ins = [];
    this.outs = [];
  }
  static fromBuffer(buffer, _NO_STRICT) {
    const bufferReader = new BufferReader(buffer);
    const tx = new _Transaction();
    tx.version = bufferReader.readInt32();
    const marker = bufferReader.readUInt8();
    const flag = bufferReader.readUInt8();
    let hasWitnesses = false;
    if (marker === _Transaction.ADVANCED_TRANSACTION_MARKER && flag === _Transaction.ADVANCED_TRANSACTION_FLAG) {
      hasWitnesses = true;
    } else {
      bufferReader.offset -= 2;
    }
    const vinLen = bufferReader.readVarInt();
    for (let i = 0; i < vinLen; ++i) {
      tx.ins.push({
        hash: bufferReader.readSlice(32),
        index: bufferReader.readUInt32(),
        script: bufferReader.readVarSlice(),
        sequence: bufferReader.readUInt32(),
        witness: EMPTY_WITNESS
      });
    }
    const voutLen = bufferReader.readVarInt();
    for (let i = 0; i < voutLen; ++i) {
      tx.outs.push({
        value: bufferReader.readUInt64(),
        script: bufferReader.readVarSlice()
      });
    }
    if (hasWitnesses) {
      for (let i = 0; i < vinLen; ++i) {
        tx.ins[i].witness = bufferReader.readVector();
      }
      if (!tx.hasWitnesses())
        throw new Error("Transaction has superfluous witness data");
    }
    tx.locktime = bufferReader.readUInt32();
    if (_NO_STRICT)
      return tx;
    if (bufferReader.offset !== buffer.length)
      throw new Error("Transaction has unexpected data");
    return tx;
  }
  static fromHex(hex) {
    return _Transaction.fromBuffer(Buffer.from(hex, "hex"), false);
  }
  static isCoinbaseHash(buffer) {
    typeforce5(Hash256bit, buffer);
    for (let i = 0; i < 32; ++i) {
      if (buffer[i] !== 0)
        return false;
    }
    return true;
  }
  isCoinbase() {
    return this.ins.length === 1 && _Transaction.isCoinbaseHash(this.ins[0].hash);
  }
  addInput(hash, index, sequence, scriptSig) {
    typeforce5(
      tuple(
        Hash256bit,
        UInt32,
        maybe(UInt32),
        maybe(Buffer2)
      ),
      arguments
    );
    if (Null(sequence)) {
      sequence = _Transaction.DEFAULT_SEQUENCE;
    }
    return this.ins.push({
      hash,
      index,
      script: scriptSig || EMPTY_BUFFER3,
      sequence,
      witness: EMPTY_WITNESS
    }) - 1;
  }
  addOutput(scriptPubKey, value2) {
    typeforce5(tuple(Buffer2, Satoshi), arguments);
    return this.outs.push({
      script: scriptPubKey,
      value: value2
    }) - 1;
  }
  hasWitnesses() {
    return this.ins.some((x) => {
      return x.witness.length !== 0;
    });
  }
  weight() {
    const base = this.byteLength(false);
    const total = this.byteLength(true);
    return base * 3 + total;
  }
  virtualSize() {
    return Math.ceil(this.weight() / 4);
  }
  byteLength(_ALLOW_WITNESS = true) {
    const hasWitnesses = _ALLOW_WITNESS && this.hasWitnesses();
    return (hasWitnesses ? 10 : 8) + varuint.encodingLength(this.ins.length) + varuint.encodingLength(this.outs.length) + this.ins.reduce((sum, input) => {
      return sum + 40 + varSliceSize(input.script);
    }, 0) + this.outs.reduce((sum, output) => {
      return sum + 8 + varSliceSize(output.script);
    }, 0) + (hasWitnesses ? this.ins.reduce((sum, input) => {
      return sum + vectorSize(input.witness);
    }, 0) : 0);
  }
  clone() {
    const newTx = new _Transaction();
    newTx.version = this.version;
    newTx.locktime = this.locktime;
    newTx.ins = this.ins.map((txIn) => {
      return {
        hash: txIn.hash,
        index: txIn.index,
        script: txIn.script,
        sequence: txIn.sequence,
        witness: txIn.witness
      };
    });
    newTx.outs = this.outs.map((txOut) => {
      return {
        script: txOut.script,
        value: txOut.value
      };
    });
    return newTx;
  }
  /**
   * Hash transaction for signing a specific input.
   *
   * Bitcoin uses a different hash for each signed transaction input.
   * This method copies the transaction, makes the necessary changes based on the
   * hashType, and then hashes the result.
   * This hash can then be used to sign the provided transaction input.
   */
  hashForSignature(inIndex, prevOutScript, hashType) {
    typeforce5(
      tuple(UInt32, Buffer2, Number),
      arguments
    );
    if (inIndex >= this.ins.length)
      return ONE;
    const ourScript = compile(
      decompile(prevOutScript).filter((x) => {
        return x !== OPS.OP_CODESEPARATOR;
      })
    );
    const txTmp = this.clone();
    if ((hashType & 31) === _Transaction.SIGHASH_NONE) {
      txTmp.outs = [];
      txTmp.ins.forEach((input, i) => {
        if (i === inIndex)
          return;
        input.sequence = 0;
      });
    } else if ((hashType & 31) === _Transaction.SIGHASH_SINGLE) {
      if (inIndex >= this.outs.length)
        return ONE;
      txTmp.outs.length = inIndex + 1;
      for (let i = 0; i < inIndex; i++) {
        txTmp.outs[i] = BLANK_OUTPUT;
      }
      txTmp.ins.forEach((input, y) => {
        if (y === inIndex)
          return;
        input.sequence = 0;
      });
    }
    if (hashType & _Transaction.SIGHASH_ANYONECANPAY) {
      txTmp.ins = [txTmp.ins[inIndex]];
      txTmp.ins[0].script = ourScript;
    } else {
      txTmp.ins.forEach((input) => {
        input.script = EMPTY_BUFFER3;
      });
      txTmp.ins[inIndex].script = ourScript;
    }
    const buffer = Buffer.allocUnsafe(txTmp.byteLength(false) + 4);
    buffer.writeInt32LE(hashType, buffer.length - 4);
    txTmp.__toBuffer(buffer, 0, false);
    return hash256(buffer);
  }
  hashForWitnessV1(inIndex, prevOutScripts, values, hashType, leafHash, annex) {
    typeforce5(
      tuple(
        UInt32,
        typeforce5.arrayOf(Buffer2),
        typeforce5.arrayOf(Satoshi),
        UInt32
      ),
      arguments
    );
    if (values.length !== this.ins.length || prevOutScripts.length !== this.ins.length) {
      throw new Error("Must supply prevout script and value for all inputs");
    }
    const outputType = hashType === _Transaction.SIGHASH_DEFAULT ? _Transaction.SIGHASH_ALL : hashType & _Transaction.SIGHASH_OUTPUT_MASK;
    const inputType = hashType & _Transaction.SIGHASH_INPUT_MASK;
    const isAnyoneCanPay = inputType === _Transaction.SIGHASH_ANYONECANPAY;
    const isNone = outputType === _Transaction.SIGHASH_NONE;
    const isSingle = outputType === _Transaction.SIGHASH_SINGLE;
    let hashPrevouts = EMPTY_BUFFER3;
    let hashAmounts = EMPTY_BUFFER3;
    let hashScriptPubKeys = EMPTY_BUFFER3;
    let hashSequences = EMPTY_BUFFER3;
    let hashOutputs = EMPTY_BUFFER3;
    if (!isAnyoneCanPay) {
      let bufferWriter = BufferWriter.withCapacity(36 * this.ins.length);
      this.ins.forEach((txIn) => {
        bufferWriter.writeSlice(txIn.hash);
        bufferWriter.writeUInt32(txIn.index);
      });
      hashPrevouts = sha256(bufferWriter.end());
      bufferWriter = BufferWriter.withCapacity(8 * this.ins.length);
      values.forEach((value2) => bufferWriter.writeUInt64(value2));
      hashAmounts = sha256(bufferWriter.end());
      bufferWriter = BufferWriter.withCapacity(
        prevOutScripts.map(varSliceSize).reduce((a, b) => a + b)
      );
      prevOutScripts.forEach(
        (prevOutScript) => bufferWriter.writeVarSlice(prevOutScript)
      );
      hashScriptPubKeys = sha256(bufferWriter.end());
      bufferWriter = BufferWriter.withCapacity(4 * this.ins.length);
      this.ins.forEach((txIn) => bufferWriter.writeUInt32(txIn.sequence));
      hashSequences = sha256(bufferWriter.end());
    }
    if (!(isNone || isSingle)) {
      const txOutsSize = this.outs.map((output) => 8 + varSliceSize(output.script)).reduce((a, b) => a + b);
      const bufferWriter = BufferWriter.withCapacity(txOutsSize);
      this.outs.forEach((out) => {
        bufferWriter.writeUInt64(out.value);
        bufferWriter.writeVarSlice(out.script);
      });
      hashOutputs = sha256(bufferWriter.end());
    } else if (isSingle && inIndex < this.outs.length) {
      const output = this.outs[inIndex];
      const bufferWriter = BufferWriter.withCapacity(
        8 + varSliceSize(output.script)
      );
      bufferWriter.writeUInt64(output.value);
      bufferWriter.writeVarSlice(output.script);
      hashOutputs = sha256(bufferWriter.end());
    }
    const spendType = (leafHash ? 2 : 0) + (annex ? 1 : 0);
    const sigMsgSize = 174 - (isAnyoneCanPay ? 49 : 0) - (isNone ? 32 : 0) + (annex ? 32 : 0) + (leafHash ? 37 : 0);
    const sigMsgWriter = BufferWriter.withCapacity(sigMsgSize);
    sigMsgWriter.writeUInt8(hashType);
    sigMsgWriter.writeInt32(this.version);
    sigMsgWriter.writeUInt32(this.locktime);
    sigMsgWriter.writeSlice(hashPrevouts);
    sigMsgWriter.writeSlice(hashAmounts);
    sigMsgWriter.writeSlice(hashScriptPubKeys);
    sigMsgWriter.writeSlice(hashSequences);
    if (!(isNone || isSingle)) {
      sigMsgWriter.writeSlice(hashOutputs);
    }
    sigMsgWriter.writeUInt8(spendType);
    if (isAnyoneCanPay) {
      const input = this.ins[inIndex];
      sigMsgWriter.writeSlice(input.hash);
      sigMsgWriter.writeUInt32(input.index);
      sigMsgWriter.writeUInt64(values[inIndex]);
      sigMsgWriter.writeVarSlice(prevOutScripts[inIndex]);
      sigMsgWriter.writeUInt32(input.sequence);
    } else {
      sigMsgWriter.writeUInt32(inIndex);
    }
    if (annex) {
      const bufferWriter = BufferWriter.withCapacity(varSliceSize(annex));
      bufferWriter.writeVarSlice(annex);
      sigMsgWriter.writeSlice(sha256(bufferWriter.end()));
    }
    if (isSingle) {
      sigMsgWriter.writeSlice(hashOutputs);
    }
    if (leafHash) {
      sigMsgWriter.writeSlice(leafHash);
      sigMsgWriter.writeUInt8(0);
      sigMsgWriter.writeUInt32(4294967295);
    }
    return taggedHash(
      "TapSighash",
      Buffer.concat([Buffer.of(0), sigMsgWriter.end()])
    );
  }
  hashForWitnessV0(inIndex, prevOutScript, value2, hashType) {
    typeforce5(
      tuple(UInt32, Buffer2, Satoshi, UInt32),
      arguments
    );
    let tbuffer = Buffer.from([]);
    let bufferWriter;
    let hashOutputs = ZERO2;
    let hashPrevouts = ZERO2;
    let hashSequence = ZERO2;
    if (!(hashType & _Transaction.SIGHASH_ANYONECANPAY)) {
      tbuffer = Buffer.allocUnsafe(36 * this.ins.length);
      bufferWriter = new BufferWriter(tbuffer, 0);
      this.ins.forEach((txIn) => {
        bufferWriter.writeSlice(txIn.hash);
        bufferWriter.writeUInt32(txIn.index);
      });
      hashPrevouts = hash256(tbuffer);
    }
    if (!(hashType & _Transaction.SIGHASH_ANYONECANPAY) && (hashType & 31) !== _Transaction.SIGHASH_SINGLE && (hashType & 31) !== _Transaction.SIGHASH_NONE) {
      tbuffer = Buffer.allocUnsafe(4 * this.ins.length);
      bufferWriter = new BufferWriter(tbuffer, 0);
      this.ins.forEach((txIn) => {
        bufferWriter.writeUInt32(txIn.sequence);
      });
      hashSequence = hash256(tbuffer);
    }
    if ((hashType & 31) !== _Transaction.SIGHASH_SINGLE && (hashType & 31) !== _Transaction.SIGHASH_NONE) {
      const txOutsSize = this.outs.reduce((sum, output) => {
        return sum + 8 + varSliceSize(output.script);
      }, 0);
      tbuffer = Buffer.allocUnsafe(txOutsSize);
      bufferWriter = new BufferWriter(tbuffer, 0);
      this.outs.forEach((out) => {
        bufferWriter.writeUInt64(out.value);
        bufferWriter.writeVarSlice(out.script);
      });
      hashOutputs = hash256(tbuffer);
    } else if ((hashType & 31) === _Transaction.SIGHASH_SINGLE && inIndex < this.outs.length) {
      const output = this.outs[inIndex];
      tbuffer = Buffer.allocUnsafe(8 + varSliceSize(output.script));
      bufferWriter = new BufferWriter(tbuffer, 0);
      bufferWriter.writeUInt64(output.value);
      bufferWriter.writeVarSlice(output.script);
      hashOutputs = hash256(tbuffer);
    }
    tbuffer = Buffer.allocUnsafe(156 + varSliceSize(prevOutScript));
    bufferWriter = new BufferWriter(tbuffer, 0);
    const input = this.ins[inIndex];
    bufferWriter.writeInt32(this.version);
    bufferWriter.writeSlice(hashPrevouts);
    bufferWriter.writeSlice(hashSequence);
    bufferWriter.writeSlice(input.hash);
    bufferWriter.writeUInt32(input.index);
    bufferWriter.writeVarSlice(prevOutScript);
    bufferWriter.writeUInt64(value2);
    bufferWriter.writeUInt32(input.sequence);
    bufferWriter.writeSlice(hashOutputs);
    bufferWriter.writeUInt32(this.locktime);
    bufferWriter.writeUInt32(hashType);
    return hash256(tbuffer);
  }
  getHash(forWitness) {
    if (forWitness && this.isCoinbase())
      return Buffer.alloc(32, 0);
    return hash256(this.__toBuffer(void 0, void 0, forWitness));
  }
  getId() {
    return reverseBuffer(this.getHash(false)).toString("hex");
  }
  toBuffer(buffer, initialOffset) {
    return this.__toBuffer(buffer, initialOffset, true);
  }
  toHex() {
    return this.toBuffer(void 0, void 0).toString("hex");
  }
  setInputScript(index, scriptSig) {
    typeforce5(tuple(Number, Buffer2), arguments);
    this.ins[index].script = scriptSig;
  }
  setWitness(index, witness) {
    typeforce5(tuple(Number, [Buffer2]), arguments);
    this.ins[index].witness = witness;
  }
  __toBuffer(buffer, initialOffset, _ALLOW_WITNESS = false) {
    if (!buffer)
      buffer = Buffer.allocUnsafe(this.byteLength(_ALLOW_WITNESS));
    const bufferWriter = new BufferWriter(buffer, initialOffset || 0);
    bufferWriter.writeInt32(this.version);
    const hasWitnesses = _ALLOW_WITNESS && this.hasWitnesses();
    if (hasWitnesses) {
      bufferWriter.writeUInt8(_Transaction.ADVANCED_TRANSACTION_MARKER);
      bufferWriter.writeUInt8(_Transaction.ADVANCED_TRANSACTION_FLAG);
    }
    bufferWriter.writeVarInt(this.ins.length);
    this.ins.forEach((txIn) => {
      bufferWriter.writeSlice(txIn.hash);
      bufferWriter.writeUInt32(txIn.index);
      bufferWriter.writeVarSlice(txIn.script);
      bufferWriter.writeUInt32(txIn.sequence);
    });
    bufferWriter.writeVarInt(this.outs.length);
    this.outs.forEach((txOut) => {
      if (isOutput(txOut)) {
        bufferWriter.writeUInt64(txOut.value);
      } else {
        bufferWriter.writeSlice(txOut.valueBuffer);
      }
      bufferWriter.writeVarSlice(txOut.script);
    });
    if (hasWitnesses) {
      this.ins.forEach((input) => {
        bufferWriter.writeVector(input.witness);
      });
    }
    bufferWriter.writeUInt32(this.locktime);
    if (initialOffset !== void 0)
      return buffer.slice(initialOffset, bufferWriter.offset);
    return buffer;
  }
};
var Transaction = _Transaction;
Transaction.DEFAULT_SEQUENCE = 4294967295;
Transaction.SIGHASH_DEFAULT = 0;
Transaction.SIGHASH_ALL = 1;
Transaction.SIGHASH_NONE = 2;
Transaction.SIGHASH_SINGLE = 3;
Transaction.SIGHASH_ANYONECANPAY = 128;
Transaction.SIGHASH_OUTPUT_MASK = 3;
Transaction.SIGHASH_INPUT_MASK = 128;
Transaction.ADVANCED_TRANSACTION_MARKER = 0;
Transaction.ADVANCED_TRANSACTION_FLAG = 1;

// ts_src/block.ts
var { typeforce: typeforce6 } = types_exports;
var errorMerkleNoTxes = new TypeError(
  "Cannot compute merkle root for zero transactions"
);
var errorWitnessNotSegwit = new TypeError(
  "Cannot compute witness commit for non-segwit block"
);
var Block = class {
  constructor() {
    this.version = 1;
    this.prevHash = void 0;
    this.merkleRoot = void 0;
    this.timestamp = 0;
    this.witnessCommit = void 0;
    this.bits = 0;
    this.nonce = 0;
    this.transactions = void 0;
  }
  static fromBuffer(buffer) {
    if (buffer.length < 80)
      throw new Error("Buffer too small (< 80 bytes)");
    const bufferReader = new BufferReader(buffer);
    const block = new Block();
    block.version = bufferReader.readInt32();
    block.prevHash = bufferReader.readSlice(32);
    block.merkleRoot = bufferReader.readSlice(32);
    block.timestamp = bufferReader.readUInt32();
    block.bits = bufferReader.readUInt32();
    block.nonce = bufferReader.readUInt32();
    if (buffer.length === 80)
      return block;
    const readTransaction = () => {
      const tx = Transaction.fromBuffer(
        bufferReader.buffer.slice(bufferReader.offset),
        true
      );
      bufferReader.offset += tx.byteLength();
      return tx;
    };
    const nTransactions = bufferReader.readVarInt();
    block.transactions = [];
    for (let i = 0; i < nTransactions; ++i) {
      const tx = readTransaction();
      block.transactions.push(tx);
    }
    const witnessCommit = block.getWitnessCommit();
    if (witnessCommit)
      block.witnessCommit = witnessCommit;
    return block;
  }
  static fromHex(hex) {
    return Block.fromBuffer(Buffer.from(hex, "hex"));
  }
  static calculateTarget(bits) {
    const exponent = ((bits & 4278190080) >> 24) - 3;
    const mantissa = bits & 8388607;
    const target = Buffer.alloc(32, 0);
    target.writeUIntBE(mantissa, 29 - exponent, 3);
    return target;
  }
  static calculateMerkleRoot(transactions, forWitness) {
    typeforce6([{ getHash: Function }], transactions);
    if (transactions.length === 0)
      throw errorMerkleNoTxes;
    if (forWitness && !txesHaveWitnessCommit(transactions))
      throw errorWitnessNotSegwit;
    const hashes = transactions.map(
      (transaction) => transaction.getHash(forWitness)
    );
    const rootHash = fastMerkleRoot(hashes, hash256);
    return forWitness ? hash256(
      Buffer.concat([rootHash, transactions[0].ins[0].witness[0]])
    ) : rootHash;
  }
  getWitnessCommit() {
    if (!txesHaveWitnessCommit(this.transactions))
      return null;
    const witnessCommits = this.transactions[0].outs.filter(
      (out) => out.script.slice(0, 6).equals(Buffer.from("6a24aa21a9ed", "hex"))
    ).map((out) => out.script.slice(6, 38));
    if (witnessCommits.length === 0)
      return null;
    const result = witnessCommits[witnessCommits.length - 1];
    if (!(result instanceof Buffer && result.length === 32))
      return null;
    return result;
  }
  hasWitnessCommit() {
    if (this.witnessCommit instanceof Buffer && this.witnessCommit.length === 32)
      return true;
    if (this.getWitnessCommit() !== null)
      return true;
    return false;
  }
  hasWitness() {
    return anyTxHasWitness(this.transactions);
  }
  weight() {
    const base = this.byteLength(false, false);
    const total = this.byteLength(false, true);
    return base * 3 + total;
  }
  byteLength(headersOnly, allowWitness = true) {
    if (headersOnly || !this.transactions)
      return 80;
    return 80 + varuint.encodingLength(this.transactions.length) + this.transactions.reduce((a, x) => a + x.byteLength(allowWitness), 0);
  }
  getHash() {
    return hash256(this.toBuffer(true));
  }
  getId() {
    return reverseBuffer(this.getHash()).toString("hex");
  }
  getUTCDate() {
    const date = /* @__PURE__ */ new Date(0);
    date.setUTCSeconds(this.timestamp);
    return date;
  }
  // TODO: buffer, offset compatibility
  toBuffer(headersOnly) {
    const buffer = Buffer.allocUnsafe(this.byteLength(headersOnly));
    const bufferWriter = new BufferWriter(buffer);
    bufferWriter.writeInt32(this.version);
    bufferWriter.writeSlice(this.prevHash);
    bufferWriter.writeSlice(this.merkleRoot);
    bufferWriter.writeUInt32(this.timestamp);
    bufferWriter.writeUInt32(this.bits);
    bufferWriter.writeUInt32(this.nonce);
    if (headersOnly || !this.transactions)
      return buffer;
    varuint.encode(this.transactions.length, buffer, bufferWriter.offset);
    bufferWriter.offset += varuint.encode.bytes;
    this.transactions.forEach((tx) => {
      const txSize = tx.byteLength();
      tx.toBuffer(buffer, bufferWriter.offset);
      bufferWriter.offset += txSize;
    });
    return buffer;
  }
  toHex(headersOnly) {
    return this.toBuffer(headersOnly).toString("hex");
  }
  checkTxRoots() {
    const hasWitnessCommit = this.hasWitnessCommit();
    if (!hasWitnessCommit && this.hasWitness())
      return false;
    return this.__checkMerkleRoot() && (hasWitnessCommit ? this.__checkWitnessCommit() : true);
  }
  checkProofOfWork() {
    const hash = reverseBuffer(this.getHash());
    const target = Block.calculateTarget(this.bits);
    return hash.compare(target) <= 0;
  }
  __checkMerkleRoot() {
    if (!this.transactions)
      throw errorMerkleNoTxes;
    const actualMerkleRoot = Block.calculateMerkleRoot(this.transactions);
    return this.merkleRoot.compare(actualMerkleRoot) === 0;
  }
  __checkWitnessCommit() {
    if (!this.transactions)
      throw errorMerkleNoTxes;
    if (!this.hasWitnessCommit())
      throw errorWitnessNotSegwit;
    const actualWitnessCommit = Block.calculateMerkleRoot(
      this.transactions,
      true
    );
    return this.witnessCommit.compare(actualWitnessCommit) === 0;
  }
};
function txesHaveWitnessCommit(transactions) {
  return transactions instanceof Array && transactions[0] && transactions[0].ins && transactions[0].ins instanceof Array && transactions[0].ins[0] && transactions[0].ins[0].witness && transactions[0].ins[0].witness instanceof Array && transactions[0].ins[0].witness.length > 0;
}
function anyTxHasWitness(transactions) {
  return transactions instanceof Array && transactions.some(
    (tx) => typeof tx === "object" && tx.ins instanceof Array && tx.ins.some(
      (input) => typeof input === "object" && input.witness instanceof Array && input.witness.length > 0
    )
  );
}

// ts_src/psbt.ts
var import_bip174 = require("bip174");
var varuint3 = __toESM(require("bip174/src/lib/converter/varint"));
var import_utils = require("bip174/src/lib/utils");

// ts_src/psbt/psbtutils.ts
var varuint2 = __toESM(require("bip174/src/lib/converter/varint"));
function isPaymentFactory(payment) {
  return (script) => {
    try {
      payment({ output: script });
      return true;
    } catch (err) {
      return false;
    }
  };
}
var isP2MS = isPaymentFactory(p2ms);
var isP2PK = isPaymentFactory(p2pk);
var isP2PKH = isPaymentFactory(p2pkh);
var isP2WPKH = isPaymentFactory(p2wpkh);
var isP2WSHScript = isPaymentFactory(p2wsh);
var isP2SHScript = isPaymentFactory(p2sh);
var isP2TR = isPaymentFactory(p2tr);
function witnessStackToScriptWitness(witness) {
  let buffer = Buffer.allocUnsafe(0);
  function writeSlice(slice) {
    buffer = Buffer.concat([buffer, Buffer.from(slice)]);
  }
  function writeVarInt(i) {
    const currentLen = buffer.length;
    const varintLen = varuint2.encodingLength(i);
    buffer = Buffer.concat([buffer, Buffer.allocUnsafe(varintLen)]);
    varuint2.encode(i, buffer, currentLen);
  }
  function writeVarSlice(slice) {
    writeVarInt(slice.length);
    writeSlice(slice);
  }
  function writeVector(vector) {
    writeVarInt(vector.length);
    vector.forEach(writeVarSlice);
  }
  writeVector(witness);
  return buffer;
}
function pubkeyPositionInScript(pubkey, script) {
  const pubkeyHash = hash160(pubkey);
  const pubkeyXOnly = pubkey.slice(1, 33);
  const decompiled = decompile(script);
  if (decompiled === null)
    throw new Error("Unknown script error");
  return decompiled.findIndex((element) => {
    if (typeof element === "number")
      return false;
    return element.equals(pubkey) || element.equals(pubkeyHash) || element.equals(pubkeyXOnly);
  });
}
function pubkeyInScript(pubkey, script) {
  return pubkeyPositionInScript(pubkey, script) !== -1;
}
function checkInputForSig(input, action) {
  const pSigs = extractPartialSigs(input);
  return pSigs.some(
    (pSig) => signatureBlocksAction(pSig, signature.decode, action)
  );
}
function signatureBlocksAction(signature2, signatureDecodeFn, action) {
  const { hashType } = signatureDecodeFn(signature2);
  const whitelist = [];
  const isAnyoneCanPay = hashType & Transaction.SIGHASH_ANYONECANPAY;
  if (isAnyoneCanPay)
    whitelist.push("addInput");
  const hashMod = hashType & 31;
  switch (hashMod) {
    case Transaction.SIGHASH_ALL:
      break;
    case Transaction.SIGHASH_SINGLE:
    case Transaction.SIGHASH_NONE:
      whitelist.push("addOutput");
      whitelist.push("setInputSequence");
      break;
  }
  if (whitelist.indexOf(action) === -1) {
    return true;
  }
  return false;
}
function extractPartialSigs(input) {
  let pSigs = [];
  if ((input.partialSig || []).length === 0) {
    if (!input.finalScriptSig && !input.finalScriptWitness)
      return [];
    pSigs = getPsigsFromInputFinalScripts(input);
  } else {
    pSigs = input.partialSig;
  }
  return pSigs.map((p) => p.signature);
}
function getPsigsFromInputFinalScripts(input) {
  const scriptItems = !input.finalScriptSig ? [] : decompile(input.finalScriptSig) || [];
  const witnessItems = !input.finalScriptWitness ? [] : decompile(input.finalScriptWitness) || [];
  return scriptItems.concat(witnessItems).filter((item) => {
    return Buffer.isBuffer(item) && isCanonicalScriptSignature(item);
  }).map((sig) => ({ signature: sig }));
}

// ts_src/psbt/bip371.ts
var toXOnly = (pubKey) => pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);
function tapScriptFinalizer(inputIndex, input, tapLeafHashToFinalize) {
  const tapLeaf = findTapLeafToFinalize(
    input,
    inputIndex,
    tapLeafHashToFinalize
  );
  try {
    const sigs = sortSignatures(input, tapLeaf);
    const witness = sigs.concat(tapLeaf.script).concat(tapLeaf.controlBlock);
    return { finalScriptWitness: witnessStackToScriptWitness(witness) };
  } catch (err) {
    throw new Error(`Can not finalize taproot input #${inputIndex}: ${err}`);
  }
}
function serializeTaprootSignature(sig, sighashType) {
  const sighashTypeByte = sighashType ? Buffer.from([sighashType]) : Buffer.from([]);
  return Buffer.concat([sig, sighashTypeByte]);
}
function isTaprootInput(input) {
  return input && !!(input.tapInternalKey || input.tapMerkleRoot || input.tapLeafScript && input.tapLeafScript.length || input.tapBip32Derivation && input.tapBip32Derivation.length || input.witnessUtxo && isP2TR(input.witnessUtxo.script));
}
function isTaprootOutput(output, script) {
  return output && !!(output.tapInternalKey || output.tapTree || output.tapBip32Derivation && output.tapBip32Derivation.length || script && isP2TR(script));
}
function checkTaprootInputFields(inputData, newInputData, action) {
  checkMixedTaprootAndNonTaprootInputFields(inputData, newInputData, action);
  checkIfTapLeafInTree(inputData, newInputData, action);
}
function checkTaprootOutputFields(outputData, newOutputData, action) {
  checkMixedTaprootAndNonTaprootOutputFields(outputData, newOutputData, action);
  checkTaprootScriptPubkey(outputData, newOutputData);
}
function checkTaprootScriptPubkey(outputData, newOutputData) {
  if (!newOutputData.tapTree && !newOutputData.tapInternalKey)
    return;
  const tapInternalKey = newOutputData.tapInternalKey || outputData.tapInternalKey;
  const tapTree = newOutputData.tapTree || outputData.tapTree;
  if (tapInternalKey) {
    const { script: scriptPubkey } = outputData;
    const script = getTaprootScripPubkey(tapInternalKey, tapTree);
    if (scriptPubkey && !scriptPubkey.equals(script))
      throw new Error("Error adding output. Script or address missmatch.");
  }
}
function getTaprootScripPubkey(tapInternalKey, tapTree) {
  const scriptTree = tapTree && tapTreeFromList(tapTree.leaves);
  const { output } = p2tr({
    internalPubkey: tapInternalKey,
    scriptTree
  });
  return output;
}
function tweakInternalPubKey(inputIndex, input) {
  const tapInternalKey = input.tapInternalKey;
  const outputKey = tapInternalKey && tweakKey(tapInternalKey, input.tapMerkleRoot);
  if (!outputKey)
    throw new Error(
      `Cannot tweak tap internal key for input #${inputIndex}. Public key: ${tapInternalKey && tapInternalKey.toString("hex")}`
    );
  return outputKey.x;
}
function tapTreeToList(tree) {
  if (!isTaptree(tree))
    throw new Error(
      "Cannot convert taptree to tapleaf list. Expecting a tapree structure."
    );
  return _tapTreeToList(tree);
}
function tapTreeFromList(leaves = []) {
  if (leaves.length === 1 && leaves[0].depth === 0)
    return {
      output: leaves[0].script,
      version: leaves[0].leafVersion
    };
  return instertLeavesInTree(leaves);
}
function checkTaprootInputForSigs(input, action) {
  const sigs = extractTaprootSigs(input);
  return sigs.some(
    (sig) => signatureBlocksAction(sig, decodeSchnorrSignature, action)
  );
}
function decodeSchnorrSignature(signature2) {
  return {
    signature: signature2.slice(0, 64),
    hashType: signature2.slice(64)[0] || Transaction.SIGHASH_DEFAULT
  };
}
function extractTaprootSigs(input) {
  const sigs = [];
  if (input.tapKeySig)
    sigs.push(input.tapKeySig);
  if (input.tapScriptSig)
    sigs.push(...input.tapScriptSig.map((s) => s.signature));
  if (!sigs.length) {
    const finalTapKeySig = getTapKeySigFromWithness(input.finalScriptWitness);
    if (finalTapKeySig)
      sigs.push(finalTapKeySig);
  }
  return sigs;
}
function getTapKeySigFromWithness(finalScriptWitness) {
  if (!finalScriptWitness)
    return;
  const witness = finalScriptWitness.slice(2);
  if (witness.length === 64 || witness.length === 65)
    return witness;
}
function _tapTreeToList(tree, leaves = [], depth = 0) {
  if (depth > MAX_TAPTREE_DEPTH)
    throw new Error("Max taptree depth exceeded.");
  if (!tree)
    return [];
  if (isTapleaf(tree)) {
    leaves.push({
      depth,
      leafVersion: tree.version || LEAF_VERSION_TAPSCRIPT,
      script: tree.output
    });
    return leaves;
  }
  if (tree[0])
    _tapTreeToList(tree[0], leaves, depth + 1);
  if (tree[1])
    _tapTreeToList(tree[1], leaves, depth + 1);
  return leaves;
}
function instertLeavesInTree(leaves) {
  let tree;
  for (const leaf of leaves) {
    tree = instertLeafInTree(leaf, tree);
    if (!tree)
      throw new Error(`No room left to insert tapleaf in tree`);
  }
  return tree;
}
function instertLeafInTree(leaf, tree, depth = 0) {
  if (depth > MAX_TAPTREE_DEPTH)
    throw new Error("Max taptree depth exceeded.");
  if (leaf.depth === depth) {
    if (!tree)
      return {
        output: leaf.script,
        version: leaf.leafVersion
      };
    return;
  }
  if (isTapleaf(tree))
    return;
  const leftSide = instertLeafInTree(leaf, tree && tree[0], depth + 1);
  if (leftSide)
    return [leftSide, tree && tree[1]];
  const rightSide = instertLeafInTree(leaf, tree && tree[1], depth + 1);
  if (rightSide)
    return [tree && tree[0], rightSide];
}
function checkMixedTaprootAndNonTaprootInputFields(inputData, newInputData, action) {
  const isBadTaprootUpdate = isTaprootInput(inputData) && hasNonTaprootFields(newInputData);
  const isBadNonTaprootUpdate = hasNonTaprootFields(inputData) && isTaprootInput(newInputData);
  const hasMixedFields = inputData === newInputData && isTaprootInput(newInputData) && hasNonTaprootFields(newInputData);
  if (isBadTaprootUpdate || isBadNonTaprootUpdate || hasMixedFields)
    throw new Error(
      `Invalid arguments for Psbt.${action}. Cannot use both taproot and non-taproot fields.`
    );
}
function checkMixedTaprootAndNonTaprootOutputFields(inputData, newInputData, action) {
  const isBadTaprootUpdate = isTaprootOutput(inputData) && hasNonTaprootFields(newInputData);
  const isBadNonTaprootUpdate = hasNonTaprootFields(inputData) && isTaprootOutput(newInputData);
  const hasMixedFields = inputData === newInputData && isTaprootOutput(newInputData) && hasNonTaprootFields(newInputData);
  if (isBadTaprootUpdate || isBadNonTaprootUpdate || hasMixedFields)
    throw new Error(
      `Invalid arguments for Psbt.${action}. Cannot use both taproot and non-taproot fields.`
    );
}
function checkIfTapLeafInTree(inputData, newInputData, action) {
  if (newInputData.tapMerkleRoot) {
    const newLeafsInTree = (newInputData.tapLeafScript || []).every(
      (l) => isTapLeafInTree(l, newInputData.tapMerkleRoot)
    );
    const oldLeafsInTree = (inputData.tapLeafScript || []).every(
      (l) => isTapLeafInTree(l, newInputData.tapMerkleRoot)
    );
    if (!newLeafsInTree || !oldLeafsInTree)
      throw new Error(
        `Invalid arguments for Psbt.${action}. Tapleaf not part of taptree.`
      );
  } else if (inputData.tapMerkleRoot) {
    const newLeafsInTree = (newInputData.tapLeafScript || []).every(
      (l) => isTapLeafInTree(l, inputData.tapMerkleRoot)
    );
    if (!newLeafsInTree)
      throw new Error(
        `Invalid arguments for Psbt.${action}. Tapleaf not part of taptree.`
      );
  }
}
function isTapLeafInTree(tapLeaf, merkleRoot) {
  if (!merkleRoot)
    return true;
  const leafHash = tapleafHash({
    output: tapLeaf.script,
    version: tapLeaf.leafVersion
  });
  const rootHash = rootHashFromPath(tapLeaf.controlBlock, leafHash);
  return rootHash.equals(merkleRoot);
}
function sortSignatures(input, tapLeaf) {
  const leafHash = tapleafHash({
    output: tapLeaf.script,
    version: tapLeaf.leafVersion
  });
  return (input.tapScriptSig || []).filter((tss) => tss.leafHash.equals(leafHash)).map((tss) => addPubkeyPositionInScript(tapLeaf.script, tss)).sort((t1, t2) => t2.positionInScript - t1.positionInScript).map((t) => t.signature);
}
function addPubkeyPositionInScript(script, tss) {
  return Object.assign(
    {
      positionInScript: pubkeyPositionInScript(tss.pubkey, script)
    },
    tss
  );
}
function findTapLeafToFinalize(input, inputIndex, leafHashToFinalize) {
  if (!input.tapScriptSig || !input.tapScriptSig.length)
    throw new Error(
      `Can not finalize taproot input #${inputIndex}. No tapleaf script signature provided.`
    );
  const tapLeaf = (input.tapLeafScript || []).sort((a, b) => a.controlBlock.length - b.controlBlock.length).find(
    (leaf) => canFinalizeLeaf(leaf, input.tapScriptSig, leafHashToFinalize)
  );
  if (!tapLeaf)
    throw new Error(
      `Can not finalize taproot input #${inputIndex}. Signature for tapleaf script not found.`
    );
  return tapLeaf;
}
function canFinalizeLeaf(leaf, tapScriptSig, hash) {
  const leafHash = tapleafHash({
    output: leaf.script,
    version: leaf.leafVersion
  });
  const whiteListedHash = !hash || hash.equals(leafHash);
  return whiteListedHash && tapScriptSig.find((tss) => tss.leafHash.equals(leafHash)) !== void 0;
}
function hasNonTaprootFields(io) {
  return io && !!(io.redeemScript || io.witnessScript || io.bip32Derivation && io.bip32Derivation.length);
}

// ts_src/psbt.ts
var DEFAULT_OPTS = {
  /**
   * A bitcoinjs Network object. This is only used if you pass an `address`
   * parameter to addOutput. Otherwise it is not needed and can be left default.
   */
  network: bitcoin,
  /**
   * When extractTransaction is called, the fee rate is checked.
   * THIS IS NOT TO BE RELIED ON.
   * It is only here as a last ditch effort to prevent sending a 500 BTC fee etc.
   */
  maximumFeeRate: 5e3
  // satoshi per byte
};
var Psbt = class {
  constructor(opts = {}, data = new import_bip174.Psbt(new PsbtTransaction())) {
    this.data = data;
    this.opts = Object.assign({}, DEFAULT_OPTS, opts);
    this.__CACHE = {
      __NON_WITNESS_UTXO_TX_CACHE: [],
      __NON_WITNESS_UTXO_BUF_CACHE: [],
      __TX_IN_CACHE: {},
      __TX: this.data.globalMap.unsignedTx.tx,
      // Psbt's predecesor (TransactionBuilder - now removed) behavior
      // was to not confirm input values  before signing.
      // Even though we highly encourage people to get
      // the full parent transaction to verify values, the ability to
      // sign non-segwit inputs without the full transaction was often
      // requested. So the only way to activate is to use @ts-ignore.
      // We will disable exporting the Psbt when unsafe sign is active.
      // because it is not BIP174 compliant.
      __UNSAFE_SIGN_NONSEGWIT: false
    };
    if (this.data.inputs.length === 0)
      this.setVersion(2);
    const dpew = (obj, attr, enumerable, writable) => Object.defineProperty(obj, attr, {
      enumerable,
      writable
    });
    dpew(this, "__CACHE", false, true);
    dpew(this, "opts", false, true);
  }
  static fromBase64(data, opts = {}) {
    const buffer = Buffer.from(data, "base64");
    return this.fromBuffer(buffer, opts);
  }
  static fromHex(data, opts = {}) {
    const buffer = Buffer.from(data, "hex");
    return this.fromBuffer(buffer, opts);
  }
  static fromBuffer(buffer, opts = {}) {
    const psbtBase = import_bip174.Psbt.fromBuffer(buffer, transactionFromBuffer);
    const psbt = new Psbt(opts, psbtBase);
    checkTxForDupeIns(psbt.__CACHE.__TX, psbt.__CACHE);
    return psbt;
  }
  get inputCount() {
    return this.data.inputs.length;
  }
  get version() {
    return this.__CACHE.__TX.version;
  }
  set version(version) {
    this.setVersion(version);
  }
  get locktime() {
    return this.__CACHE.__TX.locktime;
  }
  set locktime(locktime) {
    this.setLocktime(locktime);
  }
  get txInputs() {
    return this.__CACHE.__TX.ins.map((input) => ({
      hash: cloneBuffer(input.hash),
      index: input.index,
      sequence: input.sequence
    }));
  }
  get txOutputs() {
    return this.__CACHE.__TX.outs.map((output) => {
      let address;
      try {
        address = fromOutputScript(output.script, this.opts.network);
      } catch (_) {
      }
      return {
        script: cloneBuffer(output.script),
        value: output.value,
        address
      };
    });
  }
  combine(...those) {
    this.data.combine(...those.map((o) => o.data));
    return this;
  }
  clone() {
    const res = Psbt.fromBuffer(this.data.toBuffer());
    res.opts = JSON.parse(JSON.stringify(this.opts));
    return res;
  }
  setMaximumFeeRate(satoshiPerByte) {
    check32Bit(satoshiPerByte);
    this.opts.maximumFeeRate = satoshiPerByte;
  }
  setVersion(version) {
    check32Bit(version);
    checkInputsForPartialSig(this.data.inputs, "setVersion");
    const c = this.__CACHE;
    c.__TX.version = version;
    c.__EXTRACTED_TX = void 0;
    return this;
  }
  setLocktime(locktime) {
    check32Bit(locktime);
    checkInputsForPartialSig(this.data.inputs, "setLocktime");
    const c = this.__CACHE;
    c.__TX.locktime = locktime;
    c.__EXTRACTED_TX = void 0;
    return this;
  }
  setInputSequence(inputIndex, sequence) {
    check32Bit(sequence);
    checkInputsForPartialSig(this.data.inputs, "setInputSequence");
    const c = this.__CACHE;
    if (c.__TX.ins.length <= inputIndex) {
      throw new Error("Input index too high");
    }
    c.__TX.ins[inputIndex].sequence = sequence;
    c.__EXTRACTED_TX = void 0;
    return this;
  }
  addInputs(inputDatas) {
    inputDatas.forEach((inputData) => this.addInput(inputData));
    return this;
  }
  addInput(inputData) {
    if (arguments.length > 1 || !inputData || inputData.hash === void 0 || inputData.index === void 0) {
      throw new Error(
        `Invalid arguments for Psbt.addInput. Requires single object with at least [hash] and [index]`
      );
    }
    checkTaprootInputFields(inputData, inputData, "addInput");
    checkInputsForPartialSig(this.data.inputs, "addInput");
    if (inputData.witnessScript)
      checkInvalidP2WSH(inputData.witnessScript);
    const c = this.__CACHE;
    this.data.addInput(inputData);
    const txIn = c.__TX.ins[c.__TX.ins.length - 1];
    checkTxInputCache(c, txIn);
    const inputIndex = this.data.inputs.length - 1;
    const input = this.data.inputs[inputIndex];
    if (input.nonWitnessUtxo) {
      addNonWitnessTxCache(this.__CACHE, input, inputIndex);
    }
    c.__FEE = void 0;
    c.__FEE_RATE = void 0;
    c.__EXTRACTED_TX = void 0;
    return this;
  }
  addOutputs(outputDatas) {
    outputDatas.forEach((outputData) => this.addOutput(outputData));
    return this;
  }
  addOutput(outputData) {
    if (arguments.length > 1 || !outputData || outputData.value === void 0 || outputData.address === void 0 && outputData.script === void 0) {
      throw new Error(
        `Invalid arguments for Psbt.addOutput. Requires single object with at least [script or address] and [value]`
      );
    }
    checkInputsForPartialSig(this.data.inputs, "addOutput");
    const { address } = outputData;
    if (typeof address === "string") {
      const { network } = this.opts;
      const script = toOutputScript(address, network);
      outputData = Object.assign(outputData, { script });
    }
    checkTaprootOutputFields(outputData, outputData, "addOutput");
    const c = this.__CACHE;
    this.data.addOutput(outputData);
    c.__FEE = void 0;
    c.__FEE_RATE = void 0;
    c.__EXTRACTED_TX = void 0;
    return this;
  }
  extractTransaction(disableFeeCheck, disableOutputsMoreThanInputs) {
    if (!this.data.inputs.every(isFinalized))
      throw new Error("Not finalized");
    const c = this.__CACHE;
    if (!disableFeeCheck) {
      checkFees(this, c, this.opts);
    }
    if (c.__EXTRACTED_TX)
      return c.__EXTRACTED_TX;
    const tx = c.__TX.clone();
    inputFinalizeGetAmts(
      this.data.inputs,
      tx,
      c,
      true,
      disableOutputsMoreThanInputs
    );
    return tx;
  }
  getFeeRate() {
    return getTxCacheValue(
      "__FEE_RATE",
      "fee rate",
      this.data.inputs,
      this.__CACHE
    );
  }
  getFee() {
    return getTxCacheValue("__FEE", "fee", this.data.inputs, this.__CACHE);
  }
  finalizeAllInputs() {
    (0, import_utils.checkForInput)(this.data.inputs, 0);
    range(this.data.inputs.length).forEach((idx) => this.finalizeInput(idx));
    return this;
  }
  finalizeInput(inputIndex, finalScriptsFunc) {
    const input = (0, import_utils.checkForInput)(this.data.inputs, inputIndex);
    if (isTaprootInput(input))
      return this._finalizeTaprootInput(
        inputIndex,
        input,
        void 0,
        finalScriptsFunc
      );
    return this._finalizeInput(
      inputIndex,
      input,
      finalScriptsFunc
    );
  }
  finalizeTaprootInput(inputIndex, tapLeafHashToFinalize, finalScriptsFunc = tapScriptFinalizer) {
    const input = (0, import_utils.checkForInput)(this.data.inputs, inputIndex);
    if (isTaprootInput(input))
      return this._finalizeTaprootInput(
        inputIndex,
        input,
        tapLeafHashToFinalize,
        finalScriptsFunc
      );
    throw new Error(`Cannot finalize input #${inputIndex}. Not Taproot.`);
  }
  _finalizeInput(inputIndex, input, finalScriptsFunc = getFinalScripts) {
    const { script, isP2SH, isP2WSH, isSegwit } = getScriptFromInput(
      inputIndex,
      input,
      this.__CACHE
    );
    if (!script)
      throw new Error(`No script found for input #${inputIndex}`);
    checkPartialSigSighashes(input);
    const { finalScriptSig, finalScriptWitness } = finalScriptsFunc(
      inputIndex,
      input,
      script,
      isSegwit,
      isP2SH,
      isP2WSH
    );
    if (finalScriptSig)
      this.data.updateInput(inputIndex, { finalScriptSig });
    if (finalScriptWitness)
      this.data.updateInput(inputIndex, { finalScriptWitness });
    if (!finalScriptSig && !finalScriptWitness)
      throw new Error(`Unknown error finalizing input #${inputIndex}`);
    this.data.clearFinalizedInput(inputIndex);
    return this;
  }
  _finalizeTaprootInput(inputIndex, input, tapLeafHashToFinalize, finalScriptsFunc = tapScriptFinalizer) {
    if (!input.witnessUtxo)
      throw new Error(
        `Cannot finalize input #${inputIndex}. Missing withness utxo.`
      );
    if (input.tapKeySig) {
      const payment = p2tr({
        output: input.witnessUtxo.script,
        signature: input.tapKeySig
      });
      const finalScriptWitness = witnessStackToScriptWitness(payment.witness);
      this.data.updateInput(inputIndex, { finalScriptWitness });
    } else {
      const { finalScriptWitness } = finalScriptsFunc(
        inputIndex,
        input,
        tapLeafHashToFinalize
      );
      this.data.updateInput(inputIndex, { finalScriptWitness });
    }
    this.data.clearFinalizedInput(inputIndex);
    return this;
  }
  getInputType(inputIndex) {
    const input = (0, import_utils.checkForInput)(this.data.inputs, inputIndex);
    const script = getScriptFromUtxo(inputIndex, input, this.__CACHE);
    const result = getMeaningfulScript(
      script,
      inputIndex,
      "input",
      input.redeemScript || redeemFromFinalScriptSig(input.finalScriptSig),
      input.witnessScript || redeemFromFinalWitnessScript(input.finalScriptWitness)
    );
    const type = result.type === "raw" ? "" : result.type + "-";
    const mainType = classifyScript(result.meaningfulScript);
    return type + mainType;
  }
  inputHasPubkey(inputIndex, pubkey) {
    const input = (0, import_utils.checkForInput)(this.data.inputs, inputIndex);
    return pubkeyInInput(pubkey, input, inputIndex, this.__CACHE);
  }
  inputHasHDKey(inputIndex, root) {
    const input = (0, import_utils.checkForInput)(this.data.inputs, inputIndex);
    const derivationIsMine = bip32DerivationIsMine(root);
    return !!input.bip32Derivation && input.bip32Derivation.some(derivationIsMine);
  }
  outputHasPubkey(outputIndex, pubkey) {
    const output = (0, import_utils.checkForOutput)(this.data.outputs, outputIndex);
    return pubkeyInOutput(pubkey, output, outputIndex, this.__CACHE);
  }
  outputHasHDKey(outputIndex, root) {
    const output = (0, import_utils.checkForOutput)(this.data.outputs, outputIndex);
    const derivationIsMine = bip32DerivationIsMine(root);
    return !!output.bip32Derivation && output.bip32Derivation.some(derivationIsMine);
  }
  validateSignaturesOfAllInputs(validator) {
    (0, import_utils.checkForInput)(this.data.inputs, 0);
    const results = range(this.data.inputs.length).map(
      (idx) => this.validateSignaturesOfInput(idx, validator)
    );
    return results.reduce((final, res) => res === true && final, true);
  }
  validateSignaturesOfInput(inputIndex, validator, pubkey) {
    const input = this.data.inputs[inputIndex];
    if (isTaprootInput(input))
      return this.validateSignaturesOfTaprootInput(
        inputIndex,
        validator,
        pubkey
      );
    return this._validateSignaturesOfInput(inputIndex, validator, pubkey);
  }
  _validateSignaturesOfInput(inputIndex, validator, pubkey) {
    const input = this.data.inputs[inputIndex];
    const partialSig = (input || {}).partialSig;
    if (!input || !partialSig || partialSig.length < 1)
      throw new Error("No signatures to validate");
    if (typeof validator !== "function")
      throw new Error("Need validator function to validate signatures");
    const mySigs = pubkey ? partialSig.filter((sig) => sig.pubkey.equals(pubkey)) : partialSig;
    if (mySigs.length < 1)
      throw new Error("No signatures for this pubkey");
    const results = [];
    let hashCache;
    let scriptCache;
    let sighashCache;
    for (const pSig of mySigs) {
      const sig = signature.decode(pSig.signature);
      const { hash, script } = sighashCache !== sig.hashType ? getHashForSig(
        inputIndex,
        Object.assign({}, input, { sighashType: sig.hashType }),
        this.__CACHE,
        true
      ) : { hash: hashCache, script: scriptCache };
      sighashCache = sig.hashType;
      hashCache = hash;
      scriptCache = script;
      checkScriptForPubkey(pSig.pubkey, script, "verify");
      results.push(validator(pSig.pubkey, hash, sig.signature));
    }
    return results.every((res) => res === true);
  }
  validateSignaturesOfTaprootInput(inputIndex, validator, pubkey) {
    const input = this.data.inputs[inputIndex];
    const tapKeySig = (input || {}).tapKeySig;
    const tapScriptSig = (input || {}).tapScriptSig;
    if (!input && !tapKeySig && !(tapScriptSig && !tapScriptSig.length))
      throw new Error("No signatures to validate");
    if (typeof validator !== "function")
      throw new Error("Need validator function to validate signatures");
    pubkey = pubkey && toXOnly(pubkey);
    const allHashses = pubkey ? getTaprootHashesForSig(
      inputIndex,
      input,
      this.data.inputs,
      pubkey,
      this.__CACHE
    ) : getAllTaprootHashesForSig(
      inputIndex,
      input,
      this.data.inputs,
      this.__CACHE
    );
    if (!allHashses.length)
      throw new Error("No signatures for this pubkey");
    const tapKeyHash = allHashses.find((h2) => !!h2.leafHash);
    if (tapKeySig && tapKeyHash) {
      const isValidTapkeySig = validator(
        tapKeyHash.pubkey,
        tapKeyHash.hash,
        tapKeySig
      );
      if (!isValidTapkeySig)
        return false;
    }
    if (tapScriptSig) {
      for (const tapSig of tapScriptSig) {
        const tapSigHash = allHashses.find((h2) => tapSig.pubkey.equals(h2.pubkey));
        if (tapSigHash) {
          const isValidTapScriptSig = validator(
            tapSig.pubkey,
            tapSigHash.hash,
            tapSig.signature
          );
          if (!isValidTapScriptSig)
            return false;
        }
      }
    }
    return true;
  }
  signAllInputsHD(hdKeyPair, sighashTypes = [Transaction.SIGHASH_ALL]) {
    if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
      throw new Error("Need HDSigner to sign input");
    }
    const results = [];
    for (const i of range(this.data.inputs.length)) {
      try {
        this.signInputHD(i, hdKeyPair, sighashTypes);
        results.push(true);
      } catch (err) {
        results.push(false);
      }
    }
    if (results.every((v) => v === false)) {
      throw new Error("No inputs were signed");
    }
    return this;
  }
  signAllInputsHDAsync(hdKeyPair, sighashTypes = [Transaction.SIGHASH_ALL]) {
    return new Promise((resolve, reject) => {
      if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
        return reject(new Error("Need HDSigner to sign input"));
      }
      const results = [];
      const promises = [];
      for (const i of range(this.data.inputs.length)) {
        promises.push(
          this.signInputHDAsync(i, hdKeyPair, sighashTypes).then(
            () => {
              results.push(true);
            },
            () => {
              results.push(false);
            }
          )
        );
      }
      return Promise.all(promises).then(() => {
        if (results.every((v) => v === false)) {
          return reject(new Error("No inputs were signed"));
        }
        resolve();
      });
    });
  }
  signInputHD(inputIndex, hdKeyPair, sighashTypes = [Transaction.SIGHASH_ALL]) {
    if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
      throw new Error("Need HDSigner to sign input");
    }
    const signers = getSignersFromHD(
      inputIndex,
      this.data.inputs,
      hdKeyPair
    );
    signers.forEach((signer) => this.signInput(inputIndex, signer, sighashTypes));
    return this;
  }
  signInputHDAsync(inputIndex, hdKeyPair, sighashTypes = [Transaction.SIGHASH_ALL]) {
    return new Promise((resolve, reject) => {
      if (!hdKeyPair || !hdKeyPair.publicKey || !hdKeyPair.fingerprint) {
        return reject(new Error("Need HDSigner to sign input"));
      }
      const signers = getSignersFromHD(inputIndex, this.data.inputs, hdKeyPair);
      const promises = signers.map(
        (signer) => this.signInputAsync(inputIndex, signer, sighashTypes)
      );
      return Promise.all(promises).then(() => {
        resolve();
      }).catch(reject);
    });
  }
  signAllInputs(keyPair, sighashTypes) {
    if (!keyPair || !keyPair.publicKey)
      throw new Error("Need Signer to sign input");
    const results = [];
    for (const i of range(this.data.inputs.length)) {
      try {
        this.signInput(i, keyPair, sighashTypes);
        results.push(true);
      } catch (err) {
        results.push(false);
      }
    }
    if (results.every((v) => v === false)) {
      throw new Error("No inputs were signed");
    }
    return this;
  }
  signAllInputsAsync(keyPair, sighashTypes) {
    return new Promise((resolve, reject) => {
      if (!keyPair || !keyPair.publicKey)
        return reject(new Error("Need Signer to sign input"));
      const results = [];
      const promises = [];
      for (const [i] of this.data.inputs.entries()) {
        promises.push(
          this.signInputAsync(i, keyPair, sighashTypes).then(
            () => {
              results.push(true);
            },
            () => {
              results.push(false);
            }
          )
        );
      }
      return Promise.all(promises).then(() => {
        if (results.every((v) => v === false)) {
          return reject(new Error("No inputs were signed"));
        }
        resolve();
      });
    });
  }
  signInput(inputIndex, keyPair, sighashTypes) {
    if (!keyPair || !keyPair.publicKey)
      throw new Error("Need Signer to sign input");
    const input = (0, import_utils.checkForInput)(this.data.inputs, inputIndex);
    if (isTaprootInput(input)) {
      return this._signTaprootInput(
        inputIndex,
        input,
        keyPair,
        void 0,
        sighashTypes
      );
    }
    return this._signInput(inputIndex, keyPair, sighashTypes);
  }
  signTaprootInput(inputIndex, keyPair, tapLeafHashToSign, sighashTypes) {
    if (!keyPair || !keyPair.publicKey)
      throw new Error("Need Signer to sign input");
    const input = (0, import_utils.checkForInput)(this.data.inputs, inputIndex);
    if (isTaprootInput(input))
      return this._signTaprootInput(
        inputIndex,
        input,
        keyPair,
        tapLeafHashToSign,
        sighashTypes
      );
    throw new Error(`Input #${inputIndex} is not of type Taproot.`);
  }
  _signInput(inputIndex, keyPair, sighashTypes = [Transaction.SIGHASH_ALL]) {
    const { hash, sighashType } = getHashAndSighashType(
      this.data.inputs,
      inputIndex,
      keyPair.publicKey,
      this.__CACHE,
      sighashTypes
    );
    const partialSig = [
      {
        pubkey: keyPair.publicKey,
        signature: signature.encode(keyPair.sign(hash), sighashType)
      }
    ];
    this.data.updateInput(inputIndex, { partialSig });
    return this;
  }
  _signTaprootInput(inputIndex, input, keyPair, tapLeafHashToSign, allowedSighashTypes = [Transaction.SIGHASH_DEFAULT]) {
    const hashesForSig = this.checkTaprootHashesForSig(
      inputIndex,
      input,
      keyPair,
      tapLeafHashToSign,
      allowedSighashTypes
    );
    const tapKeySig = hashesForSig.filter((h2) => !h2.leafHash).map(
      (h2) => serializeTaprootSignature(
        keyPair.signSchnorr(h2.hash),
        input.sighashType
      )
    )[0];
    const tapScriptSig = hashesForSig.filter((h2) => !!h2.leafHash).map(
      (h2) => ({
        pubkey: toXOnly(keyPair.publicKey),
        signature: serializeTaprootSignature(
          keyPair.signSchnorr(h2.hash),
          input.sighashType
        ),
        leafHash: h2.leafHash
      })
    );
    if (tapKeySig) {
      this.data.updateInput(inputIndex, { tapKeySig });
    }
    if (tapScriptSig.length) {
      this.data.updateInput(inputIndex, { tapScriptSig });
    }
    return this;
  }
  signInputAsync(inputIndex, keyPair, sighashTypes) {
    return Promise.resolve().then(() => {
      if (!keyPair || !keyPair.publicKey)
        throw new Error("Need Signer to sign input");
      const input = (0, import_utils.checkForInput)(this.data.inputs, inputIndex);
      if (isTaprootInput(input))
        return this._signTaprootInputAsync(
          inputIndex,
          input,
          keyPair,
          void 0,
          sighashTypes
        );
      return this._signInputAsync(inputIndex, keyPair, sighashTypes);
    });
  }
  signTaprootInputAsync(inputIndex, keyPair, tapLeafHash, sighashTypes) {
    return Promise.resolve().then(() => {
      if (!keyPair || !keyPair.publicKey)
        throw new Error("Need Signer to sign input");
      const input = (0, import_utils.checkForInput)(this.data.inputs, inputIndex);
      if (isTaprootInput(input))
        return this._signTaprootInputAsync(
          inputIndex,
          input,
          keyPair,
          tapLeafHash,
          sighashTypes
        );
      throw new Error(`Input #${inputIndex} is not of type Taproot.`);
    });
  }
  _signInputAsync(inputIndex, keyPair, sighashTypes = [Transaction.SIGHASH_ALL]) {
    const { hash, sighashType } = getHashAndSighashType(
      this.data.inputs,
      inputIndex,
      keyPair.publicKey,
      this.__CACHE,
      sighashTypes
    );
    return Promise.resolve(keyPair.sign(hash)).then((signature2) => {
      const partialSig = [
        {
          pubkey: keyPair.publicKey,
          signature: signature.encode(signature2, sighashType)
        }
      ];
      this.data.updateInput(inputIndex, { partialSig });
    });
  }
  async _signTaprootInputAsync(inputIndex, input, keyPair, tapLeafHash, sighashTypes = [Transaction.SIGHASH_DEFAULT]) {
    const hashesForSig = this.checkTaprootHashesForSig(
      inputIndex,
      input,
      keyPair,
      tapLeafHash,
      sighashTypes
    );
    const signaturePromises = [];
    const tapKeyHash = hashesForSig.filter((h2) => !h2.leafHash)[0];
    if (tapKeyHash) {
      const tapKeySigPromise = Promise.resolve(
        keyPair.signSchnorr(tapKeyHash.hash)
      ).then((sig) => {
        return { tapKeySig: serializeTaprootSignature(sig, input.sighashType) };
      });
      signaturePromises.push(tapKeySigPromise);
    }
    const tapScriptHashes = hashesForSig.filter((h2) => !!h2.leafHash);
    if (tapScriptHashes.length) {
      const tapScriptSigPromises = tapScriptHashes.map((tsh) => {
        return Promise.resolve(keyPair.signSchnorr(tsh.hash)).then(
          (signature2) => {
            const tapScriptSig = [
              {
                pubkey: toXOnly(keyPair.publicKey),
                signature: serializeTaprootSignature(
                  signature2,
                  input.sighashType
                ),
                leafHash: tsh.leafHash
              }
            ];
            return { tapScriptSig };
          }
        );
      });
      signaturePromises.push(...tapScriptSigPromises);
    }
    return Promise.all(signaturePromises).then((results) => {
      results.forEach((v) => this.data.updateInput(inputIndex, v));
    });
  }
  checkTaprootHashesForSig(inputIndex, input, keyPair, tapLeafHashToSign, allowedSighashTypes) {
    if (typeof keyPair.signSchnorr !== "function")
      throw new Error(
        `Need Schnorr Signer to sign taproot input #${inputIndex}.`
      );
    const hashesForSig = getTaprootHashesForSig(
      inputIndex,
      input,
      this.data.inputs,
      keyPair.publicKey,
      this.__CACHE,
      tapLeafHashToSign,
      allowedSighashTypes
    );
    if (!hashesForSig || !hashesForSig.length)
      throw new Error(
        `Can not sign for input #${inputIndex} with the key ${keyPair.publicKey.toString(
          "hex"
        )}`
      );
    return hashesForSig;
  }
  toBuffer() {
    checkCache(this.__CACHE);
    return this.data.toBuffer();
  }
  toHex() {
    checkCache(this.__CACHE);
    return this.data.toHex();
  }
  toBase64() {
    checkCache(this.__CACHE);
    return this.data.toBase64();
  }
  updateGlobal(updateData) {
    this.data.updateGlobal(updateData);
    return this;
  }
  updateInput(inputIndex, updateData) {
    if (updateData.witnessScript)
      checkInvalidP2WSH(updateData.witnessScript);
    checkTaprootInputFields(
      this.data.inputs[inputIndex],
      updateData,
      "updateInput"
    );
    this.data.updateInput(inputIndex, updateData);
    if (updateData.nonWitnessUtxo) {
      addNonWitnessTxCache(
        this.__CACHE,
        this.data.inputs[inputIndex],
        inputIndex
      );
    }
    return this;
  }
  updateOutput(outputIndex, updateData) {
    const outputData = this.data.outputs[outputIndex];
    checkTaprootOutputFields(outputData, updateData, "updateOutput");
    this.data.updateOutput(outputIndex, updateData);
    return this;
  }
  addUnknownKeyValToGlobal(keyVal) {
    this.data.addUnknownKeyValToGlobal(keyVal);
    return this;
  }
  addUnknownKeyValToInput(inputIndex, keyVal) {
    this.data.addUnknownKeyValToInput(inputIndex, keyVal);
    return this;
  }
  addUnknownKeyValToOutput(outputIndex, keyVal) {
    this.data.addUnknownKeyValToOutput(outputIndex, keyVal);
    return this;
  }
  clearFinalizedInput(inputIndex) {
    this.data.clearFinalizedInput(inputIndex);
    return this;
  }
};
var transactionFromBuffer = (buffer) => new PsbtTransaction(buffer);
var PsbtTransaction = class {
  constructor(buffer = Buffer.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0])) {
    this.tx = Transaction.fromBuffer(buffer);
    checkTxEmpty(this.tx);
    Object.defineProperty(this, "tx", {
      enumerable: false,
      writable: true
    });
  }
  getInputOutputCounts() {
    return {
      inputCount: this.tx.ins.length,
      outputCount: this.tx.outs.length
    };
  }
  addInput(input) {
    if (input.hash === void 0 || input.index === void 0 || !Buffer.isBuffer(input.hash) && typeof input.hash !== "string" || typeof input.index !== "number") {
      throw new Error("Error adding input.");
    }
    const hash = typeof input.hash === "string" ? reverseBuffer(Buffer.from(input.hash, "hex")) : input.hash;
    this.tx.addInput(hash, input.index, input.sequence);
  }
  addOutput(output) {
    if (output.script === void 0 || output.value === void 0 || !Buffer.isBuffer(output.script) || typeof output.value !== "number") {
      throw new Error("Error adding output.");
    }
    this.tx.addOutput(output.script, output.value);
  }
  toBuffer() {
    return this.tx.toBuffer();
  }
};
function canFinalize(input, script, scriptType) {
  switch (scriptType) {
    case "pubkey":
    case "pubkeyhash":
    case "witnesspubkeyhash":
      return hasSigs(1, input.partialSig);
    case "multisig":
      const p2ms2 = p2ms({ output: script });
      return hasSigs(p2ms2.m, input.partialSig, p2ms2.pubkeys);
    default:
      return false;
  }
}
function checkCache(cache) {
  if (cache.__UNSAFE_SIGN_NONSEGWIT !== false) {
    throw new Error("Not BIP174 compliant, can not export");
  }
}
function hasSigs(neededSigs, partialSig, pubkeys) {
  if (!partialSig)
    return false;
  let sigs;
  if (pubkeys) {
    sigs = pubkeys.map((pkey) => {
      const pubkey = compressPubkey(pkey);
      return partialSig.find((pSig) => pSig.pubkey.equals(pubkey));
    }).filter((v) => !!v);
  } else {
    sigs = partialSig;
  }
  if (sigs.length > neededSigs)
    throw new Error("Too many signatures");
  return sigs.length === neededSigs;
}
function isFinalized(input) {
  return !!input.finalScriptSig || !!input.finalScriptWitness;
}
function bip32DerivationIsMine(root) {
  return (d) => {
    if (!d.masterFingerprint.equals(root.fingerprint))
      return false;
    if (!root.derivePath(d.path).publicKey.equals(d.pubkey))
      return false;
    return true;
  };
}
function check32Bit(num) {
  if (typeof num !== "number" || num !== Math.floor(num) || num > 4294967295 || num < 0) {
    throw new Error("Invalid 32 bit integer");
  }
}
function checkFees(psbt, cache, opts) {
  const feeRate = cache.__FEE_RATE || psbt.getFeeRate();
  const vsize = cache.__EXTRACTED_TX.virtualSize();
  const satoshis = feeRate * vsize;
  if (feeRate >= opts.maximumFeeRate) {
    throw new Error(
      `Warning: You are paying around ${(satoshis / 1e8).toFixed(8)} in fees, which is ${feeRate} satoshi per byte for a transaction with a VSize of ${vsize} bytes (segwit counted as 0.25 byte per byte). Use setMaximumFeeRate method to raise your threshold, or pass true to the first arg of extractTransaction.`
    );
  }
}
function checkInputsForPartialSig(inputs, action) {
  inputs.forEach((input) => {
    const throws = isTaprootInput(input) ? checkTaprootInputForSigs(input, action) : checkInputForSig(input, action);
    if (throws)
      throw new Error("Can not modify transaction, signatures exist.");
  });
}
function checkPartialSigSighashes(input) {
  if (!input.sighashType || !input.partialSig)
    return;
  const { partialSig, sighashType } = input;
  partialSig.forEach((pSig) => {
    const { hashType } = signature.decode(pSig.signature);
    if (sighashType !== hashType) {
      throw new Error("Signature sighash does not match input sighash type");
    }
  });
}
function checkScriptForPubkey(pubkey, script, action) {
  if (!pubkeyInScript(pubkey, script)) {
    throw new Error(
      `Can not ${action} for this input with the key ${pubkey.toString("hex")}`
    );
  }
}
function checkTxEmpty(tx) {
  const isEmpty = tx.ins.every(
    (input) => input.script && input.script.length === 0 && input.witness && input.witness.length === 0
  );
  if (!isEmpty) {
    throw new Error("Format Error: Transaction ScriptSigs are not empty");
  }
}
function checkTxForDupeIns(tx, cache) {
  tx.ins.forEach((input) => {
    checkTxInputCache(cache, input);
  });
}
function checkTxInputCache(cache, input) {
  const key = reverseBuffer(Buffer.from(input.hash)).toString("hex") + ":" + input.index;
  if (cache.__TX_IN_CACHE[key])
    throw new Error("Duplicate input detected.");
  cache.__TX_IN_CACHE[key] = 1;
}
function scriptCheckerFactory(payment, paymentScriptName) {
  return (inputIndex, scriptPubKey, redeemScript, ioType) => {
    const redeemScriptOutput = payment({
      redeem: { output: redeemScript }
    }).output;
    if (!scriptPubKey.equals(redeemScriptOutput)) {
      throw new Error(
        `${paymentScriptName} for ${ioType} #${inputIndex} doesn't match the scriptPubKey in the prevout`
      );
    }
  };
}
var checkRedeemScript = scriptCheckerFactory(p2sh, "Redeem script");
var checkWitnessScript = scriptCheckerFactory(
  p2wsh,
  "Witness script"
);
function getTxCacheValue(key, name, inputs, c) {
  if (!inputs.every(isFinalized))
    throw new Error(`PSBT must be finalized to calculate ${name}`);
  if (key === "__FEE_RATE" && c.__FEE_RATE)
    return c.__FEE_RATE;
  if (key === "__FEE" && c.__FEE)
    return c.__FEE;
  let tx;
  let mustFinalize = true;
  if (c.__EXTRACTED_TX) {
    tx = c.__EXTRACTED_TX;
    mustFinalize = false;
  } else {
    tx = c.__TX.clone();
  }
  inputFinalizeGetAmts(inputs, tx, c, mustFinalize);
  if (key === "__FEE_RATE")
    return c.__FEE_RATE;
  else if (key === "__FEE")
    return c.__FEE;
}
function getFinalScripts(inputIndex, input, script, isSegwit, isP2SH, isP2WSH) {
  const scriptType = classifyScript(script);
  if (!canFinalize(input, script, scriptType))
    throw new Error(`Can not finalize input #${inputIndex}`);
  return prepareFinalScripts(
    script,
    scriptType,
    input.partialSig,
    isSegwit,
    isP2SH,
    isP2WSH
  );
}
function prepareFinalScripts(script, scriptType, partialSig, isSegwit, isP2SH, isP2WSH) {
  let finalScriptSig;
  let finalScriptWitness;
  const payment = getPayment(script, scriptType, partialSig);
  const p2wsh2 = !isP2WSH ? null : p2wsh({ redeem: payment });
  const p2sh2 = !isP2SH ? null : p2sh({ redeem: p2wsh2 || payment });
  if (isSegwit) {
    if (p2wsh2) {
      finalScriptWitness = witnessStackToScriptWitness(p2wsh2.witness);
    } else {
      finalScriptWitness = witnessStackToScriptWitness(payment.witness);
    }
    if (p2sh2) {
      finalScriptSig = p2sh2.input;
    }
  } else {
    if (p2sh2) {
      finalScriptSig = p2sh2.input;
    } else {
      finalScriptSig = payment.input;
    }
  }
  return {
    finalScriptSig,
    finalScriptWitness
  };
}
function getHashAndSighashType(inputs, inputIndex, pubkey, cache, sighashTypes) {
  const input = (0, import_utils.checkForInput)(inputs, inputIndex);
  const { hash, sighashType, script } = getHashForSig(
    inputIndex,
    input,
    cache,
    false,
    sighashTypes
  );
  checkScriptForPubkey(pubkey, script, "sign");
  return {
    hash,
    sighashType
  };
}
function getHashForSig(inputIndex, input, cache, forValidate, sighashTypes) {
  const unsignedTx = cache.__TX;
  const sighashType = input.sighashType || Transaction.SIGHASH_ALL;
  checkSighashTypeAllowed(sighashType, sighashTypes);
  let hash;
  let prevout;
  if (input.nonWitnessUtxo) {
    const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
      cache,
      input,
      inputIndex
    );
    const prevoutHash = unsignedTx.ins[inputIndex].hash;
    const utxoHash = nonWitnessUtxoTx.getHash();
    if (!prevoutHash.equals(utxoHash)) {
      throw new Error(
        `Non-witness UTXO hash for input #${inputIndex} doesn't match the hash specified in the prevout`
      );
    }
    const prevoutIndex = unsignedTx.ins[inputIndex].index;
    prevout = nonWitnessUtxoTx.outs[prevoutIndex];
  } else if (input.witnessUtxo) {
    prevout = input.witnessUtxo;
  } else {
    throw new Error("Need a Utxo input item for signing");
  }
  const { meaningfulScript, type } = getMeaningfulScript(
    prevout.script,
    inputIndex,
    "input",
    input.redeemScript,
    input.witnessScript
  );
  if (["p2sh-p2wsh", "p2wsh"].indexOf(type) >= 0) {
    hash = unsignedTx.hashForWitnessV0(
      inputIndex,
      meaningfulScript,
      prevout.value,
      sighashType
    );
  } else if (isP2WPKH(meaningfulScript)) {
    const signingScript = p2pkh({ hash: meaningfulScript.slice(2) }).output;
    hash = unsignedTx.hashForWitnessV0(
      inputIndex,
      signingScript,
      prevout.value,
      sighashType
    );
  } else {
    if (input.nonWitnessUtxo === void 0 && cache.__UNSAFE_SIGN_NONSEGWIT === false)
      throw new Error(
        `Input #${inputIndex} has witnessUtxo but non-segwit script: ${meaningfulScript.toString("hex")}`
      );
    if (!forValidate && cache.__UNSAFE_SIGN_NONSEGWIT !== false)
      console.warn(
        "Warning: Signing non-segwit inputs without the full parent transaction means there is a chance that a miner could feed you incorrect information to trick you into paying large fees. This behavior is the same as Psbt's predecesor (TransactionBuilder - now removed) when signing non-segwit scripts. You are not able to export this Psbt with toBuffer|toBase64|toHex since it is not BIP174 compliant.\n*********************\nPROCEED WITH CAUTION!\n*********************"
      );
    hash = unsignedTx.hashForSignature(
      inputIndex,
      meaningfulScript,
      sighashType
    );
  }
  return {
    script: meaningfulScript,
    sighashType,
    hash
  };
}
function getAllTaprootHashesForSig(inputIndex, input, inputs, cache) {
  const allPublicKeys = [];
  if (input.tapInternalKey) {
    const outputKey = tweakInternalPubKey(inputIndex, input);
    allPublicKeys.push(outputKey);
  }
  if (input.tapScriptSig) {
    const tapScriptPubkeys = input.tapScriptSig.map((tss) => tss.pubkey);
    allPublicKeys.push(...tapScriptPubkeys);
  }
  const allHashes = allPublicKeys.map(
    (pubicKey) => getTaprootHashesForSig(inputIndex, input, inputs, pubicKey, cache)
  );
  return allHashes.flat();
}
function getTaprootHashesForSigCustom(inputIndex, input, inputs, pubkey, cache, tapLeafHashToSign, allowedSighashTypes) {
  const unsignedTx = cache.__TX;
  const sighashType = input.sighashType || Transaction.SIGHASH_DEFAULT;
  checkSighashTypeAllowed(sighashType, allowedSighashTypes);
  const prevOuts = inputs.map(
    (i, index) => getScriptAndAmountFromUtxo(index, i, cache)
  );
  const signingScripts = prevOuts.map((o) => o.script);
  const values = prevOuts.map((o) => o.value);
  const hashes = [];
  const tapKeyHash = unsignedTx.hashForWitnessV1(
    inputIndex,
    signingScripts,
    values,
    sighashType
  );
  hashes.push({ pubkey, hash: tapKeyHash });
  if (input.tapInternalKey && !tapLeafHashToSign) {
    const outputKey = tweakInternalPubKey(inputIndex, input);
    if (toXOnly(pubkey).equals(outputKey)) {
      const tapKeyHash2 = unsignedTx.hashForWitnessV1(
        inputIndex,
        signingScripts,
        values,
        sighashType
      );
      hashes.push({ pubkey, hash: tapKeyHash2 });
    }
  }
  const tapLeafHashes = (input.tapLeafScript || []).filter((tapLeaf) => pubkeyInScript(pubkey, tapLeaf.script)).map((tapLeaf) => {
    const hash = tapleafHash({
      output: tapLeaf.script,
      version: tapLeaf.leafVersion
    });
    return Object.assign({ hash }, tapLeaf);
  }).filter(
    (tapLeaf) => !tapLeafHashToSign || tapLeafHashToSign.equals(tapLeaf.hash)
  ).map((tapLeaf) => {
    const tapScriptHash = unsignedTx.hashForWitnessV1(
      inputIndex,
      signingScripts,
      values,
      Transaction.SIGHASH_DEFAULT,
      tapLeaf.hash
    );
    return {
      pubkey,
      hash: tapScriptHash,
      leafHash: tapLeaf.hash
    };
  });
  return hashes.concat(tapLeafHashes);
}
function getTaprootHashesForSig(inputIndex, input, inputs, pubkey, cache, tapLeafHashToSign, allowedSighashTypes) {
  const unsignedTx = cache.__TX;
  const sighashType = input.sighashType || Transaction.SIGHASH_DEFAULT;
  checkSighashTypeAllowed(sighashType, allowedSighashTypes);
  const prevOuts = inputs.map(
    (i, index) => getScriptAndAmountFromUtxo(index, i, cache)
  );
  const signingScripts = prevOuts.map((o) => o.script);
  const values = prevOuts.map((o) => o.value);
  const hashes = [];
  if (input.tapInternalKey && !tapLeafHashToSign) {
    const outputKey = tweakInternalPubKey(inputIndex, input);
    if (toXOnly(pubkey).equals(outputKey)) {
      const tapKeyHash = unsignedTx.hashForWitnessV1(
        inputIndex,
        signingScripts,
        values,
        sighashType
      );
      hashes.push({ pubkey, hash: tapKeyHash });
    }
  }
  const tapLeafHashes = (input.tapLeafScript || []).filter((tapLeaf) => pubkeyInScript(pubkey, tapLeaf.script)).map((tapLeaf) => {
    const hash = tapleafHash({
      output: tapLeaf.script,
      version: tapLeaf.leafVersion
    });
    return Object.assign({ hash }, tapLeaf);
  }).filter(
    (tapLeaf) => !tapLeafHashToSign || tapLeafHashToSign.equals(tapLeaf.hash)
  ).map((tapLeaf) => {
    const tapScriptHash = unsignedTx.hashForWitnessV1(
      inputIndex,
      signingScripts,
      values,
      Transaction.SIGHASH_DEFAULT,
      tapLeaf.hash
    );
    return {
      pubkey,
      hash: tapScriptHash,
      leafHash: tapLeaf.hash
    };
  });
  return hashes.concat(tapLeafHashes);
}
function checkSighashTypeAllowed(sighashType, sighashTypes) {
  if (sighashTypes && sighashTypes.indexOf(sighashType) < 0) {
    const str = sighashTypeToString(sighashType);
    throw new Error(
      `Sighash type is not allowed. Retry the sign method passing the sighashTypes array of whitelisted types. Sighash type: ${str}`
    );
  }
}
function getPayment(script, scriptType, partialSig) {
  let payment;
  switch (scriptType) {
    case "multisig":
      const sigs = getSortedSigs(script, partialSig);
      payment = p2ms({
        output: script,
        signatures: sigs
      });
      break;
    case "pubkey":
      payment = p2pk({
        output: script,
        signature: partialSig[0].signature
      });
      break;
    case "pubkeyhash":
      payment = p2pkh({
        output: script,
        pubkey: partialSig[0].pubkey,
        signature: partialSig[0].signature
      });
      break;
    case "witnesspubkeyhash":
      payment = p2wpkh({
        output: script,
        pubkey: partialSig[0].pubkey,
        signature: partialSig[0].signature
      });
      break;
  }
  return payment;
}
function getScriptFromInput(inputIndex, input, cache) {
  const unsignedTx = cache.__TX;
  const res = {
    script: null,
    isSegwit: false,
    isP2SH: false,
    isP2WSH: false
  };
  res.isP2SH = !!input.redeemScript;
  res.isP2WSH = !!input.witnessScript;
  if (input.witnessScript) {
    res.script = input.witnessScript;
  } else if (input.redeemScript) {
    res.script = input.redeemScript;
  } else {
    if (input.nonWitnessUtxo) {
      const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
        cache,
        input,
        inputIndex
      );
      const prevoutIndex = unsignedTx.ins[inputIndex].index;
      res.script = nonWitnessUtxoTx.outs[prevoutIndex].script;
    } else if (input.witnessUtxo) {
      res.script = input.witnessUtxo.script;
    }
  }
  if (input.witnessScript || isP2WPKH(res.script)) {
    res.isSegwit = true;
  }
  return res;
}
function getSignersFromHD(inputIndex, inputs, hdKeyPair) {
  const input = (0, import_utils.checkForInput)(inputs, inputIndex);
  if (!input.bip32Derivation || input.bip32Derivation.length === 0) {
    throw new Error("Need bip32Derivation to sign with HD");
  }
  const myDerivations = input.bip32Derivation.map((bipDv) => {
    if (bipDv.masterFingerprint.equals(hdKeyPair.fingerprint)) {
      return bipDv;
    } else {
      return;
    }
  }).filter((v) => !!v);
  if (myDerivations.length === 0) {
    throw new Error(
      "Need one bip32Derivation masterFingerprint to match the HDSigner fingerprint"
    );
  }
  const signers = myDerivations.map((bipDv) => {
    const node = hdKeyPair.derivePath(bipDv.path);
    if (!bipDv.pubkey.equals(node.publicKey)) {
      throw new Error("pubkey did not match bip32Derivation");
    }
    return node;
  });
  return signers;
}
function getSortedSigs(script, partialSig) {
  const p2ms2 = p2ms({ output: script });
  return p2ms2.pubkeys.map((pk) => {
    return (partialSig.filter((ps) => {
      return ps.pubkey.equals(pk);
    })[0] || {}).signature;
  }).filter((v) => !!v);
}
function scriptWitnessToWitnessStack(buffer) {
  let offset = 0;
  function readSlice(n) {
    offset += n;
    return buffer.slice(offset - n, offset);
  }
  function readVarInt() {
    const vi = varuint3.decode(buffer, offset);
    offset += varuint3.decode.bytes;
    return vi;
  }
  function readVarSlice() {
    return readSlice(readVarInt());
  }
  function readVector() {
    const count = readVarInt();
    const vector = [];
    for (let i = 0; i < count; i++)
      vector.push(readVarSlice());
    return vector;
  }
  return readVector();
}
function sighashTypeToString(sighashType) {
  let text = sighashType & Transaction.SIGHASH_ANYONECANPAY ? "SIGHASH_ANYONECANPAY | " : "";
  const sigMod = sighashType & 31;
  switch (sigMod) {
    case Transaction.SIGHASH_ALL:
      text += "SIGHASH_ALL";
      break;
    case Transaction.SIGHASH_SINGLE:
      text += "SIGHASH_SINGLE";
      break;
    case Transaction.SIGHASH_NONE:
      text += "SIGHASH_NONE";
      break;
  }
  return text;
}
function addNonWitnessTxCache(cache, input, inputIndex) {
  cache.__NON_WITNESS_UTXO_BUF_CACHE[inputIndex] = input.nonWitnessUtxo;
  const tx = Transaction.fromBuffer(input.nonWitnessUtxo);
  cache.__NON_WITNESS_UTXO_TX_CACHE[inputIndex] = tx;
  const self = cache;
  const selfIndex = inputIndex;
  delete input.nonWitnessUtxo;
  Object.defineProperty(input, "nonWitnessUtxo", {
    enumerable: true,
    get() {
      const buf = self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex];
      const txCache = self.__NON_WITNESS_UTXO_TX_CACHE[selfIndex];
      if (buf !== void 0) {
        return buf;
      } else {
        const newBuf = txCache.toBuffer();
        self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = newBuf;
        return newBuf;
      }
    },
    set(data) {
      self.__NON_WITNESS_UTXO_BUF_CACHE[selfIndex] = data;
    }
  });
}
function inputFinalizeGetAmts(inputs, tx, cache, mustFinalize, disableOutputsMoreThanInputs) {
  let inputAmount = 0;
  inputs.forEach((input, idx) => {
    if (mustFinalize && input.finalScriptSig)
      tx.ins[idx].script = input.finalScriptSig;
    if (mustFinalize && input.finalScriptWitness) {
      tx.ins[idx].witness = scriptWitnessToWitnessStack(
        input.finalScriptWitness
      );
    }
    if (input.witnessUtxo) {
      inputAmount += input.witnessUtxo.value;
    } else if (input.nonWitnessUtxo) {
      const nwTx = nonWitnessUtxoTxFromCache(cache, input, idx);
      const vout = tx.ins[idx].index;
      const out = nwTx.outs[vout];
      inputAmount += out.value;
    }
  });
  const outputAmount = tx.outs.reduce(
    (total, o) => total + o.value,
    0
  );
  const fee = inputAmount - outputAmount;
  if (fee < 0 && !disableOutputsMoreThanInputs) {
    throw new Error("Outputs are spending more than Inputs");
  }
  const bytes = tx.virtualSize();
  cache.__FEE = fee;
  cache.__EXTRACTED_TX = tx;
  cache.__FEE_RATE = Math.floor(fee / bytes);
}
function nonWitnessUtxoTxFromCache(cache, input, inputIndex) {
  const c = cache.__NON_WITNESS_UTXO_TX_CACHE;
  if (!c[inputIndex]) {
    addNonWitnessTxCache(cache, input, inputIndex);
  }
  return c[inputIndex];
}
function getScriptFromUtxo(inputIndex, input, cache) {
  const { script } = getScriptAndAmountFromUtxo(inputIndex, input, cache);
  return script;
}
function getScriptAndAmountFromUtxo(inputIndex, input, cache) {
  if (input.witnessUtxo !== void 0) {
    return {
      script: input.witnessUtxo.script,
      value: input.witnessUtxo.value
    };
  } else if (input.nonWitnessUtxo !== void 0) {
    const nonWitnessUtxoTx = nonWitnessUtxoTxFromCache(
      cache,
      input,
      inputIndex
    );
    const o = nonWitnessUtxoTx.outs[cache.__TX.ins[inputIndex].index];
    return { script: o.script, value: o.value };
  } else {
    throw new Error("Can't find pubkey in input without Utxo data");
  }
}
function pubkeyInInput(pubkey, input, inputIndex, cache) {
  const script = getScriptFromUtxo(inputIndex, input, cache);
  const { meaningfulScript } = getMeaningfulScript(
    script,
    inputIndex,
    "input",
    input.redeemScript,
    input.witnessScript
  );
  return pubkeyInScript(pubkey, meaningfulScript);
}
function pubkeyInOutput(pubkey, output, outputIndex, cache) {
  const script = cache.__TX.outs[outputIndex].script;
  const { meaningfulScript } = getMeaningfulScript(
    script,
    outputIndex,
    "output",
    output.redeemScript,
    output.witnessScript
  );
  return pubkeyInScript(pubkey, meaningfulScript);
}
function redeemFromFinalScriptSig(finalScript) {
  if (!finalScript)
    return;
  const decomp = decompile(finalScript);
  if (!decomp)
    return;
  const lastItem = decomp[decomp.length - 1];
  if (!Buffer.isBuffer(lastItem) || isPubkeyLike(lastItem) || isSigLike(lastItem))
    return;
  const sDecomp = decompile(lastItem);
  if (!sDecomp)
    return;
  return lastItem;
}
function redeemFromFinalWitnessScript(finalScript) {
  if (!finalScript)
    return;
  const decomp = scriptWitnessToWitnessStack(finalScript);
  const lastItem = decomp[decomp.length - 1];
  if (isPubkeyLike(lastItem))
    return;
  const sDecomp = decompile(lastItem);
  if (!sDecomp)
    return;
  return lastItem;
}
function compressPubkey(pubkey) {
  if (pubkey.length === 65) {
    const parity = pubkey[64] & 1;
    const newKey = pubkey.slice(0, 33);
    newKey[0] = 2 | parity;
    return newKey;
  }
  return pubkey.slice();
}
function isPubkeyLike(buf) {
  return buf.length === 33 && isCanonicalPubKey(buf);
}
function isSigLike(buf) {
  return isCanonicalScriptSignature(buf);
}
function getMeaningfulScript(script, index, ioType, redeemScript, witnessScript) {
  const isP2SH = isP2SHScript(script);
  const isP2SHP2WSH = isP2SH && redeemScript && isP2WSHScript(redeemScript);
  const isP2WSH = isP2WSHScript(script);
  if (isP2SH && redeemScript === void 0)
    throw new Error("scriptPubkey is P2SH but redeemScript missing");
  if ((isP2WSH || isP2SHP2WSH) && witnessScript === void 0)
    throw new Error(
      "scriptPubkey or redeemScript is P2WSH but witnessScript missing"
    );
  let meaningfulScript;
  if (isP2SHP2WSH) {
    meaningfulScript = witnessScript;
    checkRedeemScript(index, script, redeemScript, ioType);
    checkWitnessScript(index, redeemScript, witnessScript, ioType);
    checkInvalidP2WSH(meaningfulScript);
  } else if (isP2WSH) {
    meaningfulScript = witnessScript;
    checkWitnessScript(index, script, witnessScript, ioType);
    checkInvalidP2WSH(meaningfulScript);
  } else if (isP2SH) {
    meaningfulScript = redeemScript;
    checkRedeemScript(index, script, redeemScript, ioType);
  } else {
    meaningfulScript = script;
  }
  return {
    meaningfulScript,
    type: isP2SHP2WSH ? "p2sh-p2wsh" : isP2SH ? "p2sh" : isP2WSH ? "p2wsh" : "raw"
  };
}
function checkInvalidP2WSH(script) {
  if (isP2WPKH(script) || isP2SHScript(script)) {
    throw new Error("P2WPKH or P2SH can not be contained within P2WSH");
  }
}
function classifyScript(script) {
  if (isP2WPKH(script))
    return "witnesspubkeyhash";
  if (isP2PKH(script))
    return "pubkeyhash";
  if (isP2MS(script))
    return "multisig";
  if (isP2PK(script))
    return "pubkey";
  return "nonstandard";
}
function range(n) {
  return [...Array(n).keys()];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Block,
  Psbt,
  Transaction,
  address,
  crypto,
  getAllTaprootHashesForSig,
  getTaprootHashesForSigCustom,
  initEccLib,
  networks,
  opcodes,
  payments,
  script,
  tapTreeToList,
  witnessStackToScriptWitness
});
