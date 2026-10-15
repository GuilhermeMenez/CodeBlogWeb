// ======= API Error - Discriminated Union Pattern =======

// Tipo de erro da API usando discriminated union
export interface ApiError {
  readonly _tag: 'ApiError'
  readonly message: string
  readonly status: number
  readonly code?: string
  readonly details?: Record<string, unknown>
}

// Parametros para criar um ApiError
export type CreateApiErrorParams = Omit<ApiError, '_tag'>

// ======= Factory Function =======

// Cria um objeto ApiError imutavel
export function createApiError(params: CreateApiErrorParams): ApiError {
  return Object.freeze({
    _tag: 'ApiError' as const,
    message: params.message,
    status: params.status,
    code: params.code,
    details: params.details,
  })
}

// ======= Type Guards =======

// Type guard para ApiError (mesmo com code splitting e HMR)
export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && '_tag' in error && error._tag === 'ApiError'
}

// ======= Helper Functions (funcoes puras) =======

export const isUnauthorized = (error: ApiError): boolean => error.status === 401

export const isForbidden = (error: ApiError): boolean => error.status === 403

export const isNotFound = (error: ApiError): boolean => error.status === 404

export const isValidationError = (error: ApiError): boolean => error.status === 422

export const isServerError = (error: ApiError): boolean => error.status >= 500

export const isClientError = (error: ApiError): boolean => error.status >= 400 && error.status < 500

// ======= Utility Functions =======

// Extrai error message de forma segura
export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Unexpected error'
}
