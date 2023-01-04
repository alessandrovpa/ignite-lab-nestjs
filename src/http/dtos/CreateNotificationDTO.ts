import { IsNotEmpty, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateNotificationDTO {
  @IsUUID('all', { message: 'Formato de ID inválido!' })
  @IsNotEmpty({ message: 'ID do destinatário não pode ser vazio!' })
  @ApiProperty()
  recipientId: string;

  @IsNotEmpty({ message: 'Mensagem da notificação não pode ser vazia!' })
  @Length(5, 120, {
    message(validationArguments) {
      if (validationArguments.value.length <= 5)
        return 'A mensagem deve conter mais que 5 caracteres!';
      else return 'A mensagem não pode ter mais que 120 caracteres!';
    },
  })
  @ApiProperty()
  content: string;

  @IsNotEmpty({ message: 'Categoria da notificação não pode ser vazia!' })
  @ApiProperty()
  category: string;
}

export { CreateNotificationDTO };
