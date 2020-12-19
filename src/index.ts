import * as readline from 'readline'

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let cmd: string = ''

;(async () => {
  await driver()
  process.exit()
})()

async function driver() {
  while (cmd !== 'exit') {
    cmd = await getInput('Enter cmd: ')
    if (cmd === 'exit') continue
    doIt(cmd)
  }

  console.log('hope to see you again soon friend')
}

function getInput(promptText: string): Promise<string> {
  return new Promise(resolve => {
    prompt.question(promptText, input => {
      resolve(input)  
    })
  })
}

function doIt(cmd: string): void {
  const rootCmd = cmd.split(' ')[0]
  switch(rootCmd) {
    case 'p':
    case 'pick':
      console.log('You seem to be picking something.', cmd)
      break
    case 'move':
      console.log('You seem to be having a movement', cmd)
      break
    default:
      console.log(`I'm not smart enough to do that`, cmd)
      break
  }
}
