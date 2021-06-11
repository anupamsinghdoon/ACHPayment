exports.check_bank_acc_type_task =async function(context, event, callback,RB) {
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
    //console.log("memory:"+JSON.stringify(Memory));
    let bank_acc_type ='';
    let sYesNo='';
    
    //this code check that whether the memory have Bank aacount type or not
    if(Memory.twilio.collected_data!=undefined)
    {
      bank_acc_type = Memory.twilio.collected_data.collect_acctype.answers.bank_acc_type.answer;
    }
    
    //this code check bank_acc_type and confirm from user that the bank_acc_type is correct or not
    let x=bank_acc_type;
    if(x.includes('saving')) sYesNo='Savings';
    if(x.includes('checking')) sYesNo='Checking';
    if(x.includes('Saving')) sYesNo='Savings';
    if(x.includes('Checking')) sYesNo='Checking';
     if ( bank_acc_type ) {
       //console.log('check bank type: '+bank_acc_type);
       Say = `you said ${bank_acc_type}. `;
       Prompt = `Is that correct? say yes or no. You can also press 1 for yes and 2 for no.`;
     
       Say += Prompt;
       
       Remember.bank_acc_type = sYesNo;
       Remember.question = 'bank_acc_type_check';
     
       Listen = {
        "voice_digits":{
          "num_digits": 1,
          "finish_on_key": "#",
          "redirects": {
            1: "",
            2: "task://bank_account_type"
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