import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations{

  static getErrorMsg(nomeCampo: string, nomeValidacao: string, valorValidacao?) {
    const config = {
      required: `${nomeCampo} é obrigatório.`,
      minlength: `${nomeCampo} com no mínimo ${valorValidacao.requiredLength} caracteres`,
      maxlength: `${nomeCampo} com no máximo ${valorValidacao.requiredLength} caracteres`,
      email: `Digite um E-mail válido`,
      mustMatch: `As senhas não coincidem`
    };
    return config[nomeValidacao];
  }

}
