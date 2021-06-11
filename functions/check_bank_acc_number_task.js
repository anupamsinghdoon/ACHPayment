exports.check_bank_acc_number_task =async function(context, event, callback,RB) {
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

  //Remember.task_fail_counter = 0;
  Remember.repeat = false;

  // collact bank account number from twilio memory
  const bank_acc_num = Memory.twilio.collected_data.collect_bank_acc.answers.bank_acc.answer ||
                      event.Field_bank_acc_num_Value ||
                      event.Field_bank_acc_num_alt_Value;
  
   // Confirm bank account number                  
  if ( bank_acc_num ) {
    Say = `You said <say-as interpret-as='digits'>${bank_acc_num}</say-as>.`;
    Prompt = ` Is that correct? say yes or no. You can also press 1 for yes and 2 for no.`;
  
    Say += Prompt;
    
    Remember.bank_acc_num = bank_acc_num;
    Remember.question = 'bank_acc_num_check';
  
    Listen = {
      "voice_digits":{
        "num_digits": 1,
        "finish_on_key": "#",
        "redirects": {
          1: "task://bank_account_type",
          2: "task://bank_account_number"
        }
      }
    }
    Tasks=['yes_no', 'agent_transfer'];
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