import { Psbt as Psbt$1 } from 'bip174';
import { PsbtGlobalUpdate, PsbtInputUpdate, PsbtOutputUpdate, KeyValue, PsbtInput, PsbtOutput, TapLeaf } from 'bip174/src/lib/interfaces';

interface Network {
    messagePrefix: string;
    bech32: string;
    bip32: Bip32;
    pubKeyHash: number;
    scriptHash: number;
    wif: number;
}
interface Bip32 {
    public: number;
    private: number;
}
declare const bitcoin: Network;
declare const regtest: Network;
declare const testnet: Network;

type networks_Network = Network;
declare const networks_bitcoin: typeof bitcoin;
declare const networks_regtest: typeof regtest;
declare const networks_testnet: typeof testnet;
declare namespace networks {
  export {
    networks_Network as Network,
    networks_bitcoin as bitcoin,
    networks_regtest as regtest,
    networks_testnet as testnet,
  };
}

interface Base58CheckResult {
    hash: Buffer;
    version: number;
}
interface Bech32Result {
    version: number;
    prefix: string;
    data: Buffer;
}
declare function fromBase58Check(address: string): Base58CheckResult;
declare function fromBech32(address: string): Bech32Result;
declare function toBase58Check(hash: Buffer, version: number): string;
declare function toBech32(data: Buffer, version: number, prefix: string): string;
declare function fromOutputScript(output: Buffer, network?: Network): string;
declare function toOutputScript(address: string, network?: Network): Buffer;

type address_Base58CheckResult = Base58CheckResult;
type address_Bech32Result = Bech32Result;
declare const address_fromBase58Check: typeof fromBase58Check;
declare const address_fromBech32: typeof fromBech32;
declare const address_fromOutputScript: typeof fromOutputScript;
declare const address_toBase58Check: typeof toBase58Check;
declare const address_toBech32: typeof toBech32;
declare const address_toOutputScript: typeof toOutputScript;
declare namespace address {
  export {
    address_Base58CheckResult as Base58CheckResult,
    address_Bech32Result as Bech32Result,
    address_fromBase58Check as fromBase58Check,
    address_fromBech32 as fromBech32,
    address_fromOutputScript as fromOutputScript,
    address_toBase58Check as toBase58Check,
    address_toBech32 as toBech32,
    address_toOutputScript as toOutputScript,
  };
}

declare function ripemd160(buffer: Buffer): Buffer;
declare function sha1(buffer: Buffer): Buffer;
declare function sha256(buffer: Buffer): Buffer;
declare function hash160(buffer: Buffer): Buffer;
declare function hash256(buffer: Buffer): Buffer;
declare const TAGS: readonly ["BIP0340/challenge", "BIP0340/aux", "BIP0340/nonce", "TapLeaf", "TapBranch", "TapSighash", "TapTweak", "KeyAgg list", "KeyAgg coefficient"];
type TaggedHashPrefix = (typeof TAGS)[number];
type TaggedHashPrefixes = {
    [key in TaggedHashPrefix]: Buffer;
};
/** An object mapping tags to their tagged hash prefix of [SHA256(tag) | SHA256(tag)] */
declare const TAGGED_HASH_PREFIXES: TaggedHashPrefixes;
declare function taggedHash(prefix: TaggedHashPrefix, data: Buffer): Buffer;

declare const crypto_TAGGED_HASH_PREFIXES: typeof TAGGED_HASH_PREFIXES;
declare const crypto_TAGS: typeof TAGS;
type crypto_TaggedHashPrefix = TaggedHashPrefix;
declare const crypto_hash160: typeof hash160;
declare const crypto_hash256: typeof hash256;
declare const crypto_ripemd160: typeof ripemd160;
declare const crypto_sha1: typeof sha1;
declare const crypto_sha256: typeof sha256;
declare const crypto_taggedHash: typeof taggedHash;
declare namespace crypto {
  export {
    crypto_TAGGED_HASH_PREFIXES as TAGGED_HASH_PREFIXES,
    crypto_TAGS as TAGS,
    crypto_TaggedHashPrefix as TaggedHashPrefix,
    crypto_hash160 as hash160,
    crypto_hash256 as hash256,
    crypto_ripemd160 as ripemd160,
    crypto_sha1 as sha1,
    crypto_sha256 as sha256,
    crypto_taggedHash as taggedHash,
  };
}

