export const styles = {
  btnWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem'
  },
  blockInfo: {
    marginBottom: '3.5rem'
  },
  blockTitle: {
    marginBottom: '1rem'
  },
  mono: {
    fontFamily: 'menlo, "Courier New", Courier, monospace'
  },
  link: {
    textDecoration: 'none',
    color: '#d02d52',
    '&:hover': { textDecoration: 'underline' },
    '&:focus': { textDecoration: 'underline' }
  },
  contractName: {
    display: 'inline-block',
    marginRight: 10,
    whiteSpace: 'nowrap',
    fontFamily: 'menlo, monospace',
    background: '#00897B',
    padding: '5.5px 15px',
    borderRadius: '150px',
    color: '#fff'
  }
}
