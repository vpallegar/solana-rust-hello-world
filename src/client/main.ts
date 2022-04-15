import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    TransactionInstruction,
    Transaction,
    sendAndConfirmTransaction,
} from '@solana/web3.js';

import fs from 'mz/fs';
import path from 'path';

const PROGRAM_KEYPAIR_PATH = path.join(
    path.resolve(__dirname, '../../dist/program'),
    'program-keypair.json'
);

async function main() {

    console.log("Launching Client...");

    /**
     * Connect to Solana DEV net
     */
    let connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    /**
     * Get our programs public key
     * 
     */
    const secretKeyString = await fs.readFile(PROGRAM_KEYPAIR_PATH, { encoding: 'utf8' });
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    const programKeypair = Keypair.fromSecretKey(secretKey);
    let programId: PublicKey = programKeypair.publicKey;

    /**
     * Generatore an account (keypair) to transact with our program
     */
    const triggerKeypair = Keypair.generate();
    const airdropRequest = await connection.requestAirdrop(
        triggerKeypair.publicKey,
        LAMPORTS_PER_SOL,
    );
    await connection.confirmTransaction(airdropRequest);

    /**
     * Preform a transaction
     */
    console.log("---Pinging Program ", programId.toBase58());
    const instruction = new TransactionInstruction({
        keys: [{pubkey: triggerKeypair.publicKey, isSigner: false, isWritable: true}],
        programId,
        data: Buffer.alloc(0)
    });
    await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [triggerKeypair]
    );

}

main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    }
);