interface XOnlyPointAddTweakResult {
    parity: 1 | 0;
    xOnlyPubkey: Uint8Array;
}
interface Tapleaf {
    output: Buffer$1;
    version?: number;
}
/**
 * Binary tree repsenting script path spends for a Taproot input.
 * Each node is either a single Tapleaf, or a pair of Tapleaf | Taptree.
 * The tree has no balancing requirements.
 */
type Taptree = [Taptree | Tapleaf, Taptree | Tapleaf] | Tapleaf;
interface TinySecp256k1Interface {
    isXOnlyPoint(p: Uint8Array): boolean;
    xOnlyPointAddTweak(p: Uint8Array, tweak: Uint8Array): XOnlyPointAddTweakResult | null;
}
declare const Buffer$1: any;

declare function p2data(a: Payment, opts?: PaymentOpts): Payment;

declare function p2ms(a: Payment, opts?: PaymentOpts): Payment;

declare function p2pk(a: Payment, opts?: PaymentOpts): Payment;

declare function p2pkh(a: Payment, opts?: PaymentOpts): Payment;

declare function p2sh(a: Payment, opts?: PaymentOpts): Payment;

declare function p2wpkh(a: Payment, opts?: PaymentOpts): Payment;

declare function p2wsh(a: Payment, opts?: PaymentOpts): Payment;

declare function p2tr(a: Payment, opts?: PaymentOpts): Payment;

interface Payment {
    name?: string;
    network?: Network;
    output?: Buffer;
    data?: Buffer[];
    m?: number;
    n?: number;
    pubkeys?: Buffer[];
    input?: Buffer;
    signatures?: Buffer[];
    internalPubkey?: Buffer;
    pubkey?: Buffer;
    signature?: Buffer;
    address?: string;
    hash?: Buffer;
    redeem?: Payment;
    redeemVersion?: number;
    scriptTree?: Taptree;
    witness?: Buffer[];
}
type PaymentCreator = (a: Payment, opts?: PaymentOpts) => Payment;
type PaymentFunction = () => Payment;
interface PaymentOpts {
    validate?: boolean;
    allowIncomplete?: boolean;
}
type StackElement = Buffer | number;
type Stack = StackElement[];
type StackFunction = () => Stack;

type index_Payment = Payment;
type index_PaymentCreator = PaymentCreator;
type index_PaymentFunction = PaymentFunction;
type index_PaymentOpts = PaymentOpts;
type index_Stack = Stack;
type index_StackElement = StackElement;
type index_StackFunction = StackFunction;
declare const index_p2ms: typeof p2ms;
declare const index_p2pk: typeof p2pk;
declare const index_p2pkh: typeof p2pkh;
declare const index_p2sh: typeof p2sh;
declare const index_p2tr: typeof p2tr;
declare const index_p2wpkh: typeof p2wpkh;
declare const index_p2wsh: typeof p2wsh;
declare namespace index {
  export {
    index_Payment as Payment,
    index_PaymentCreator as PaymentCreator,
    index_PaymentFunction as PaymentFunction,
    index_PaymentOpts as PaymentOpts,
    index_Stack as Stack,
    index_StackElement as StackElement,
    index_StackFunction as StackFunction,
    p2data as embed,
    index_p2ms as p2ms,
    index_p2pk as p2pk,
    index_p2pkh as p2pkh,
    index_p2sh as p2sh,
    index_p2tr as p2tr,
    index_p2wpkh as p2wpkh,
    index_p2wsh as p2wsh,
  };
}

