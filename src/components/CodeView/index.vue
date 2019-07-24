<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/night.css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/javascript/javascript'

export default {
  name: 'CodeView',
  /* eslint-disable vue/require-prop-types */
  props: {
    value: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'text/html'
    }
  },
  data() {
    return {
      codeView: false
    }
  },
  mounted() {
    this.codeView = CodeMirror.fromTextArea(this.$refs.textarea, {
      mode: this.mode,
      readOnly: true,
      theme: 'night'
    })

    this.codeView.setValue(this.value)
  }
}
</script>

<style scoped>
.json-editor{
  height: 100%;
  position: relative;
}
.json-editor >>> .CodeMirror {
  height: auto;
  min-height: 100px;
}
.json-editor >>> .CodeMirror-scroll{
  min-height: 100px;
}
.json-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
