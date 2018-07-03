<template>
  <div class="setting">
    <textarea id="editor" name="editor" v-model="TokenForm">
    </textarea>
  </div>
</template>

<script>
import * as CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/theme/liquibyte.css'//白色高亮
import 'codemirror/theme/cobalt.css'//黑色朴素
import 'codemirror/theme/neat.css'//白色朴素
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/go/go'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/http/http'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
// import 'codemirror/addon/hint/show-hint'
// import 'codemirror/addon/hint/javascript-hint'
// import 'codemirror/addon/hint/sql-hint'
// import 'codemirror/addon/hint/html-hint'
// import 'codemirror/addon/hint/xml-hint'
// import 'codemirror/addon/hint/anyword-hint'
// import 'codemirror/addon/hint/css-hint'
// import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/fold/markdown-fold'
import 'codemirror/mode/meta'

import "codemirror/addon/fold/foldgutter.css" 

import "codemirror/addon/fold/foldcode"

import "codemirror/addon/fold/brace-fold"
import 'codemirror/addon/selection/active-line'

export default {
  data(){
    return{
      nameArray: [],
      modeArray: [],
      mapArray: [],
      CodeMirrorEditor: null,
      something: '',
      TokenForm: ''
    }
   
  },
    
  mounted(){
      // console.log(CodeMirror)
      // for(var i=0;i<CodeMirror.modeInfo.length;i++){
      //     let mode=CodeMirror.modeInfo[i];
      //     this.mapArray.push({name:mode.name,mode2:mode.mode})
      // }
      // this.something="clike"
      // document.getElementById("theme").nodeValue="clike"
      this.setmirror()
  },

  methods: {
    transToSrc(name){  
        return "assets/codemirror/mode/"+name+"/"+name+".js";
    },
    setmirror(){
      let myTextarea = document.getElementById('editor');
      this.CodeMirrorEditor = CodeMirror.fromTextArea(myTextarea, {
          theme:'neat', 
          styleActiveLine: true,
          mode: "text/x-c++src",
          extraKeys: {"Ctrl": "autocomplete"},//输入s然后ctrl就可以弹出选择项  
          lineNumbers: true,
          tabSize:10,
          // readOnly:"nocursor",
          smartIndent:true,
          scrollbarStyle:"overlay"
          // keymap:"defaule"
      });
      // // this.CodeMirrorEditor.setOption('lineWrapping', true);
      this.CodeMirrorEditor.on("change",() =>{
          //编译器内容更改事件
          console.log(this.CodeMirrorEditor)
          console.log(this.CodeMirrorEditor.getValue())
          sessionStorage.setItem('msg', this.CodeMirrorEditor.getValue())
      });
      // this.CodeMirrorEditor.setValue("Hello Kitty\nHello Tony\nHow are you\nFine thank you and you \nI love you")

      // this.CodeMirrorEditor.setOption("lineNumbers","true")
      // // this.CodeMirrorEditor.addOverlay("coconut");
      // // this.CodeMirrorEditor.markText({line:0,ch:0},{line:0,ch:0})
      // this.CodeMirrorEditor.setBookmark({line:0,ch:0},{line:0,ch:1},{readOnly:true}); 
      // this.CodeMirrorEditor.setCursor(0)
      // this.CodeMirrorEditor.setSize(100,100)
    }
  },
    
  watch: {
    TokenForm: function() {
      sessionStorage.setItem('msg', this.TokenForm)
      console.log(this.TokenForm)
    }
    // something: function () {
    //   var headElement=document.body;
    //   var element=document.createElement("script");
    //   element.setAttribute("src",this.transToSrc(this.something));
    //   headElement.appendChild(element);
    //   element.onload=() => {
    //     this.CodeMirrorEditor.setOption("mode",this.something)   
    //   }
    // }
  }
}
</script>

<style scoped>
.setting {
  margin: 0;
  width: auto;
  height: auto;
  background-color: rgb(248, 248, 248);
  /*h1 {
    margin: 0;
  }*/
}
</style>
