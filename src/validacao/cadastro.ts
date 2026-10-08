// Regras de validação do formulário de cadastro.
// Mesmo formato do login.ts: um objeto com uma regra para cada campo.
import * as yup from "yup";

export const esquemaCadastro = yup.object({
  nome: yup
    .string()
    .required("Informe seu nome")
    .min(3, "Escreva o nome com ao menos 3 letras"),
  email: yup
    .string()
    .required("Informe o e-mail")
    // Formato de e-mail pela regra do HTML: "ana" e "ana@" são recusados,
    // mas "ana@exemplo" passa, porque domínio sem ponto é válido na norma.
    .email("Digite um e-mail válido, como voce@exemplo.com"),
  senha: yup
    .string()
    .required("Crie uma senha")
    .min(6, "A senha precisa de ao menos 6 caracteres"),
  confirmacao: yup
    .string()
    // A mensagem de vazio é diferente do rótulo ("Confirme a senha"),
    // senão o erro pareceria um segundo rótulo.
    .required("Repita a senha")
    // REGRA ENTRE CAMPOS: yup.ref('senha') lê o valor atual do campo senha,
    // e oneOf exige que a confirmação esteja nessa lista de um item só,
    // ou seja, que seja igual à senha.
    .oneOf([yup.ref("senha")], "As senhas não conferem"),
});

// Tipo gerado das regras: { nome; email; senha; confirmacao }, todos string.
export type DadosCadastro = yup.InferType<typeof esquemaCadastro>;
