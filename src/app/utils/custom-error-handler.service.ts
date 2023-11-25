import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { IErrorResponse } from './models/response';

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;


@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService {

  constructor(private alertService: AlertService) { }

  handleError(error: any): void {

    if (error instanceof HttpErrorResponse) {

      if (error?.error instanceof IErrorResponse) {

        // Error del backend
        const errorResponse: IErrorResponse = error.error as IErrorResponse;

        if (errorResponse?.Message) {
          this.alertService.showErrorAlert('', errorResponse?.Message);
        }

        errorResponse?.Details?.forEach(err => {
          this.alertService.showErrorAlert(err?.Title, err?.Message);
        })

        if ([UNAUTHORIZED, FORBIDDEN].includes(error?.status)) {
          // auto logout if 401 or 403 response returned from api
          this.alertService.showErrorAlert('Error', 'Usted no está autorizado para realizar esta acción');

        }

      } else {

        // Error del cliente o de red
        this.alertService.showErrorAlert('Ha ocurrido un error inesperado', error?.error?.message);

      }
    } else {

      // Otro tipo de error (no relacionado con HTTP)
      this.alertService.showErrorAlert('Ha ocurrido un error inesperado', 'Favor de comunicarse con un administrador.');
    }
  }
}