declare const OPS: {
    [key: string]: number;
};

declare function decode$1(buffer: Buffer, maxLength?: number, minimal?: boolean): number;
declare function encode$1(_number: number): Buffer;

declare namespace scriptNumber {
  export {
    decode$1 as decode,
    encode$1 as encode,
  };
}

interface ScriptSignature {
    signature: Buffer;
    hashType: number;
}
declare function decode(buffer: Buffer): ScriptSignature;
declare function encode(signature: Buffer, hashType: number): Buffer;

declare const scriptSignature_decode: typeof decode;
declare const scriptSignature_encode: typeof encode;
declare namespace scriptSignature {
  export {
    scriptSignature_decode as decode,
    scriptSignature_encode as encode,
  };
}

declare function isPushOnly(value: Stack): boolean;
declare function countNonPushOnlyOPs(value: Stack): number;
declare function compile(chunks: Buffer | Stack): Buffer;
declare function decompile(buffer: Buffer | Array<number | Buffer>): Array<number | Buffer> | null;
declare function toASM(chunks: Buffer | Array<number | Buffer>): string;
declare function fromASM(asm: string): Buffer;
declare function toStack(chunks: Buffer | Array<number | Buffer>): Buffer[];
declare function isCanonicalPubKey(buffer: Buffer): boolean;
declare function isDefinedHashType(hashType: number): boolean;
declare function isCanonicalScriptSignature(buffer: Buffer): boolean;
declare const number: typeof scriptNumber;
declare const signature: typeof scriptSignature;

declare const script_OPS: typeof OPS;
declare const script_compile: typeof compile;
declare const script_countNonPushOnlyOPs: typeof countNonPushOnlyOPs;
declare const script_decompile: typeof decompile;
declare const script_fromASM: typeof fromASM;
declare const script_isCanonicalPubKey: typeof isCanonicalPubKey;
declare const script_isCanonicalScriptSignature: typeof isCanonicalScriptSignature;
declare const script_isDefinedHashType: typeof isDefinedHashType;
declare const script_isPushOnly: typeof isPushOnly;
declare const script_number: typeof number;
declare const script_signature: typeof signature;
declare const script_toASM: typeof toASM;
declare const script_toStack: typeof toStack;
declare namespace script {
  export {
    script_OPS as OPS,
    script_compile as compile,
    script_countNonPushOnlyOPs as countNonPushOnlyOPs,
    script_decompile as decompile,
    script_fromASM as fromASM,
    script_isCanonicalPubKey as isCanonicalPubKey,
    script_isCanonicalScriptSignature as isCanonicalScriptSignature,
    script_isDefinedHashType as isDefinedHashType,
    script_isPushOnly as isPushOnly,
    script_number as number,
    script_signature as signature,
    script_toASM as toASM,
    script_toStack as toStack,
  };
}

