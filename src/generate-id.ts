import { customAlphabet } from 'nanoid'

export const generateExecutionId = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_',
  16
)

export const generateExecutionToken = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  32
)
export const generateExecutionSalt = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  16
)

const getFirstCharacter = customAlphabet('abcdefghijklmnopqrstuvwxyz', 1)
const getRandomCharacters = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 5)

export const generateEventStoreId = () => [getFirstCharacter(), getRandomCharacters()].join('')

export const generateDeploymentId = () => [getFirstCharacter(), getRandomCharacters()].join('')
