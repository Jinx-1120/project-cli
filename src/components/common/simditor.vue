<!--
****--@file     simditor
****--@date     2017/12/18 上午11:41
****--@author   jhd
****--@describe   富文本编辑器  simditor 
-->
<template>
    <div type="text/plain" class="sccs-content">
        <textarea :id="textnames">
        </textarea>
    </div>
</template>
<script>
	/*当前组件必要引入*/
	let Util = null
    import Simditor from '../../../static/simditor/scripts/simditor'
	import '../../../static/simditor/styles/simditor.css'
	import $ from 'jquery'

	export default {
		props:{
			toolbars:{ // 显示项 -->富文本编辑器显示项
				type:Array,
				default:() => []
			},
			info:{
				type:String,
				default:() => ''
            },
            toolbarHidden: { // 是否显示工具栏
                type: Boolean,
                default: false
            }
		},
		data (){
			return {
				textnames:new Date().getTime(),//这里防止多个富文本发生冲突
				editor:'',//保存simditor对象
				toolbar:[ 'title','bold','italic','underline','strikethrough','fontScale','color','ol','ul','blockquote','table','link','image','hr','indent','outdent','alignment' ],//自定义工具栏
                content:this.info ||'',//富文本编辑器内容
                resourceHttp: ''
			}
		},
		methods:{
			//初始化请求列表数据
			init (){
				Util = this.$util;
                this.resourceHttp = this.$store.getters['app/envs']('resourceHttp');
				this.createEditor()
			},
			createEditor (){
				var _this = this;
				this.editor = new Simditor( {
					textarea:$( '#' + _this.textnames ),
					toolbar: _this.toolbar,
					toolbarFloat:false,
                    toolbarHidden: this.toolbarHidden,
					upload:{
                        url: '/stu/file/uploadImg', //文件上传的接口地址
//                        params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
                        fileKey: 'file', //服务器端获取文件数据的参数名
						connectionCount:3,//同时上传个数
						leaveConfirm:'正在上传文件',
                        resourceHttp: this.resourceHttp
					},
                    pasteImage: true,//是否允许粘贴上传图片，依赖 upload 选项，仅支持 Firefox 和 Chrome 浏览器。
					tabIndent:true,//是否在编辑器中使用 tab 键来缩进
				} );
				if(this.info){
					this.editor.setValue(this.info);
                }
				this.editor.on( "valuechanged",function ( e,src ){
					_this.content = _this.editor.getValue();
                    //console.log(_this.editor)
					_this.$emit('valuechanged',_this.content)
				} )
                this.editor.on("decorate ", function(e, src) {
                    console.log(_this.editor.getValue())
                    _this.content = _this.editor.getValue();
                    _this.$emit('decorate', _this.content)
                })

			},
		},
		created (){

		},
		mounted (){
			this.init();
		},
		components:{}
	}

</script>

<style lang="scss">
    .sccs-content{
        .simditor .simditor-body{
            height:300px;
            overflow-y: scroll;
        }
    }
</style>