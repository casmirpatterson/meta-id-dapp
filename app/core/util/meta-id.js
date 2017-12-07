import { bufferToHex, sha3 } from 'ethereumjs-util'

import { accounts } from 'core/util'

/**
 * Utility function to convert `username` into META-ID `id`
 *
 * @param  {String} username META-ID username
 * @return {String}          META-ID id
 */
export const getMetaIdFromUsername = username => bufferToHex(sha3(username))

/**
 * Utility function to create a valid META Claim object to verify a new claim
 *
 * @param  {Object} account            Ethereum account object
 * @param  {String} account.address    Account Ethereum address
 * @param  {String} account.privateKey Account private key
 * @param  {Object} claimMessage       Raw claim message
 * @param  {Object} extraData          Any extra properties to add to claim object
 * @return {Object}                    META Claim object
 */
export const createMetaClaimObject = (
  account,
  claimMessage,
  extraData = {}
) => {
  return {
    address: account.address,
    claimHash: bufferToHex(sha3(claimMessage)),
    claimMessage: claimMessage,
    signature: accounts.signMessage(claimMessage, account.privateKey),
    ...extraData,
  }
}

/**
 * Utility function to create a valid META-ID object to register a new identity
 *
 * @param  {Object} account  Ethereum account object
 * @param  {String} username Identity username
 * @return {Object}          META-ID object
 */
export const createMetaIdObject = (account, username) => {
  return {
    owner: account.address,
    signature: accounts.signMessage(username, account.privateKey),
    username: username,
  }
}
