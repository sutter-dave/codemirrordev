import {EditorView, basicSetup} from "codemirror"
//import {javascript} from "@codemirror/lang-javascript"
//import {rLanguage} from "codemirror-lang-r"
import {markdown} from "@codemirror/lang-markdown-sp"

import { /*regexpLinter, images,*/ repdoc} from "@sutter-dave/cmwidgetdev"

;(window as any).view = new EditorView({
  doc: 'console.log("Hello world")',
  extensions: [
    basicSetup,
    repdoc(),
    markdown(/*{defaultCodeLanguage: javascript()}*/)
  ],
  parent: document.querySelector("#editorMD")!
})


//DOH - the r language support doesn't seem to work too well (yet).
//i noticed x <- rnorm(45) + rnomr(45) => BinaryStatement
// ;(window as any).view = new EditorView({
//   doc: 'console.log("Hello world")',
//   extensions: [
//     basicSetup,
//     checkboxPlugin,
//     regexpLinter,
//     images(),
// //    javascript()
//     rLanguage
//   ],
//   parent: document.querySelector("#editorJS")!
// })
