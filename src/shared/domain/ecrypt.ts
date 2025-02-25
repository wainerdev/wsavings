export interface Ecrypt {
  passwordEncrypt(pass: string): Promise<string>;
  comparePass(pass: string, hash: string): Promise<boolean>;
  generateToken(payload: { id: string }): Promise<string>;
}
