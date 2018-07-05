import { FOOTER_HEIGHT } from '../Footer/Footer'

export const styles = {
  root: {
    boxSizing: 'border-box',
    position: 'relative',
    display: 'block',
    maxWidth: '920px',
    minHeight: `calc(100vh - 64px - ${FOOTER_HEIGHT}px)`,
    margin: '0 auto',
    paddingTop: '30px',
    paddingBottom: '30px'
  }
}
