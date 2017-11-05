export interface LoginSuccess {
  id: string
  token: string
  email: string
}

export interface State {
  user: {
    id: string | null
    email: string | null
    token: string | null
  }
}
