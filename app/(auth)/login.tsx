// Tela de login: junta o useForm, as regras do Yup e o CampoTexto.
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
// NOVO: Link entra no import, para o atalho que leva ao cadastro.
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CampoTexto } from "@/components/CampoTexto";
import { DadosLogin, esquemaLogin } from "@/validacao/login";

export default function LoginScreen() {
  const router = useRouter();

  // useForm cria o formulário e devolve as ferramentas:
  //  - control: passado aos campos (é como o CampoTexto se liga ao formulário)
  //  - handleSubmit: valida tudo antes de chamar a função de envio
  //  - setError: coloca um erro que veio de fora (ex.: resposta do servidor)
  //  - formState.errors: as mensagens de cada campo
  //  - formState.isSubmitting: verdadeiro enquanto o envio está em andamento
  // Os valores digitados ficam guardados FORA do estado do React, por isso
  // não precisamos de um useState para cada campo, erro e indicador.
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DadosLogin>({
    // Valor inicial de cada campo. Sem isto o React avisa que o campo mudou
    // de "não controlado" para "controlado".
    defaultValues: { usuario: "", senha: "" },
    // Liga as regras do Yup (src/validacao/login.ts) ao formulário.
    resolver: yupResolver(esquemaLogin),
    // Primeira validação de cada campo: quando a pessoa SAI dele.
    mode: "onBlur",
    // Depois do primeiro erro, confere a cada tecla: o erro some assim que é corrigido.
    reValidateMode: "onChange",
  });

  // Só é chamada pelo handleSubmit se TODAS as regras passarem.
  // É async, e enquanto ela não termina o isSubmitting fica verdadeiro.
  async function aoEnviar(dados: DadosLogin) {
    // Simulação de 1,2 s de rede. No encontro 9 isto vira a chamada à API.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Aceita só as credenciais de teste da DummyJSON, a API do encontro 9.
    if (dados.usuario !== "emilys" || dados.senha !== "emilyspass") {
      // Erro do formulário inteiro (root), e não de um campo.
      // Mensagem genérica DE PROPÓSITO: dizer "usuário não existe" ensinaria
      // a quem ataca quais usuários existem na base.
      setError("root", { message: "Usuário ou senha incorretos." });
      return;
    }

    console.log("autenticado:", dados.usuario);
    // replace troca a tela atual pelo catálogo em vez de empilhar:
    // depois de entrar, o botão voltar não leva de volta ao login.
    router.replace("/");
  }

  return (
    // Empurra o conteúdo para o teclado não cobrir os campos.
    // 'padding' no iOS e nada no Android é o que a documentação do Expo recomenda.
    <KeyboardAvoidingView
      className="flex-1 bg-white dark:bg-fundo"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerClassName="flex-grow justify-center p-6"
        // Sem isto, com o teclado aberto, o primeiro toque no botão
        // só fecha o teclado e a pessoa precisa tocar duas vezes.
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-sky-700 dark:text-destaque text-3xl font-bold mb-1">
          Vitrine
        </Text>
        <Text className="text-slate-500 dark:text-suave text-sm mb-8">
          Entre para ver seus favoritos.
        </Text>

        {/* Quadro do erro geral (root): só aparece quando existe */}
        {errors.root ? (
          <View
            className="bg-red-50 dark:bg-alerta/20 border border-red-600
                       dark:border-alerta rounded-lg p-3 mb-4"
          >
            <Text className="text-red-700 dark:text-alerta text-sm">
              {errors.root.message}
            </Text>
          </View>
        ) : null}

        {/* name precisa ser igual à chave do esquema Yup ("usuario", sem acento).
            O ?. evita erro quando o campo está certo e não há mensagem. */}
        <CampoTexto
          control={control}
          name="usuario"
          rotulo="Usuário"
          erro={errors.usuario?.message}
          placeholder="ex.: emilys"
          autoCapitalize="none" // não começa com maiúscula (Emilys ≠ emilys)
          autoCorrect={false} // o corretor não "conserta" o nome de usuário
          autoComplete="username"
        />

        <CampoTexto
          control={control}
          name="senha"
          rotulo="Senha"
          erro={errors.senha?.message}
          placeholder="mínimo de 6 caracteres"
          secureTextEntry // mascara a senha
          autoComplete="password"
        />

        {/* handleSubmit(aoEnviar): valida tudo; se der erro, preenche as
            mensagens e NÃO chama aoEnviar. disabled durante o envio impede
            o toque duplo (que geraria login ou cadastro duplicado). */}
        <Pressable
          onPress={handleSubmit(aoEnviar)}
          disabled={isSubmitting}
          accessibilityRole="button"
          accessibilityState={{ disabled: isSubmitting }}
          className={`rounded-full py-4 items-center mt-2 ${
            isSubmitting
              ? "bg-slate-200 dark:bg-superficie"
              : "bg-sky-600 dark:bg-destaque active:opacity-80"
          }`}
        >
          <Text
            className={`font-bold ${
              isSubmitting
                ? "text-slate-500 dark:text-suave"
                : "text-white dark:text-fundo"
            }`}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Text>
        </Pressable>

        {/* NOVO: caminho de ida para o cadastro. replace troca a tela em vez
            de empilhar: ir e vir entre login e cadastro não acumula telas no voltar. */}
        <Link
          href="/cadastro"
          replace
          className="text-sky-700 dark:text-destaque text-center mt-6"
        >
          Ainda não tenho conta
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