interface Output {
    script: Buffer;
    value: number;
}
interface Input {
    hash: Buffer;
    index: number;
    script: Buffer;
    sequence: number;
    witness: Buffer[];
}
declare class Transaction {
    static readonly DEFAULT_SEQUENCE = 4294967295;
    static readonly SIGHASH_DEFAULT = 0;
    static readonly SIGHASH_ALL = 1;
    static readonly SIGHASH_NONE = 2;
    static readonly SIGHASH_SINGLE = 3;
    static readonly SIGHASH_ANYONECANPAY = 128;
    static readonly SIGHASH_OUTPUT_MASK = 3;
    static readonly SIGHASH_INPUT_MASK = 128;
    static readonly ADVANCED_TRANSACTION_MARKER = 0;
    static readonly ADVANCED_TRANSACTION_FLAG = 1;
    static fromBuffer(buffer: Buffer, _NO_STRICT?: boolean): Transaction;
    static fromHex(hex: string): Transaction;
    static isCoinbaseHash(buffer: Buffer): boolean;
    version: number;
    locktime: number;
    ins: Input[];
    outs: Output[];
    isCoinbase(): boolean;
    addInput(hash: Buffer, index: number, sequence?: number, scriptSig?: Buffer): number;
    addOutput(scriptPubKey: Buffer, value: number): number;
    hasWitnesses(): boolean;
    weight(): number;
    virtualSize(): number;
    byteLength(_ALLOW_WITNESS?: boolean): number;
    clone(): Transaction;
    /**
     * Hash transaction for signing a specific input.
     *
     * Bitcoin uses a different hash for each signed transaction input.
     * This method copies the transaction, makes the necessary changes based on the
     * hashType, and then hashes the result.
     * This hash can then be used to sign the provided transaction input.
     */
    hashForSignature(inIndex: number, prevOutScript: Buffer, hashType: number): Buffer;
    hashForWitnessV1(inIndex: number, prevOutScripts: Buffer[], values: number[], hashType: number, leafHash?: Buffer, annex?: Buffer): Buffer;
    hashForWitnessV0(inIndex: number, prevOutScript: Buffer, value: number, hashType: number): Buffer;
    getHash(forWitness?: boolean): Buffer;
    getId(): string;
    toBuffer(buffer?: Buffer, initialOffset?: number): Buffer;
    toHex(): string;
    setInputScript(index: number, scriptSig: Buffer): void;
    setWitness(index: number, witness: Buffer[]): void;
    private __toBuffer;
}

declare class Block {
    static fromBuffer(buffer: Buffer): Block;
    static fromHex(hex: string): Block;
    static calculateTarget(bits: number): Buffer;
    static calculateMerkleRoot(transactions: Transaction[], forWitness?: boolean): Buffer;
    version: number;
    prevHash?: Buffer;
    merkleRoot?: Buffer;
    timestamp: number;
    witnessCommit?: Buffer;
    bits: number;
    nonce: number;
    transactions?: Transaction[];
    getWitnessCommit(): Buffer | null;
    hasWitnessCommit(): boolean;
    hasWitness(): boolean;
    weight(): number;
    byteLength(headersOnly?: boolean, allowWitness?: boolean): number;
    getHash(): Buffer;
    getId(): string;
    getUTCDate(): Date;
    toBuffer(headersOnly?: boolean): Buffer;
    toHex(headersOnly?: boolean): string;
    checkTxRoots(): boolean;
    checkProofOfWork(): boolean;
    private __checkMerkleRoot;
    private __checkWitnessCommit;
}

