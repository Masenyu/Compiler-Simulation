<template>
  <div class="page">
    <el-row>
      <el-col :span="5" :offset="RE_offset">
        <div>
          <el-row>
            <el-col :span="24">
              <!--p style="font-size: 35px;">{{title}}</p-->
              <img src="../../assets/logo1.png" />
            </el-col>
            <el-col :span="24" style="margin-top:50px;">
              <el-form ref="REForm" :rules="rulesRE" :model="REForm" label-width="0px">
                <el-form-item prop="RE">
                  <el-input style="font-size:20px;" placeholder="请输入词法规则：" type="textarea" :autosize="{ minRows: 10, maxRows: 10}" v-model="REForm.RE"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-popover
                    placement="top"
                    width="160"
                    :disabled="!available"
                    v-model="visible2">
                    <p>构建新的状态机将清空已有的记录，确定要执行吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="judgeGenerateSure()" >确定</el-button>
                    </div>
                    <el-button slot="reference" type="primary" @click="judgeGenerate()">构建状态机</el-button>
                  </el-popover>
                  <!--el-button :disabled="available" type="primary" @click="generateFA('REForm')">构建状态机</el-button-->
                  <el-button @click="resetForm('REForm')" icon="el-icon-circle-close-outline" circle></el-button>
                  <el-button icon="el-icon-star-off" circle></el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="16" :offset="1">
        <!-- <div v-if="isFirsttime" >
          <p>词法分析是编译的第一阶段</p>
        </div> -->
        <div class="tab">
          <el-tabs v-model="TabActiveName" @tab-click="handleClick">
            <el-tab-pane label="NFA生成" name="NFAGeneration">
              <div style="background-color: #fff; height: 100%">
                <div style="background-color: #dddddd;">
                  <el-row>
                    <div :class="{'active':NFA.isFull_screen,'graph':true}">
                      <span style="font-size: 35px;">NFA</span>
                      <div style="float: right">
                        <!-- <el-button @click="layoutChange()">{{layoutText}}</el-button> -->
                        <el-button type="info" :icon="NFA.zoomicon" circle @click="full_screen(NFA)"></el-button>
                        <el-button type="info" icon="el-icon-view" circle @click="fitAnimated(NFA)"></el-button>
                      </div>
                      <div class="vis" id="NFAvis"></div>
                    </div>
                  </el-row>
                  <div class="token">
                    <div v-if="NFA.hasbegin">
                      <div class="scroll_bar">
                        <div :id="NFA.TokenId" v-html="NFA.Token"></div>
                      </div>
                    </div>
                    <div v-else>
                      <el-input style="font-size:20px;" placeholder="请输入待分析的的源码：" type="textarea" :autosize="{ minRows: 3, maxRows: 3}" v-model="NFA.TokenForm"></el-input>
                    </div>
                  </div>
                </div>
                <el-row style="margin-top: 20px">
                  <el-col :span="16">
                    <div class="box">
                      <div class="wrapper" ref="messBoxNFA">
                        <div>
                          <div>
                            <p style="height: 30px; margin: 0; padding: 0" v-for="item in NFA.mess">{{item}}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="contentCover"></div>
                    <div class="content"></div>
                  </el-col>
                  <el-col :span="8">
                    <div class="controller">
                      <el-row class="buttonela">
                        <el-button :disabled="isFirsttime" @click="startButton(NFA)" :type="NFA.startbuttonType">{{NFA.startbuttonText}}</el-button>
                        <el-button :disabled="!NFA.hasbegin" @click="previous(NFA, 0)">上一步</el-button>
                      </el-row>
                      <el-row class="buttonelb">
                        <el-button :disabled="!NFA.hasbegin" @click="autoControl(NFA, 0)" :type="NFA.autobuttonType" plain>{{NFA.autobuttonText}}</el-button>
                        <el-button :disabled="!NFA.hasbegin" @click="next(NFA, 0)">下一步</el-button>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="DFA生成" name="DFAGeneration">
              <div style="background-color: #dddddd; height: 100%">
                <el-row>
                  <div :class="{'active':DFA.isFull_screen,'graph':true}">
                    <span style="font-size: 35px;">DFA</span>
                    <div style="float: right">
                      <!-- <el-button @click="layoutChange()">{{layoutText}}</el-button> -->
                      <el-button type="info" :icon="DFA.zoomicon" circle @click="full_screen(DFA)"></el-button>
                      <el-button type="info" icon="el-icon-view" circle @click="fitAnimated(DFA)"></el-button>
                    </div>
                    <div class="vis" id="DFAvis"></div>
                  </div>
                </el-row>
                <div class="token">
                  <div v-if="DFA.hasbegin">
                    <div class="scroll_bar">
                      <div :id="DFA.TokenId" v-html="DFA.Token"></div>
                    </div>
                  </div>
                  <div v-else>
                    <el-input style="font-size:20px;" placeholder="请输入待分析的的源码：" type="textarea" :autosize="{ minRows: 3, maxRows: 3}" v-model="DFA.TokenForm"></el-input>
                  </div>
                </div>
                <el-row>
                  <div class="controller">
                    <el-row class="buttonela">
                      <el-button :disabled="isFirsttime" @click="startButton(DFA)" :type="DFA.startbuttonType">{{DFA.startbuttonText}}</el-button>
                      <el-button :disabled="!DFA.hasbegin" @click="previous(DFA, 1)">上一步</el-button>
                    </el-row>
                    <el-row class="buttonelb">
                      <el-button :disabled="!DFA.hasbegin" @click="autoControl(DFA, 1)" :type="DFA.autobuttonType" plain>{{DFA.autobuttonText}}</el-button>
                      <el-button :disabled="!DFA.hasbegin" @click="next(DFA, 1)">下一步</el-button>
                    </el-row>
                  </div>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="DFA化简" name="DFASimplification">
              <div style="background-color: #dddddd; height: 100%">
                <el-row>
                  <div :class="{'active':DFA_S.isFull_screen,'graph':true}">
                    <span style="font-size: 35px;">DFA化简</span>
                    <div style="float: right">
                      <!-- <el-button @click="layoutChange()">{{layoutText}}</el-button> -->
                      <el-button type="info" :icon="DFA_S.zoomicon" circle @click="full_screen(DFA_S)"></el-button>
                      <el-button type="info" icon="el-icon-view" circle @click="fitAnimated(DFA_S)"></el-button>
                    </div>
                    <div class="vis" id="DFA_Svis"></div>
                  </div>
                </el-row>
                <div class="token">
                  <div v-if="DFA_S.hasbegin">
                    <div class="scroll_bar">
                      <div :id="DFA_S.TokenId" v-html="DFA_S.Token"></div>
                    </div>
                  </div>
                  <div v-else>
                    <el-input style="font-size:20px;" placeholder="请输入待分析的的源码：" type="textarea" :autosize="{ minRows: 3, maxRows: 3}" v-model="DFA_S.TokenForm"></el-input>
                  </div>
                </div>
                <el-row>
                  <div class="controller">
                    <el-row class="buttonela">
                      <el-button :disabled="isFirsttime" @click="startButton(DFA_S)" :type="DFA_S.startbuttonType">{{DFA_S.startbuttonText}}</el-button>
                      <el-button :disabled="!DFA_S.hasbegin" @click="previous(DFA_S, 2)">上一步</el-button>
                    </el-row>
                    <el-row class="buttonelb">
                      <el-button :disabled="!DFA_S.hasbegin" @click="autoControl(DFA_S, 2)" :type="DFA_S.autobuttonType" plain>{{DFA_S.autobuttonText}}</el-button>
                      <el-button :disabled="!DFA_S.hasbegin" @click="next(DFA_S, 2)">下一步</el-button>
                    </el-row>
                  </div>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="查看代码" name="codeShow">
              <el-col :span="24">
                <span style="font-size: 35px;">敬请期待</span>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { DataSet, Network } from 'vis'
