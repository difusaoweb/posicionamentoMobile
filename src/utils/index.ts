type ReducerAction = {
  payload: string
  type: string
}

export function inputReducer(state: any, action: ReducerAction) {
  switch (action.type) {
    case action.type:
      state[action.type] = action.payload
      return { ...state }
    default:
      return { ...state }
  }
}

export function numberOpinionFormated(number: number) {
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']
  const tier = (Math.log10(Math.abs(number)) / 3) | 0
  if (tier == 0) return number
  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)
  const scaled = number / scale
  const numberTmp = scaled.toFixed(2).substring(0, 4) + suffix
  return numberTmp.replace('.' + suffix, suffix)
}

export function avaliationMessage(opinionAvaliation: number): string {
  switch (opinionAvaliation) {
    case 1:
      return 'Concordo fortemente'
    case 0.5:
      return 'Concordo'
    case 0:
      return 'Sou indiferente'
    case -0.5:
      return 'Discordo'
    case -1:
      return 'Discordo fortemente'
    default:
      return ''
  }
}
