interface Response {
  token: string
  user: {
    id: number
    user_login: string
    display_name: string
    user_email: string
  }
}

export function singIn(): Promise<Response> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'asd564asd87aw1e687dv681aw8',
        user: {
          id: 1,
          user_login: 'wiatagan',
          display_name: 'Wiatagan Paz',
          user_email: 'pazwiatagan@gmail.com'
        }
      })
    }, 2000)
  })
}
