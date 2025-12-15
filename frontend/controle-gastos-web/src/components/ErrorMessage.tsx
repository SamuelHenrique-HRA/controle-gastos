interface Props {
  message: string;
}

/**
 * Exibe mensagens de erro para o usuário
 */
export default function ErrorMessage({ message }: Props) {
  return <p style={{ color: "red" }}>{message}</p>;
}
