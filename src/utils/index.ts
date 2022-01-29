type ReducerAction = {
  payload: string;
  type: string;
};

export function inputReducer(state: any, action: ReducerAction) {
  switch (action.type) {
    case action.type:
      state[action.type] = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
}

export function numberOpinionFormated(number: number) {
  var SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E']
  var tier = Math.log10(Math.abs(number)) / 3 | 0
  if(tier == 0) return number
  var suffix = SI_SYMBOL[tier]
  var scale = Math.pow(10, tier * 3)
  var scaled = number / scale
  var numberTmp = scaled.toFixed(2).substring(0,4) + suffix
  return numberTmp.replace('.'+ suffix, suffix)
}

export function avaliationMessage(opinionAvaliation: number): string {
  let opinionMessage = ''
  switch(opinionAvaliation) {
    case 1:
      opinionMessage = 'Concordo fortemente'
      break
    case 0.5:
      opinionMessage = 'Concordo'
      break
    case 0:
      opinionMessage = 'Sou indiferente'
      break
    case -0.5:
      opinionMessage = 'Discordo'
      break
    case -1:
      opinionMessage = 'Discordo fortemente'
      break
  }

  return opinionMessage
}
