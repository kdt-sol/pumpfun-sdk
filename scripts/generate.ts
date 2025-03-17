import { resolve } from 'node:path'
import { createFromRoot } from 'codama'
import { rootNodeFromAnchor } from '@codama/nodes-from-anchor'
import { renderJavaScriptVisitor } from '@codama/renderers'

const srcPath = resolve(import.meta.dirname, '..', 'src')
const idlPath = resolve(srcPath, 'idl.json')
const generatedPath = resolve(srcPath, 'generated')

import(idlPath).then((idl) => createFromRoot(rootNodeFromAnchor(idl))).then(async (codama) => {
    await codama.accept(renderJavaScriptVisitor(generatedPath))
})
