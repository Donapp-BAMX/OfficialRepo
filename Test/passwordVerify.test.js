import verificarContrasena from '../verificarContrasena';

describe("verificarContrasena", () => {
  test("Debería devolver true para contraseñas con al menos 8 caracteres y 2 números", () => {
    expect(verificarContrasena("contraseña123")).toBe(true);
    expect(verificarContrasena("abcdefgh1i")).toBe(true);
  });

  test("Debería devolver false para contraseñas con menos de 8 caracteres", () => {
    expect(verificarContrasena("abc")).toBe(false);
    expect(verificarContrasena("1234567")).toBe(false);
  });

  test("Debería devolver false para contraseñas vacías", () => {
    expect(verificarContrasena("")).toBe(false);
  });

  test("Debería devolver false para contraseñas con menos de 2 números", () => {
    expect(verificarContrasena("contraseña1")).toBe(false);
    expect(verificarContrasena("abcdefghi")).toBe(false);
  });
});
