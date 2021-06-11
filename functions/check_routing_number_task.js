const brnv = require('bank-routing-number-validator');

exports.check_routing_number_task =async function(context, event, callback,RB) {
  try {
  let Listen = false;
  let Remember = {};
  let Collect = false;
  let Tasks = false;
  let Redirect = false;
  let Handoff = false;
  let Say = "";
  // Add your code here.
  const Memory = JSON.parse(event.Memory);

  Remember.repeat = false;

  // Collect routing number from Memory
  const routing_num = Memory.twilio.collected_data.collect_routing.answers.routing_num.answer ||
                      event.Field_routing_num_Value ||
                      event.Field_routing_num_alt_Value;

   // Validate the routing number which user provided                   
  if ( routing_num ) {
    //function for validate routing number. 
    const validRoutingNum = brnv.ABARoutingNumberIsValid(routing_num);

    if ( validRoutingNum ) {
      Say = `You said <say-as interpret-as='digits'>${routing_num}</say-as>. `;
      Prompt = `Is that correct? say yes or no. You can also press 1 for yes and 2 for no.`;
    
      Say += Prompt;
      
      Remember.bank_acc_routing = routing_num;
      Remember.question = 'routing_check';
      Remember.flag="No";
      Listen = {
        "voice_digits":{
          "num_digits": 1,
          "finish_on_key": "#",
          "redirects": {
            1: "task://bank_account_number",
            2: "task://greeting"
          }
        }
      }
      ;
      Tasks=['yes_no', 'agent_transfer'];
    } 
    else {
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
           Collect = {
             "name": "collect_routing",
             "questions": [
               {
                 "question": `The routing number you provided <say-as interpret-as='digits'>${routing_num}</say-as> is not valid. Please say or use your telephone keypad to provide a valid routing number.`,
                 "voice_digits": {
                   "finish_on_key": "#"
                 },
                 "name": "routing_num",
                 "type": "Twilio.NUMBER_SEQUENCE"
               }
             ],
             "on_complete": {
               "redirect": "task://check_routing_number"
             }
           };
      
      Say = false;
      Listen = false;
    }
  }
} 
  else {
    Say = false;
    Listen = false;
    Remember.from_task = event.CurrentTask;
    Redirect = 'task://fallback';
  }

  
  //End of your code.
  
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
   } catch (error) {
  console.error(error);
  callback( error);
  }
  };