import queryStringBuilder, {
  doesQueryContainParam,
  doesQueryContainKey,
  parseQueryString
} from '../queryStringBuilder'

describe('queryStringBuilderHelpers', () => {
  describe('doesQueryContainParam', () => {
    let query
    beforeEach(() => {
      query = 'avengers=hulk&justiceLeague=wonderWoman'
    })

    it('should return true when a param is specified', () => {
      const outcome = doesQueryContainParam(query, 'avengers', 'hulk')
      expect(outcome).toBe(true)
    })

    it('should return false when a param key is specified but not the value', () => {
      const outcome = doesQueryContainParam(query, 'avengers', 'spiderman')
      expect(outcome).toBe(false)
    })

    it('should return false when a param key is not specified', () => {
      const outcome = doesQueryContainParam(query, 'tmnt', 'donatello')
      expect(outcome).toBe(false)
    })
  })

  describe('doesQueryContainKey', () => {
    it('should return true when a param key is specified', () => {
      const query = 'avengers=hulk&justiceLeague=wonderWoman'
      const outcome = doesQueryContainKey(query, 'justiceLeague')
      expect(outcome).toBe(true)
    })

    it('should return false when a param key is not specified', () => {
      const query = 'avengers=hulk'
      const outcome = doesQueryContainKey(query, 'justiceLeague')
      expect(outcome).toBe(false)
    })
  })

  describe('parseQueryString', () => {
    it('should return the correct query object', () => {
      const query = '?avengers=hulk,groot&justiceLeague=wonderWoman,superman'
      const expectedResult = {
        avengers: ['hulk', 'groot'],
        justiceLeague: ['wonderWoman', 'superman']
      }
      const result = parseQueryString(query)
      expect(result).toEqual(expectedResult)
    })
  })
})

describe('queryStringBuilder', () => {
  let currentQuery

  beforeEach(() => {
    currentQuery =
      'avengers=hulk,thor,spiderman&justiceLeague=wonderWoman,superman'
  })
  it('should add the param key and value when the param is not yet in the string', () => {
    const param = { key: 'xMen', value: 'wolverine' }

    const output = queryStringBuilder(currentQuery, param)
    const expectedOutput =
      'avengers=hulk,thor,spiderman&justiceLeague=wonderWoman,superman&xMen=wolverine'

    expect(output).toEqual(expectedOutput)
  })

  it("should add the value to a param that's already in the string", () => {
    const param = { key: 'justiceLeague', value: 'batman' }

    const output = queryStringBuilder(currentQuery, param)
    const expectedOutput =
      'avengers=hulk,thor,spiderman&justiceLeague=wonderWoman,superman,batman'

    expect(output).toEqual(expectedOutput)
  })

  it("should remove the value from a param that's already specified", () => {
    const param = { key: 'justiceLeague', value: 'superman' }

    const output = queryStringBuilder(currentQuery, param)
    const expectedOutput =
      'avengers=hulk,thor,spiderman&justiceLeague=wonderWoman'

    expect(output).toEqual(expectedOutput)
  })

  it('should entirely remove a param if its last value is removed', () => {
    currentQuery = 'avengers=hulk,thor,spiderman&justiceLeague=wonderWoman'
    const param = { key: 'justiceLeague', value: 'wonderWoman' }

    const output = queryStringBuilder(currentQuery, param)
    const expectedOutput = 'avengers=hulk,thor,spiderman'

    expect(output).toEqual(expectedOutput)
  })

  it('should entirely replace a param if "replaceParam" is passed', () => {
    currentQuery =
      'avengers=hulk,thor,spiderman&justiceLeague=wonderWoman,superman'
    const param = { key: 'justiceLeague', value: 'batman' }

    const output = queryStringBuilder(currentQuery, param, true)
    const expectedOutput = 'avengers=hulk,thor,spiderman&justiceLeague=batman'

    expect(output).toEqual(expectedOutput)
  })

  it('should entirely remove a param if "replaceParam" is passed and value is falsy', () => {
    currentQuery =
      'avengers=hulk,thor,spiderman&justiceLeague=wonderWoman,superman'
    const param = { key: 'justiceLeague', value: '' }

    const output = queryStringBuilder(currentQuery, param, true)
    const expectedOutput = 'avengers=hulk,thor,spiderman'

    expect(output).toEqual(expectedOutput)
  })
})
