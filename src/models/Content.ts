class Content {
  private content: string;

  private validateContent(content: string): void {
    if (content.length < 5 || content.length > 120) {
      throw new Error('Tamanho do conteúdo da notificação inválido!');
    }
  }

  constructor(content: string) {
    this.validateContent(content);
    this.content = content;
  }

  public get value(): string {
    return this.content;
  }

  public set value(content: string) {
    this.validateContent(content);
    this.content = content;
  }
}

export { Content };
