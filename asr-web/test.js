// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
const player = require('play-sound')(opts={});

// Import other required libraries
const fs = require('fs');
const util = require('util');
async function main() {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();

  // The text to synthesize
  const text = 'Hello, world!';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  // player.play(response.audioContent);
  player.play('./output.mp3', function(err){
    if (err) throw err
  })
  //console.log('Audio content written to file: output.mp3');
  //load('./output.mp3').then(play);
}

main();