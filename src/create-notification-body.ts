import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsUUID('all', { message: 'Formato de ID inválido!' })
  @IsNotEmpty({ message: 'ID do destinatário não pode ser vazio!' })
  recipientId: string;

  @IsNotEmpty({ message: 'Mensagem da notificação não pode ser vazia!' })
  @Length(5, 120, {
    message(validationArguments) {
      if (validationArguments.value.length <= 5)
        return 'A mensagem deve conter mais que 5 caracteres!';
      else return 'A mensagem não pode ter mais que 120 caracteres!';
    },
  })
  content: string;

  @IsNotEmpty({ message: 'Categoria da notificação não pode ser vazia!' })
  category: string;
}
