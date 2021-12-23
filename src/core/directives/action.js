/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 * 普通权限控制（直接删除或隐藏该节点）
 *     <a-tooltip v-action:add_userRole>
 *          <template slot="title">添加角色</template>
 *           <a-icon type="plus" @click="addRole(action)" />
 *          </a-tooltip>
 *   组件复用时
 *      <a-button v-action="type+'_runFailed'" @click="excuate(1)">只执行失败任务</a-button>
 * type为使用该组件界面定义的变量特殊情况（非隐藏或直接删除该节点）
 * tag的权限控制
 *    <a-tag v-action="{key:'delete_user_role',type:'tag'}">选择</a-tag>
 * switch的权限控制
 *    <a-switch v-action="{key:'lock_user',type:'disabled'}" />
 * checkbox的权限控制
 *    <a-checkbox v-action="{key:'update_roleAction',type:'disabled'}" >选择</a-checkbox>
 *
 *  @see https://github.com/sendya/ant-design-pro-vue/pull/53
 */
 import Vue from 'vue'

 const DISABLED_CLASS = {
   'a-switch': 'ant-switch-disabled',
   'a-checkbox': 'ant-checkbox-disabled'
 }

 const action = Vue.directive('action', {
   inserted: function (el, binding, vnode) {
     let actionName, actionType
     let isObject = false
     const action = binding.arg || binding.value
     const elVal = vnode.context.$route.meta.permission
     if (typeof action === 'object') {
       actionName = action.key
       actionType = action.type
       isObject = true
     } else {
       actionName = action
       isObject = false
     }
     if (elVal.indexOf(actionName) === -1) { // 没有该权限
       if (isObject) {
         if (actionType === 'tag') {
           el.removeChild(el.childNodes[el.childNodes.length - 1])
         } else {
           el.disabled = true
           const elType = vnode.componentOptions.tag

           if (DISABLED_CLASS[elType]) {
             el.classList.add(DISABLED_CLASS[elType])
           }
           if (elType === 'a-checkbox') {
             el.childNodes[0].childNodes[0].setAttribute('disabled', 'disabled')
             el.childNodes[0].classList.add('ant-checkbox-disabled')
           }
         }
       } else {
         el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
       }
     } else {

     }
   }
 })

 export default action
