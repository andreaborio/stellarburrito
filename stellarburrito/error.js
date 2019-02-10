function errorManager(source, code) {
    let message = ''
    switch (source) {
        case 'memo':
            switch (code) {
                case -1:
                    message = "Invalid Memo type \n\r Please use one of the following options: \n\r -'text'\n\r -'id'\n\r -'return'"
                    break
                case -2:
                    message = "Invalid Memo size \n\r Memo type text supports up to 28 bytes (26 UTF-8 chars)"
                    break
                case -3:
                    message = "Invalid Memo size \n\r Memo type ID supports values between 0 to 18,446,744,073,709,551,615"
                    break
                case -4:
                    message = "Invalid Memo size \n\r Memo type return supports a 32 byte hash intended to be interpreted as the hash of the transaction the sender is refunding."
                    break
            }
            break
        case 'changeTrust':
            switch (code) {
                case 'op_malformed':
                case -1:
                    message = "CHANGE_TRUST_MALFORMED \n\r  OpMalformed is the string code used to specify the operation was malformed in some way. "
                    break

                case 'op_no_issuer':
                case -2:
                    message = "CHANGE_TRUST_OP_NO_ISSUER \n\r OpNoIssuer occurs when a operation does not correctly specify an issuing asset "
                    break

                case 'op_low_reserve':
                case -3:
                    message = "CHANGE_TRUST_LOW_RESERVE	 \n\r  OpLowReserve is the string code used to specify the operation failed because the account in question does not have enough balance to satisfy what their new minimum balance would be"
                    break

                case 'op_invalid_limit':
                case -4:
                    message = "CHANGE_TRUST_INVALID_LIMIT \n\r 	Limit trust is invalid in some way "
                    break
                default:
                    message = "Error during change trust"
                    break
            }
            break
        case 'createAccount':
            switch (code) {
                case 'op_malformed':
                case -1:
                    message = "CREATE_ACCOUNT_MALFORMED \n\r The destination is invalid  "
                    break

                case 'op_underfunded':
                case -2:
                    message = "CREATE_ACCOUNT_UNDERFUNDED \n\r The source account performing the command does not have enough funds to give destination the starting balance amount of XLM and still maintain its minimum XLM reserve plus satisfy its XLM selling liabilities. "
                    break

                case 'op_low_reserve':
                case -3:
                    message = "CREATE_ACCOUNT_LOW_RESERVE	 \n\r This operation would create an account with fewer than the minimum number of XLM an account must hold. "
                    break

                case 'op_already_exists':
                case -4:
                    message = "CREATE_ACCOUNT_ALREADY_EXIST \n\r 	The destination account already exists. "
                    break
                default:
                    message = "Error during creation of the account "
                    break
            }
            break
        case 'accountMerge':
            switch (code) {
                case 'op_malformed':
                case -1:
                    message = "ACCOUNT_MERGE_MALFORMED \n\r The destination is invalid  "
                    break

                case 'op_no_account':
                case -2:
                    message = "ACCOUNT_MERGE_OP_NO_ACCOUNT \n\r "
                    break

                case 'op_immutable_set':
                case -3:
                    message = "ACCOUNT_MERGE_OP_IMMUTABLE_SET	 \n\r Check flags of the source account "
                    break

                case 'op_has_sub_entries':
                case -4:
                    message = "ACCOUNT_MERGE_OP_HAS_SUB_ENTRIES \n\r 	Verify data of account and trustline balances "
                    break
                case 'op_seq_num_too_far':
                case -5:
                    message = "ACCOUNT_MERGE_OP_NUM_TOO_FAR \n\r  "
                    break
                case 'op_dest_full':
                case -5:
                    message = "ACCOUNT_MERGE_OP_NUM_TOO_FAR \n\r merge destination full  "
                    break
                default:
                    message = "Error during merge account "
                    break
            }
            break
        case 'manageData':
            switch (code) {
                case 'op_not_supported_yet':
                case -1:
                    message = "MANAGE_DATA_OP_NOT_SUPPORTED_YET \n\r  "
                    break

                case 'op_data_name_not_found':
                case -2:
                    message = "MANAGE_DATA_OP_DATA_NAME_NOT_FOUND \n\r Can't find the name of data"
                    break

                case 'op_low_reserve':
                case -3:
                    message = "MANAGE_DATA_LOW_RESERVE	 \n\r OpLowReserve is the string code used to specify the operation failed because the account in question does not have enough balance to satisfy what their new minimum balance would be"
                    break

                case 'op_data_invalid_name':
                case -4:
                    message = "MANAGE_DATA_OP_DATA_INVALID_NAME \n\r "
                    break
                default:
                    message = "Error during manage data "
                    break
            }
            break
        case 'loadAccount':
            switch (code) {
                case -1:
                    message = "Account not found\n\r please verify"
                    break
            }
            break
        case 'keyPair':
            switch (code) {
                case -1:
                    message = "Your private key is incorrect, please provide a correct private key"
                    break
            }

    }
    return message
}
module.exports = { errorManager }