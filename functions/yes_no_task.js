// yes_no handler function
exports.yes_no_task = async function(context, event, callback, RB)  
{
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
  const { CurrentInput } = event;
  Remember.repeat = false;

  console.log(event.Field_yes_no_Value);
  console.log("Current Input: "+ CurrentInput);
  let YesNo=CheckYesNoInput(CurrentInput);
  console.log('yesno: '+ YesNo);
 

  switch ( Memory.question ) {
    
    case 'routing_check':
      if (event.Field_yes_no_Value === 'Yes' || YesNo==='Yes') {
        Redirect = 'task://bank_account_number';
        break;
      } 

      else if (event.Field_yes_no_Value === 'No' || YesNo==='No') {
        Remember.flag='No';
        Redirect = 'task://greeting';
        break;
      } 

      else {
        Say = false;
        Redirect = 'task://fallback';
        break;
      }

      case 'bank_acc_type_check':
      if (event.Field_yes_no_Value === 'Yes' || YesNo==='Yes') {
        //Redirect = 'task://goodbye';
        break;
      }

      else if (event.Field_yes_no_Value === 'No' || YesNo==='No') {
        Remember.BankTepeCheck='No';
        Redirect = 'task://bank_account_type';
        break;
      } 

      else {
        Say = false;
        Redirect = 'task://fallback';
        break;
      }
      
    case 'bank_acc_num_check':
      if (event.Field_yes_no_Value === 'Yes' || YesNo==='Yes') {
        Redirect = 'task://bank_account_type';
        break;
        }

      else if (event.Field_yes_no_Value === 'No' || YesNo==='No') {
        Remember.bankAccCheck='No';
        Redirect = 'task://bank_account_number';
        break;
      } 
      
      else {
        Say = false;
        Redirect = 'task://fallback';
        break;
      }
      
    case 'agent_transfer':
      if (event.Field_yes_no_Value === 'Yes') {
       Redirect = 'task://agent_transfer';
       break;
      } 

      else if (event.Field_yes_no_Value === 'No') {
        Redirect = 'task://goodbye';
        break;
      } 
      
      else {
        Say = false;
        Redirect = 'task://fallback';
        break;
      }

    case 'additional_help':
      if (event.Field_yes_no_Value === 'Yes') {

        
        Redirect = 'task://agent_transfer';

        break;

      } else if (event.Field_yes_no_Value === 'No') {

        // Say = 'Thanks for calling. Good bye.';
        Say = false;
        Listen = false;
        Redirect = 'task://goodbye';

        break;
        
      } else {
        Say = false;
        Redirect = 'task://fallback';

        break;
      }
      
    default:
      Say = false;
      Redirect = 'task://fallback';

      break;
  }
  
  //End of your code.
  
   RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  
   } catch (error) {
  console.error(error);
  callback( error);
  }
  };

  function CheckYesNoInput(x) { 
    let sYesNo='';
        
    if(x.includes('correct')) sYesNo='Yes';
   // if(x.includes('It is correct')) sYesNo='Yes';
    //if(x.includes('That is correct')) sYesNo='Yes';
    if(x.includes('sure')) sYesNo='Yes';
    if(x.includes('yeah')) sYesNo='Yes';
    if(x.includes('yah')) sYesNo='Yes';
    if(x.includes('yep')) sYesNo='Yes';
    if(x.includes('okay')) sYesNo='Yes';
    if(x.includes('OK')) sYesNo='Yes';
    if(x.includes('agree')) sYesNo='Yes';
    if(x.includes('yup')) sYesNo='Yes';
    if(x.includes('You got it.')) sYesNo='Yes';
    if(x.includes('It is true')) sYesNo='Yes';

    if(x.includes('not')) sYesNo='No';
    if(x.includes('wrong')) sYesNo='No';
    if(x.includes('not correct')) sYesNo='No';
    if(x.includes('It is not correct')) sYesNo='No';
    if(x.includes('It is wrong')) sYesNo='No';
    if(x.includes('noway')) sYesNo='No';
    if(x.includes('nah')) sYesNo='No';
    if(x.includes('negative')) sYesNo='No';
    if(x.includes('it is not true')) sYesNo='No';
    
    //else if(x.includes('it is')) sYesNo='Yes';

console.log("sYesNo: "+ sYesNo);
    
    return sYesNo;
}


    
  