import { Message } from 'element-ui'
import { createNodes, createEdges } from '../../api/vis_api'
import { create_NFA, NFA_CODE } from '../../api/NFA'
import { create_DFA, DFA_CODE } from '../../api/DFA'
import BScroll from 'better-scroll'  

export default {
  props: {
    messBoxNFA: {
      type: Object
    },
    messBoxDFA: {
      type: Object
    },
    messBoxDFA_S: {
      type: Object
    }
  },
  data () {
    // 验证表单输入是否合法
    var validateRe = (rule, value, callback) => {
      let input = value.split('\n')
      let empty = true
      for (let i = 0; i < input.length; i++) {
        if (input[i] !== '') {
          empty = false
          try {
            let index = input[i].indexOf('=')
            if (index === -1) {
              callback(new Error('第' + (i + 1).toString() + "条规则缺少'=',请按格式输入"))
            } else if (index < 1) {
            // 等式左侧不能为空
              callback(new Error('第' + (i + 1).toString() + '条规则等式左侧不能为空'))
            } else if (index === input[i].length - 1) {
              callback(new Error('第' + (i + 1).toString() + '条规则等式右侧不能为空'))
            } else {
              let re = new RegExp(input[i].substring(input[i].indexOf('=') + 1))
            }
          } catch (e) {
            callback(
              new Error(
                '第' + (i + 1).toString() + '条规则不合法，请重新输入'
              )
            )
          }
        }
      }
      if (empty === true) {
        callback(new Error('输入不能为空'))
      } else {
        callback()
      }
    }
    return {
      title: '词法分析',
      visible2: false,
      REForm: {
        RE: ''
      },
      rulesRE: {
        RE: [
          { max: 1200, message: '不能超过1200个字符', tirgger: 'blur' },
          { validator: validateRe, trigger: 'blur' }
        ]
      },
      TabActiveName: 'NFAGeneration',
      status: {
        loading: false
      },
      NFA: {
        data: {
          transitionTable: [],
          alphabet: [],
          acceptState: []
        },
        machine: null,
        nodes: null,
        edges: null,
        lastState: null,
        nextState: null,
        TokenForm: '',
        Token: '',
        TokenId: 'NFAToken',
        ScanId: 'NFAScan',
        hasbegin: false,
        startbuttonType: 'primary',
        startbuttonText: '开始分词',
        autobuttonType: 'primary',
        autobuttonText: '自动展示',
        isFull_screen: false,
        zoomicon: 'el-icon-zoom-in',
        magnifier: false,
        mess: [],
        messBoxScroll: null
      },
      DFA: {
        data: {
          transitionTable: [],
          alphabet: [],
          acceptState: []
        },
        machine: null,
        nodes: null,
        edges: null,
        lastState: null,
        nextState: null,
        TokenForm: '',
        Token: '',
        TokenId: 'DFAToken',
        ScanId: 'DFAScan',
        hasbegin: false,
        startbuttonType: 'primary',
        startbuttonText: '开始分词',
        autobuttonType: 'primary',
        autobuttonText: '自动展示',
        isFull_screen: false,
        magnifier: false,
        zoomicon: 'el-icon-zoom-in',
        mess: [],
        messBoxScroll: null
      },
      DFA_S: {
        data: {
          transitionTable: [],
          alphabet: [],
          acceptState: []
        },
        machine: null,
        nodes: null,
        edges: null,
        lastState: null,
        nextState: null,
        TokenForm: '',
        Token: '',
        TokenId: 'DFA_SToken',
        ScanId: 'DFA_SScan',
        hasbegin: false,
        startbuttonType: 'primary',
        startbuttonText: '开始分词',
        autobuttonType: 'primary',
        autobuttonText: '自动展示',
        isFull_screen: false,
        magnifier: false,
        zoomicon: 'el-icon-zoom-in',
        mess: [],
        messBoxScroll: null
      },
      RE_offset: 1,
      isFirsttime: true,
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll();
    })
  },
  computed: {
    available () {
      return this.NFA.hasbegin || this.DFA.hasbegin || this.DFA_S.hasbegin
    }
  },
  methods: {
    // 构建状态机
    generateFA (formName) {
      const self = this
      // 验证表单输入
      self.$refs[formName].validate(valid => {
        if (valid) {
          let re = []
          let regulation = []
          let input = self.REForm.RE.split('\n')
          for (let i = 0; i < input.length; i++) {
            if (input[i] !== '') {
              regulation.push(input[i])
              re.push(input[i].substring(input[i].indexOf('=') + 1))
            }
          }
          let url = '/api/lexical/regularExpression'
          let Params = { RE: re }
          self.$axios
            .post(url, Params)
            .then(function (response) {
              self.NFA.data.transitionTable = response.data[0].transitionTable
              self.NFA.data.alphabet = response.data[0].alphabet
              self.NFA.data.acceptState = response.data[0].acceptStateList
              self.DFA.data.transitionTable = response.data[1].transitionTable
              self.DFA.data.alphabet = response.data[1].alphabet
              self.DFA.data.acceptState = response.data[1].acceptStateList
              self.DFA_S.data.transitionTable =
                response.data[2].transitionTable
              self.DFA_S.data.alphabet = response.data[2].alphabet
              self.DFA_S.data.acceptState = response.data[2].acceptStateList
              sessionStorage.setItem('regulation', regulation)
              self.addCSS(self.getCsstext())
              self.isFirsttime = false
              self.fresh()
            })
            .catch(function (error) {
              self.loading = false
              console.log(error)
              Message({
                message: '请检查网络并重试',
                type: 'error',
                center: true
              })
            })
        } else {
          Message({
            message: '格式错误，请检查输入',
            type: 'error',
            center: true
          })
          return false
        }
      })
    },
    //判断是不是需要重新构建状态机
    judgeGenerate () {
      if (this.available === false) { this.generateFA('REForm') }
    },
    judgeGenerateSure () {
      this.visible2 = false
      this.clearData(this.NFA)
      this.clearData(this.DFA)
      this.clearData(this.DFA_S)
      this.generateFA('REForm')
    },
    // 重新生成状态机，刷新数据
    clearData (object) {
      object = {
        data: {
          transitionTable: [
          ],

          alphabet: [],

          acceptState: [
          ]
        },
        machine: null,
        nodes: null,
        edges: null,
        lastState: null,
        nextState: null,
        TokenForm: '',
        Token: '',
        hasbegin: false,
        startbuttonType: 'primary',
        startbuttonText: '开始分词',
        autobuttonType: 'primary',
        autobuttonText: '自动展示',
        isFull_screen: false,
        magnifier: false,
        zoomicon: 'el-icon-zoom-in',
        mess: [],
        messBoxScroll: null
      }
    },
    // 生成状态机图
    async fresh () {
      const self = this
      // NFA 边、点、容器
      self.NFA.edges = new DataSet(
        createEdges(self.NFA.data.transitionTable, self.NFA.data.alphabet)
      )
      self.NFA.nodes = new DataSet(
        createNodes(self.NFA.data.transitionTable, self.NFA.data.acceptState)
      )
      var NFAdata = {
        nodes: self.NFA.nodes,
        edges: self.NFA.edges
      }
      let NFAcontainer = document.getElementById('NFAvis')
      // DFA 边、点、容器
      self.DFA.edges = new DataSet(
        createEdges(self.DFA.data.transitionTable, self.DFA.data.alphabet)
      )
      self.DFA.nodes = new DataSet(
        createNodes(self.DFA.data.transitionTable, self.DFA.data.acceptState)
      )
      var DFAdata = {
        nodes: self.DFA.nodes,
        edges: self.DFA.edges
      }
      let DFAcontainer = document.getElementById('DFAvis')
      // DFA化简 边、点、容器
      self.DFA_S.edges = new DataSet(
        createEdges(self.DFA_S.data.transitionTable, self.DFA_S.data.alphabet)
      )
      self.DFA_S.nodes = new DataSet(
        createNodes(
          self.DFA_S.data.transitionTable,
          self.DFA_S.data.acceptState
        )
      )
      var DFA_Sdata = {
        nodes: self.DFA_S.nodes,
        edges: self.DFA_S.edges
      }
      let DFA_Scontainer = document.getElementById('DFA_Svis')

      let options = {
        nodes: {
          color: {
            background: 'white',
            highlight: {
              border: 'rgba(139,183,233,1)',
              background: 'white'
            }
          },
          shape: 'dot',
          size: 30,
          font: {
            size: 18
          },
          borderWidth: 1
        },
        edges: {
          color: {
            color: '#2b7ce9'
          },
          font: {
            size: 35,
            align: 'top'
          }
        },
        autoResize: true,
        height: '100%',
        width: '100%',
        clickToUse: true,
        layout: {
          hierarchical: {
            enabled: true,
            direction: 'LR', // UD, DU, LR, RL
            sortMethod: 'directed' // hubsize, directed
          }
        },
        physics: {
          enabled: true
        }
      }

      self.NFA.vis = new Network(NFAcontainer, NFAdata, options)
      self.DFA.vis = new Network(DFAcontainer, DFAdata, options)
      self.DFA_S.vis = new Network(DFA_Scontainer, DFA_Sdata, options)

      self.doubleClick(self.NFA)
      self.doubleClick(self.DFA)
      self.doubleClick(self.DFA_S)
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 开始分词
    startButton (object) {
      const self = this
      if (object.hasbegin === false) {
        if (object.TokenForm === '') {
          Message({
            message: '请输入待分析的源码',
            type: 'error',
            center: true
          })
        } else {
          object.Token = object.TokenForm
          if (object === self.NFA) {
            object.machine = create_NFA(
              object.data.transitionTable,
              object.data.alphabet,
              object.data.acceptState
            )
          } else {
            object.machine = create_DFA(
              object.data.transitionTable,
              object.data.alphabet,
              object.data.acceptState
            )
          }
          object.machine.feedText(object.TokenForm)
          object.nextState = object.machine.init()
          self.changeNode(object, object.nextState.graphInfo.highlightNodes, 1)
          object.hasbegin = true
          object.startbuttonType = 'danger'
          object.startbuttonText = '停止分词'
        }
      } else {
        object.machine = null
        object.hasbegin = false
        object.startbuttonType = 'primary'
        object.startbuttonText = '开始分词'
        self.refresh(object)
        if (object.autobuttonText === '停止') {
          self.autoControl(object)
        }
      }
    },
    addCSS (cssText) {
      let style = document.createElement('style')
      let head = document.head || document.getElementsByTagName('head')[0]
      style.type = 'text/css'
      let textNode = document.createTextNode(cssText)
      style.appendChild(textNode)
      head.appendChild(style)
    },
    getCsstext () {
      let length = sessionStorage.getItem('regulation').split(',').length
      let cssText = '\n'
      for (let i = 0; i < length; i++) {
        cssText =
          cssText +
          'div.mode' +
          i.toString() +
          '{ color:' +
          '#' +
          Math.floor(Math.random() * 0xffffff).toString(16) +
          ';}\n'
      }
      return cssText
    },
    // 初始化消息框滑块
    _initScroll () {
      console.log('do initScroll')
      this.NFA.messBoxScroll = new BScroll(this.$refs.messBoxNFA, {
        // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
        click: true
      });
      this.DFA.messBoxScroll = new BScroll(this.$refs.messBoxDFA, {
        // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
        click: true
      });
      this.DFA_S.messBoxScroll = new BScroll(this.$refs.messBoxDFA_S, {
        // better-scroll 会将点击事件去掉，要在这里开启，同时点击在PC 会被执行两次，要在这里控制
        click: true
      });
    },
    // 将消息push到消息数组中并刷新显示框
    pushMess (object, str) {
      object.mess.push(str)
      console.log(object.messBoxScroll.maxScrollY)
      console.log(str)
      object.messBoxScroll.scrollTo(0, object.messBoxScroll.maxScrollY, 700, 'bounce')
      object.messBoxScroll.scrollTo(0, object.messBoxScroll.maxScrollY, 700, 'bounce')
      // this.messBoxScroll.scrollTo(0, this.aa, 700, 'bounce')
    },
    // 改变节点的颜色
    changeNode (object, _nodes, status) {
      let bgcolor
      if (status === 0) {
        bgcolor = '#fff'
      } else if (status === 1) {
        bgcolor = '#ffD2E5'
      } else {
        bgcolor = '#ffE5D2'
      }
      for (let i = 0; i < _nodes.length; i++) {
        object.nodes.update([
          { id: _nodes[i], color: { background: bgcolor } }
        ])
      }
    },
    // 改变边的颜色
    changeEdge (object, edges, status) {
      let border
      if (status === 0) {
        border = '#2b7ce9'
      } else if (status === 1) {
        border = '#e92b7c'
      } else {
        border = '#e97c2b'
      }
      for (let i = 0; i < edges.length; i++) {
        object.edges.update([{ id: edges[i], color: { color: border } }])
      }
    },
    // 适应屏幕
    fitAnimated (object) {
      var options = {
        duration: 1000,
        easingFunction: 'easeInOutQuad'
      }
      object.vis.fit({ animation: options })
      object.magnifier = false
    },
    // 下一步
    next (object, flag) {
      const self = this
      object.lastState = object.nextState
      object.nextState = object.machine.nextStep()
      if (flag === 0) {
        switch (object.nextState.code) {
          case NFA_CODE.DONE:
            self.$message({
              type: 'success',
              message: 'Token提取完成'
            })
            self.pushMess(object, 'Token提取完成')
            break
          case NFA_CODE.DOCLOSURE:
            self.$message({
              type: 'success',
              message: '闭包'
            })
            self.pushMess(object, '闭包')
            self.changeWindow(object)
            self.changeGraph(object, 2)
            break
          case NFA_CODE.READCHAR:
            self.$message({
              type: 'success',
              message: '读取字符'
            })
            self.pushMess(object, '读取字符')
            self.changeWindow(object)
            self.changeGraph(object, 1)
            break
          case NFA_CODE.ACCEPT:
            self.$message({
              type: 'success',
              message: '提取Token'
            })
            self.pushMess(object, '提取Token')
            self.changeWindow(object)
            self.changeGraph(object, 1)
            break
          case NFA_CODE.REJECT:
          // self.$message({
          //   type: 'error',
          //   message: '遇到了NFA拒绝的输入'
          // })
            self.pushMess(object, '遇到了NFA拒绝的输入')
            alert('遇到了NFA拒绝的输入')
            break
          case NFA_CODE.UNKNOWN:
            // self.$message({
            //   type: 'error',
            //   message: '遇到了NFA不认识的字符'
            // })
            self.pushMess(object, '遇到了NFA不认识的字符')
            alert('遇到了NFA不认识的字符')
            break
          default:
            break
        }
      } else {
        switch (object.nextState.code) {
          case DFA_CODE.DONE:
            self.$message({
              type: 'success',
              message: 'Token提取完成'
            })
            self.fitAnimated(object)
            break
          case DFA_CODE.NEXTSTEP:
            self.$message({
              type: 'success',
              message: '读取字符'
            })
            self.changeWindow(object)
            self.changeGraph(object, 2)
            self.focusNode(object.nextState.graphInfo.highlightNodes[0], object)
            break
          case DFA_CODE.READCHAR:
            self.$message({
              type: 'info',
              message: '遵循最长子串原则继续读字符'
            })
            self.changeWindow(object)
            self.changeGraph(object, 1)
            self.focusNode(object.nextState.graphInfo.highlightNodes[0], object)

            break
          case DFA_CODE.ACCEPT:
            self.$message({
              type: 'success',
              message: '提取Token'
            })
            self.changeWindow(object)
            self.changeGraph(object, 1)
            self.focusNode(object.nextState.graphInfo.highlightNodes[0], object)

            break
          case DFA_CODE.REJECT:
            // self.$message({
            //   type: 'success',
            //   message: '遇到了DFA拒绝的输入'
            // })
            alert('遇到了DFA拒绝的输入')
            break
          case DFA_CODE.UNKNOWN:
            // self.$message({
            //   type: 'success',
            //   message: '遇到了DFA不认识的字符'
            // })
            alert('遇到了DFA不认识的字符')
            break
          default:
            break
        }
      }
    },
    // 上一步
    previous (object, flag) {
      const self = this
      object.lastState = object.nextState
      object.nextState = object.machine.preStep()
      if (flag === 0) {
        switch (object.nextState.code) {
          case NFA_CODE.NOPRESTEP:
            self.$message({
              type: 'info',
              message: '已经是第一个状态了'
            })
            break
          case NFA_CODE.PRESTEP:
            self.$message({
              type: 'success',
              message: '返回到上一个步骤'
            })
            self.changeWindow(object)
            self.changeGraph(object, 1)
            break
          default:
            break
        }
      } else {
        switch (object.nextState.code) {
          case DFA_CODE.NOPRESTEP:
            self.$message({
              type: 'info',
              message: '已经是第一个状态了'
            })
            break
          case DFA_CODE.PRESTEP:
            self.$message({
              type: 'success',
              message: '返回到上一个步骤'
            })
            self.changeWindow(object)
            self.changeGraph(object, 1)
            self.focusNode(object.nextState.graphInfo.highlightNodes[0], object)
            break
          default:
            break
        }
      }
    },
    // 改变文字框
    changeWindow (object) {
      const self = this
      let recognized = object.nextState.windowInfo.recognizedTokens.map(obj => {
        let temp = []
        temp.push(obj.startIndex)
        temp.push(obj.endIndex)
        temp.push(obj.REId)
        return temp
      })
      let remains = [
        object.nextState.windowInfo.remains.startIndex,
        object.nextState.windowInfo.remains.endIndex,
        888
      ]
      let scanning = [
        object.nextState.windowInfo.scanning.startIndex,
        object.nextState.windowInfo.scanning.endIndex,
        999
      ]
      recognized.push(scanning)
      recognized.push(remains)
      let html = self.cut(object.TokenForm, recognized, object)
      object.Token = html
      // 自动滑动滚动条，把扫描框聚焦在中央
      try {
        document.getElementById(object.TokenId).scrollLeft =
          document.getElementById(object.ScanId).offsetLeft -
          document.getElementById(object.TokenId).offsetWidth /
            2
      } catch (e) {
      }
    },
    changeGraph (object, status) {
      const self = this
      self.changeNode(object, object.lastState.graphInfo.highlightNodes, 0)
      self.changeNode(
        object,
        object.nextState.graphInfo.highlightNodes,
        status
      )
      self.changeEdge(object, object.lastState.graphInfo.highlightEdges, 0)
      self.changeEdge(
        object,
        object.nextState.graphInfo.highlightEdges,
        status
      )
    },
    cut (str, arr, object) {
      let str1 = ''
      for (let i of arr) {
        if (i[2] < 888) {
          str1 =
            str1 +
            "<div class='tooltip mode" +
            i[2].toString() +
            "'>" +
            str.substring(i[0], i[1]) +
            '&nbsp;' +
            '<span class="tooltiptext">' +
            sessionStorage.getItem('regulation').split(',')[i[2]] +
            '</span></div>'
        } else if (i[2] === 999) {
          str1 =
            str1 +
            "<span id='" + object.ScanId + "' class='mode" +
            i[2].toString() +
            "'>" +
            str.substring(i[0], i[1]) +
            '</span>'
        } else {
          str1 =
            str1 +
            "<span class='mode" +
            i[2].toString() +
            "'>" +
            str.substring(i[0], i[1]) +
            '</span>'
        }
      }
      return str1
    },
    autoControl (object, flag) {
      const self = this
      if (object.autobuttonText === '自动展示') {
        object.autobuttonText = '停止'
        object.autobuttonType = 'danger'
        object.timer = setInterval(() => {
          self.next(object, flag)
          if (object.nextState.code === NFA_CODE.DONE || object.nextState.code === NFA_CODE.REJECT || object.nextState.code === NFA_CODE.UNKNOWN) {
            object.autobuttonText = '自动展示'
            object.autobuttonType = 'primary'
            clearInterval(object.timer)
          }
        }, 1000)
      } else {
        object.autobuttonText = '自动展示'
        object.autobuttonType = 'primary'
        clearInterval(object.timer)
      }
    },
    // 聚焦到点上
    focusNode (val, object) {
      var options = {
        scale: 1.0,
        animation: {
          duration: 1000,
          easingFunction: 'easeInOutQuad'
        }
      }
      object.vis.focus(val, options)
      object.magnifier = true
      // object.magnifier = true
    },
    // 聚焦到坐标
    focusPosition (val, object) {
      var options = {
        scale: 1.0,
        position: {x: val.x, y: val.y},
        animation: {
          duration: 500,
          easingFunction: 'linear'
        }
      }
      object.vis.moveTo(options)
    },
    // 全屏化/还原
    full_screen (object) {
      object.zoomicon = object.isFull_screen
        ? 'el-icon-zoom-in'
        : 'el-icon-zoom-out'
      object.isFull_screen = !object.isFull_screen
    },
    // 刷新图
    refresh (object) {
      object.nodes.clear()
      object.edges.clear()
      object.nodes.add(
        createNodes(object.data.transitionTable, object.data.acceptState)
      )
      object.edges.add(
        createEdges(object.data.transitionTable, object.data.alphabet)
      )
      object.vis.stabilize()
    },
    // 切换Tab菜单时自动鹰眼
    handleClick (tab, event) {
      const self = this
      if (self.TabActiveName === 'DFAGeneration') {
        self.$nextTick(() => {
          self.fitAnimated(self.DFA)
        })
      } else if (self.TabActiveName === 'NFAGeneration') {
        self.$nextTick(() => {
          self.fitAnimated(self.NFA)
        })
      } else if (self.TabActiveName === 'DFASimplification') {
        self.$nextTick(() => {
          self.fitAnimated(self.DFA_S)
        })
      }
      if (self.NFA.autobuttonText === '停止') {
        self.NFA.autobuttonText = '自动展示'
        self.NFA.autobuttonType = 'primary'
        clearInterval(self.NFA.timer)
      }
      if (self.DFA.autobuttonText === '停止') {
        self.DFA.autobuttonText = '自动展示'
        self.DFA.autobuttonType = 'primary'
        clearInterval(self.DFA.timer)
      }
      if (self.DFA_S.autobuttonText === '停止') {
        self.DFA_S.autobuttonText = '自动展示'
        self.DFA_S.autobuttonType = 'primary'
        clearInterval(self.DFA_S.timer)
      }
    },
    doubleClick (object) {
      const self = this
      object.vis.on('doubleClick', (params) => {
        params.event = '[original event]'
        self.$emit('node_double_click', params)
        console.log('双击事件' + params)
        if (object.magnifier === false) {
          object.magnifier = true
          self.focusPosition(params.pointer.canvas, object)
        } else {
          object.magnifier = false
          self.fitAnimated(object)
        }
      })
      object.vis.on('zoom', (params) => {
        params.event = '[original event]'
        self.$emit('zoom', params)
        console.log('滚动滚轮事件' + params)
        object.magnifier = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  min-width: 1200px;
}
.token {
  background-color: #bbbbbb;
  height: 100px;
}
.content {
  height: 100px;
  width: 100%;
  overflow: hidden;
}
.box {
  height: 100px;
  width: 66.7%;
  overflow: hidden;
  position: absolute;
}
.contentCover {
  height: 100px;
  width: 66.7%;
  overflow: hidden;
  background: linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,1) 85%);
  position: absolute;
}
.wrapper {
  height: 55px;
  margin: 3%;
  margin-left: 15%;
}
.controller {
  text-align: right;
  margin: 10%;
  margin-right: 15%
}
.buttonela{
  margin: 5%;
  margin-bottom: 2.5%
}
.buttonelb{
  margin: 5%;
  margin-top: 2.5%
}
#NFAToken,#DFAToken,#DFA_SToken{
  text-align: center;
  font-size: 45px;
  margin: 0px;
  /* word-wrap: break-word; */
  height: 60px;
  padding: 20px 10px;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
.scroll_bar{
  /* background-color: #bbbbbb; */
  height:80px;
  overflow: hidden;
}
div.graph.active {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(221, 221, 221, 1);
}
div.graph.active div.vis {
  height: 95%;
}
div.graph div.vis {
  height: 400px;
}
</style>

<style>
span.mode999 {
  background-color: red;
}
.tooltip {
  position: relative;
  display: inline-block;
  word-wrap: break-word;
}

.tooltip .tooltiptext {
  visibility: hidden;
  min-width: 120px;
  height: 20px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 0px 5px;
  font-size: 15px;
  position: absolute;
  z-index: 5;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