interface TransactionInput {
    hash: string | Buffer;
    index: number;
    sequence?: number;
}
interface PsbtTxInput extends TransactionInput {
    hash: Buffer;
}
interface TransactionOutput {
    script: Buffer;
    value: number;
}
interface PsbtTxOutput extends TransactionOutput {
    address: string | undefined;
}
type ValidateSigFunction = (pubkey: Buffer, msghash: Buffer, signature: Buffer) => boolean;
/**
 * Psbt class can parse and generate a PSBT binary based off of the BIP174.
 * There are 6 roles that this class fulfills. (Explained in BIP174)
 *
 * Creator: This can be done with `new Psbt()`
 * Updater: This can be done with `psbt.addInput(input)`, `psbt.addInputs(inputs)`,
 *   `psbt.addOutput(output)`, `psbt.addOutputs(outputs)` when you are looking to
 *   add new inputs and outputs to the PSBT, and `psbt.updateGlobal(itemObject)`,
 *   `psbt.updateInput(itemObject)`, `psbt.updateOutput(itemObject)`
 *   addInput requires hash: Buffer | string; and index: number; as attributes
 *   and can also include any attributes that are used in updateInput method.
 *   addOutput requires script: Buffer; and value: number; and likewise can include
 *   data for updateOutput.
 *   For a list of what attributes should be what types. Check the bip174 library.
 *   Also, check the integration tests for some examples of usage.
 * Signer: There are a few methods. signAllInputs and signAllInputsAsync, which will search all input
 *   information for your pubkey or pubkeyhash, and only sign inputs where it finds
 *   your info. Or you can explicitly sign a specific input with signInput and
 *   signInputAsync. For the async methods you can create a SignerAsync object
 *   and use something like a hardware wallet to sign with. (You must implement this)
 * Combiner: psbts can be combined easily with `psbt.combine(psbt2, psbt3, psbt4 ...)`
 *   the psbt calling combine will always have precedence when a conflict occurs.
 *   Combine checks if the internal bitcoin transaction is the same, so be sure that
 *   all sequences, version, locktime, etc. are the same before combining.
 * Input Finalizer: This role is fairly important. Not only does it need to construct
 *   the input scriptSigs and witnesses, but it SHOULD verify the signatures etc.
 *   Before running `psbt.finalizeAllInputs()` please run `psbt.validateSignaturesOfAllInputs()`
 *   Running any finalize method will delete any data in the input(s) that are no longer
 *   needed due to the finalized scripts containing the information.
 * Transaction Extractor: This role will perform some checks before returning a
 *   Transaction object. Such as fee rate not being larger than maximumFeeRate etc.
 */
