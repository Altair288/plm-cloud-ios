/**
 * Password encryption utilities matching the PLM Cloud auth-service RSA-OAEP contract.
 *
 * Backend:  RSA/ECB/OAEPWithSHA-256AndMGF1Padding
 *           (OAEP hash = SHA-256, MGF1 hash = SHA-1)
 *
 * A concrete React Native implementation requires a native crypto library such as
 * `react-native-quick-crypto`. Register the implementation with `setEncryptionImpl`
 * during app startup (e.g. in the root layout) before any login attempt.
 */

type EncryptFn = (plaintext: string, publicKeyPem: string) => Promise<string>;

let _impl: EncryptFn | null = null;

/** Register the RSA-OAEP encryption implementation at app startup. */
export function setEncryptionImpl(fn: EncryptFn): void {
  _impl = fn;
}

/**
 * Encrypt a plaintext password with the server's public key.
 * Returns a base64-encoded ciphertext string.
 *
 * @throws Error if no implementation has been registered via `setEncryptionImpl`.
 */
export async function encryptPassword(
  plaintext: string,
  publicKeyPem: string,
): Promise<string> {
  if (_impl == null) {
    throw new Error(
      '[password-encryption] No RSA-OAEP implementation registered. ' +
        'Call setEncryptionImpl() in your root layout before using the auth service.',
    );
  }
  return _impl(plaintext, publicKeyPem);
}
