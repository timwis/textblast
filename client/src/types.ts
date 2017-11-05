export interface LoginSuccess {
  id: string
  token: string
  email: string
}

export interface State {
  user: {
    id: string | undefined
    email: string | undefined
    token: string | undefined
  },
  recipients: [Recipient] | never[] // TODO: Is this right?
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
