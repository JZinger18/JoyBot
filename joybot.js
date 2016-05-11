//sets up instansce of botkit 
var Botkit = require('../lib/Botkit.js');

if (!process.env.token) {
  console.log('Error: Specify token in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
 debug: false
});

controller.spawn({
  token: process.env.token
}).startRTM(function(err) {
  if (err) {
    console.log("Couldn't connect to the RTM API");
    throw new Error(err);
  }
});

//most people always say this to a bot
controller.hears(['hello', 'hi',], ['direct_message','direct_mention','mention'], function(bot, message) {
  bot.reply(message, 'hello');
})

controller.hears(['feedme', 'i am hungry', "what's for lunch", "what is for lunch", "what's for dinner", "what is for dinner"], ['direct_message','direct_mention','mention', 'ambient'], function(bot, message) {
   bot.startConversation(message,getFood);
})
    //used to intiate pick of or delivery 
    var getFood = function(response,convo) {
      convo.ask("Pick up or delivery?", function(response, convo) {
        /*if(getFood === "Pickup") {
          convo.say("What size of a radius");*/
          convo.say('Your input was received');
          typeOfCuisne(response, convo);
          convo.next();
        
      });
    } //typeOFCuisine will eventually be used in either yelp api or delivery api as a parameter
    var typeOfCuisne = function(response,convo) {
      convo.ask('What type of cuisine are you in the mood for', function(response, convo) {
      convo.say('Good choice');
      responseGetFood(response, convo);
      convo.next();
    });
    }
    
    //will eventually have to be trigger when a pick up or delivery order has been placed
    var responseGetFood = function(response, convo) {
      convo.ask("We will place your order, cash or card on file", function(response, convo) {
        convo.say('EnJoy!!!');
        orderConfirmtion(response, convo);
        convo.next();
      });
    }
        //will eventually have to be trigger when a pick up or delivery order has been placed
        
    var orderConfirmtion = function(response, convo) {
      convo.ask('is there anything else you need?', function(response, convo) {
      convo.say('Speak to you soon');
      convo.next();
    });
    }