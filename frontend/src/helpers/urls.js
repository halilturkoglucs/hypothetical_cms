const BASE_URL = 'http://localhost:8081'

export const OBTAIN_TOKEN_URL = BASE_URL + '/auth/obtain_token/'
export const REFRESH_TOKEN_URL = BASE_URL + '/auth/refresh_token/'
export const REGISTERATION_URL = BASE_URL + '/users/'
export const USER_DETAILS_URL = BASE_URL + '/users/{id}/'
export const GET_USERS_URL = BASE_URL + '/users/'

// Employer URLs
export const GET_EMPLOYERS_URL = BASE_URL + '/employers/'
export const EMPLOYER_DETAILS_URL = BASE_URL + '/employers/{id}/'

// Employee URLs
export const GET_EMPLOYEES_URL = BASE_URL + '/employees/'
export const EMPLOYEE_DETAILS_URL = BASE_URL + '/employees/{id}/'
