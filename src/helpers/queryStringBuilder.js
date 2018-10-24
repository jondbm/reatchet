import queryString from 'query-string'

export const parseQueryString = query => {
  const parsedQuery = queryString.parse(query)
  const queryObject = Object.keys(parsedQuery).reduce((result, key) => {
    return {
      ...result,
      [key]: parsedQuery[key].split(',')
    }
  }, {})
  return queryObject
}

// Test if a query string contains a value. Used for filtering to
// determine if "checked" should be true
export const doesQueryContainParam = (query, param, value) => {
  const parsedQuery = queryString.parse(query)
  if (Object.keys(parsedQuery).includes(param)) {
    const values = parsedQuery[param].split(',')
    return values.includes(value)
  }
  return false
}

// Test if a query string contains a value. Used for filtering to
// determine if "checked" should be true
export const doesQueryContainKey = (query, param) => {
  const parsedQuery = queryString.parse(query)
  return Object.keys(parsedQuery).includes(param)
}

// Helper function used to remove an entire param from the params object
// if it has a falsey value
const sanitizeParams = params => {
  const paramKeys = Object.keys(params)
  return paramKeys.reduce((sanitizedParams, paramKey) => {
    if (!!params[paramKey]) {
      return {
        ...sanitizedParams,
        [paramKey]: params[paramKey]
      }
    }
    return sanitizedParams
  }, {})
}

/**
 * This helper is used to generate the query string that forms the basis
 * of the studio context, such as which filters are applied.
 * E.g. /projects/{projectId}/footage?media=photo&isBookmarked=true&isArchived=false
 *
 * Pass in the current query string and the param (in the form {key, value}) that has been selected.
 *
 * It will then either be added or removed, based on whether it's already in the string or not
 * When adding:
 *  If no values of that param are in the string, it will be added as a new param.
 *  If value(s) of that param already exist, it will be appended
 * When removing:
 *  If the value being removed is the last one, the param key will be removed from the string
 */

const queryStringBuilder = (currentQuery, param, replaceParam) => {
  // Parse current URL query string
  const params = queryString.parse(currentQuery)
  const { key, value } = param

  // Param does not yet exist, so just add it
  if (!Object.keys(params).includes(key)) {
    const updatedParams = {
      ...params,
      [key]: value
    }

    return queryString.stringify(updatedParams, { encode: false })
  }

  // At this point, we know the param is already specified in the query

  // If replaceParam has been passed (e.g for radio button filters), then
  // we can just replace the current param value with the new one

  if (replaceParam) {
    const updatedParams = {
      ...params,
      [key]: value
    }

    // Filter out any empty params
    const sanitizedParams = sanitizeParams(updatedParams)
    return queryString.stringify(sanitizedParams, { encode: false })
  }

  // Check if the value passed in already exists against the param key,
  // and then remove it if it does
  const currentValues = params[key].split(',')

  if (currentValues.includes(value)) {
    const filteredValues = currentValues.filter(val => val !== value)
    const stringifiedValues = filteredValues.join(',')

    const updatedParams = {
      ...params,
      [key]: stringifiedValues
    }

    // Filter out any empty params
    const sanitizedParams = sanitizeParams(updatedParams)
    return queryString.stringify(sanitizedParams, { encode: false })
  }

  // By now we knoe the value does not exist against the param key, so just add it
  const updatedParams = {
    ...params,
    [key]: [...currentValues, value].join(',')
  }

  return queryString.stringify(updatedParams, { encode: false })
}

export default queryStringBuilder
