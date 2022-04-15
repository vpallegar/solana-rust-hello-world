# Hello Solana

This is a hello world example with a Solana rust smart contract and a typescript frontend to execute the smart contract transaction.

To get started:

1.  Install and configure solana cli tools
2.  Build program `npm run build:program`. 
3.  Deploy contract to Solana `solana program deploy /Users/{mypath}/hello-solana/dist/program/program.so`
4.  Grep solana logs to view your program logs - `solana logs | grep "{program_id} invoke" -A 3` - replace {programId} with your program - ie `solana logs | grep "CeL5Sw6yis646rnpz9fbyizgcmJgdjQvs3ZjNwp8cgCH invoke" -A 3`
5. Run frontend `npm run start`

If you check you solana logs console, should see your contract executed.

