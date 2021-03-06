import axios from 'axios'

/* :: number -> Promise<object> */
const getBlock = async (blockNumber) => {
  const response = await axios.get(`/api/v1/blocks/${blockNumber}`)
  const { data: block } = response.data

  return block
}

/* :: string -> Promise<object> */
const getTransaction = async (txHash) => {
  const response = await axios.get(`/api/v1/transactions/${txHash}`)
  const { data: transaction } = response.data

  return transaction
}

/* :: number -> Promise<object> */
const getLatestBlocks = async (limit = 10) => {
  const response = await axios.get(`/api/v1/blocks?limit=${limit}`)
  const { data: blocks, isSynching } = response.data

  return { blocks, isSynching }
}

/* :: number -> Promise<object> */
const getLatestTransactions = async (limit = 10) => {
  const response = await axios.get(`/api/v1/transactions?limit=${limit}`)
  const { data: transactions, isSynching } = response.data

  return { transactions, isSynching }
}

/* :: string -> Promise<object> */
const search = async (query) => {
  const response = await axios.get(`/api/v1/search?q=${query}`)
  const { data: result } = response.data

  return result
}

/* :: string -> Promise<object> */
const getNetworkInfo = async () => {
  const response = await axios.get('/api/v1/network')
  const { data: networkInfo } = response.data

  return networkInfo
}

export {
  search,
  getBlock,
  getNetworkInfo,
  getTransaction,
  getLatestBlocks,
  getLatestTransactions
}
