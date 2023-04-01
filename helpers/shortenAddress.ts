/**
 * Shortens an Ethereum address to 10 characters
 * @param address the address of the contract or wallet to shorten
 * @returns the shortened address
 */
export function shortenAddress(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}