declare class Psbt {
    readonly data: Psbt$1;
    static fromBase64(data: string, opts?: PsbtOptsOptional): Psbt;
    static fromHex(data: string, opts?: PsbtOptsOptional): Psbt;
    static fromBuffer(buffer: Buffer, opts?: PsbtOptsOptional): Psbt;
    private __CACHE;
    private opts;
    constructor(opts?: PsbtOptsOptional, data?: Psbt$1);
    get inputCount(): number;
    get version(): number;
    set version(version: number);
    get locktime(): number;
    set locktime(locktime: number);
    get txInputs(): PsbtTxInput[];
    get txOutputs(): PsbtTxOutput[];
    combine(...those: Psbt[]): this;
    clone(): Psbt;
    setMaximumFeeRate(satoshiPerByte: number): void;
    setVersion(version: number): this;
    setLocktime(locktime: number): this;
    setInputSequence(inputIndex: number, sequence: number): this;
    addInputs(inputDatas: PsbtInputExtended[]): this;
    addInput(inputData: PsbtInputExtended): this;
    addOutputs(outputDatas: PsbtOutputExtended[]): this;
    addOutput(outputData: PsbtOutputExtended): this;
    extractTransaction(disableFeeCheck?: boolean, disableOutputsMoreThanInputs?: boolean): Transaction;
    getFeeRate(): number;
    getFee(): number;
    finalizeAllInputs(): this;
    finalizeInput(inputIndex: number, finalScriptsFunc?: FinalScriptsFunc | FinalTaprootScriptsFunc): this;
    finalizeTaprootInput(inputIndex: number, tapLeafHashToFinalize?: Buffer, finalScriptsFunc?: FinalTaprootScriptsFunc): this;
    private _finalizeInput;
    private _finalizeTaprootInput;
    getInputType(inputIndex: number): AllScriptType;
    inputHasPubkey(inputIndex: number, pubkey: Buffer): boolean;
    inputHasHDKey(inputIndex: number, root: HDSigner): boolean;
    outputHasPubkey(outputIndex: number, pubkey: Buffer): boolean;
    outputHasHDKey(outputIndex: number, root: HDSigner): boolean;
    validateSignaturesOfAllInputs(validator: ValidateSigFunction): boolean;
    validateSignaturesOfInput(inputIndex: number, validator: ValidateSigFunction, pubkey?: Buffer): boolean;
    private _validateSignaturesOfInput;
    private validateSignaturesOfTaprootInput;
    signAllInputsHD(hdKeyPair: HDSigner, sighashTypes?: number[]): this;
    signAllInputsHDAsync(hdKeyPair: HDSigner | HDSignerAsync, sighashTypes?: number[]): Promise<void>;
    signInputHD(inputIndex: number, hdKeyPair: HDSigner, sighashTypes?: number[]): this;
    signInputHDAsync(inputIndex: number, hdKeyPair: HDSigner | HDSignerAsync, sighashTypes?: number[]): Promise<void>;
    signAllInputs(keyPair: Signer, sighashTypes?: number[]): this;
    signAllInputsAsync(keyPair: Signer | SignerAsync, sighashTypes?: number[]): Promise<void>;
    signInput(inputIndex: number, keyPair: Signer, sighashTypes?: number[]): this;
    signTaprootInput(inputIndex: number, keyPair: Signer, tapLeafHashToSign?: Buffer, sighashTypes?: number[]): this;
    private _signInput;
    private _signTaprootInput;
    signInputAsync(inputIndex: number, keyPair: Signer | SignerAsync, sighashTypes?: number[]): Promise<void>;
    signTaprootInputAsync(inputIndex: number, keyPair: Signer | SignerAsync, tapLeafHash?: Buffer, sighashTypes?: number[]): Promise<void>;
    private _signInputAsync;
    private _signTaprootInputAsync;
    private checkTaprootHashesForSig;
    toBuffer(): Buffer;
    toHex(): string;
    toBase64(): string;
    updateGlobal(updateData: PsbtGlobalUpdate): this;
    updateInput(inputIndex: number, updateData: PsbtInputUpdate): this;
    updateOutput(outputIndex: number, updateData: PsbtOutputUpdate): this;
    addUnknownKeyValToGlobal(keyVal: KeyValue): this;
    addUnknownKeyValToInput(inputIndex: number, keyVal: KeyValue): this;
    addUnknownKeyValToOutput(outputIndex: number, keyVal: KeyValue): this;
    clearFinalizedInput(inputIndex: number): this;
}
interface PsbtCache {
    __NON_WITNESS_UTXO_TX_CACHE: Transaction[];
    __NON_WITNESS_UTXO_BUF_CACHE: Buffer[];
    __TX_IN_CACHE: {
        [index: string]: number;
    };
    __TX: Transaction;
    __FEE_RATE?: number;
    __FEE?: number;
    __EXTRACTED_TX?: Transaction;
    __UNSAFE_SIGN_NONSEGWIT: boolean;
}
interface PsbtOptsOptional {
    network?: Network;
    maximumFeeRate?: number;
}
interface PsbtInputExtended extends PsbtInput, TransactionInput {
}
type PsbtOutputExtended = PsbtOutputExtendedAddress | PsbtOutputExtendedScript;
interface PsbtOutputExtendedAddress extends PsbtOutput {
    address: string;
    value: number;
}
interface PsbtOutputExtendedScript extends PsbtOutput {
    script: Buffer;
    value: number;
}
interface HDSignerBase {
    /**
     * DER format compressed publicKey buffer
     */
    publicKey: Buffer;
    /**
     * The first 4 bytes of the sha256-ripemd160 of the publicKey
     */
    fingerprint: Buffer;
}
interface HDSigner extends HDSignerBase {
    /**
     * The path string must match /^m(\/\d+'?)+$/
     * ex. m/44'/0'/0'/1/23 levels with ' must be hard derivations
     */
    derivePath(path: string): HDSigner;
    /**
     * Input hash (the "message digest") for the signature algorithm
     * Return a 64 byte signature (32 byte r and 32 byte s in that order)
     */
    sign(hash: Buffer): Buffer;
}
/**
 * Same as above but with async sign method
 */
