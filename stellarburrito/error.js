function errorManager(source, code) {
    switch (source) {
        case 'memo':
            switch (code) {
                case -1:
                    return "Invalid Memo type \n\r Please use one of the following options: \n\r -'text'\n\r -'id'\n\r -'return'"
                    break
                case -2:
                    return "Invalid Memo size \n\r Memo type text supports up to 28 bytes (26 UTF-8 chars)"
                    break
                case -3:
                    return "Invalid Memo size \n\r Memo type ID supports values between 0 to 18,446,744,073,709,551,615"
                    break
                case -4:
                    return "Invalid Memo size \n\r Memo type return supports a 32 byte hash intended to be interpreted as the hash of the transaction the sender is refunding."
                    break
            }
            break
        case 'changeTrust':
            switch (code) {
                case 'op_malformed':
                case -1:
                    return "CHANGE_TRUST_MALFORMED \n\r  OpMalformed is the string code used to specify the operation was malformed in some way. "
                    break

                case 'op_no_issuer':
                case -2:
                    return "CHANGE_TRUST_OP_NO_ISSUER \n\r OpNoIssuer occurs when a operation does not correctly specify an issuing asset "
                    break

                case 'op_low_reserve':
                case -3:
                    return "CHANGE_TRUST_LOW_RESERVE	 \n\r  OpLowReserve is the string code used to specify the operation failed because the account in question does not have enough balance to satisfy what their new minimum balance would be"
                    break

                case 'op_invalid_limit':
                case -4:
                    return "CHANGE_TRUST_INVALID_LIMIT \n\r 	Limit trust is invalid in some way "
                    break
                default:
                    return "Error during change trust"
                    break
            }
            break
        case 'createAccount':
            switch (code) {
                case 'op_malformed':
                case -1:
                    return "CREATE_ACCOUNT_MALFORMED \n\r The destination is invalid  "
                    break

                case 'op_underfunded':
                case -2:
                    return "CREATE_ACCOUNT_UNDERFUNDED \n\r The source account performing the command does not have enough funds to give destination the starting balance amount of XLM and still maintain its minimum XLM reserve plus satisfy its XLM selling liabilities. "
                    break

                case 'op_low_reserve':
                case -3:
                    return "CREATE_ACCOUNT_LOW_RESERVE	 \n\r This operation would create an account with fewer than the minimum number of XLM an account must hold. "
                    break

                case 'op_already_exists':
                case -4:
                    return "CREATE_ACCOUNT_ALREADY_EXIST \n\r 	The destination account already exists. "
                    break
                default:
                    return "Error during creation of the account "
                    break
            }
            break
        case 'accountMerge':
            switch (code) {
                case 'op_malformed':
                case -1:
                    return "ACCOUNT_MERGE_MALFORMED \n\r The destination is invalid  "
                    break

                case 'op_no_account':
                case -2:
                    return "ACCOUNT_MERGE_OP_NO_ACCOUNT \n\r "
                    break

                case 'op_immutable_set':
                case -3:
                    return "ACCOUNT_MERGE_OP_IMMUTABLE_SET	 \n\r Check flags of the source account "
                    break

                case 'op_has_sub_entries':
                case -4:
                    return "ACCOUNT_MERGE_OP_HAS_SUB_ENTRIES \n\r 	Verify data of account and trustline balances "
                    break
                case 'op_seq_num_too_far':
                case -5:
                    return "ACCOUNT_MERGE_OP_NUM_TOO_FAR \n\r  "
                    break
                case 'op_dest_full':
                case -5:
                    return "ACCOUNT_MERGE_OP_NUM_TOO_FAR \n\r merge destination full  "
                    break
                default:
                    return "Error during merge account "
                    break
            }
            break
        case 'manageData':
            switch (code) {
                case 'op_not_supported_yet':
                case -1:
                    return "MANAGE_DATA_OP_NOT_SUPPORTED_YET \n\r  "
                    break

                case 'op_data_name_not_found':
                case -2:
                    return "MANAGE_DATA_OP_DATA_NAME_NOT_FOUND \n\r Can't find the name of data"
                    break

                case 'op_low_reserve':
                case -3:
                    return "MANAGE_DATA_LOW_RESERVE	 \n\r OpLowReserve is the string code used to specify the operation failed because the account in question does not have enough balance to satisfy what their new minimum balance would be"
                    break

                case 'op_data_invalid_name':
                case -4:
                    return "MANAGE_DATA_OP_DATA_INVALID_NAME \n\r "
                    break
                default:
                    return "Error during manage data "
                    break
            }
            break
        case 'loadAccount':
            switch (code) {
                case -1:
                    return "Account not found\n\r please verify"
                    break
            }
            break
        case 'keyPair':
            switch (code) {
                case -1:
                    return "Your private key is incorrect, please provide a correct private key"
                    break
            }
            break
        case 'payment':
            switch (code) {
                case 'op_malformed':
                case -1:
                    return "PAYMENT_MALFORMED \n\r  OpMalformed is the string code used to specify the operation was malformed in some way. "
                    break
                case 'op_underfunded':
                case -2:
                    return "PAYMENT_UNDERFUNDED \n\r The source account performing the command does not have enough funds to give destination the starting balance amount of XLM and still maintain its minimum XLM reserve plus satisfy its XLM selling liabilities. "
                    break
                case 'op_src_no_trust':
                case -3:
                    return "PAYMENT_SOURCE_NO_TRUST \n\r The source account doesn't have a trustline for this asset"
                    break
                case 'op_src_not_authorized':
                case -4:
                    return "PAYMENT_SOURCE_NOT_AUTHORIZED \n\r The source account is not authorized to process this payment"
                    break
                case 'op_no_destination':
                case -5:
                    return "PAYMENT_NO_DESTINATION \n\r Provide a valid destination for the payment"
                    break
                case 'op_no_trust':
                case -3:
                    return "PAYMENT_NO_TRUST \n\r The destination account doesn't have a trustline for this asset"
                    break
                case 'op_not_authorized':
                case -4:
                    return "PAYMENT_NOT_AUTHORIZED \n\r The desintation account is not authorized to hold this asset"
                    break
                case 'op_line_full':
                case -5:
                    return "PAYMENT_LINE_FULL \n\r OpLineFull occurs when a payment would cause a destination account to exceed their declared trust limit for the asset being sent."
                    break
                case 'op_no_issuer':
                case -6:
                    return "PAYMENT_OP_NO_ISSUER \n\r OpNoIssuer occurs when a operation does not correctly specify an issuing asset "
                    break
                default:
                    return "PAYMENT_ERROR \n\r" + code
                    break
            }
        case 'manageOffer':
            switch (code) {
                case 'op_malformed':
                case -1:
                    return "MANAGE_OFFER_MALFORMED \n\r  OpMalformed is the string code used to specify the operation was malformed in some way. "
                    break
                case 'op_underfunded':
                case -2:
                    return "MANAGE_OFFER_UNDERFUNDED \n\r The source account performing the command does not have enough funds to give destination the starting balance amount of XLM and still maintain its minimum XLM reserve plus satisfy its XLM selling liabilities. "
                    break
                case 'op_sell_no_trust':
                case -3:
                    return "MANAGE_OFFER_SELL_NO_TRUST \n\r The source account doesn't have a trustline to the selling asset"
                    break
                case 'sell_not_authorized':
                case -4:
                    return "MANAGE_OFFER_SELL_NOT_AUTHORIZED \n\r The account creating the offer is not authorized to sell this asset."
                    break
                case 'buy_not_authorized':
                case -5:
                    return "MANAGE_OFFER_BUY_NOT_AUTHORIZED \n\r The account creating the offer is not authorized to buy this asset."
                    break
                case 'op_buy_no_trust':
                case -3:
                    return "MANAGE_OFFER_NO_TRUST \n\r The destination account doesn't have a trustline for buying this asset"
                    break
                case 'sell_not_authorized':
                case -4:
                    return "MANAGE_OFFER_NOT_AUTHORIZED \n\r The desintation account is not authorized to hold this asset"
                    break
                case 'op_line_full':
                case -5:
                    return "MANAGE_OFFER_LINE_FULL \n\r OpLineFull occurs when a payment would cause a destination account to exceed their declared trust limit for the asset being sent."
                    break
                case 'op_sell_no_issuer':
                case -6:
                    return "MANAGE_OFFER_OP_SELL_NO_ISSUER \n\r OpNoIssuer occurs when a operation does not correctly specify an issuing asset for sell"
                    break
                case 'buy_no_issuer':
                case -7:
                    return "MANAGE_OFFER_BUY_NO_ISSUER \n\r OpNoIssuer occurs when a operation does not correctly specify an issuing asset for sell"
                    break
                case 'op_offer_not_found':
                case -8:
                    return "MANAGE_OFFER_NOT_FOUND \n\r An offer with that offerID cannot be found."
                    break
                case 'op_low_reserve':
                case -9:
                    return "MANAGE_OFFER_LOW_RESERVE \n\r  OpLowReserve is the string code used to specify the operation failed because the account in question does not have enough balance to satisfy what their new minimum balance would be"
                    break
                case 'op_cross_self':
                case -10:
                    return "MANAGE_OFFER_CROSS_SELF \n\r  The account has opposite offer of equal or lesser price active, so the account creating this offer would immediately cross itself."
                    break
                default:
                    return "PAYMENT_ERROR \n\r" + code
                    break
            }
            break
    }
}
module.exports = errorManager 