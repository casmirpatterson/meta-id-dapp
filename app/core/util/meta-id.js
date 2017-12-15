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
 * @param  {String} subject            META-ID `id` of subject (hash of `username`)
 * @param  {Object} extraData          Any extra properties to add to claim object
 * @return {Object}                    META Claim object
 */
export const createMetaClaimObject = (
  account,
  claimMessage,
  subject,
  extraData = {}
) => {
  return {
    address: account.address,
    claimHash: bufferToHex(sha3(claimMessage)),
    claimMessage: claimMessage,
    subject: subject,
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

/**
 * Truncate a META-ID owner
 *
 * @example 0x2f138CC4179cA8FF8504cbE74e52f321F855B541 => 0x2f1...541
 *
 * @param  {String} owner Ethereum address to truncate
 * @return {String}       Truncated address
 */
export const getTruncatedMetaIdOwner = (owner = '') => {
  return `${owner.substring(0, 5)}...${owner.substring(39)}`
}
