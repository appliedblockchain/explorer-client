export const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  },
  title: {
    marginBottom: '1rem'
  },
  section: {
    marginBottom: '3.5rem'
  },
  link: {
    fontFamily: 'menlo, monospace',
    textDecoration: 'none',
    color: '#d02d52',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  mono: {
    fontFamily: 'menlo, monospace'
  },
  contractName: {
    whiteSpace: 'nowrap',
    fontFamily: 'menlo, monospace',
    background: '#00897B',
    padding: '5.5px 15px',
    borderRadius: '150px',
    color: '#fff'
  },
  contractMethod: {
    fontWeight: 'bold'
  }
})
