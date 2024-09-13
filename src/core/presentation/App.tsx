import { Fragment } from 'react'
import MarkdownEditor from './markdown_editor/MarkdownEditor'
import url from './EN-35-econ-3.3.svg'
import { EconSvg } from './EconSvg'
import { SvgFromUrl } from './SvgFromUrl'

function App() {
  return (
    <Fragment>
      <SvgFromUrl url={url} />
      <EconSvg />
      <MarkdownEditor />
    </Fragment>
  )
}

export default App
