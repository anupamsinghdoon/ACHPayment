exports.collect_fallback_task =async function(context, event, callback,RB) {
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
  console.log('collect_fallback_task');
switch(Memory.question)
{
  case 'greeting':
    if(Memory.CallectFallback_greetings_counter===undefined)
     Remember.CallectFallback_greetings_counter=1;
    else
     Remember.CallectFallback_greetings_counter = Memory.CallectFallback_greetings_counter + 1;

     if(Memory.CallectFallback_greetings_counter >= 1)
     {
       Say = false;
       Listen = false;
       Remember.CallectFallback_greetings_counter = 0;
       Redirect = 'task://agent_transfer';
     }
     else
       Redirect = 'task://greeting';
       break;

  case 'bank_acc_type_check':
    Remember.bank_acc_type_check='No';
    if(Memory.CallectFallback_bankAccType_counter===undefined)
     Remember.CallectFallback_bankAccType_counter=1;
    else
     Remember.CallectFallback_bankAccType_counter = Memory.CallectFallback_bankAccType_counter + 1;

     if(Memory.CallectFallback_bankAccType_counter >= 1)
     {
       Say = false;
       Listen = false;
       Remember.CallectFallback_bankAccType_counter = 0;
       Redirect = 'task://agent_transfer';
     }
     else
       Redirect = 'task://bank_account_type';
        break;

   case 'bank_acc_num_check':
    Remember.bank_acc_num_check='No';
    if(Memory.CallectFallback_AccNumCheck_counter===undefined)
     Remember.CallectFallback_AccNumCheck_counter=1;
    else
     Remember.CallectFallback_AccNumCheck_counter = Memory.CallectFallback_AccNumCheck_counter + 1;

     if(Memory.CallectFallback_AccNumCheck_counter >= 1)
     {
       Say = false;
       Listen = false;
       Remember.CallectFallback_AccNumCheck_counter = 0;
       Redirect = 'task://agent_transfer';
     }
     else
       Redirect = 'task://bank_account_number';
        break;

    default:
      Say = false;
      Redirect = 'task://agent_transfer';
      break;
     
} 
  //End of your code.
  
  RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
   } catch (error) {
  console.error(error);
  callback( null,error);
  }
  };