let lastIndex = 0;

const checkStatus = ()=> {
  let block:any = document.querySelector('#animate-blocks-container');
  let loadFill = document.querySelector('#load-fill');
  let posL = loadFill.clientWidth;
  let posW = window.innerWidth;

  console.log(posL);
  console.log(posW);

  if( (posL/posW) >= 0.74){
    block.style.display = 'none';
  }
}

const checkKey = (event)=> {
  let me = document.querySelector('#talk-to-me');
  let speech = document.querySelector('#speech-bubble');

  if(event.code == "Space" && document.activeElement === me){ 
    return toggleSpeech();
  }
  if(event.code == "Space" && document.activeElement === speech){
    return generateSpeech();
  }
}

const generateSpeech = ()=> {
  let speechBubble = document.querySelector('#speech-bubble');
  let text = document.querySelector('#conversation');

  if(lastIndex >= entireLog.length){
    lastIndex = 0; //Loop through the array, replay the conversation.
    toggleSpeech();
  }else{
    speechBubble.setAttribute('aria-label', entireLog[lastIndex]);
    text.innerHTML = entireLog[lastIndex++];
  }
}

const toggleSpeech = ()=> {
  let speechBubble = document.querySelector('#speech-bubble');
  let text = document.querySelector('#conversation');
  let me = document.querySelector('#talk-to-me');

  if(speechBubble.className === 'open'){
    speechBubble.className = 'close';
    speechBubble.setAttribute('tabindex', '-1');
    me.focus();
    text.setAttribute('role', '');
  }else{
    speechBubble.className = 'open';
    speechBubble.setAttribute('tabindex', '0');
    generateSpeech();
    speechBubble.focus();
    text.setAttribute('role', 'status');
  }
  
}

window.addEventListener('load', checkStatus);
document.querySelector('#talk-to-me').addEventListener('click', toggleSpeech);
document.querySelector('#speech-bubble').addEventListener('click', generateSpeech);
window.addEventListener('keydown', checkKey);

//conversation to interact with gif me
const entireLog = [
  `Heya! My name is Elle Pope and I'm a developer. I mostly develop websites, but game development is my hobby. Have I mentioned I can also create assets? I created this gif of myself and more are to come!`,
  `Poly entertainment is a 2 person partnership. I develop code, assets, and design, while my partner Matt Rothaus composes music and performs quality assurance. We are entirely self funded, and our company thrives off of our side projects and day jobs!`,
  `The mission of Poly entertainment is to promote <em>diversity in Video Games</em>, primarily LGBTQ+, people of color, and cultural pluralism. Although AAA titles have gotten better, we all still have a long way to go. `,
  `Although our name is “entertainment”, we create a variety of products as long as those products are <em>interactive</em>. In fact, we dub our products as <strong>Multimedia Interactive Systems</strong> or MmiSs (pronounced “missus”) for short. I know it’s a mouthful, but bear with me.`,
  `The world is constantly changing, and thus how we interact with the world is constantly changing. For example, video media was primarily episodic television shows and feature movies a decade ago, but now parasocial internet videos have a huge audience. That isn’t to say that internet videos will replace tv, but that the definition of video media has changed.`,
  `Even the line of video games and websites is blurring with more and more games relying on web content and servers to run properly and websites becoming more interactive, customizable,  dynamic generated based on user input.`,
  `Thus what we create and what we will continue to create isn't necessarily going to be categorical. We create systems of interactivity that utilize many forms of media for best experience. Hence our product name MmISs.`,
  `We are finishing our first title right now! This will be a web-based game with meta-commentary on game development (because of course it is). Please come back and see our updates. Schedule to come soon!`
];