import { bufferToHex, sha3 } from 'ethereumjs-util'

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
 * @param  {Object} account      Ethereum account object
 * @param  {Object} claimMessage Raw claim message
 * @return {Object}              META Claim object
 */
export const createMetaClaimObject = (account, claimMessage) => {
  return {
    address: account.address,
    claimHash: sha3(claimMessage),
    claimMessage: claimMessage,
    signature: account.sign(claimMessage),
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
    signature: account.sign(username),
    username: username,
  }
}
