import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"
import {markdown} from "@codemirror/lang-markdown"

import {doubler, checkboxPlugin, regexpLinter, images, codeEvaluator} from "@sutter-dave/cmwidgetdev"


console.log("Double 5: " + doubler(5))

;(window as any).view = new EditorView({
  doc: 'console.log("Hello world")',
  extensions: [
    basicSetup,
    checkboxPlugin,
    codeEvaluator(),
    markdown({defaultCodeLanguage: javascript()})
  ],
  parent: document.querySelector("#editorMD")!
})



;(window as any).view = new EditorView({
  doc: 'console.log("Hello world")',
  extensions: [
    basicSetup,
    checkboxPlugin,
    regexpLinter,
    images(),
    javascript()
  ],
  parent: document.querySelector("#editorJS")!
})
