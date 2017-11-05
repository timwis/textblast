export interface LoginSuccess {
  id: string
  token: string
  email: string
}

export interface State {
  user: {
    id?: string
    email?: string
    token?: string
  },
  recipients: Recipient[]
}

export interface AuthenticatedUser {
  id: string
  token: string
  email: string
}

export interface Recipient {
  id: string
  tags: [string]
  phoneNumber: string
  name?: string
  createdAt: string
}
