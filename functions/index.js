 const functions = Runtime.getFunctions();
 const BankAccTypeHandler = require(functions['bank_account_type_task'].path);
 const BankAccountnumberHandler = require(functions['bank_account_number_task'].path);
 const AgentTransferTypeHandler = require(functions['agent_transfer_task'].path);
 const CheckAccTypeHandler = require(functions['check_bank_acc_type_task'].path);
 const CheckAccNumberHandler = require(functions['check_bank_acc_number_task'].path);
 const yesNoHandler = require(functions['yes_no_task'].path);
 const CheckRoutingNumberTaskHandler = require(functions['check_routing_number_task'].path);
const greetingTaskHandler = require(functions['greeting_task'].path);
const goodbyeTaskHandler = require(functions['goodbye_task'].path);
const collectFallbackTaskHandler = require(functions['collect_fallback_task'].path);
const fallbackHandler = require(functions['fallback_task'].path);


const responseBuilder = require(functions['responseBuilder'].path);
// this Index test 01/09/2021
exports.handler = async (context, event, callback) => {
  const { CurrentTask } = event;
console.log(functions);
console.log(functions['greeting_task'].path);
console.log("currenttask"+ CurrentTask);
  // calling task handlers
  switch (CurrentTask) {

    case 'bank_account_type':
      console.log('bank_account_type');
      await BankAccTypeHandler.bank_account_type_task(context, event, callback,responseBuilder.RB);
      break;
    case 'bank_account_number':
      console.log('bank_account_number');
      await BankAccountnumberHandler.bank_account_number_task(context, event, callback,responseBuilder.RB);
      break;

      case 'check_bank_acc_type':
      console.log('check_bank_acc_type');
      await CheckAccTypeHandler.check_bank_acc_type_task(context, event, callback,responseBuilder.RB);
      break;

      case 'agent_transfer':
      console.log('agent_transfer');
      await AgentTransferTypeHandler.agent_transfer_task(context, event, callback,responseBuilder.RB);
      break;

    case 'check_bank_acc_number':
      console.log('check_bank_acc_number');
      await CheckAccNumberHandler.check_bank_acc_number_task(context, event, callback,responseBuilder.RB);
      break;

    case 'yes_no':
      console.log('yes_no');
      await yesNoHandler.yes_no_task(context, event, callback,responseBuilder.RB);
      break;

    case 'check_routing_number':
      console.log('checkrouting');
      await CheckRoutingNumberTaskHandler.check_routing_number_task(context, event, callback,responseBuilder.RB);
      break;

    case 'greeting':
      console.log('greeting');
      await greetingTaskHandler.greeting_task(context, event, callback,responseBuilder.RB);
      break;

    case 'goodbye':
      await goodbyeTaskHandler.goodbye_task(context, event, callback,responseBuilder.RB);
      break;

    case 'collect_fallback':
      await collectFallbackTaskHandler.collect_fallback_task(context, event, callback,responseBuilder.RB);
      break;

    case 'fallback':
     await fallbackHandler.fallback_task(context, event, callback,responseBuilder.RB);
      break;

    default:
      await fallbackHandler.fallback_task(context, event, callback,responseBuilder.RB);
      break;
  }
};