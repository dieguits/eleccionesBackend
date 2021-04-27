import {App} from './app';

async function main() {
    console.log('WE ARE WORKING!!!')
    const app = new App();
    await app.listen();
}

main();