interface HDSignerAsync extends HDSignerBase {
    derivePath(path: string): HDSignerAsync;
    sign(hash: Buffer): Promise<Buffer>;
}
interface Signer {
    publicKey: Buffer;
    network?: any;
    sign(hash: Buffer, lowR?: boolean): Buffer;
    signSchnorr?(hash: Buffer): Buffer;
    getPublicKey?(): Buffer;
}
interface SignerAsync {
    publicKey: Buffer;
    network?: any;
    sign(hash: Buffer, lowR?: boolean): Promise<Buffer>;
    signSchnorr?(hash: Buffer): Promise<Buffer>;
    getPublicKey?(): Buffer;
}
/**
 * This function must do two things:
 * 1. Check if the `input` can be finalized. If it can not be finalized, throw.
 *   ie. `Can not finalize input #${inputIndex}`
 * 2. Create the finalScriptSig and finalScriptWitness Buffers.
 */
type FinalScriptsFunc = (inputIndex: number, // Which input is it?
input: PsbtInput, // The PSBT input contents
script: Buffer, // The "meaningful" locking script Buffer (redeemScript for P2SH etc.)
isSegwit: boolean, // Is it segwit?
isP2SH: boolean, // Is it P2SH?
isP2WSH: boolean) => {
    finalScriptSig: Buffer | undefined;
    finalScriptWitness: Buffer | undefined;
};
type FinalTaprootScriptsFunc = (inputIndex: number, // Which input is it?
input: PsbtInput, // The PSBT input contents
tapLeafHashToFinalize?: Buffer) => {
    finalScriptWitness: Buffer | undefined;
};
declare function getAllTaprootHashesForSig(inputIndex: number, input: PsbtInput, inputs: PsbtInput[], cache: PsbtCache): {
    pubkey: Buffer;
    hash: Buffer;
    leafHash?: Buffer;
}[];
declare function getTaprootHashesForSigCustom(inputIndex: number, input: PsbtInput, inputs: PsbtInput[], pubkey: Buffer, cache: PsbtCache, tapLeafHashToSign?: Buffer, allowedSighashTypes?: number[]): {
    pubkey: Buffer;
    hash: Buffer;
    leafHash?: Buffer;
}[];
type AllScriptType = 'witnesspubkeyhash' | 'pubkeyhash' | 'multisig' | 'pubkey' | 'nonstandard' | 'p2sh-witnesspubkeyhash' | 'p2sh-pubkeyhash' | 'p2sh-multisig' | 'p2sh-pubkey' | 'p2sh-nonstandard' | 'p2wsh-pubkeyhash' | 'p2wsh-multisig' | 'p2wsh-pubkey' | 'p2wsh-nonstandard' | 'p2sh-p2wsh-pubkeyhash' | 'p2sh-p2wsh-multisig' | 'p2sh-p2wsh-pubkey' | 'p2sh-p2wsh-nonstandard';

declare function witnessStackToScriptWitness(witness: Buffer[]): Buffer;

/**
 * Convert a binary tree to a BIP371 type list. Each element of the list is (according to BIP371):
 * One or more tuples representing the depth, leaf version, and script for a leaf in the Taproot tree,
 * allowing the entire tree to be reconstructed. The tuples must be in depth first search order so that
 * the tree is correctly reconstructed.
 * @param tree the binary tap tree
 * @returns a list of BIP 371 tapleaves
 */
declare function tapTreeToList(tree: Taptree): TapLeaf[];

declare function initEccLib(eccLib: TinySecp256k1Interface | undefined): void;

export { Block, HDSigner, HDSignerAsync, Network, Payment, PaymentCreator, PaymentOpts, Psbt, PsbtOutputExtendedAddress, PsbtTxInput, PsbtTxOutput, Signer, SignerAsync, Stack, StackElement, TaggedHashPrefix, Transaction, Input as TxInput, Output as TxOutput, address, crypto, getAllTaprootHashesForSig, getTaprootHashesForSigCustom, initEccLib, networks, OPS as opcodes, index as payments, script, tapTreeToList, witnessStackToScriptWitness };
