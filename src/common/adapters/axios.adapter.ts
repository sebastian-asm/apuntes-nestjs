import { Injectable } from '@nestjs/common'

import axios, { AxiosInstance } from 'axios'

import { HttpAdapter } from '../interfaces/http-adapter.interface'

// necesario para inyectar en el constructor en otros servicios
@Injectable()
// creación del adapter en caso que axios sufra modificaciones que puedan
// afectar nuestro código
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url)
      return data
    } catch (error) {
      throw new Error('Ocurrió un error inesperado')
    }
  }
}
