const axios = require('axios');
exports.greeting_task =async function(context, event, callback,RB) {
  try {
  let Listen = false;
  let Remember = {};
  let Collect = false;
  let Tasks = false;
  let Redirect = false;
  let Handoff = false;
  let Say = "";
  // Add your code here...
  const Memory = JSON.parse(event.Memory);
  Remember.Agent = false;
  console.log('greeting_task');
  console.log('Memory.flag:'+ Memory.flag);
  
  if(Memory.flag)
  {
    if(Memory.checkRoutingNo_fail_counter===undefined)
      {
        Remember.checkRoutingNo_fail_counter=1;
        console.log('Counter: '+Remember.checkRoutingNo_fail_counter);
      }
      else{
        Remember.checkRoutingNo_fail_counter = Memory.checkRoutingNo_fail_counter + 1;
        console.log('Counter: '+Remember.checkRoutingNo_fail_counter);
      }
      if(Memory.checkRoutingNo_fail_counter >= 2)
      {
        Say = false;
      Listen = false;
      Remember.checkRoutingNo_fail_counter = 0;
      Redirect = 'task://agent_transfer';
      }
      else
      {
        Remember.question = 'greeting';
        Collect = {
        "name": "collect_routing",
        "questions": [
          {
            "question": `Please tell me the routing number again.`,
            "name": "routing_num",
              "type": "Twilio.NUMBER_SEQUENCE",
              "voice_digits": {
                "finish_on_key": "#"
                
              },
              }
            ],
      "on_complete": {
        "redirect": "task://check_routing_number"
      }
    };
  }
}
  else{
    
    Remember.question = 'greeting';
    Collect =  {
           "name": "collect_routing",
           "questions": [
                   {
                   "question": `We will need your Bank information,, We will allow you time to get your bank information,, Say your routing number or enter your routing number followed by a pound        sign , when ready.`,
                   "name": "routing_num",
                   "type": "Twilio.NUMBER_SEQUENCE",
                   "voice_digits": {
                     "finish_on_key": "#"
                   },
                   }
       
                 ],
           "on_complete": {
           "redirect": 	 "task://check_routing_number"
            }
  };
}
  
  
  //End of your code.
  
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
   } catch (error) {
  console.error(error);
  callback( error);
  }
  };