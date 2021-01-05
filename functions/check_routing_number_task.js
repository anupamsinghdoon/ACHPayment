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

  const routing_num = Memory.twilio.collected_data.collect_routing.answers.routing_num.answer ||
                      event.Field_routing_num_Value ||
                      event.Field_routing_num_alt_Value;
            
    
if(Memory.checkRouting_fail_counter===undefined)
      {
        Remember.checkRouting_fail_counter=1;
        console.log('Counter: '+Remember.checkRouting_fail_counter);
      }
      else{
        Remember.checkRouting_fail_counter = Memory.checkRouting_fail_counter + 1;
        console.log('Counter: '+Remember.checkRouting_fail_counter);
      }
      if(Memory.checkRouting_fail_counter >= 2)
      {
        Say = false;
      Listen = false;
      Remember.checkRouting_fail_counter = 0;
      Redirect = 'task://agent_transfer';
      }
else
{
  if ( routing_num ) {
    const validRoutingNum = brnv.ABARoutingNumberIsValid(routing_num);

    if ( validRoutingNum ) {
      Say = `You said <say-as interpret-as='digits'>${routing_num}</say-as>. `;
      Prompt = `Is that correct? say yes or no .`;
    
      Say += Prompt;
      
      Remember.bank_acc_routing = routing_num;
      Remember.question = 'routing_check';
    
      Listen = true;
      Tasks=['yes_no', 'agent_transfer'];
    } else {
      Collect = {
        "name": "collect_routing",
        "questions": [
          {
            "question": `The routing number you provided is not valid. Please say or use your telephone keypad to provide a valid routing number.`,
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
      // Say = `The routing number you provided is not valid. `;
      // Prompt = `Please provide a valid routing number.`;
    
      Say = false;
      Listen = false;
    }
  } else {
    Say = false;
    Listen = false;
    Remember.from_task = event.CurrentTask;
    Redirect = 'task://fallback';
  }
}

  
  //End of your code.
  
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
   } catch (error) {
  console.error(error);
  callback( error);
  }
  };