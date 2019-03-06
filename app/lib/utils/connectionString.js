import decode from 'lndconnect/decode'
import get from 'lodash.get'
/**
 * Check for a valid lndconnect uri.
 * @param  {String}  value String to validate.
 * @return {Boolean}       Boolean indicating wether the string is a valid or not.
 */
export function isValidLndConnectUri(value) {
  try {
    const { host } = decode(value)
    return Boolean(host)
  } catch (e) {
    return false
  }
}

/**
 * Check for a valid BtcPayServer connection string.
 * @param  {String}  value String to validate.
 * @return {Boolean}  Boolean indicating wether the string is a valid or not.
 */
export function isValidBtcPayConfig(value) {
  try {
    const config = JSON.parse(value)
    const allConfigs = get(config, 'configurations', [])
    const params = allConfigs.find(c => c.type === 'grpc' && c.cryptoCode === 'BTC') || {}
    const { host, port, macaroon } = params
    return Boolean(host && port && macaroon)
  } catch (e) {
    return false
  }
}
