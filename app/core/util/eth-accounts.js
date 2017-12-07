import { bufferToHex, ecsign, sha3, toRpcSig } from 'ethereumjs-util'
import { fromV3 } from 'ethereumjs-wallet'

/**
 * Remove '0x' prefix from a given string if present
 *
 * @param  {String} str String to trim
 * @return {String}     String without '0x' prefix
 */
const removeHexPrefix = str => str.substring(0, 2) === '0x' && str.substring(2)

/**
 * Create an Ethereum account object from an encrypted keystore file
 *
 * @param  {Object} encryptedKeystore Valid Ethereum keystore file JSON
 * @param  {String} password          Password to decrypt the keystore
 * @return {Object}                   Constructed Ethereum account
 */
export const create = (encryptedKeystore, password) => {
  // decrypt `keystore` with `password`
  const decryptedKeystore = fromV3(encryptedKeystore, password)

  // extract private key from decrypted keystore
  const privateKey = removeHexPrefix(
    bufferToHex(decryptedKeystore.getPrivateKey())
  )

  // extract checksum hex address from decrypted keystore
  const address = decryptedKeystore.getChecksumAddressString()

  return {
    address,
    privateKey,
  }
}

/**
 * Generate a valid ECDSA signature for use with Ethereum RPC clients
 *
 * @param  {String} message    Message to sign
 * @param  {String} privateKey Private key to sign message with
 * @return {String}            ECDSA signature
 */
export const signMessage = (message, privateKey) => {
  // convert privateKey hex string to Buffer
  const bufferPrivateKey = Buffer.from(privateKey, 'hex')

  // create a sha3 hash of the message
  const msgHash = sha3(message)

  // generate signature of the message hash using the private key Buffer
  const signature = ecsign(msgHash, bufferPrivateKey)

  // convert signature to a hex string accepted by Ethereum RPC clients
  const rpcSignature = toRpcSig(signature.v, signature.r, signature.s)

  return rpcSignature
}
